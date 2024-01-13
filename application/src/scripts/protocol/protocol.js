/* Imports */
import { armwar } from "./armwar.js";

/**
 * @function _buildTimedCommand
 * @param {armwar.Command} command
 * @param {int} duration
 * @returns armwar.TimedCommand
 */
function _buildTimedCommand(command, duration) {
  return armwar.TimedCommand.create({
    command: command,
    duration: duration,
  });
}

/**
 * @function _buildStatedCommand
 * @param {armwar.Command} command
 * @param {boolean} start
 * @returns armwar.StatedCommand
 */
function _buildStatedCommand(command, start) {
  return armwar.StatedCommand.create({
    command: command,
    start: start,
  });
}

/**
 *
 * @param {String} type of one of the possible ArmCommand
 * @param {armwar.[TimedCommand, StatedCommand, TimedSequence]} value (an armwar payload)
 * @returns Uint8Array of bytes (payload) that contains an ArmCommand wrapping a command.
 */
function _encodeArmCommand(type, value) {
  const armCommand = armwar.ArmCommand.create({ [type]: value });

  return armwar.ArmCommand.encode(armCommand).finish();
}

/**
 * @function buildTimedCommand
 * @param {armwar.Command} command
 * @param {int} duration duration in ms
 * @returns Uint8Array of bytes (encoded payload) containing an ArmCommand that wraps a TimedCommand
 */
export function buildTimedCommand(command, duration) {
  const timedCommand = _buildTimedCommand(command, duration);

  return _encodeArmCommand("timedCommand", timedCommand);
}

/**
 * @function buildStatedCommand
 * @param {armwar.Command} command
 * @param {uint8_t} start (0 = stop) (1 = start)
 * @returns Uint8Array of bytes (encoded payload) containing an ArmCommand that wraps a StatedCommand
 */
export function buildStatedCommand(command, start) {
  const statedCommand = _buildStatedCommand(command, start);

  return _encodeArmCommand("statedCommand", statedCommand);
}

/**
 * @function buildTimedSequence
 * @param {Array<armwar.Command>} commands
 * @param {Array<uint8_t>} durations
 * @returns Uint8Array of bytes (encoded payload) containing an ArmCommand that wraps a TimedSequence
 */
export function buildTimedSequence(commands, durations) {
  let timedCommands = [];

  for (let i = 0; i < commands.length; i++) {
    timedCommands.push(_buildTimedCommand(commands[i], durations[i]));
  }

  const timedSequence = armwar.TimedCommandSequence.create({
    command: timedCommands,
  });

  return _encodeArmCommand("timedSequence", timedSequence);
}

/**
 * @function buildConnectCommand
 * @returns Uint8Array of bytes (encoded payload) that wraps a Connect command
 */
export function buildConnectCommand() {
  const connectCommand = armwar.Connect.create({ connect: true });

  return armwar.Connect.encode(connectCommand).finish();
}

/**
 * @function buildDisconnectCommand
 * @returns Uint8Array of bytes (encoded payload) that wraps a disconnect command
 */
export function buildDisconnectCommand() {
  const disconnectCommand = armwar.Disconnect.create({ disconnect: true });

  return armwar.Disconnect.encode(disconnectCommand).finish();
}

/**
 * @function decodeResponse
 * @param {Uint8Array} payload Encoded Command Response to decode
 * @returns armwar.CommandResponse
 */
export function decodeResponse(payload) {
  return armwar.CommandResponse.decode(payload);
}
