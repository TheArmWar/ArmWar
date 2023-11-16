#ifndef COMMAND_HPP
#define COMMAND_HPP

#include "api.hpp"
#include <thread>
#include <vector>

/**
 * Class holding a thread and a custom name
 * using C++ thread library
*/
class Thread {
    public:
    Thread() {}

    void SetName(std::string name) {
        this->name = name;
    }

    void SetThread(std::thread t) {
        this->t1 = std::thread(std::move(t));
    }

    std::thread t1;
    std::string name;
    bool stop = false;
};

/**
 * Parse a Stated command and execute it
 * execute the command if the given `start` parameter of the command is true
 * otherwise, stop the command
 * @param command: the command to execute
 * @param pwm: the pwm object
 * @return 0 if success, 1 if error, -1 if command not found
 */
int command(armwar_StatedCommand command, Adafruit_PWMServoDriver pwm);

/**
 * Parse a Spanned command and execute it
 * execute the command with the given `span` parameter of the command
 * @param command: the command to execute
 * @param pwm: the pwm object
 * @return 0 if success, 1 if error, -1 if command not found
 */
int command(armwar_SpannedCommand command, Adafruit_PWMServoDriver pwm);

/**
 * Parse a Timed command and execute it
 * execute the comamnd during the given `duration` parameter of the command
 * @param command: the command to execute
 * @param pwm: the pwm object
 * @return 0 if success, 1 if error, -1 if command not found
 */
int command(armwar_TimedCommand command, Adafruit_PWMServoDriver pwm);

#endif
