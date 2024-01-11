/* Imports */
import { load } from "protobufjs";
import { armwar } from "./armwar.js";

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

export function encodeCommand(payload) {
  return armwar.ArmCommand.encode(payload).finish();
}

export function decodeResponse(payload) {
  return armwar.CommandResponse.decode(payload);
}

function encodeSequence(payload) {
  return;
}
