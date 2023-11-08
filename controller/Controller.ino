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
const char *SSID = "Bbox-26C04E63";
const char *PASSWORD = "64jWvZjh7fPj145UQf";

// Protobuf buffers size
const int BUFFER_SIZE = 512;

// HTTP server global variable
HTTPServer server = HTTPServer(80);

int FREQ = 50;
int sens = 1;

// PWM ServoDriver
Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();

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
  pwm.begin();
  pwm.setOscillatorFrequency(27000000);
  pwm.setPWMFreq(FREQ);
}

void setup() {
  // Serial setup
  Serial.begin(115200);

  // Wifi setup
  wifiConnect(SSID, PASSWORD);

  // Server setup
  serverSetup(&server, &pwm);

  // Controller setup
  controllerSetup();
}

void loop() {
  // Echo server listening
  server.loop();

  Serial.println("Loop");
}
