#include "command.hpp"

#include <thread>
#include <vector>

#include "../config/config.hpp"

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
    static std::thread thread;

    func fun = parse_command(command.command);

    if (fun == NULL)
        return -1;

    if (command.start)
    {
        if (thread.joinable())
        {
            Serial.println("Thread is already started");
        }
        else
        {
            thread = std::thread([command, &motors, fun]() mutable {
                Motors::Status status = Motors::Status::SUCCESS;

                while (status != Motors::Status::CANCEL)
                {
                    status = fun(motors, 1);

                    delay(SERVO_SPEED);
                }
            });
        }
    }
    else
    {
        // Signal motors to stop
        motors.disable();

        if (thread.joinable())
        {
            thread.join();
        }
        else
        {
            Serial.println("Thread is not joinable");
        }

        // Enable back the motors
        motors.enable();
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

    std::thread([command, &motors, fun]() mutable {
        int start = millis();
        int current = millis();
        Motors::Status status = Motors::Status::SUCCESS;

        while (current - start < command.duration)
        {
            status = fun(motors, 1);
            // If motors are disabled, command should stop
            if (status == Motors::Status::CANCEL)
            {
                break;
            }

            delay(SERVO_SPEED);

            current = millis();
        }
    }).detach();

    return 0;
}

/**
 * Parse a Timed Sequence command and execute each the command during the given
 * duration of each command.
 * @param sequence: The commands to execute
 * @param motors: the motors object
 * @return 0 if success, 1 if error, -1 if command not found
 */
int command(std::vector<armwar_TimedCommand> sequence, Motors& motors)
{
    std::thread([sequence, motors]() mutable {
        for (armwar_TimedCommand command : sequence)
        {
            func fun = parse_command(command.command);
            int start = millis();
            int current = millis();

            while (current - start < command.duration)
            {
                fun(motors, 1);

                delay(SERVO_SPEED);

                current = millis();
            }
        }
    }).detach();

    return 0;
}

/**
 * Parse a Span Sequence command and execute each the command during the given
 * duration of each command.
 * @param sequence: The commands to execute
 * @param motors: the motors object
 * @return 0 if success, 1 if error, -1 if command not found
 */
int command(std::vector<armwar_SpannedCommand> sequence, Motors& motors)
{
    std::thread([sequence, motors]() mutable {
        for (armwar_SpannedCommand command : sequence)
        {
            func fun = parse_command(command.command);

            if (fun == NULL)
                return -1;

            fun(motors, command.span);
        }
    }).detach();

    return 0;
}
