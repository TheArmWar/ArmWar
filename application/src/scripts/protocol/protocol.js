/* Imports */
import { load } from "protobufjs";

/**
 * @enum CommandType
 * List of the possible commands (enum)
 */
export const CommandType = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
  Forward: 4,
  Backward: 5,
  RotateCw: 6,
  RotateCcw: 7,
  Grab: 8,
  Release: 9,
};

/**
 * @enum MessageType
 * List of the different protobuf messages (enum)
 */
export const MessageType = {
  CommandResponse: { id: 0, str: "CommandResponse" },
  ArmState: { id: 1, str: "ArmState" },
  ArmAvailability: { id: 2, str: "ArmAvailability" },
  Connect: { id: 3, str: "Connect" },
  Disconnect: { id: 4, str: "Disconnect" },
  TimedCommand: { id: 5, str: "TimedCommand" },
  TimedCommandSequence: { id: 6, str: "TimedCommandSequence" },
  StatedCommand: { id: 7, str: "StatedCommand" },
  SpannedCommand: { id: 8, str: "SpannedCommand" },
  SpannedCommandSequence: { id: 9, str: "SpannedCommandSequence" },
  ArmCommand: { id: 10, str: "ArmCommand" },
  Demo: { id: 11, str: "Demo" },
};

/**
 * @class Protocol
 * Responsible to encode & decode messages with the protocol
 */
export class Protocol {
  /* Private fields */
  #protobuf; /* Protobuf instance */
  #messages; /* List of the different protobuf protocol messages */
  #uint8Encoder; /* Encoder as protobuf uses uint8 to encode & decode */

  /**
   * @constructor
   * Shouldn't be used to instantiate the class. Should use load static factory
   * constructor instead. (Consider this constructor as private)
   * @param {Object} protobuf Loaded protobuf instance
   * @param {String} protocolPath path of the protocol file (ie xxx.proto)
   */
  constructor(protobuf, protocolPath) {
    /* Retrieves protocol name through the given path to be able to build
       the message names */
    const splittedPath = protocolPath.split("/");
    const protocolName = splittedPath[splittedPath.length - 1].split(".")[0];

    this.protobuf = protobuf;
    this.messages = [];

    /* Retrieves the messages from the protocol file */
    for (var messageType in MessageType) {
      const messageName = protocolName + "." + messageType;
      const message = this.protobuf.lookupType(messageName);
      this.messages.push(message);
    }

    this.uint8Encoder = new TextEncoder();
  }

  /**
   * @static @async @constructor
   * Static factory constructor that should be used to instantiate the class
   * @param {String} protocolPath path of the protocol file (ie xxx.proto)
   * @returns Protocol
   */
  static async load(protocolPath) {
    // - Process async
    const protobuf = await load(protocolPath);

    // - Call the constructor
    return new Protocol(protobuf, protocolPath);
  }

  /**
   * @private @method
   * Find in messages array the message matching messageType or throw an error
   * @param {@enum MessageType} messageType
   * @returns Protobuf message
   */
  #getMessage(messageType) {
    /* Check if the messageType exists */
    if (messageType >= Object.keys(messageType).length) {
      throw new Error(
        "Invalid argument, messageType" + messageType.str + "does not exists",
      );
    }

    /* Return the matching message */
    return this.messages[messageType.id];
  }

  /**
   * @method
   * Encode a message
   * @param {@enum MessageType} messageType Type of message from protocol
   * @param {Object} object Object satisfying the messageType structure
   * @throws Error if messageType is wrong or object doesn't satisfy messageType
   * @returns Uint8Array
   */
  encode(messageType, object) {
    /* Gets the matching message */
    const message = this.#getMessage(messageType);

    /* Checks object validity depending on the messageType */
    if (message.verify(object)) {
      throw new Error(
        "Invalid argument, given object doesn't satisfy message " +
          messageType.str,
      );
    }

    /* Create the payload (not encoded) of the object */
    const payload = message.create(object);

    /* Returns the encoded payload */
    return message.encode(payload).finish();
  }

  /**
   * @method
   * Decode a message
   * @param {@enum MessageType} messageType Type of message from protocol
   * @param {String} payload Encoded paylod of messageType
   * @throws Error if messageType is wrong
   * @returns Decoded object
   */
  decode(messageType, payload) {
    /* Gets the matching message */
    const message = this.#getMessage(messageType);

    /* Encode the payload as Uint8 to be decoded by protobuf */
    const uint8Message = this.uint8Encoder.encode(payload);

    /* Return the decoded message */
    return message.decode(uint8Message);
  }
}
