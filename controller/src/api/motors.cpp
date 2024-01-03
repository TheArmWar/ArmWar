#include "motors.hpp"

#include "../config/config.hpp"

/**
 * Motors constructor
 * @param pins: List of pins for each motor. In the list, the first pin will
 * identify the motor 0, the second one the motor 1, ect.
 */
Motors::Motors(std::initializer_list<uint8_t> pins)
{
    // Initialize the pwm servo driver from Adafruit
    this->pwm_servo_driver = Adafruit_PWMServoDriver();

    // Create the motor pins vector
    this->motor_pins = std::vector<uint8_t>(pins);
}

/**
 * Begin the Adafruit_PWMServoDriver api and set the configuration of the
 * driver
 */
void Motors::begin()
{
    this->pwm_servo_driver.begin();
    this->pwm_servo_driver.setOscillatorFrequency(SERVO_OSC_FREQ);
    this->pwm_servo_driver.setPWMFreq(SERVO_PWM_FREQ);
}

/**
 * Get the current pos of the motor "n"
 * @param n: The nth motor of the pins list
 * @return The current position of the nth motor
 */
uint16_t Motors::getPos(uint8_t n)
{
    return this->pwm_servo_driver.getPWM(this->motor_pins[n], true);
}

/**
 * Set the position of the motor "n" with the position "pos"
 * @param n: The nth motor of the pins list
 * @param pos: The position that will be set to the nth motor
 * @return Motors::Status
 */
Motors::Status Motors::setPos(uint8_t n, uint16_t pos)
{
    if (pos < SERVO_MIN)
        pos = SERVO_MIN;
    else if (pos > SERVO_MAX)
        pos = SERVO_MAX;

    return (Motors::Status)this->pwm_servo_driver.setPWM(this->motor_pins[n], 0,
                                                         pos);
}

/**
 * Set the position of the motor "n" with the position "pos"
 * @param n: The nth motor of the pins list
 * @param pos: The position that will be set to the nth motor
 * @return Motors::Status
 */
Motors::Status Motors::setPosPlier(uint8_t n, uint16_t pos)
{
    if (pos < SERVO_PLIER_MIN)
        pos = SERVO_PLIER_MIN;
    else if (pos > SERVO_PLIER_MAX)
        pos = SERVO_PLIER_MAX;

    return (Motors::Status)this->pwm_servo_driver.setPWM(this->motor_pins[n], 0,
                                                         pos);
}

/**
 * Set the maximal position of the motor "n"
 * @param n: The nth motor of the pins list
 * @return Motors::Status
 */
Motors::Status Motors::setPosPlierMax(uint8_t n)
{
    return this->setPos(n, SERVO_PLIER_MAX);
}

/**
 * Set the minimal position of the motor "n"
 * @param n: The nth motor of the pins list
 * @return Motors::Status
 */
Motors::Status Motors::setPosPlierMin(uint8_t n)
{
    return this->setPos(n, SERVO_PLIER_MIN);
}
/**
 * Set the maximal position of the motor "n"
 * @param n: The nth motor of the pins list
 * @return Motors::Status
 */
Motors::Status Motors::setPosMax(uint8_t n)
{
    return this->setPos(n, SERVO_MAX);
}

/**
 * Set the minimal position of the motor "n"
 * @param n: The nth motor of the pins list
 * @return Motors::Status
 */
Motors::Status Motors::setPosMin(uint8_t n)
{
    return this->setPos(n, SERVO_MIN);
}

/**
 * Set the middle position of the motor "n"
 * @param n: The nth motor of the pins list
 * @return Motors::Status
 */
Motors::Status Motors::setPosMid(uint8_t n)
{
    return this->setPos(n, SERVO_MID);
}
