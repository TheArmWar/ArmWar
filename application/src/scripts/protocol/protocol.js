/* Imports */
import { armwar } from "./armwar.js";

/**
 * @function buildTimedCommand
 * @param {armwar.Command} command
 * @param {int} duration duration in ms
 * @returns armwar.ArmCommand
 */
export function buildTimedCommand(command, duration) {
  const timedCommand = armwar.TimedCommand.create({
    command: command,
    duration: duration,
  });

  const armCommand = armwar.ArmCommand.create({
    timedCommand: timedCommand,
  });

  return armCommand;
}

/**
 * @function buildStatedCommand
 * @param {armwar.Command} command
 * @param {uint8_t} start (0 = stop) (1 = start)
 * @returns armwar.ArmCommand
 */
export function buildStatedCommand(command, start) {
  const statedCommand = armwar.StatedCommand.create({
    command: command,
    start: start,
  });

  const armCommand = armwar.ArmCommand.create({
    statedCommand: statedCommand,
  });

  return armCommand;
}

/**
 * @function encodeCommand
 * @param {armwar.ArmCommand} payload (containing a statedCommand or a TimedCommand)
 * @returns byte array
 */
export function encodeCommand(payload) {
  return armwar.ArmCommand.encode(payload).finish();
}

/**
 * @function decodeResponse
 * @param {Uint8Array} payload Encoded Command Response to decode
 * @returns armwar.CommandResponse
 */
export function decodeResponse(payload) {
  return armwar.CommandResponse.decode(payload);
}
