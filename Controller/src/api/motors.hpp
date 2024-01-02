#pragma once

#include <Adafruit_PWMServoDriver.h>
#include <initializer_list>
#include <vector>

// Min and Max pulse length in microseconds
#define SERVOMIN 90 // this is the 'minimum' pulse length count (out of 4096)
#define SERVOMAX 420 // this is the 'maximum' pulse length count (out of 4096)

class Motors
{
public:
    /**
     * Status codes enum
     */
    enum Status
    {
        SUCCESS = 0,
        ERROR = 1,
    };

    /**
     * Constructor
     */
    Motors(std::initializer_list<uint8_t> pins);

    /**
     * Servo API
     */
    void begin();
    uint16_t getPos(uint8_t n);
    Motors::Status setPos(uint8_t n, uint16_t pos);

private:
    Adafruit_PWMServoDriver pwm_servo_driver;
    std::vector<uint8_t> motor_pins;
};
