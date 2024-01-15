#pragma once

#include "../server/armwar.pb.h"
#include "motors.hpp"

/**
 * Function types
 */
typedef Motors::Status (*func)(Motors&, int);
typedef func (*pm)();

/**
 * Rotate every motor to the middle position
 * @param motors: the motors object
 * @return 0 if success, 1 if error, 2 if motors disabled
 */
Motors::Status mid(Motors& motors);

/**
 * Set the base position to the actual position
 * @param motors: the motors object
 * @param discarded: unused
 * @return 0 if success, 1 if error, 2 if motors disabled
 */
Motors::Status set(Motors& motors, int discarded);

/**
 * Reset the position of the motors to the base position
 * @param motors: the motors object
 * @param discarded: unused
 * @return 0 if success, 1 if error, 2 if motors disabled
 */
Motors::Status reset(Motors& motors, int discarded);

/**
 * Rotate the first motor by *nb_degree* degrees
 * @param motors: the motors object
 * @param nb_degree: the number of degrees to rotate
 * @return 0 if success, 1 if error, 2 if motors disabled
 */
Motors::Status left(Motors& motors, int nb_degree);

/**
 * Rotate the first motor by *nb_degree* degrees
 * @param motors: the motors object
 * @param nb_degree: the number of degrees to rotate
 * @return 0 if success, 1 if error, 2 if motors disabled
 */
Motors::Status right(Motors& motors, int nb_degree);

/**
 * Rotate the second motor by *nb_degree* degrees
 * @param motors: the motors object
 * @param nb_degree: the number of degrees to rotate
 * @return 0 if success, 1 if error, 2 if motors disabled
 */
Motors::Status up(Motors& motors, int nb_degree);

/**
 * Rotate the second motor by - *nb_degree* degrees
 * @param motors: the motors object
 * @param nb_degree: the number of degrees to rotate
 * @return 0 if success, 1 if error, 2 if motors disabled
 */
Motors::Status down(Motors& motors, int nb_degree);

/**
 * Move the arm forward
 * @param motors: the motors object
 * @return 0 if success, 1 if error, 2 if motors disabled
 */
Motors::Status forward(Motors& motors, int nb_degree);

/**
 * Move the arm backward
 * @param motors: the motors object
 * @return 0 if success, 1 if error, 2 if motors disabled
 */
Motors::Status backward(Motors& motors, int nb_degree);

/**
 * Rotate the fourth motor by *nb_degree* degrees
 * @param motors: the motors object
 * @param nb_degree: the number of degrees to rotate
 * @return 0 if success, 1 if error, 2 if motors disabled
 */
Motors::Status rotate_cw(Motors& motors, int nb_degree);

/**
 * Rotate the fourth motor by - *nb_degree* degrees
 * @param motors: the motors object
 * @param nb_degree: the number of degrees to rotate
 * @return 0 if success, 1 if error, 2 if motors disabled
 */
Motors::Status rotate_ccw(Motors& motors, int nb_degree);

/**
 * Rotate the fifth motor by - *nb_degree* degrees
 * @param motors: the motors object
 * @param nb_degree: the number of degrees to rotate
 * @return 0 if success, 1 if error, 2 if motors disabled
 */
Motors::Status grab(Motors& motors, int nb_degree);

/**
 * Rotate the fifth motor by *nb_degree* degrees
 * @param motors: the motors object
 * @param nb_degree: the number of degrees to rotate
 * @return 0 if success, 1 if error, 2 if motors disabled
 */
Motors::Status release(Motors& motors, int nb_degree);

/**
 * Tells any command to stop
 * @param motors: the motors object
 * @param discarded: unused
 * @return (discarded)
 */
Motors::Status stop(Motors& motors, int discarded);

/**
 * Parse a command and gets its function pointer
 * @param command: the command to parse
 * @param name: the name of the command
 * @return 0 if success, 1 if error, -1 if command not found
 */
func parse_command(armwar_Command command);
