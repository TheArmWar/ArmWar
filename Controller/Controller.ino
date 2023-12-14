// Wifi
#include <WiFi.h>

// PWM ServoDriver
#include <Adafruit_PWMServoDriver.h>

// Wire
#include <Wire.h>

// HTTP Server
#include "src/server/server.hpp"
#include "src/api/api.hpp"

// API
//#include "src/api/api.hpp"

// Wifi settings
const char *SSID = "***REMOVED***";
const char *PASSWORD = "***REMOVED***";

// Protobuf buffers size
const int BUFFER_SIZE = 512;

// HTTP server global variable
HTTPServer server = HTTPServer(80);

int FREQ = 50;
int sens = 1;
int start = 1;

// PWM ServoDriver
Adafruit_PWMServoDriver pwmServo = Adafruit_PWMServoDriver();

/**
 * wifiConnect function
 * ssid Name of the network
 * password Password of the network
 */
void wifiConnect(const char *ssid, const char *password) {
  Serial.print("Connecting to ");
  Serial.println(SSID);

  // Begins a connection
  WiFi.begin(SSID, PASSWORD);

  // Wait until we are connected
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void controllerSetup() {
  pwmServo.begin();
  pwmServo.setOscillatorFrequency(27000000);
  pwmServo.setPWMFreq(FREQ);
}

void setup() {
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

void loop() {
  // Echo server listening
  if (start == 1) {
    int motors[] = {0, 3, 7, 11, 15};
    int SERVOMID = 305;
    for (int i = 0; i < 3; i++) {
      pwmServo.setPWM(motors[i], 0, SERVOMID);
    }
    start = 0;
  }
  server.loop();
}
