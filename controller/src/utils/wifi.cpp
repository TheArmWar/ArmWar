#include "wifi.hpp"

/**
 * Connect the arduino to the Wifi
 * @param ssid: Network ssid
 * @param password: Network password
 */
void wifiConnect(const char* ssid, const char* password)
{
    Serial.print("Connecting to ");
    Serial.print(ssid);

    // Begins a connection
    WiFi.begin(ssid, password);

    // Wait until we are connected
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }

    Serial.println("");
    Serial.println("WiFi connected.");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
}
