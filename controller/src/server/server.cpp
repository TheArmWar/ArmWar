#include "server.hpp"

#include <HTTPRequest.hpp>
#include <HTTPResponse.hpp>
#include <HTTPServer.hpp>
#include <ResourceNode.hpp>
#include <SSLCert.hpp>
#include <string>

#include "../api/command.hpp"
#include "../config/config.hpp"
#include "armwar.pb.h"

// Enhance code readability
using namespace httpsserver;

Motors* g_motors;

IPAddress* ip = NULL;
time_t lastConnectionTime = 0;
time_t connectionTimeout = DEFAULT_CONNECTION_TIMEOUT;

/**
 * @brief Decode a command from a buffer
 *
 * @param cmd A pointer to the command to fill
 * @param buffer The buffer to decode
 * @param size The size of the buffer
 * @return True if the decoding was successful, false otherwise
 */
bool decode_command(armwar_ArmCommand* cmd, uint8_t* buffer, size_t size)
{
    pb_istream_t stream = pb_istream_from_buffer(buffer, size);

    // Decode
    bool status = pb_decode(&stream, armwar_ArmCommand_fields, cmd);

    // Check status
    if (!status)
    {
        Serial.println("Failed to decode: ");
        Serial.println(stream.errmsg);
    }

    return status;
}

/**
 * @brief Encode a string to the current stream
 *
 * @param stream The stream to write to
 * @param field The field to write
 * @param arg The string to write
 * @return True if the encoding was successful, false otherwise
 */
bool encode_string(pb_ostream_t* stream, const pb_field_t* field,
                   void* const* arg)
{
    std::string* str = (std::string*)*arg;

    if (!pb_encode_tag_for_field(stream, field))
        return false;

    return pb_encode_string(stream, (uint8_t*)str->c_str(), str->length());
}

void send_response(HTTPResponse* res, bool success, std::string* message)
{
    armwar_CommandResponse cmdResponse = armwar_CommandResponse_init_zero;
    uint8_t respBuffer[SERVER_BUFFER_SIZE] = { 0 };

    res->setHeader("Access-Control-Allow-Origin", "*");

    cmdResponse.success = success;
    pb_ostream_t ostream =
        pb_ostream_from_buffer(respBuffer, SERVER_BUFFER_SIZE);
    cmdResponse.message.arg = (void*)message;
    cmdResponse.message.funcs.encode = &encode_string;
    if (!pb_encode(&ostream, armwar_CommandResponse_fields, &cmdResponse))
    {
        Serial.println("encoding failed: ");
        Serial.println(ostream.errmsg);
        res->error();
        return;
    }

    res->write(respBuffer, ostream.bytes_written);
}

void middlewareAuth(HTTPRequest* req, HTTPResponse* res,
                    std::function<void()> next)
{
    // Currently, the middleware is only used to check if the client is
    // connected to the arm by checking the stored ip address.
    // There is no security or password check for now.
    armwar_CommandResponse cmdResponse = armwar_CommandResponse_init_zero;
    uint8_t respBuffer[SERVER_BUFFER_SIZE] = { 0 };
    time_t now = time(NULL);

    // If the client is trying to connect and no one is connected or the timeout
    // of the precedent client was reached, continue
    if (req->getRequestString().substr(0, 7) == "/login"
        && (!ip || difftime(now, lastConnectionTime) > connectionTimeout))
    {
        lastConnectionTime = now;
        next();
        return;
    }

    // If no client is connected, no other request are allowed
    if (!ip)
    {
        std::string errorMessage = "You are not connected to the arm.";

        send_response(res, false, &errorMessage);
        return;
    }

    // If the client is not the one connected, return an error
    if (req->getClientIP() != *ip)
    {
        std::string errorMessage = "You are not the connected client.";

        send_response(res, false, &errorMessage);
        return;
    }

    // If the client is connected, continue
    lastConnectionTime = now;
    next();
}

/**
 * @brief Construct a new Arm War Server object
 *
 * @param motors The motors api the server interacts with
 * @param portHTTPS
 * @param maxConnections
 * @param bindAddress
 */
void serverSetup(HTTPServer* server, Motors* motors)
{
    g_motors = motors;

    // Create the root nodes
    ResourceNode* nodeGetRoot =
        new ResourceNode("/status", "GET", &handleStatus);
    ResourceNode* nodePostRoot =
        new ResourceNode("/command", "POST", &handleCommand);
    ResourceNode* nodeLoginRoot =
        new ResourceNode("/login", "POST", &handleLogin);
    ResourceNode* nodeLogoutRoot =
        new ResourceNode("/logout", "POST", &handleLogout);

    // Register the services
    server->addMiddleware(&middlewareAuth);
    server->registerNode(nodeGetRoot);
    server->registerNode(nodePostRoot);
    server->registerNode(nodeLoginRoot);
    server->registerNode(nodeLogoutRoot);

    server->start();
}

/**
 * @brief Handle the status request
 *
 * @param req
 * @param res
 */
void handleStatus(HTTPRequest* req, HTTPResponse* res)
{
    // Set headers
    res->setHeader("Access-Control-Allow-Origin", "*");

    // construct armwar_ArmState
    // TODO

    // res->write(buffer, size);
    res->error();
}

/**
 * @brief Handle the login request, storing the client ip
 *
 * @param req
 * @param res
 */
void handleLogin(HTTPRequest* req, HTTPResponse* res)
{
    armwar_Connect connectMsg = armwar_Connect_init_zero;
    uint8_t buffer[armwar_Connect_size] = { 0 };
    pb_istream_t stream;
    std::string message = "You are now connected to the arm.";

    size_t size = req->readBytes(buffer, armwar_Connect_size);
    stream = pb_istream_from_buffer(buffer, size);

    if (!pb_decode(&stream, armwar_Connect_fields, &connectMsg))
    {
        Serial.println("Failed to decode: ");
        Serial.println(stream.errmsg);
        message = "Internal Server Error.";
        send_response(res, false, &message);
        return;
    }

    // Remove the previous client ip if there is one
    if (ip)
        delete ip;
    // Store the client ip
    ip = new IPAddress(req->getClientIP());

    if (connectMsg.has_timeout)
        connectionTimeout = connectMsg.timeout;

    Serial.println("Connected client: ");
    Serial.println(*ip);
    Serial.println("With connection timeout: ");
    Serial.println(connectionTimeout);

    send_response(res, true, &message);
}

/**
 * @brief Handle the logout request, removing the client ip
 *
 * @param req
 * @param res
 */
void handleLogout(HTTPRequest* req, HTTPResponse* res)
{
    res->setHeader("Access-Control-Allow-Origin", "*");

    Serial.println("Disconnected client: ");
    Serial.println(*ip);

    // Remove the client ip
    if (ip)
        delete ip;
    ip = NULL;
    lastConnectionTime = 0;

    std::string message = "You have been disconnected from the arm.";
    send_response(res, true, &message);
}

/**
 * @brief Handle the command request
 *
 * @param req
 * @param res
 */
void handleCommand(HTTPRequest* req, HTTPResponse* res)
{
    armwar_ArmCommand cmd = armwar_ArmCommand_init_zero;
    uint8_t* buffer;
    size_t buf_size;
    size_t buf_len;
    bool success;
    std::string errorMessage{ "" };

    buffer = (uint8_t*)malloc(SERVER_BUFFER_SIZE);
    buf_size = SERVER_BUFFER_SIZE;
    buf_len = 0;
    success = true;

    // Read the body of the request, 512 bytes at a time.
    // We cannot know the size of the body in advance because of the commands
    // sequences and nanopb decoding need the full buffer.
    while (!req->requestComplete())
    {
        size_t size = req->readBytes(buffer, SERVER_BUFFER_SIZE);
        buf_len += size;
        if (size >= SERVER_BUFFER_SIZE)
        {
            uint8_t* new_buffer =
                (uint8_t*)realloc(buffer, buf_size + SERVER_BUFFER_SIZE);

            if (new_buffer == NULL)
            {
                errorMessage = "The command sequence is too long.";
                send_response(res, false, &errorMessage);
                return;
            }

            buffer = new_buffer;
            buf_size += SERVER_BUFFER_SIZE;
        }
    }

    // decode armwar_ArmCommand
    if (!decode_command(&cmd, buffer, buf_len))
    {
        errorMessage = "Failed to decode the command.";
        send_response(res, false, &errorMessage);
        return;
    }

    // Call the correct api depending on the command type
    switch (cmd.which_command)
    {
    case armwar_ArmCommand_timed_command_tag:
        Serial.println("Received Timed command");
        command(cmd.command.timed_command, *g_motors);
        break;
    case armwar_ArmCommand_timed_sequence_tag:
        Serial.println("Received Timed sequence");
        // TODO: need api Timed sequence handler
        break;
    case armwar_ArmCommand_spanned_command_tag:
        Serial.println("Received Spanned command");
        command(cmd.command.spanned_command, *g_motors);
        break;
    case armwar_ArmCommand_spanned_sequence_tag:
        Serial.println("Received Spanned sequence");
        // TODO: need api Spanned sequence handler
        break;
    case armwar_ArmCommand_stated_command_tag:
        Serial.print("Received Stated command: ");
        if (cmd.command.stated_command.start)
            Serial.println("Start");
        else
            Serial.println("Stop");

        command(cmd.command.stated_command, *g_motors);
        break;
    default:
        Serial.println("Unknown command type: ");
        Serial.println(cmd.which_command);
        success = false;
        errorMessage = "Unknown command type.";
        break;
    }

    free(buffer);
    send_response(res, success, &errorMessage);
}
