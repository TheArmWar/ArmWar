#pragma once

/**
 * This file allows to configure the controller project.
 * It contains values to that can be modified to mainly modify the comportment
 * of the motors.
 */

/*----------------------------------------------------------------------------*/
/**
 * Arduino Specific configuration
 */
#define SERIAL_BAUDRATE 115200 // Serial baudrate

/*----------------------------------------------------------------------------*/
/**
 * Server configuration
 */
#define SERVER_BUFFER_SIZE 512 // Size of the buffer used to receive
#define SERVER_PORT 80 // Port used by the server

/*----------------------------------------------------------------------------*/
/**
 * Motors API configuration
 */
#define SERVO_MIN 90 // This is the 'minimum' pulse length count (out of 4096)
#define SERVO_MAX 420 // This is the 'maximum' pulse length count (out of 4096)
#define SERVO_MID 305 // Mid position
#define SERVO_ROTATE_90 170 // 90 degrees rotation

#define SERVO_PLIER_MIN 250 // Min pos for plier motor
#define SERVO_PLIER_MAX 262 // Max pos for plier motor

#define SERVO_OSC_FREQ 27000000 // ?
#define SERVO_PWM_FREQ 50 // 50 Hz
#define SERVO_INTERVALLE 2000 // 2 seconds

#define SERVO_UNIT 1 // 2 unit ~= 1 degree

#define SERVO_SPEED 20 // Delay between each command in milliseconds
