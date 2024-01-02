// Wifi
#include "src/utils/wifi.hpp"

// HTTP Server
#include "src/server/server.hpp"

// API
#include "src/api/api.hpp"

/* -------------------------------------------------------------------------- */
// Wifi settings
const char* SSID = "***REMOVED***";
const char* PASSWORD = "***REMOVED***";

// HTTP server global variable
HTTPServer server = HTTPServer(80);

// Motors api global variable
Motors motors = Motors({ 0, 3, 7, 11, 15 });

/**
 * Motors:
 * 0: Arm rotation
 * 1: Down Vertical Axis
 * 2: Upper Vertical Axis
 * 3: Pliers rotation
 * 4: Pliers
 */

/* -------------------------------------------------------------------------- */
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

    // Init motors to base bos
    basePos(motors);

    Serial.println("Setup done");
}

/* -------------------------------------------------------------------------- */
void loop()
{
    server.loop();
}
