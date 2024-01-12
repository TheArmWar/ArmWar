#include "command.hpp"

//#include <mutex>
#include <thread>

#include "../config/config.hpp"

// std::mutex mutex;

/**
 * Parse a Stated command and execute it
 * execute the command if the given `start` parameter of the command is true
 * otherwise, stop the command
 * @param command: the command to execute
 * @param motors: the motors object
 * @return 0 if success, 1 if error, -1 if command not found
 */
int command(armwar_StatedCommand command, Motors& motors)
{
    // static Thread* thread = nullptr;
    static bool stop = false;
    static std::thread thread;

    func fun = parse_command(command.command);

    if (fun == NULL)
        return -1;

    if (command.start)
    {
        stop = false;
        thread = std::thread([command, &motors, fun, &stop]() mutable {
            while (!stop)
            {
                // mutex.lock();
                fun(motors, 1);
                // mutex.unlock();

                delay(SERVO_SPEED);
            }
        });
    }
    else
    {
        stop = true;
        thread.join();
    }

    return 0;
}

/**
 * Parse a Spanned command and execute it
 * execute the command with the given `span` parameter of the command
 * @param command: the command to execute
 * @param motors: the motors object
 * @return 0 if success, 1 if error, -1 if command not found
 */
int command(armwar_SpannedCommand command, Motors& motors)
{
    func fun = parse_command(command.command);

    if (fun == NULL)
        return -1;

    return fun(motors, command.span);
}

/**
 * Parse a Timed command and execute it
 * execute the comamnd during the given `duration` parameter of the command
 * @param command: the command to execute
 * @param motors: the motors object
 * @return 0 if success, 1 if error, -1 if command not found
 */
int command(armwar_TimedCommand command, Motors& motors)
{
    func fun = parse_command(command.command);
    int nb_degree = 1;

    if (fun == NULL)
        return -1;

    std::thread([command, motors, fun]() mutable {
        int start = millis();
        int current = millis();

        while (current - start < command.duration)
        {
            // mutex.lock();
            fun(motors, 1);
            // mutex.unlock();

            delay(SERVO_SPEED);

            current = millis();
        }
    }).detach();

    return 0;
}
