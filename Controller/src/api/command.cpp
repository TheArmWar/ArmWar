#include "command.hpp"

Thread stated_thread;

/**
 * Execute a command
 * @param func: the function pointer to the command to execute
 * @param motors: the motors object
 * @param nb_degree: the number of degrees to rotate
 */
int exec_command(func fun, Motors motors, int nb_degree)
{
    while (1)
    {
        if (stated_thread.stop)
        {
            return 0;
        }
        if (fun(motors, nb_degree) == 1)
        {
            printf("Error while executing command\n");
            return 1;
        }
    }
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
    func fun;
    if (parse_command(command.command) == NULL)
    {
        printf("Command not found\n");
        return -1;
    }

    if (command.start)
    {
        stated_thread.SetName("test");
        stated_thread.SetThread(std::thread(exec_command, fun, motors, 1));
    }
    else
    {
        stated_thread.stop = true;
        stated_thread.t1.join();
    }
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
    func fun;
    if (parse_command(command.command) == NULL)
    {
        printf("Command not found\n");
        return -1;
    }

    if (fun(motors, command.span) == 1)
    {
        printf("Error while executing command\n");
        return 1;
    }
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
    Serial.println("Timed command");
    func fun;
    fun = parse_command(command.command);
    if (parse_command(command.command) == NULL)
    {
        printf("Command not found\n");
        return -1;
    }
    int nb_degree = 1;
    int nb_exec = command.duration * 5;
    for (int i = 0; i < nb_exec; i++)
    {
        if (fun(motors, nb_degree) == 1)
        {
            printf("Error while executing command\n");
            return 1;
        }
    }
    return 0;
}
