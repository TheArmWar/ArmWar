#include <Adafruit_PWMServoDriver.h>
#include "../server/armwar.pb.h"

/**
 * Rotate every motor to the middle position
 * @param pwm: the pwm object
 * @return 0 if success, 1 if error
*/
int basePos(Adafruit_PWMServoDriver pwm);

/**
 * Rotate the first motor by *nb_degree* degrees
 * @param pwm: the pwm object
 * @param nb_degree: the number of degrees to rotate
 * @return 0 if success, 1 if error
*/
int left(Adafruit_PWMServoDriver pwm, int nb_degree);

/**
 * Rotate the first motor by *nb_degree* degrees
 * @param pwm: the pwm object
 * @param nb_degree: the number of degrees to rotate
 * @return 0 if success, 1 if error
*/
int right(Adafruit_PWMServoDriver pwm, int nb_degree);

/**
 * Rotate the second motor by *nb_degree* degrees
 * @param pwm: the pwm object
 * @param nb_degree: the number of degrees to rotate
 * @return 0 if success, 1 if error
*/
int up(Adafruit_PWMServoDriver pwm, int nb_degree);

/**
 * Rotate the second motor by - *nb_degree* degrees
 * @param pwm: the pwm object
 * @param nb_degree: the number of degrees to rotate
 * @return 0 if success, 1 if error
*/
int down(Adafruit_PWMServoDriver pwm, int nb_degree);

/**
 * Move the arm forward
 * @param pwm: the pwm object
 * @return 0 if success, 1 if error
*/
int forward(Adafruit_PWMServoDriver pwm);

/**
 * Move the arm backward
 * @param pwm: the pwm object
 * @return 0 if success, 1 if error
*/
int backward(Adafruit_PWMServoDriver pwm);

/**
 * Rotate the fourth motor by *nb_degree* degrees
 * @param pwm: the pwm object
 * @param nb_degree: the number of degrees to rotate
 * @return 0 if success, 1 if error
*/
int rotate_cw(Adafruit_PWMServoDriver pwm, int nb_degree);

/**
 * Rotate the fourth motor by - *nb_degree* degrees
 * @param pwm: the pwm object
 * @param nb_degree: the number of degrees to rotate
 * @return 0 if success, 1 if error
*/
int rotate_ccw(Adafruit_PWMServoDriver pwm, int nb_degree);

/**
 * Rotate the fifth motor by - *nb_degree* degrees
 * @param pwm: the pwm object
 * @param nb_degree: the number of degrees to rotate
 * @return 0 if success, 1 if error
*/
int grab(Adafruit_PWMServoDriver pwm, int nb_degree);

/**
 * Rotate the fifth motor by *nb_degree* degrees
 * @param pwm: the pwm object
 * @param nb_degree: the number of degrees to rotate
 * @return 0 if success, 1 if error
*/
int release(Adafruit_PWMServoDriver pwm, int nb_degree);

/**
 * Parse a Stated command and execute it
 * @param command: the command to execute
 * @param pwm: the pwm object
 * @return 0 if success, 1 if error, -1 if command not found
*/
int command(armwar_StatedCommand command, Adafruit_PWMServoDriver pwm);

/**
 * Parse a Timed command and execute it
 * @param command: the command to execute
 * @param pwm: the pwm object
 * @return 0 if success, 1 if error, -1 if command not found
*/
int command(armwar_TimedCommand command, Adafruit_PWMServoDriver pwm);

/**
 * For stated command
 * Create a thread, call a function with infinite while loop, exec the movement each x ms
 * when start turns false, stop the thread
 * @param command: the command to execute
 * @param pwm: the pwm object
*/
int command(armwar_SpannedCommand command, Adafruit_PWMServoDriver pwm);
