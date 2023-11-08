#ifndef SERVER_H
#define SERVER_H

// Protobuf protocol
#include "armwar.pb.h"

// Protobuf library
#include "pb.h"
#include "pb_common.h"
#include "pb_decode.h"
#include "pb_encode.h"

#include <HTTPRequest.hpp>
#include <HTTPResponse.hpp>
#include <HTTPServer.hpp>
#include <ResourceNode.hpp>
#include <SSLCert.hpp>
using namespace httpsserver;

void handleStatus(HTTPRequest *req, HTTPResponse *res);
void handleCommand(HTTPRequest *req, HTTPResponse *res);
void serverSetup(HTTPServer *server, Adafruit_PWMServoDriver *pwm);

#endif /* SERVER_H */
