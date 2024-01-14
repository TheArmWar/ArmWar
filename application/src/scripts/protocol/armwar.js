/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader,
  $Writer = $protobuf.Writer,
  $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const armwar = ($root.armwar = (() => {
  /**
   * Namespace armwar.
   * @exports armwar
   * @namespace
   */
  const armwar = {};

  /**
   * A list of commands that can be sent to the arm.
   * @name armwar.Command
   * @enum {number}
   * @property {number} UP=0 UP value
   * @property {number} DOWN=1 DOWN value
   * @property {number} LEFT=2 LEFT value
   * @property {number} RIGHT=3 RIGHT value
   * @property {number} FORWARD=4 FORWARD value
   * @property {number} BACKWARD=5 BACKWARD value
   * @property {number} ROTATE_CW=6 ROTATE_CW value
   * @property {number} ROTATE_CCW=7 ROTATE_CCW value
   * @property {number} GRAB=8 GRAB value
   * @property {number} RELEASE=9 RELEASE value
   * @property {number} SET=10 SET value
   * @property {number} RESET=11 RESET value
   * @property {number} STOP=12 STOP value
   */
  armwar.Command = (function () {
    const valuesById = {},
      values = Object.create(valuesById);
    values[(valuesById[0] = "UP")] = 0;
    values[(valuesById[1] = "DOWN")] = 1;
    values[(valuesById[2] = "LEFT")] = 2;
    values[(valuesById[3] = "RIGHT")] = 3;
    values[(valuesById[4] = "FORWARD")] = 4;
    values[(valuesById[5] = "BACKWARD")] = 5;
    values[(valuesById[6] = "ROTATE_CW")] = 6;
    values[(valuesById[7] = "ROTATE_CCW")] = 7;
    values[(valuesById[8] = "GRAB")] = 8;
    values[(valuesById[9] = "RELEASE")] = 9;
    values[(valuesById[10] = "SET")] = 10;
    values[(valuesById[11] = "RESET")] = 11;
    values[(valuesById[12] = "STOP")] = 12;
    return values;
  })();

  armwar.CommandResponse = (function () {
    /**
     * Properties of a CommandResponse.
     * @memberof armwar
     * @interface ICommandResponse
     * @property {boolean|null} [success] CommandResponse success
     * @property {string|null} [message] CommandResponse message
     */

    /**
     * Constructs a new CommandResponse.
     * @memberof armwar
     * @classdesc A message containing the response to a command.
     * @implements ICommandResponse
     * @constructor
     * @param {armwar.ICommandResponse=} [properties] Properties to set
     */
    function CommandResponse(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * CommandResponse success.
     * @member {boolean} success
     * @memberof armwar.CommandResponse
     * @instance
     */
    CommandResponse.prototype.success = false;

    /**
     * CommandResponse message.
     * @member {string} message
     * @memberof armwar.CommandResponse
     * @instance
     */
    CommandResponse.prototype.message = "";

    /**
     * Creates a new CommandResponse instance using the specified properties.
     * @function create
     * @memberof armwar.CommandResponse
     * @static
     * @param {armwar.ICommandResponse=} [properties] Properties to set
     * @returns {armwar.CommandResponse} CommandResponse instance
     */
    CommandResponse.create = function create(properties) {
      return new CommandResponse(properties);
    };

    /**
     * Encodes the specified CommandResponse message. Does not implicitly {@link armwar.CommandResponse.verify|verify} messages.
     * @function encode
     * @memberof armwar.CommandResponse
     * @static
     * @param {armwar.ICommandResponse} message CommandResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CommandResponse.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (
        message.success != null &&
        Object.hasOwnProperty.call(message, "success")
      )
        writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.success);
      if (
        message.message != null &&
        Object.hasOwnProperty.call(message, "message")
      )
        writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.message);
      return writer;
    };

    /**
     * Encodes the specified CommandResponse message, length delimited. Does not implicitly {@link armwar.CommandResponse.verify|verify} messages.
     * @function encodeDelimited
     * @memberof armwar.CommandResponse
     * @static
     * @param {armwar.ICommandResponse} message CommandResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CommandResponse.encodeDelimited = function encodeDelimited(
      message,
      writer,
    ) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CommandResponse message from the specified reader or buffer.
     * @function decode
     * @memberof armwar.CommandResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {armwar.CommandResponse} CommandResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CommandResponse.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.armwar.CommandResponse();
      while (reader.pos < end) {
        let tag = reader.uint32();
        switch (tag >>> 3) {
          case 1: {
            message.success = reader.bool();
            break;
          }
          case 2: {
            message.message = reader.string();
            break;
          }
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes a CommandResponse message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof armwar.CommandResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {armwar.CommandResponse} CommandResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CommandResponse.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CommandResponse message.
     * @function verify
     * @memberof armwar.CommandResponse
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CommandResponse.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.success != null && message.hasOwnProperty("success"))
        if (typeof message.success !== "boolean")
          return "success: boolean expected";
      if (message.message != null && message.hasOwnProperty("message"))
        if (!$util.isString(message.message)) return "message: string expected";
      return null;
    };

    /**
     * Creates a CommandResponse message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof armwar.CommandResponse
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {armwar.CommandResponse} CommandResponse
     */
    CommandResponse.fromObject = function fromObject(object) {
      if (object instanceof $root.armwar.CommandResponse) return object;
      let message = new $root.armwar.CommandResponse();
      if (object.success != null) message.success = Boolean(object.success);
      if (object.message != null) message.message = String(object.message);
      return message;
    };

    /**
     * Creates a plain object from a CommandResponse message. Also converts values to other types if specified.
     * @function toObject
     * @memberof armwar.CommandResponse
     * @static
     * @param {armwar.CommandResponse} message CommandResponse
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CommandResponse.toObject = function toObject(message, options) {
      if (!options) options = {};
      let object = {};
      if (options.defaults) {
        object.success = false;
        object.message = "";
      }
      if (message.success != null && message.hasOwnProperty("success"))
        object.success = message.success;
      if (message.message != null && message.hasOwnProperty("message"))
        object.message = message.message;
      return object;
    };

    /**
     * Converts this CommandResponse to JSON.
     * @function toJSON
     * @memberof armwar.CommandResponse
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CommandResponse.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for CommandResponse
     * @function getTypeUrl
     * @memberof armwar.CommandResponse
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    CommandResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = "type.googleapis.com";
      }
      return typeUrlPrefix + "/armwar.CommandResponse";
    };

    return CommandResponse;
  })();

  armwar.ArmState = (function () {
    /**
     * Properties of an ArmState.
     * @memberof armwar
     * @interface IArmState
     * @property {number|null} [x] ArmState x
     * @property {number|null} [y] ArmState y
     * @property {number|null} [z] ArmState z
     * @property {number|null} [roll] ArmState roll
     * @property {boolean|null} [isGrabbing] ArmState isGrabbing
     */

    /**
     * Constructs a new ArmState.
     * @memberof armwar
     * @classdesc A message containing the current state of the arm.
     * Used for debugging and visualization.
     * @implements IArmState
     * @constructor
     * @param {armwar.IArmState=} [properties] Properties to set
     */
    function ArmState(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * ArmState x.
     * @member {number} x
     * @memberof armwar.ArmState
     * @instance
     */
    ArmState.prototype.x = 0;

    /**
     * ArmState y.
     * @member {number} y
     * @memberof armwar.ArmState
     * @instance
     */
    ArmState.prototype.y = 0;

    /**
     * ArmState z.
     * @member {number} z
     * @memberof armwar.ArmState
     * @instance
     */
    ArmState.prototype.z = 0;

    /**
     * ArmState roll.
     * @member {number} roll
     * @memberof armwar.ArmState
     * @instance
     */
    ArmState.prototype.roll = 0;

    /**
     * ArmState isGrabbing.
     * @member {boolean} isGrabbing
     * @memberof armwar.ArmState
     * @instance
     */
    ArmState.prototype.isGrabbing = false;

    /**
     * Creates a new ArmState instance using the specified properties.
     * @function create
     * @memberof armwar.ArmState
     * @static
     * @param {armwar.IArmState=} [properties] Properties to set
     * @returns {armwar.ArmState} ArmState instance
     */
    ArmState.create = function create(properties) {
      return new ArmState(properties);
    };

    /**
     * Encodes the specified ArmState message. Does not implicitly {@link armwar.ArmState.verify|verify} messages.
     * @function encode
     * @memberof armwar.ArmState
     * @static
     * @param {armwar.IArmState} message ArmState message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ArmState.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (message.x != null && Object.hasOwnProperty.call(message, "x"))
        writer.uint32(/* id 1, wireType 5 =*/ 13).float(message.x);
      if (message.y != null && Object.hasOwnProperty.call(message, "y"))
        writer.uint32(/* id 2, wireType 5 =*/ 21).float(message.y);
      if (message.z != null && Object.hasOwnProperty.call(message, "z"))
        writer.uint32(/* id 3, wireType 5 =*/ 29).float(message.z);
      if (message.roll != null && Object.hasOwnProperty.call(message, "roll"))
        writer.uint32(/* id 4, wireType 5 =*/ 37).float(message.roll);
      if (
        message.isGrabbing != null &&
        Object.hasOwnProperty.call(message, "isGrabbing")
      )
        writer.uint32(/* id 5, wireType 0 =*/ 40).bool(message.isGrabbing);
      return writer;
    };

    /**
     * Encodes the specified ArmState message, length delimited. Does not implicitly {@link armwar.ArmState.verify|verify} messages.
     * @function encodeDelimited
     * @memberof armwar.ArmState
     * @static
     * @param {armwar.IArmState} message ArmState message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ArmState.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an ArmState message from the specified reader or buffer.
     * @function decode
     * @memberof armwar.ArmState
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {armwar.ArmState} ArmState
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ArmState.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.armwar.ArmState();
      while (reader.pos < end) {
        let tag = reader.uint32();
        switch (tag >>> 3) {
          case 1: {
            message.x = reader.float();
            break;
          }
          case 2: {
            message.y = reader.float();
            break;
          }
          case 3: {
            message.z = reader.float();
            break;
          }
          case 4: {
            message.roll = reader.float();
            break;
          }
          case 5: {
            message.isGrabbing = reader.bool();
            break;
          }
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes an ArmState message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof armwar.ArmState
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {armwar.ArmState} ArmState
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ArmState.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an ArmState message.
     * @function verify
     * @memberof armwar.ArmState
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ArmState.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.x != null && message.hasOwnProperty("x"))
        if (typeof message.x !== "number") return "x: number expected";
      if (message.y != null && message.hasOwnProperty("y"))
        if (typeof message.y !== "number") return "y: number expected";
      if (message.z != null && message.hasOwnProperty("z"))
        if (typeof message.z !== "number") return "z: number expected";
      if (message.roll != null && message.hasOwnProperty("roll"))
        if (typeof message.roll !== "number") return "roll: number expected";
      if (message.isGrabbing != null && message.hasOwnProperty("isGrabbing"))
        if (typeof message.isGrabbing !== "boolean")
          return "isGrabbing: boolean expected";
      return null;
    };

    /**
     * Creates an ArmState message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof armwar.ArmState
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {armwar.ArmState} ArmState
     */
    ArmState.fromObject = function fromObject(object) {
      if (object instanceof $root.armwar.ArmState) return object;
      let message = new $root.armwar.ArmState();
      if (object.x != null) message.x = Number(object.x);
      if (object.y != null) message.y = Number(object.y);
      if (object.z != null) message.z = Number(object.z);
      if (object.roll != null) message.roll = Number(object.roll);
      if (object.isGrabbing != null)
        message.isGrabbing = Boolean(object.isGrabbing);
      return message;
    };

    /**
     * Creates a plain object from an ArmState message. Also converts values to other types if specified.
     * @function toObject
     * @memberof armwar.ArmState
     * @static
     * @param {armwar.ArmState} message ArmState
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ArmState.toObject = function toObject(message, options) {
      if (!options) options = {};
      let object = {};
      if (options.defaults) {
        object.x = 0;
        object.y = 0;
        object.z = 0;
        object.roll = 0;
        object.isGrabbing = false;
      }
      if (message.x != null && message.hasOwnProperty("x"))
        object.x =
          options.json && !isFinite(message.x) ? String(message.x) : message.x;
      if (message.y != null && message.hasOwnProperty("y"))
        object.y =
          options.json && !isFinite(message.y) ? String(message.y) : message.y;
      if (message.z != null && message.hasOwnProperty("z"))
        object.z =
          options.json && !isFinite(message.z) ? String(message.z) : message.z;
      if (message.roll != null && message.hasOwnProperty("roll"))
        object.roll =
          options.json && !isFinite(message.roll)
            ? String(message.roll)
            : message.roll;
      if (message.isGrabbing != null && message.hasOwnProperty("isGrabbing"))
        object.isGrabbing = message.isGrabbing;
      return object;
    };

    /**
     * Converts this ArmState to JSON.
     * @function toJSON
     * @memberof armwar.ArmState
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ArmState.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for ArmState
     * @function getTypeUrl
     * @memberof armwar.ArmState
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    ArmState.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = "type.googleapis.com";
      }
      return typeUrlPrefix + "/armwar.ArmState";
    };

    return ArmState;
  })();

  armwar.ArmAvailability = (function () {
    /**
     * Properties of an ArmAvailability.
     * @memberof armwar
     * @interface IArmAvailability
     * @property {boolean|null} [available] ArmAvailability available
     * @property {armwar.IArmState|null} [state] ArmAvailability state
     */

    /**
     * Constructs a new ArmAvailability.
     * @memberof armwar
     * @classdesc A message to check the availability of the arm.
     * @implements IArmAvailability
     * @constructor
     * @param {armwar.IArmAvailability=} [properties] Properties to set
     */
    function ArmAvailability(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * ArmAvailability available.
     * @member {boolean} available
     * @memberof armwar.ArmAvailability
     * @instance
     */
    ArmAvailability.prototype.available = false;

    /**
     * ArmAvailability state.
     * @member {armwar.IArmState|null|undefined} state
     * @memberof armwar.ArmAvailability
     * @instance
     */
    ArmAvailability.prototype.state = null;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * ArmAvailability _state.
     * @member {"state"|undefined} _state
     * @memberof armwar.ArmAvailability
     * @instance
     */
    Object.defineProperty(ArmAvailability.prototype, "_state", {
      get: $util.oneOfGetter(($oneOfFields = ["state"])),
      set: $util.oneOfSetter($oneOfFields),
    });

    /**
     * Creates a new ArmAvailability instance using the specified properties.
     * @function create
     * @memberof armwar.ArmAvailability
     * @static
     * @param {armwar.IArmAvailability=} [properties] Properties to set
     * @returns {armwar.ArmAvailability} ArmAvailability instance
     */
    ArmAvailability.create = function create(properties) {
      return new ArmAvailability(properties);
    };

    /**
     * Encodes the specified ArmAvailability message. Does not implicitly {@link armwar.ArmAvailability.verify|verify} messages.
     * @function encode
     * @memberof armwar.ArmAvailability
     * @static
     * @param {armwar.IArmAvailability} message ArmAvailability message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ArmAvailability.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (
        message.available != null &&
        Object.hasOwnProperty.call(message, "available")
      )
        writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.available);
      if (message.state != null && Object.hasOwnProperty.call(message, "state"))
        $root.armwar.ArmState.encode(
          message.state,
          writer.uint32(/* id 2, wireType 2 =*/ 18).fork(),
        ).ldelim();
      return writer;
    };

    /**
     * Encodes the specified ArmAvailability message, length delimited. Does not implicitly {@link armwar.ArmAvailability.verify|verify} messages.
     * @function encodeDelimited
     * @memberof armwar.ArmAvailability
     * @static
     * @param {armwar.IArmAvailability} message ArmAvailability message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ArmAvailability.encodeDelimited = function encodeDelimited(
      message,
      writer,
    ) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an ArmAvailability message from the specified reader or buffer.
     * @function decode
     * @memberof armwar.ArmAvailability
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {armwar.ArmAvailability} ArmAvailability
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ArmAvailability.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.armwar.ArmAvailability();
      while (reader.pos < end) {
        let tag = reader.uint32();
        switch (tag >>> 3) {
          case 1: {
            message.available = reader.bool();
            break;
          }
          case 2: {
            message.state = $root.armwar.ArmState.decode(
              reader,
              reader.uint32(),
            );
            break;
          }
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes an ArmAvailability message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof armwar.ArmAvailability
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {armwar.ArmAvailability} ArmAvailability
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ArmAvailability.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an ArmAvailability message.
     * @function verify
     * @memberof armwar.ArmAvailability
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ArmAvailability.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      let properties = {};
      if (message.available != null && message.hasOwnProperty("available"))
        if (typeof message.available !== "boolean")
          return "available: boolean expected";
      if (message.state != null && message.hasOwnProperty("state")) {
        properties._state = 1;
        {
          let error = $root.armwar.ArmState.verify(message.state);
          if (error) return "state." + error;
        }
      }
      return null;
    };

    /**
     * Creates an ArmAvailability message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof armwar.ArmAvailability
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {armwar.ArmAvailability} ArmAvailability
     */
    ArmAvailability.fromObject = function fromObject(object) {
      if (object instanceof $root.armwar.ArmAvailability) return object;
      let message = new $root.armwar.ArmAvailability();
      if (object.available != null)
        message.available = Boolean(object.available);
      if (object.state != null) {
        if (typeof object.state !== "object")
          throw TypeError(".armwar.ArmAvailability.state: object expected");
        message.state = $root.armwar.ArmState.fromObject(object.state);
      }
      return message;
    };

    /**
     * Creates a plain object from an ArmAvailability message. Also converts values to other types if specified.
     * @function toObject
     * @memberof armwar.ArmAvailability
     * @static
     * @param {armwar.ArmAvailability} message ArmAvailability
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ArmAvailability.toObject = function toObject(message, options) {
      if (!options) options = {};
      let object = {};
      if (options.defaults) object.available = false;
      if (message.available != null && message.hasOwnProperty("available"))
        object.available = message.available;
      if (message.state != null && message.hasOwnProperty("state")) {
        object.state = $root.armwar.ArmState.toObject(message.state, options);
        if (options.oneofs) object._state = "state";
      }
      return object;
    };

    /**
     * Converts this ArmAvailability to JSON.
     * @function toJSON
     * @memberof armwar.ArmAvailability
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ArmAvailability.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for ArmAvailability
     * @function getTypeUrl
     * @memberof armwar.ArmAvailability
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    ArmAvailability.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = "type.googleapis.com";
      }
      return typeUrlPrefix + "/armwar.ArmAvailability";
    };

    return ArmAvailability;
  })();

  armwar.Connect = (function () {
    /**
     * Properties of a Connect.
     * @memberof armwar
     * @interface IConnect
     * @property {boolean|null} [connect] Connect connect
     * @property {number|null} [timeout] Connect timeout
     */

    /**
     * Constructs a new Connect.
     * @memberof armwar
     * @classdesc A message to connect to the arm.
     * To prevent multiple clients from connecting to the arm at the same time,
     * the arm will then only accept commands from the current client.
     * @implements IConnect
     * @constructor
     * @param {armwar.IConnect=} [properties] Properties to set
     */
    function Connect(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * Connect connect.
     * @member {boolean} connect
     * @memberof armwar.Connect
     * @instance
     */
    Connect.prototype.connect = false;

    /**
     * Connect timeout.
     * @member {number|null|undefined} timeout
     * @memberof armwar.Connect
     * @instance
     */
    Connect.prototype.timeout = null;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * Connect _timeout.
     * @member {"timeout"|undefined} _timeout
     * @memberof armwar.Connect
     * @instance
     */
    Object.defineProperty(Connect.prototype, "_timeout", {
      get: $util.oneOfGetter(($oneOfFields = ["timeout"])),
      set: $util.oneOfSetter($oneOfFields),
    });

    /**
     * Creates a new Connect instance using the specified properties.
     * @function create
     * @memberof armwar.Connect
     * @static
     * @param {armwar.IConnect=} [properties] Properties to set
     * @returns {armwar.Connect} Connect instance
     */
    Connect.create = function create(properties) {
      return new Connect(properties);
    };

    /**
     * Encodes the specified Connect message. Does not implicitly {@link armwar.Connect.verify|verify} messages.
     * @function encode
     * @memberof armwar.Connect
     * @static
     * @param {armwar.IConnect} message Connect message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Connect.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (
        message.connect != null &&
        Object.hasOwnProperty.call(message, "connect")
      )
        writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.connect);
      if (
        message.timeout != null &&
        Object.hasOwnProperty.call(message, "timeout")
      )
        writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.timeout);
      return writer;
    };

    /**
     * Encodes the specified Connect message, length delimited. Does not implicitly {@link armwar.Connect.verify|verify} messages.
     * @function encodeDelimited
     * @memberof armwar.Connect
     * @static
     * @param {armwar.IConnect} message Connect message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Connect.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Connect message from the specified reader or buffer.
     * @function decode
     * @memberof armwar.Connect
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {armwar.Connect} Connect
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Connect.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.armwar.Connect();
      while (reader.pos < end) {
        let tag = reader.uint32();
        switch (tag >>> 3) {
          case 1: {
            message.connect = reader.bool();
            break;
          }
          case 2: {
            message.timeout = reader.int32();
            break;
          }
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes a Connect message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof armwar.Connect
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {armwar.Connect} Connect
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Connect.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Connect message.
     * @function verify
     * @memberof armwar.Connect
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Connect.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      let properties = {};
      if (message.connect != null && message.hasOwnProperty("connect"))
        if (typeof message.connect !== "boolean")
          return "connect: boolean expected";
      if (message.timeout != null && message.hasOwnProperty("timeout")) {
        properties._timeout = 1;
        if (!$util.isInteger(message.timeout))
          return "timeout: integer expected";
      }
      return null;
    };

    /**
     * Creates a Connect message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof armwar.Connect
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {armwar.Connect} Connect
     */
    Connect.fromObject = function fromObject(object) {
      if (object instanceof $root.armwar.Connect) return object;
      let message = new $root.armwar.Connect();
      if (object.connect != null) message.connect = Boolean(object.connect);
      if (object.timeout != null) message.timeout = object.timeout | 0;
      return message;
    };

    /**
     * Creates a plain object from a Connect message. Also converts values to other types if specified.
     * @function toObject
     * @memberof armwar.Connect
     * @static
     * @param {armwar.Connect} message Connect
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Connect.toObject = function toObject(message, options) {
      if (!options) options = {};
      let object = {};
      if (options.defaults) object.connect = false;
      if (message.connect != null && message.hasOwnProperty("connect"))
        object.connect = message.connect;
      if (message.timeout != null && message.hasOwnProperty("timeout")) {
        object.timeout = message.timeout;
        if (options.oneofs) object._timeout = "timeout";
      }
      return object;
    };

    /**
     * Converts this Connect to JSON.
     * @function toJSON
     * @memberof armwar.Connect
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Connect.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Connect
     * @function getTypeUrl
     * @memberof armwar.Connect
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Connect.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = "type.googleapis.com";
      }
      return typeUrlPrefix + "/armwar.Connect";
    };

    return Connect;
  })();

  armwar.Disconnect = (function () {
    /**
     * Properties of a Disconnect.
     * @memberof armwar
     * @interface IDisconnect
     * @property {boolean|null} [disconnect] Disconnect disconnect
     */

    /**
     * Constructs a new Disconnect.
     * @memberof armwar
     * @classdesc An explicit disconnect message.
     * This is not necessary, as the arm will automatically disconnect after a
     * certain amount of time without receiving commands. However, it is useful
     * to quickly free up the arm for other clients.
     * @implements IDisconnect
     * @constructor
     * @param {armwar.IDisconnect=} [properties] Properties to set
     */
    function Disconnect(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * Disconnect disconnect.
     * @member {boolean} disconnect
     * @memberof armwar.Disconnect
     * @instance
     */
    Disconnect.prototype.disconnect = false;

    /**
     * Creates a new Disconnect instance using the specified properties.
     * @function create
     * @memberof armwar.Disconnect
     * @static
     * @param {armwar.IDisconnect=} [properties] Properties to set
     * @returns {armwar.Disconnect} Disconnect instance
     */
    Disconnect.create = function create(properties) {
      return new Disconnect(properties);
    };

    /**
     * Encodes the specified Disconnect message. Does not implicitly {@link armwar.Disconnect.verify|verify} messages.
     * @function encode
     * @memberof armwar.Disconnect
     * @static
     * @param {armwar.IDisconnect} message Disconnect message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Disconnect.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (
        message.disconnect != null &&
        Object.hasOwnProperty.call(message, "disconnect")
      )
        writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.disconnect);
      return writer;
    };

    /**
     * Encodes the specified Disconnect message, length delimited. Does not implicitly {@link armwar.Disconnect.verify|verify} messages.
     * @function encodeDelimited
     * @memberof armwar.Disconnect
     * @static
     * @param {armwar.IDisconnect} message Disconnect message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Disconnect.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Disconnect message from the specified reader or buffer.
     * @function decode
     * @memberof armwar.Disconnect
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {armwar.Disconnect} Disconnect
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Disconnect.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.armwar.Disconnect();
      while (reader.pos < end) {
        let tag = reader.uint32();
        switch (tag >>> 3) {
          case 1: {
            message.disconnect = reader.bool();
            break;
          }
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes a Disconnect message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof armwar.Disconnect
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {armwar.Disconnect} Disconnect
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Disconnect.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Disconnect message.
     * @function verify
     * @memberof armwar.Disconnect
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Disconnect.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.disconnect != null && message.hasOwnProperty("disconnect"))
        if (typeof message.disconnect !== "boolean")
          return "disconnect: boolean expected";
      return null;
    };

    /**
     * Creates a Disconnect message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof armwar.Disconnect
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {armwar.Disconnect} Disconnect
     */
    Disconnect.fromObject = function fromObject(object) {
      if (object instanceof $root.armwar.Disconnect) return object;
      let message = new $root.armwar.Disconnect();
      if (object.disconnect != null)
        message.disconnect = Boolean(object.disconnect);
      return message;
    };

    /**
     * Creates a plain object from a Disconnect message. Also converts values to other types if specified.
     * @function toObject
     * @memberof armwar.Disconnect
     * @static
     * @param {armwar.Disconnect} message Disconnect
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Disconnect.toObject = function toObject(message, options) {
      if (!options) options = {};
      let object = {};
      if (options.defaults) object.disconnect = false;
      if (message.disconnect != null && message.hasOwnProperty("disconnect"))
        object.disconnect = message.disconnect;
      return object;
    };

    /**
     * Converts this Disconnect to JSON.
     * @function toJSON
     * @memberof armwar.Disconnect
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Disconnect.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Disconnect
     * @function getTypeUrl
     * @memberof armwar.Disconnect
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Disconnect.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = "type.googleapis.com";
      }
      return typeUrlPrefix + "/armwar.Disconnect";
    };

    return Disconnect;
  })();

  armwar.TimedCommand = (function () {
    /**
     * Properties of a TimedCommand.
     * @memberof armwar
     * @interface ITimedCommand
     * @property {armwar.Command|null} [command] TimedCommand command
     * @property {number|null} [duration] TimedCommand duration
     */

    /**
     * Constructs a new TimedCommand.
     * @memberof armwar
     * @classdesc A message containing a single action and its duration.
     * @implements ITimedCommand
     * @constructor
     * @param {armwar.ITimedCommand=} [properties] Properties to set
     */
    function TimedCommand(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * TimedCommand command.
     * @member {armwar.Command} command
     * @memberof armwar.TimedCommand
     * @instance
     */
    TimedCommand.prototype.command = 0;

    /**
     * TimedCommand duration.
     * @member {number} duration
     * @memberof armwar.TimedCommand
     * @instance
     */
    TimedCommand.prototype.duration = 0;

    /**
     * Creates a new TimedCommand instance using the specified properties.
     * @function create
     * @memberof armwar.TimedCommand
     * @static
     * @param {armwar.ITimedCommand=} [properties] Properties to set
     * @returns {armwar.TimedCommand} TimedCommand instance
     */
    TimedCommand.create = function create(properties) {
      return new TimedCommand(properties);
    };

    /**
     * Encodes the specified TimedCommand message. Does not implicitly {@link armwar.TimedCommand.verify|verify} messages.
     * @function encode
     * @memberof armwar.TimedCommand
     * @static
     * @param {armwar.ITimedCommand} message TimedCommand message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TimedCommand.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (
        message.command != null &&
        Object.hasOwnProperty.call(message, "command")
      )
        writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.command);
      if (
        message.duration != null &&
        Object.hasOwnProperty.call(message, "duration")
      )
        writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.duration);
      return writer;
    };

    /**
     * Encodes the specified TimedCommand message, length delimited. Does not implicitly {@link armwar.TimedCommand.verify|verify} messages.
     * @function encodeDelimited
     * @memberof armwar.TimedCommand
     * @static
     * @param {armwar.ITimedCommand} message TimedCommand message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TimedCommand.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a TimedCommand message from the specified reader or buffer.
     * @function decode
     * @memberof armwar.TimedCommand
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {armwar.TimedCommand} TimedCommand
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TimedCommand.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.armwar.TimedCommand();
      while (reader.pos < end) {
        let tag = reader.uint32();
        switch (tag >>> 3) {
          case 1: {
            message.command = reader.int32();
            break;
          }
          case 2: {
            message.duration = reader.int32();
            break;
          }
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes a TimedCommand message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof armwar.TimedCommand
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {armwar.TimedCommand} TimedCommand
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TimedCommand.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a TimedCommand message.
     * @function verify
     * @memberof armwar.TimedCommand
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    TimedCommand.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.command != null && message.hasOwnProperty("command"))
        switch (message.command) {
          default:
            return "command: enum value expected";
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
          case 12:
            break;
        }
      if (message.duration != null && message.hasOwnProperty("duration"))
        if (!$util.isInteger(message.duration))
          return "duration: integer expected";
      return null;
    };

    /**
     * Creates a TimedCommand message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof armwar.TimedCommand
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {armwar.TimedCommand} TimedCommand
     */
    TimedCommand.fromObject = function fromObject(object) {
      if (object instanceof $root.armwar.TimedCommand) return object;
      let message = new $root.armwar.TimedCommand();
      switch (object.command) {
        default:
          if (typeof object.command === "number") {
            message.command = object.command;
            break;
          }
          break;
        case "UP":
        case 0:
          message.command = 0;
          break;
        case "DOWN":
        case 1:
          message.command = 1;
          break;
        case "LEFT":
        case 2:
          message.command = 2;
          break;
        case "RIGHT":
        case 3:
          message.command = 3;
          break;
        case "FORWARD":
        case 4:
          message.command = 4;
          break;
        case "BACKWARD":
        case 5:
          message.command = 5;
          break;
        case "ROTATE_CW":
        case 6:
          message.command = 6;
          break;
        case "ROTATE_CCW":
        case 7:
          message.command = 7;
          break;
        case "GRAB":
        case 8:
          message.command = 8;
          break;
        case "RELEASE":
        case 9:
          message.command = 9;
          break;
        case "SET":
        case 10:
          message.command = 10;
          break;
        case "RESET":
        case 11:
          message.command = 11;
          break;
        case "STOP":
        case 12:
          message.command = 12;
          break;
      }
      if (object.duration != null) message.duration = object.duration | 0;
      return message;
    };

    /**
     * Creates a plain object from a TimedCommand message. Also converts values to other types if specified.
     * @function toObject
     * @memberof armwar.TimedCommand
     * @static
     * @param {armwar.TimedCommand} message TimedCommand
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    TimedCommand.toObject = function toObject(message, options) {
      if (!options) options = {};
      let object = {};
      if (options.defaults) {
        object.command = options.enums === String ? "UP" : 0;
        object.duration = 0;
      }
      if (message.command != null && message.hasOwnProperty("command"))
        object.command =
          options.enums === String
            ? $root.armwar.Command[message.command] === undefined
              ? message.command
              : $root.armwar.Command[message.command]
            : message.command;
      if (message.duration != null && message.hasOwnProperty("duration"))
        object.duration = message.duration;
      return object;
    };

    /**
     * Converts this TimedCommand to JSON.
     * @function toJSON
     * @memberof armwar.TimedCommand
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    TimedCommand.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for TimedCommand
     * @function getTypeUrl
     * @memberof armwar.TimedCommand
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    TimedCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = "type.googleapis.com";
      }
      return typeUrlPrefix + "/armwar.TimedCommand";
    };

    return TimedCommand;
  })();

  armwar.TimedCommandSequence = (function () {
    /**
     * Properties of a TimedCommandSequence.
     * @memberof armwar
     * @interface ITimedCommandSequence
     * @property {Array.<armwar.ITimedCommand>|null} [command] TimedCommandSequence command
     */

    /**
     * Constructs a new TimedCommandSequence.
     * @memberof armwar
     * @classdesc A message containing a sequence of actions and their durations.
     * @implements ITimedCommandSequence
     * @constructor
     * @param {armwar.ITimedCommandSequence=} [properties] Properties to set
     */
    function TimedCommandSequence(properties) {
      this.command = [];
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * TimedCommandSequence command.
     * @member {Array.<armwar.ITimedCommand>} command
     * @memberof armwar.TimedCommandSequence
     * @instance
     */
    TimedCommandSequence.prototype.command = $util.emptyArray;

    /**
     * Creates a new TimedCommandSequence instance using the specified properties.
     * @function create
     * @memberof armwar.TimedCommandSequence
     * @static
     * @param {armwar.ITimedCommandSequence=} [properties] Properties to set
     * @returns {armwar.TimedCommandSequence} TimedCommandSequence instance
     */
    TimedCommandSequence.create = function create(properties) {
      return new TimedCommandSequence(properties);
    };

    /**
     * Encodes the specified TimedCommandSequence message. Does not implicitly {@link armwar.TimedCommandSequence.verify|verify} messages.
     * @function encode
     * @memberof armwar.TimedCommandSequence
     * @static
     * @param {armwar.ITimedCommandSequence} message TimedCommandSequence message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TimedCommandSequence.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (message.command != null && message.command.length)
        for (let i = 0; i < message.command.length; ++i)
          $root.armwar.TimedCommand.encode(
            message.command[i],
            writer.uint32(/* id 1, wireType 2 =*/ 10).fork(),
          ).ldelim();
      return writer;
    };

    /**
     * Encodes the specified TimedCommandSequence message, length delimited. Does not implicitly {@link armwar.TimedCommandSequence.verify|verify} messages.
     * @function encodeDelimited
     * @memberof armwar.TimedCommandSequence
     * @static
     * @param {armwar.ITimedCommandSequence} message TimedCommandSequence message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TimedCommandSequence.encodeDelimited = function encodeDelimited(
      message,
      writer,
    ) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a TimedCommandSequence message from the specified reader or buffer.
     * @function decode
     * @memberof armwar.TimedCommandSequence
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {armwar.TimedCommandSequence} TimedCommandSequence
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TimedCommandSequence.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.armwar.TimedCommandSequence();
      while (reader.pos < end) {
        let tag = reader.uint32();
        switch (tag >>> 3) {
          case 1: {
            if (!(message.command && message.command.length))
              message.command = [];
            message.command.push(
              $root.armwar.TimedCommand.decode(reader, reader.uint32()),
            );
            break;
          }
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes a TimedCommandSequence message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof armwar.TimedCommandSequence
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {armwar.TimedCommandSequence} TimedCommandSequence
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TimedCommandSequence.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a TimedCommandSequence message.
     * @function verify
     * @memberof armwar.TimedCommandSequence
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    TimedCommandSequence.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.command != null && message.hasOwnProperty("command")) {
        if (!Array.isArray(message.command)) return "command: array expected";
        for (let i = 0; i < message.command.length; ++i) {
          let error = $root.armwar.TimedCommand.verify(message.command[i]);
          if (error) return "command." + error;
        }
      }
      return null;
    };

    /**
     * Creates a TimedCommandSequence message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof armwar.TimedCommandSequence
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {armwar.TimedCommandSequence} TimedCommandSequence
     */
    TimedCommandSequence.fromObject = function fromObject(object) {
      if (object instanceof $root.armwar.TimedCommandSequence) return object;
      let message = new $root.armwar.TimedCommandSequence();
      if (object.command) {
        if (!Array.isArray(object.command))
          throw TypeError(
            ".armwar.TimedCommandSequence.command: array expected",
          );
        message.command = [];
        for (let i = 0; i < object.command.length; ++i) {
          if (typeof object.command[i] !== "object")
            throw TypeError(
              ".armwar.TimedCommandSequence.command: object expected",
            );
          message.command[i] = $root.armwar.TimedCommand.fromObject(
            object.command[i],
          );
        }
      }
      return message;
    };

    /**
     * Creates a plain object from a TimedCommandSequence message. Also converts values to other types if specified.
     * @function toObject
     * @memberof armwar.TimedCommandSequence
     * @static
     * @param {armwar.TimedCommandSequence} message TimedCommandSequence
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    TimedCommandSequence.toObject = function toObject(message, options) {
      if (!options) options = {};
      let object = {};
      if (options.arrays || options.defaults) object.command = [];
      if (message.command && message.command.length) {
        object.command = [];
        for (let j = 0; j < message.command.length; ++j)
          object.command[j] = $root.armwar.TimedCommand.toObject(
            message.command[j],
            options,
          );
      }
      return object;
    };

    /**
     * Converts this TimedCommandSequence to JSON.
     * @function toJSON
     * @memberof armwar.TimedCommandSequence
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    TimedCommandSequence.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for TimedCommandSequence
     * @function getTypeUrl
     * @memberof armwar.TimedCommandSequence
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    TimedCommandSequence.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = "type.googleapis.com";
      }
      return typeUrlPrefix + "/armwar.TimedCommandSequence";
    };

    return TimedCommandSequence;
  })();

  armwar.StatedCommand = (function () {
    /**
     * Properties of a StatedCommand.
     * @memberof armwar
     * @interface IStatedCommand
     * @property {armwar.Command|null} [command] StatedCommand command
     * @property {boolean|null} [start] StatedCommand start
     */

    /**
     * Constructs a new StatedCommand.
     * @memberof armwar
     * @classdesc Represents a StatedCommand.
     * @implements IStatedCommand
     * @constructor
     * @param {armwar.IStatedCommand=} [properties] Properties to set
     */
    function StatedCommand(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * StatedCommand command.
     * @member {armwar.Command} command
     * @memberof armwar.StatedCommand
     * @instance
     */
    StatedCommand.prototype.command = 0;

    /**
     * StatedCommand start.
     * @member {boolean} start
     * @memberof armwar.StatedCommand
     * @instance
     */
    StatedCommand.prototype.start = false;

    /**
     * Creates a new StatedCommand instance using the specified properties.
     * @function create
     * @memberof armwar.StatedCommand
     * @static
     * @param {armwar.IStatedCommand=} [properties] Properties to set
     * @returns {armwar.StatedCommand} StatedCommand instance
     */
    StatedCommand.create = function create(properties) {
      return new StatedCommand(properties);
    };

    /**
     * Encodes the specified StatedCommand message. Does not implicitly {@link armwar.StatedCommand.verify|verify} messages.
     * @function encode
     * @memberof armwar.StatedCommand
     * @static
     * @param {armwar.IStatedCommand} message StatedCommand message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    StatedCommand.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (
        message.command != null &&
        Object.hasOwnProperty.call(message, "command")
      )
        writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.command);
      if (message.start != null && Object.hasOwnProperty.call(message, "start"))
        writer.uint32(/* id 2, wireType 0 =*/ 16).bool(message.start);
      return writer;
    };

    /**
     * Encodes the specified StatedCommand message, length delimited. Does not implicitly {@link armwar.StatedCommand.verify|verify} messages.
     * @function encodeDelimited
     * @memberof armwar.StatedCommand
     * @static
     * @param {armwar.IStatedCommand} message StatedCommand message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    StatedCommand.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a StatedCommand message from the specified reader or buffer.
     * @function decode
     * @memberof armwar.StatedCommand
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {armwar.StatedCommand} StatedCommand
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    StatedCommand.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.armwar.StatedCommand();
      while (reader.pos < end) {
        let tag = reader.uint32();
        switch (tag >>> 3) {
          case 1: {
            message.command = reader.int32();
            break;
          }
          case 2: {
            message.start = reader.bool();
            break;
          }
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes a StatedCommand message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof armwar.StatedCommand
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {armwar.StatedCommand} StatedCommand
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    StatedCommand.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a StatedCommand message.
     * @function verify
     * @memberof armwar.StatedCommand
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    StatedCommand.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.command != null && message.hasOwnProperty("command"))
        switch (message.command) {
          default:
            return "command: enum value expected";
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
          case 12:
            break;
        }
      if (message.start != null && message.hasOwnProperty("start"))
        if (typeof message.start !== "boolean")
          return "start: boolean expected";
      return null;
    };

    /**
     * Creates a StatedCommand message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof armwar.StatedCommand
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {armwar.StatedCommand} StatedCommand
     */
    StatedCommand.fromObject = function fromObject(object) {
      if (object instanceof $root.armwar.StatedCommand) return object;
      let message = new $root.armwar.StatedCommand();
      switch (object.command) {
        default:
          if (typeof object.command === "number") {
            message.command = object.command;
            break;
          }
          break;
        case "UP":
        case 0:
          message.command = 0;
          break;
        case "DOWN":
        case 1:
          message.command = 1;
          break;
        case "LEFT":
        case 2:
          message.command = 2;
          break;
        case "RIGHT":
        case 3:
          message.command = 3;
          break;
        case "FORWARD":
        case 4:
          message.command = 4;
          break;
        case "BACKWARD":
        case 5:
          message.command = 5;
          break;
        case "ROTATE_CW":
        case 6:
          message.command = 6;
          break;
        case "ROTATE_CCW":
        case 7:
          message.command = 7;
          break;
        case "GRAB":
        case 8:
          message.command = 8;
          break;
        case "RELEASE":
        case 9:
          message.command = 9;
          break;
        case "SET":
        case 10:
          message.command = 10;
          break;
        case "RESET":
        case 11:
          message.command = 11;
          break;
        case "STOP":
        case 12:
          message.command = 12;
          break;
      }
      if (object.start != null) message.start = Boolean(object.start);
      return message;
    };

    /**
     * Creates a plain object from a StatedCommand message. Also converts values to other types if specified.
     * @function toObject
     * @memberof armwar.StatedCommand
     * @static
     * @param {armwar.StatedCommand} message StatedCommand
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    StatedCommand.toObject = function toObject(message, options) {
      if (!options) options = {};
      let object = {};
      if (options.defaults) {
        object.command = options.enums === String ? "UP" : 0;
        object.start = false;
      }
      if (message.command != null && message.hasOwnProperty("command"))
        object.command =
          options.enums === String
            ? $root.armwar.Command[message.command] === undefined
              ? message.command
              : $root.armwar.Command[message.command]
            : message.command;
      if (message.start != null && message.hasOwnProperty("start"))
        object.start = message.start;
      return object;
    };

    /**
     * Converts this StatedCommand to JSON.
     * @function toJSON
     * @memberof armwar.StatedCommand
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    StatedCommand.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for StatedCommand
     * @function getTypeUrl
     * @memberof armwar.StatedCommand
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    StatedCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = "type.googleapis.com";
      }
      return typeUrlPrefix + "/armwar.StatedCommand";
    };

    return StatedCommand;
  })();

  armwar.SpannedCommand = (function () {
    /**
     * Properties of a SpannedCommand.
     * @memberof armwar
     * @interface ISpannedCommand
     * @property {armwar.Command|null} [command] SpannedCommand command
     * @property {number|null} [span] SpannedCommand span
     */

    /**
     * Constructs a new SpannedCommand.
     * @memberof armwar
     * @classdesc A message containing a single action and its span.
     * @implements ISpannedCommand
     * @constructor
     * @param {armwar.ISpannedCommand=} [properties] Properties to set
     */
    function SpannedCommand(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * SpannedCommand command.
     * @member {armwar.Command} command
     * @memberof armwar.SpannedCommand
     * @instance
     */
    SpannedCommand.prototype.command = 0;

    /**
     * SpannedCommand span.
     * @member {number} span
     * @memberof armwar.SpannedCommand
     * @instance
     */
    SpannedCommand.prototype.span = 0;

    /**
     * Creates a new SpannedCommand instance using the specified properties.
     * @function create
     * @memberof armwar.SpannedCommand
     * @static
     * @param {armwar.ISpannedCommand=} [properties] Properties to set
     * @returns {armwar.SpannedCommand} SpannedCommand instance
     */
    SpannedCommand.create = function create(properties) {
      return new SpannedCommand(properties);
    };

    /**
     * Encodes the specified SpannedCommand message. Does not implicitly {@link armwar.SpannedCommand.verify|verify} messages.
     * @function encode
     * @memberof armwar.SpannedCommand
     * @static
     * @param {armwar.ISpannedCommand} message SpannedCommand message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SpannedCommand.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (
        message.command != null &&
        Object.hasOwnProperty.call(message, "command")
      )
        writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.command);
      if (message.span != null && Object.hasOwnProperty.call(message, "span"))
        writer.uint32(/* id 2, wireType 5 =*/ 21).float(message.span);
      return writer;
    };

    /**
     * Encodes the specified SpannedCommand message, length delimited. Does not implicitly {@link armwar.SpannedCommand.verify|verify} messages.
     * @function encodeDelimited
     * @memberof armwar.SpannedCommand
     * @static
     * @param {armwar.ISpannedCommand} message SpannedCommand message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SpannedCommand.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SpannedCommand message from the specified reader or buffer.
     * @function decode
     * @memberof armwar.SpannedCommand
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {armwar.SpannedCommand} SpannedCommand
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SpannedCommand.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.armwar.SpannedCommand();
      while (reader.pos < end) {
        let tag = reader.uint32();
        switch (tag >>> 3) {
          case 1: {
            message.command = reader.int32();
            break;
          }
          case 2: {
            message.span = reader.float();
            break;
          }
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes a SpannedCommand message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof armwar.SpannedCommand
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {armwar.SpannedCommand} SpannedCommand
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SpannedCommand.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SpannedCommand message.
     * @function verify
     * @memberof armwar.SpannedCommand
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SpannedCommand.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.command != null && message.hasOwnProperty("command"))
        switch (message.command) {
          default:
            return "command: enum value expected";
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
          case 12:
            break;
        }
      if (message.span != null && message.hasOwnProperty("span"))
        if (typeof message.span !== "number") return "span: number expected";
      return null;
    };

    /**
     * Creates a SpannedCommand message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof armwar.SpannedCommand
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {armwar.SpannedCommand} SpannedCommand
     */
    SpannedCommand.fromObject = function fromObject(object) {
      if (object instanceof $root.armwar.SpannedCommand) return object;
      let message = new $root.armwar.SpannedCommand();
      switch (object.command) {
        default:
          if (typeof object.command === "number") {
            message.command = object.command;
            break;
          }
          break;
        case "UP":
        case 0:
          message.command = 0;
          break;
        case "DOWN":
        case 1:
          message.command = 1;
          break;
        case "LEFT":
        case 2:
          message.command = 2;
          break;
        case "RIGHT":
        case 3:
          message.command = 3;
          break;
        case "FORWARD":
        case 4:
          message.command = 4;
          break;
        case "BACKWARD":
        case 5:
          message.command = 5;
          break;
        case "ROTATE_CW":
        case 6:
          message.command = 6;
          break;
        case "ROTATE_CCW":
        case 7:
          message.command = 7;
          break;
        case "GRAB":
        case 8:
          message.command = 8;
          break;
        case "RELEASE":
        case 9:
          message.command = 9;
          break;
        case "SET":
        case 10:
          message.command = 10;
          break;
        case "RESET":
        case 11:
          message.command = 11;
          break;
        case "STOP":
        case 12:
          message.command = 12;
          break;
      }
      if (object.span != null) message.span = Number(object.span);
      return message;
    };

    /**
     * Creates a plain object from a SpannedCommand message. Also converts values to other types if specified.
     * @function toObject
     * @memberof armwar.SpannedCommand
     * @static
     * @param {armwar.SpannedCommand} message SpannedCommand
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SpannedCommand.toObject = function toObject(message, options) {
      if (!options) options = {};
      let object = {};
      if (options.defaults) {
        object.command = options.enums === String ? "UP" : 0;
        object.span = 0;
      }
      if (message.command != null && message.hasOwnProperty("command"))
        object.command =
          options.enums === String
            ? $root.armwar.Command[message.command] === undefined
              ? message.command
              : $root.armwar.Command[message.command]
            : message.command;
      if (message.span != null && message.hasOwnProperty("span"))
        object.span =
          options.json && !isFinite(message.span)
            ? String(message.span)
            : message.span;
      return object;
    };

    /**
     * Converts this SpannedCommand to JSON.
     * @function toJSON
     * @memberof armwar.SpannedCommand
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SpannedCommand.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for SpannedCommand
     * @function getTypeUrl
     * @memberof armwar.SpannedCommand
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    SpannedCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = "type.googleapis.com";
      }
      return typeUrlPrefix + "/armwar.SpannedCommand";
    };

    return SpannedCommand;
  })();

  armwar.SpannedCommandSequence = (function () {
    /**
     * Properties of a SpannedCommandSequence.
     * @memberof armwar
     * @interface ISpannedCommandSequence
     * @property {Array.<armwar.ISpannedCommand>|null} [command] SpannedCommandSequence command
     */

    /**
     * Constructs a new SpannedCommandSequence.
     * @memberof armwar
     * @classdesc A message containing a sequence of actions and their spans.
     * @implements ISpannedCommandSequence
     * @constructor
     * @param {armwar.ISpannedCommandSequence=} [properties] Properties to set
     */
    function SpannedCommandSequence(properties) {
      this.command = [];
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * SpannedCommandSequence command.
     * @member {Array.<armwar.ISpannedCommand>} command
     * @memberof armwar.SpannedCommandSequence
     * @instance
     */
    SpannedCommandSequence.prototype.command = $util.emptyArray;

    /**
     * Creates a new SpannedCommandSequence instance using the specified properties.
     * @function create
     * @memberof armwar.SpannedCommandSequence
     * @static
     * @param {armwar.ISpannedCommandSequence=} [properties] Properties to set
     * @returns {armwar.SpannedCommandSequence} SpannedCommandSequence instance
     */
    SpannedCommandSequence.create = function create(properties) {
      return new SpannedCommandSequence(properties);
    };

    /**
     * Encodes the specified SpannedCommandSequence message. Does not implicitly {@link armwar.SpannedCommandSequence.verify|verify} messages.
     * @function encode
     * @memberof armwar.SpannedCommandSequence
     * @static
     * @param {armwar.ISpannedCommandSequence} message SpannedCommandSequence message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SpannedCommandSequence.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (message.command != null && message.command.length)
        for (let i = 0; i < message.command.length; ++i)
          $root.armwar.SpannedCommand.encode(
            message.command[i],
            writer.uint32(/* id 1, wireType 2 =*/ 10).fork(),
          ).ldelim();
      return writer;
    };

    /**
     * Encodes the specified SpannedCommandSequence message, length delimited. Does not implicitly {@link armwar.SpannedCommandSequence.verify|verify} messages.
     * @function encodeDelimited
     * @memberof armwar.SpannedCommandSequence
     * @static
     * @param {armwar.ISpannedCommandSequence} message SpannedCommandSequence message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SpannedCommandSequence.encodeDelimited = function encodeDelimited(
      message,
      writer,
    ) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SpannedCommandSequence message from the specified reader or buffer.
     * @function decode
     * @memberof armwar.SpannedCommandSequence
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {armwar.SpannedCommandSequence} SpannedCommandSequence
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SpannedCommandSequence.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.armwar.SpannedCommandSequence();
      while (reader.pos < end) {
        let tag = reader.uint32();
        switch (tag >>> 3) {
          case 1: {
            if (!(message.command && message.command.length))
              message.command = [];
            message.command.push(
              $root.armwar.SpannedCommand.decode(reader, reader.uint32()),
            );
            break;
          }
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes a SpannedCommandSequence message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof armwar.SpannedCommandSequence
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {armwar.SpannedCommandSequence} SpannedCommandSequence
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SpannedCommandSequence.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SpannedCommandSequence message.
     * @function verify
     * @memberof armwar.SpannedCommandSequence
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SpannedCommandSequence.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.command != null && message.hasOwnProperty("command")) {
        if (!Array.isArray(message.command)) return "command: array expected";
        for (let i = 0; i < message.command.length; ++i) {
          let error = $root.armwar.SpannedCommand.verify(message.command[i]);
          if (error) return "command." + error;
        }
      }
      return null;
    };

    /**
     * Creates a SpannedCommandSequence message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof armwar.SpannedCommandSequence
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {armwar.SpannedCommandSequence} SpannedCommandSequence
     */
    SpannedCommandSequence.fromObject = function fromObject(object) {
      if (object instanceof $root.armwar.SpannedCommandSequence) return object;
      let message = new $root.armwar.SpannedCommandSequence();
      if (object.command) {
        if (!Array.isArray(object.command))
          throw TypeError(
            ".armwar.SpannedCommandSequence.command: array expected",
          );
        message.command = [];
        for (let i = 0; i < object.command.length; ++i) {
          if (typeof object.command[i] !== "object")
            throw TypeError(
              ".armwar.SpannedCommandSequence.command: object expected",
            );
          message.command[i] = $root.armwar.SpannedCommand.fromObject(
            object.command[i],
          );
        }
      }
      return message;
    };

    /**
     * Creates a plain object from a SpannedCommandSequence message. Also converts values to other types if specified.
     * @function toObject
     * @memberof armwar.SpannedCommandSequence
     * @static
     * @param {armwar.SpannedCommandSequence} message SpannedCommandSequence
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SpannedCommandSequence.toObject = function toObject(message, options) {
      if (!options) options = {};
      let object = {};
      if (options.arrays || options.defaults) object.command = [];
      if (message.command && message.command.length) {
        object.command = [];
        for (let j = 0; j < message.command.length; ++j)
          object.command[j] = $root.armwar.SpannedCommand.toObject(
            message.command[j],
            options,
          );
      }
      return object;
    };

    /**
     * Converts this SpannedCommandSequence to JSON.
     * @function toJSON
     * @memberof armwar.SpannedCommandSequence
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SpannedCommandSequence.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for SpannedCommandSequence
     * @function getTypeUrl
     * @memberof armwar.SpannedCommandSequence
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    SpannedCommandSequence.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = "type.googleapis.com";
      }
      return typeUrlPrefix + "/armwar.SpannedCommandSequence";
    };

    return SpannedCommandSequence;
  })();

  armwar.ArmCommand = (function () {
    /**
     * Properties of an ArmCommand.
     * @memberof armwar
     * @interface IArmCommand
     * @property {armwar.ITimedCommand|null} [timedCommand] ArmCommand timedCommand
     * @property {armwar.ITimedCommandSequence|null} [timedSequence] ArmCommand timedSequence
     * @property {armwar.ISpannedCommand|null} [spannedCommand] ArmCommand spannedCommand
     * @property {armwar.ISpannedCommandSequence|null} [spannedSequence] ArmCommand spannedSequence
     * @property {armwar.IStatedCommand|null} [statedCommand] ArmCommand statedCommand
     */

    /**
     * Constructs a new ArmCommand.
     * @memberof armwar
     * @classdesc Represents an ArmCommand.
     * @implements IArmCommand
     * @constructor
     * @param {armwar.IArmCommand=} [properties] Properties to set
     */
    function ArmCommand(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * ArmCommand timedCommand.
     * @member {armwar.ITimedCommand|null|undefined} timedCommand
     * @memberof armwar.ArmCommand
     * @instance
     */
    ArmCommand.prototype.timedCommand = null;

    /**
     * ArmCommand timedSequence.
     * @member {armwar.ITimedCommandSequence|null|undefined} timedSequence
     * @memberof armwar.ArmCommand
     * @instance
     */
    ArmCommand.prototype.timedSequence = null;

    /**
     * ArmCommand spannedCommand.
     * @member {armwar.ISpannedCommand|null|undefined} spannedCommand
     * @memberof armwar.ArmCommand
     * @instance
     */
    ArmCommand.prototype.spannedCommand = null;

    /**
     * ArmCommand spannedSequence.
     * @member {armwar.ISpannedCommandSequence|null|undefined} spannedSequence
     * @memberof armwar.ArmCommand
     * @instance
     */
    ArmCommand.prototype.spannedSequence = null;

    /**
     * ArmCommand statedCommand.
     * @member {armwar.IStatedCommand|null|undefined} statedCommand
     * @memberof armwar.ArmCommand
     * @instance
     */
    ArmCommand.prototype.statedCommand = null;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * ArmCommand command.
     * @member {"timedCommand"|"timedSequence"|"spannedCommand"|"spannedSequence"|"statedCommand"|undefined} command
     * @memberof armwar.ArmCommand
     * @instance
     */
    Object.defineProperty(ArmCommand.prototype, "command", {
      get: $util.oneOfGetter(
        ($oneOfFields = [
          "timedCommand",
          "timedSequence",
          "spannedCommand",
          "spannedSequence",
          "statedCommand",
        ]),
      ),
      set: $util.oneOfSetter($oneOfFields),
    });

    /**
     * Creates a new ArmCommand instance using the specified properties.
     * @function create
     * @memberof armwar.ArmCommand
     * @static
     * @param {armwar.IArmCommand=} [properties] Properties to set
     * @returns {armwar.ArmCommand} ArmCommand instance
     */
    ArmCommand.create = function create(properties) {
      return new ArmCommand(properties);
    };

    /**
     * Encodes the specified ArmCommand message. Does not implicitly {@link armwar.ArmCommand.verify|verify} messages.
     * @function encode
     * @memberof armwar.ArmCommand
     * @static
     * @param {armwar.IArmCommand} message ArmCommand message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ArmCommand.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (
        message.timedCommand != null &&
        Object.hasOwnProperty.call(message, "timedCommand")
      )
        $root.armwar.TimedCommand.encode(
          message.timedCommand,
          writer.uint32(/* id 1, wireType 2 =*/ 10).fork(),
        ).ldelim();
      if (
        message.timedSequence != null &&
        Object.hasOwnProperty.call(message, "timedSequence")
      )
        $root.armwar.TimedCommandSequence.encode(
          message.timedSequence,
          writer.uint32(/* id 2, wireType 2 =*/ 18).fork(),
        ).ldelim();
      if (
        message.spannedCommand != null &&
        Object.hasOwnProperty.call(message, "spannedCommand")
      )
        $root.armwar.SpannedCommand.encode(
          message.spannedCommand,
          writer.uint32(/* id 3, wireType 2 =*/ 26).fork(),
        ).ldelim();
      if (
        message.spannedSequence != null &&
        Object.hasOwnProperty.call(message, "spannedSequence")
      )
        $root.armwar.SpannedCommandSequence.encode(
          message.spannedSequence,
          writer.uint32(/* id 4, wireType 2 =*/ 34).fork(),
        ).ldelim();
      if (
        message.statedCommand != null &&
        Object.hasOwnProperty.call(message, "statedCommand")
      )
        $root.armwar.StatedCommand.encode(
          message.statedCommand,
          writer.uint32(/* id 5, wireType 2 =*/ 42).fork(),
        ).ldelim();
      return writer;
    };

    /**
     * Encodes the specified ArmCommand message, length delimited. Does not implicitly {@link armwar.ArmCommand.verify|verify} messages.
     * @function encodeDelimited
     * @memberof armwar.ArmCommand
     * @static
     * @param {armwar.IArmCommand} message ArmCommand message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ArmCommand.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an ArmCommand message from the specified reader or buffer.
     * @function decode
     * @memberof armwar.ArmCommand
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {armwar.ArmCommand} ArmCommand
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ArmCommand.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.armwar.ArmCommand();
      while (reader.pos < end) {
        let tag = reader.uint32();
        switch (tag >>> 3) {
          case 1: {
            message.timedCommand = $root.armwar.TimedCommand.decode(
              reader,
              reader.uint32(),
            );
            break;
          }
          case 2: {
            message.timedSequence = $root.armwar.TimedCommandSequence.decode(
              reader,
              reader.uint32(),
            );
            break;
          }
          case 3: {
            message.spannedCommand = $root.armwar.SpannedCommand.decode(
              reader,
              reader.uint32(),
            );
            break;
          }
          case 4: {
            message.spannedSequence =
              $root.armwar.SpannedCommandSequence.decode(
                reader,
                reader.uint32(),
              );
            break;
          }
          case 5: {
            message.statedCommand = $root.armwar.StatedCommand.decode(
              reader,
              reader.uint32(),
            );
            break;
          }
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes an ArmCommand message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof armwar.ArmCommand
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {armwar.ArmCommand} ArmCommand
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ArmCommand.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an ArmCommand message.
     * @function verify
     * @memberof armwar.ArmCommand
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ArmCommand.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      let properties = {};
      if (
        message.timedCommand != null &&
        message.hasOwnProperty("timedCommand")
      ) {
        properties.command = 1;
        {
          let error = $root.armwar.TimedCommand.verify(message.timedCommand);
          if (error) return "timedCommand." + error;
        }
      }
      if (
        message.timedSequence != null &&
        message.hasOwnProperty("timedSequence")
      ) {
        if (properties.command === 1) return "command: multiple values";
        properties.command = 1;
        {
          let error = $root.armwar.TimedCommandSequence.verify(
            message.timedSequence,
          );
          if (error) return "timedSequence." + error;
        }
      }
      if (
        message.spannedCommand != null &&
        message.hasOwnProperty("spannedCommand")
      ) {
        if (properties.command === 1) return "command: multiple values";
        properties.command = 1;
        {
          let error = $root.armwar.SpannedCommand.verify(
            message.spannedCommand,
          );
          if (error) return "spannedCommand." + error;
        }
      }
      if (
        message.spannedSequence != null &&
        message.hasOwnProperty("spannedSequence")
      ) {
        if (properties.command === 1) return "command: multiple values";
        properties.command = 1;
        {
          let error = $root.armwar.SpannedCommandSequence.verify(
            message.spannedSequence,
          );
          if (error) return "spannedSequence." + error;
        }
      }
      if (
        message.statedCommand != null &&
        message.hasOwnProperty("statedCommand")
      ) {
        if (properties.command === 1) return "command: multiple values";
        properties.command = 1;
        {
          let error = $root.armwar.StatedCommand.verify(message.statedCommand);
          if (error) return "statedCommand." + error;
        }
      }
      return null;
    };

    /**
     * Creates an ArmCommand message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof armwar.ArmCommand
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {armwar.ArmCommand} ArmCommand
     */
    ArmCommand.fromObject = function fromObject(object) {
      if (object instanceof $root.armwar.ArmCommand) return object;
      let message = new $root.armwar.ArmCommand();
      if (object.timedCommand != null) {
        if (typeof object.timedCommand !== "object")
          throw TypeError(".armwar.ArmCommand.timedCommand: object expected");
        message.timedCommand = $root.armwar.TimedCommand.fromObject(
          object.timedCommand,
        );
      }
      if (object.timedSequence != null) {
        if (typeof object.timedSequence !== "object")
          throw TypeError(".armwar.ArmCommand.timedSequence: object expected");
        message.timedSequence = $root.armwar.TimedCommandSequence.fromObject(
          object.timedSequence,
        );
      }
      if (object.spannedCommand != null) {
        if (typeof object.spannedCommand !== "object")
          throw TypeError(".armwar.ArmCommand.spannedCommand: object expected");
        message.spannedCommand = $root.armwar.SpannedCommand.fromObject(
          object.spannedCommand,
        );
      }
      if (object.spannedSequence != null) {
        if (typeof object.spannedSequence !== "object")
          throw TypeError(
            ".armwar.ArmCommand.spannedSequence: object expected",
          );
        message.spannedSequence =
          $root.armwar.SpannedCommandSequence.fromObject(
            object.spannedSequence,
          );
      }
      if (object.statedCommand != null) {
        if (typeof object.statedCommand !== "object")
          throw TypeError(".armwar.ArmCommand.statedCommand: object expected");
        message.statedCommand = $root.armwar.StatedCommand.fromObject(
          object.statedCommand,
        );
      }
      return message;
    };

    /**
     * Creates a plain object from an ArmCommand message. Also converts values to other types if specified.
     * @function toObject
     * @memberof armwar.ArmCommand
     * @static
     * @param {armwar.ArmCommand} message ArmCommand
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ArmCommand.toObject = function toObject(message, options) {
      if (!options) options = {};
      let object = {};
      if (
        message.timedCommand != null &&
        message.hasOwnProperty("timedCommand")
      ) {
        object.timedCommand = $root.armwar.TimedCommand.toObject(
          message.timedCommand,
          options,
        );
        if (options.oneofs) object.command = "timedCommand";
      }
      if (
        message.timedSequence != null &&
        message.hasOwnProperty("timedSequence")
      ) {
        object.timedSequence = $root.armwar.TimedCommandSequence.toObject(
          message.timedSequence,
          options,
        );
        if (options.oneofs) object.command = "timedSequence";
      }
      if (
        message.spannedCommand != null &&
        message.hasOwnProperty("spannedCommand")
      ) {
        object.spannedCommand = $root.armwar.SpannedCommand.toObject(
          message.spannedCommand,
          options,
        );
        if (options.oneofs) object.command = "spannedCommand";
      }
      if (
        message.spannedSequence != null &&
        message.hasOwnProperty("spannedSequence")
      ) {
        object.spannedSequence = $root.armwar.SpannedCommandSequence.toObject(
          message.spannedSequence,
          options,
        );
        if (options.oneofs) object.command = "spannedSequence";
      }
      if (
        message.statedCommand != null &&
        message.hasOwnProperty("statedCommand")
      ) {
        object.statedCommand = $root.armwar.StatedCommand.toObject(
          message.statedCommand,
          options,
        );
        if (options.oneofs) object.command = "statedCommand";
      }
      return object;
    };

    /**
     * Converts this ArmCommand to JSON.
     * @function toJSON
     * @memberof armwar.ArmCommand
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ArmCommand.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for ArmCommand
     * @function getTypeUrl
     * @memberof armwar.ArmCommand
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    ArmCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = "type.googleapis.com";
      }
      return typeUrlPrefix + "/armwar.ArmCommand";
    };

    return ArmCommand;
  })();

  return armwar;
})());

export { $root as default };
