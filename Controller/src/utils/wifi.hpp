#pragma once

#include <WiFi.h>

/**
 * Connect the arduino to the Wifi
 * @param ssid: Network ssid
 * @param password: Network password
 */
void wifiConnect(const char* ssid, const char* password);
