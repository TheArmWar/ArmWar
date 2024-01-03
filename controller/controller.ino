// Wifi
#include "src/utils/wifi.hpp"

// HTTP Server
#include "src/server/server.hpp"

// API
#include "src/api/api.hpp"

// Config
#include "src/config/config.hpp"

// Wifi credentials
#include "src/config/credentials.hpp"

/* -------------------------------------------------------------------------- */
// HTTP server global variable
HTTPServer server = HTTPServer(SERVER_PORT);

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
    Serial.begin(SERIAL_BAUDRATE);

    // Wifi setup
    wifiConnect(SECRET_SSID, SECRET_PASSWORD);

    // Motors setup
    motors.begin();

    // Server setup
    serverSetup(&server, &motors);

    // Init motors to base bos
    basePos(motors);

    motors.setPosPlierMin(4);
    Serial.println("Setup done");
}

/* -------------------------------------------------------------------------- */
void loop()
{
    server.loop();
}
