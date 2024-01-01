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

// Wifi settings
const char* SSID = "***REMOVED***";
const char* PASSWORD = "***REMOVED***";

// Protobuf buffers size
const int BUFFER_SIZE = 512;

// HTTP server global variable
HTTPServer server = HTTPServer(80);

const int PWM_FREQ = 50;
const int SERVO_M_ID = 305;
const int sens = 1;
bool TEST_START = true;

// PWM ServoDriver
Adafruit_PWMServoDriver pwmServo = Adafruit_PWMServoDriver();

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

void controllerSetup()
{
    pwmServo.begin();
    pwmServo.setOscillatorFrequency(27000000);
    pwmServo.setPWMFreq(PWM_FREQ);
}

void setup()
{
    // Serial setup
    Serial.begin(115200);

    // Wifi setup
    wifiConnect(SSID, PASSWORD);

    // Server setup
    serverSetup(&server, &pwmServo);

    // Controller setup
    controllerSetup();

    Serial.println("Setup done");
}

void loop()
{
    if (TEST_START)
    {
        int motors[] = { 0, 3, 7, 11, 15 };

        for (int i = 0; i < 3; i++)
        {
            pwmServo.setPWM(motors[i], 0, SERVO_M_ID);
        }

        TEST_START = false;
    }
    down(pwmServo, 30);
    delay(1000);
    up(pwmServo, 30);
    delay(1000);

    // Server listening
    // server.loop();
}
