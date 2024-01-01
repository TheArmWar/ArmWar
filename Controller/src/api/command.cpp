#include "command.hpp"

Thread stated_thread;

/**
 * Execute a command
 * @param func: the function pointer to the command to execute
 * @param pwm: the pwm object
 * @param nb_degree: the number of degrees to rotate
*/
int exec_command(func fun, Adafruit_PWMServoDriver pwm, int nb_degree)
{
    while (1) {
        if (stated_thread.stop) {
            return 0;
        }
        if (fun(pwm, nb_degree) == 1)
        {
            printf("Error while executing command\n");
            return 1;
        }
    }
}

int command(armwar_StatedCommand command, Adafruit_PWMServoDriver pwm)
{
    func fun;
    if (parse_command(command.command) == NULL)
    {
        printf("Command not found\n");
        return -1;
    }

    if (command.start) {
        stated_thread.SetName("test");
        stated_thread.SetThread(std::thread(exec_command, fun, pwm, 1));
    }
    else {
        stated_thread.stop = true;
        stated_thread.t1.join();
    }
}

int command(armwar_SpannedCommand command, Adafruit_PWMServoDriver pwm)
{
    func fun;
    if (parse_command(command.command) == NULL)
    {
        printf("Command not found\n");
        return -1;
    }

    if (fun(pwm, command.span) == 1)
    {
        printf("Error while executing command\n");
        return 1;
    }
}

/**
 * Execute a command for a given duration
 * Parse the time and transform it in number of execution
*/
int command(armwar_TimedCommand command, Adafruit_PWMServoDriver pwm)
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
        if (fun(pwm, nb_degree) == 1)
        {
            printf("Error while executing command\n");
            return 1;
        }
    }
    return 0;
}
