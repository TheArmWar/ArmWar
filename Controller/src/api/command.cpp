#include "command.hpp"

Thread stated_thread;

/**
 * Execute a command
 * @param func: the function pointer to the command to execute
 * @param pwm: the pwm object
 * @param nb_degree: the number of degrees to rotate
*/
int exec_command(int (*func) (Adafruit_PWMServoDriver, int), Adafruit_PWMServoDriver pwm, int nb_degree)
{
    while (1) {
        if (stated_thread.stop) {
            return 0;
        }
        if (func(pwm, nb_degree) == 1)
        {
            printf("Error while executing command\n");
            return 1;
        }
    }
}

int command(armwar_StatedCommand command, Adafruit_PWMServoDriver pwm)
{
    int (*func) (Adafruit_PWMServoDriver, int);
    if (parse_command(command.command, func) == -1)
    {
        printf("Command not found\n");
        return -1;
    }

    if (command.start) {
        stated_thread.SetName("test");
        stated_thread.SetThread(std::thread(exec_command, func, pwm, 1));
    }
    else {
        stated_thread.stop = true;
        stated_thread.t1.join();
    }
}

int command(armwar_SpannedCommand command, Adafruit_PWMServoDriver pwm)
{
    int (*func) (Adafruit_PWMServoDriver, int);
    if (parse_command(command.command, func) == -1)
    {
        printf("Command not found\n");
        return -1;
    }

    if (func(pwm, command.span) == 1)
    {
        printf("Error while executing command\n");
        return 1;
    }
}

int command(armwar_TimedCommand command, Adafruit_PWMServoDriver pwm)
{
    int (*func) (Adafruit_PWMServoDriver, int);
    if (parse_command(command.command, func) == -1)
    {
        printf("Command not found\n");
        return -1;
    }
    int nb_degree = 1;
    std::time_t start_time = std::time(nullptr);
    while (std::time(nullptr) - start_time < command.duration)
    {
        if (func(pwm, nb_degree) == 1)
        {
            printf("Error while executing command\n");
            return 1;
        }
    }
}
