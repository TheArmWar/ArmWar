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

    // Register the services
    server->registerNode(nodeGetRoot);
    server->registerNode(nodePostRoot);
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
 * @brief Handle the command request
 *
 * @param req
 * @param res
 */
void handleCommand(HTTPRequest* req, HTTPResponse* res)
{
    armwar_ArmCommand cmd = armwar_ArmCommand_init_zero;
    armwar_CommandResponse cmdResponse = armwar_CommandResponse_init_zero;
    uint8_t respBuffer[SERVER_BUFFER_SIZE] = { 0 };
    uint8_t* buffer;
    size_t buf_size;
    size_t buf_len;
    bool success;
    std::string errorMessage{ "" };

    res->setHeader("Access-Control-Allow-Origin", "*");
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
                success = false;
                errorMessage = "The command sequence is too long.";
                goto sendResponse;
            }

            buffer = new_buffer;
            buf_size += SERVER_BUFFER_SIZE;
        }
    }

    // decode armwar_ArmCommand
    if (!decode_command(&cmd, buffer, buf_len))
    {
        success = false;
        errorMessage = "Failed to decode the command.";
        goto sendResponse;
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
        // TODO: need api Spanned command handler
        break;
    case armwar_ArmCommand_spanned_sequence_tag:
        Serial.println("Received Spanned sequence");
        // TODO: need api Spanned sequence handler
        break;
    case armwar_ArmCommand_stated_command_tag:
        Serial.println("Received Stated command");
        command(cmd.command.stated_command, *g_motors);
        break;
    default:
        Serial.println("Unknown command type: ");
        Serial.println(cmd.which_command);
        success = false;
        errorMessage = "Unknown command type.";
        break;
    }

    // construct armwar_CommandResponse and free buffer
sendResponse:
    free(buffer);
    cmdResponse.success = success;
    pb_ostream_t ostream =
        pb_ostream_from_buffer(respBuffer, SERVER_BUFFER_SIZE);
    cmdResponse.message.arg = (void*)&errorMessage;
    cmdResponse.message.funcs.encode = &encode_string;
    success = pb_encode(&ostream, armwar_CommandResponse_fields, &cmdResponse);
    if (!success)
    {
        Serial.println("encoding failed: ");
        Serial.println(ostream.errmsg);
        res->error();
        return;
    }

    res->write(respBuffer, ostream.bytes_written);
}
