#pragma once

// Protobuf protocol
#include "armwar.pb.h"

// Protobuf library
#include <HTTPRequest.hpp>
#include <HTTPResponse.hpp>
#include <HTTPServer.hpp>
#include <ResourceNode.hpp>
#include <SSLCert.hpp>

// Servo api
#include "../api/motors.hpp"
#include "pb.h"
#include "pb_common.h"
#include "pb_decode.h"
#include "pb_encode.h"
using namespace httpsserver;

#define DEFAULT_CONNECTION_TIMEOUT 60

void middlewareAuth(HTTPRequest* req, HTTPResponse* res, std::function<void()> next);
void handleStatus(HTTPRequest* req, HTTPResponse* res);
void handleLogin(HTTPRequest* req, HTTPResponse* res);
void handleLogout(HTTPRequest* req, HTTPResponse* res);
void handleCommand(HTTPRequest* req, HTTPResponse* res);
void serverSetup(HTTPServer* server, Motors* pwm);
