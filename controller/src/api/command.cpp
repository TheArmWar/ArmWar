#include "command.hpp"

#include "../config/config.hpp"
#include "threads.hpp"

/**
 * Execute a stated thread that will be stoped when notified
 * @param func: the function pointer to the command to execute
 * @param motors: the motors object
 * @param nb_degree: the number of degrees to rotate
 */
/*
int statedThread(func fun, Motors motors, int nb_degree)
{
    while (!stated_thread.stop)
    {
        if (fun(motors, nb_degree) == 1)
            return 1;

        delay(SERVO_SPEED);
    }

    return 0;
}
*/
/**
 * Execute a timed thread that will execute during a specific duration
 * @param func: the function pointer to the command to execute
 * @param motors: the motors object
 * @param nb_degree: the number of degrees to rotate
 */
int timedThread(func fun, Motors motors, int duration)
{
    int start = millis();
    int current = millis();

    while (current - start < duration)
    {
        if (fun(motors, 1) == 1)
            return 1;

        delay(SERVO_SPEED);

        current = millis();
    }

    return 0;
}
/**
 * Parse a Stated command and execute it
 * execute the command if the given `start` parameter of the command is true
 * otherwise, stop the command
 * @param command: the command to execute
 * @param motors: the motors object
 * @return 0 if success, 1 if error, -1 if command not found
 */
int command(armwar_StatedCommand command, Motors motors)
{
    static Thread* thread = nullptr;

    func fun = parse_command(command.command);

    if (fun == NULL)
        return -1;

    if (command.start)
    {
        thread = new Thread([=, command, motors, fun]() mutable {
            fun(motors, 1);
            delay(SERVO_SPEED);
        });
    }

    else
    {
        thread->stop();
        thread->join();

        free(thread);
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
int command(armwar_SpannedCommand command, Motors motors)
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
int command(armwar_TimedCommand command, Motors motors)
{
    Thread* thread = nullptr;

    func fun = parse_command(command.command);
    int nb_degree = 1;

    if (fun == NULL)
        return -1;

    thread = new Thread([=, command, motors, fun]() mutable {
        int start = millis();
        int current = millis();

        while (current - start < command.duration)
        {
            fun(motors, 1);

            delay(SERVO_SPEED);

            current = millis();
        }
    });

    thread->stop();
    thread->join();

    free(thread);

    return 0;
}
