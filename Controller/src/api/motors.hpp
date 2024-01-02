#pragma once

#include <Adafruit_PWMServoDriver.h>
#include <initializer_list>
#include <vector>

/**
 * @class Motors
 * @brief Wrapper around the Adafruit_PWMServoDriver lib to handle multiple
 * servo motors.
 */
class Motors
{
public:
    /**
     * @enum Status
     * @brief Enumeration to describe the error codes of the PWM driver api
     */
    enum Status
    {
        SUCCESS = 0,
        ERROR = 1,
    };

    /**
     * Motors constructor
     * @param pins: List of pins for each motor. In the list, the first pin will
     * identify the motor 0, the second one the motor 1, ect.
     */
    Motors(std::initializer_list<uint8_t> pins);

    /**
     * Begin the Adafruit_PWMServoDriver api and set the configuration of the
     * driver
     */
    void begin();

    /**
     * Get the current pos of the motor "n"
     * @param n: The nth motor of the pins list
     * @return The current position of the nth motor
     */
    uint16_t getPos(uint8_t n);

    /**
     * Set the position of the motor "n" with the position "pos"
     * @param n: The nth motor of the pins list
     * @param pos: The position that will be set to the nth motor
     * @return Motors::Status
     */
    Motors::Status setPos(uint8_t n, uint16_t pos);

    /**
     * Set the position of the motor "n" with the position "pos"
     * @param n: The nth motor of the pins list
     * @param pos: The position that will be set to the nth motor
     * @return Motors::Status
     */
    Motors::Status setPosPlier(uint8_t n, uint16_t pos);

    /**
     * Set the maximal position of the motor "n"
     * @param n: The nth motor of the pins list
     * @return Motors::Status
     */
    Motors::Status setPosPlierMax(uint8_t n);

    /**
     * Set the minimal position of the motor "n"
     * @param n: The nth motor of the pins list
     * @return Motors::Status
     */
    Motors::Status setPosPlierMin(uint8_t n);

    /**
     * Set the maximal position of the motor "n"
     * @param n: The nth motor of the pins list
     * @return Motors::Status
     */
    Motors::Status setPosMax(uint8_t n);

    /**
     * Set the minimal position of the motor "n"
     * @param n: The nth motor of the pins list
     * @return Motors::Status
     */
    Motors::Status setPosMin(uint8_t n);

    /**
     * Set the middle position of the motor "n"
     * @param n: The nth motor of the pins list
     * @return Motors::Status
     */
    Motors::Status setPosMid(uint8_t n);

private:
    Adafruit_PWMServoDriver pwm_servo_driver;
    std::vector<uint8_t> motor_pins;
};
