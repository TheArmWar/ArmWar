#pragma once

#include <vector>

#include "api.hpp"
#include "motors.hpp"

/**
 * Parse a Stated command and execute it
 * execute the command if the given `start` parameter of the command is
 * true otherwise, stop the command
 * @param command: the command to execute
 * @param motors: the motors object
 * @return 0 if success, 1 if error, -1 if command not found
 */
int command(armwar_StatedCommand command, Motors& motors);

/**
 * Parse a Spanned command and execute it
 * execute the command with the given `span` parameter of the command
 * @param command: the command to execute
 * @param motors: the motors object
 * @return 0 if success, 1 if error, -1 if command not found
 */
int command(armwar_SpannedCommand command, Motors& motors);

/**
 * Parse a Timed command and execute it
 * execute the comamnd during the given `duration` parameter of the command
 * @param command: the command to execute
 * @param motors: the motors object
 * @return 0 if success, 1 if error, -1 if command not found
 */
int command(armwar_TimedCommand command, Motors& motors);

/**
 * Parse a Timed Sequence command and execute each the command during the given
 * duration of each command.
 * @param sequence: The commands to execute
 * @param motors: the motors object
 * @param busy: Reference to a boolean that is set to false when the sequence
 * ends.
 * @return 0 if success, 1 if error, -1 if command not found
 */
int command(std::vector<armwar_TimedCommand> sequence, Motors& motors,
            bool& busy);

/**
 * Parse a Span Sequence command and execute each the command during the
 * given duration of each command.
 * @param sequence: The commands to execute
 * @param motors: the motors object
 * @param busy: Reference to a boolean that is set to false when the sequence
 * ends.
 * @return 0 if success, 1 if error, -1 if command not found
 */
int command(std::vector<armwar_SpannedCommand> sequence, Motors& motors,
            bool& busy);
