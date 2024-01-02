// Wifi
#include <WiFi.h>

// PWM ServoDriver
#include <Adafruit_PWMServoDriver.h>

// Wire
#include <Wire.h>

// HTTP Server
#include "src/server/server.hpp"

// API
#include "src/api/api.hpp"

// Motors api
#include "src/api/motors.hpp"

// Wifi settings
const char* SSID = "Bbox-49E1F8AE";
const char* PASSWORD = "17021320";

// Protobuf buffers size
const int BUFFER_SIZE = 512;

// HTTP server global variable
HTTPServer server = HTTPServer(80);

const int PWM_FREQ = 50;
const int SERVO_M_ID = 305;
const int sens = 1;
bool TEST_START = true;

Motors motors = Motors({ 0, 3, 7, 11, 15 });

/**
 * wifiConnect function
 * ssid Name of the network
 * password Password of the network
 */
void wifiConnect(const char* ssid, const char* password)
{
    Serial.print("Connecting to ");
    Serial.println(SSID);

    // Begins a connection
    WiFi.begin(SSID, PASSWORD);

    // Wait until we are connected
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }

    Serial.println("");
    Serial.println("WiFi connected.");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
}

void setup()
{
    // Serial setup
    Serial.begin(115200);

    // Wifi setup
    wifiConnect(SSID, PASSWORD);

    // Motors setup
    motors.begin();

    // Server setup
    serverSetup(&server, &motors);

    Serial.println("Setup done");
}

void loop()
{
    if (TEST_START)
    {
        for (int i = 0; i < 5; i++)
        {
            motors.setPos(i, SERVO_M_ID);
            Serial.println(motors.getPos(i));
        }

        TEST_START = false;
    }

    // Server listening
    server.loop();
}
