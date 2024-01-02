#include "motors.hpp"

Motors::Motors(std::initializer_list<uint8_t> pins)
{
    // Initialize the pwm servo driver from Adafruit
    this->pwm_servo_driver = Adafruit_PWMServoDriver();

    // Create the motor pins vector
    this->motor_pins = std::vector<uint8_t>(pins);
}

void Motors::begin()
{
    this->pwm_servo_driver.begin();
    this->pwm_servo_driver.setOscillatorFrequency(27000000);
    this->pwm_servo_driver.setPWMFreq(50);
}

uint16_t Motors::getPos(uint8_t n)
{
    return this->pwm_servo_driver.getPWM(this->motor_pins[n], true);
}

Motors::Status Motors::setPos(uint8_t n, uint16_t pos)
{
    if (pos < SERVOMIN)
        pos = SERVOMIN;
    else if (pos > SERVOMAX)
        pos = SERVOMAX;

    return (Motors::Status)this->pwm_servo_driver.setPWM(this->motor_pins[n], 0,
                                                         pos);
}
