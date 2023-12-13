<script setup>
// Imports ref
import { onMounted, ref } from "vue";

import Header from "./components/header/header.vue";
import Devices from "./components/devices/devices.vue";
import Commands from "./components/commands/commands.vue";
import Sequences from "./components/sequences/sequences.vue";

import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

// Imports protocol
import {
  Protocol,
  MessageType,
  CommandType,
} from "./scripts/protocol/protocol.js";

const timeout_ms = 3000;

var protocol = null;

const allSequences = ref([]);
const allDevices = ref([]);

const currentDevice = ref("");
const isRecording = ref(false);
const currentSequence = ref([]);
const currentSequenceName = ref("");

const toast = ref("");

function buildProtocolPayload(buttonName) {
  /* Select the command */
  var command = null;

  switch (buttonName) {
    case "release":
      command = CommandType.Release;
      break;

    case "up":
      command = CommandType.Up;
      break;

    case "press":
      command = CommandType.Grab;
      break;

    case "rotate_ccw":
      command = CommandType.RotateCcw;
      break;

    case "forward":
      command = CommandType.Forward;
      break;

    case "rotate_cw":
      command = CommandType.RotateCw;
      break;

    case "left":
      command = CommandType.Left;
      break;

    case "backward":
      command = CommandType.Backward;
      break;

    case "right":
      command = CommandType.Right;
      break;

    case "down":
      command = CommandType.Down;
      break;

    // FIXME add the other commands (set-zero and go-to-zero and stop) and messages
  }

  /* Build the payload object. The message sent is always an ArmCommand which wraps a traditional command. */
  const message = protocol.getMessage(MessageType.ArmCommand);

  /* Build the payload of ArmCommand with a TimedCommand */
  // TODO: Manage different commands (Sequence, span, ect)
  var payload = message.create({
    timedCommand: {
      command: command,
      duration: 2,
    },
  });

  return payload;
}

const handleClickParent = async (buttonName, image) => {
  if (isRecording.value) {
    currentSequence.value.push(image);
  } else {
    try {
      if (currentDevice.value == null || currentDevice.value == "") {
        alert("No device selected.");
        return;
      }

      // Build a payload matching the buttonName command
      const payload = buildProtocolPayload(buttonName);

      const encodedPayload = protocol.encode(MessageType.ArmCommand, payload);

      console.log("Sent payload: ");
      console.log(payload);
      console.log(encodedPayload);

      // Sends the requests and wait for the response
      const response = await fetch(`http://${currentDevice.value.ip}/command`, {
        method: "POST",
        body: encodedPayload,
        signal: AbortSignal.timeout(timeout_ms),
      });

      // Gets the response body
      const encodedText = await response.text();

      // Decode the response
      const responseObj = protocol.decode(
        MessageType.CommandResponse,
        encodedText,
      );

      console.log("Got payload: ");
      console.log(responseObj);

      if (responseObj.success)
        toast.value.open({
          message: "Command success",
          type: "success",
          position: "bottom-left",
        });
      else
        toast.value.open({
          message: "Command failed",
          type: "error",
          position: "bottom-left",
        });
    } catch (error) {
      toast.value.open({
        message: error,
        type: "error",
        position: "bottom-left",
      });
    }
  }
};

const handleNewSequence = () => {
  isRecording.value = !isRecording.value;
  console.log("Current recording state", isRecording.value);
  if (isRecording.value) {
    currentSequence.value = [];
    currentSequenceName.value = prompt(
      "Please enter the sequence name",
      "New Sequence",
    );
    if (currentSequenceName.value == null || currentSequenceName.value == "") {
      isRecording.value = false;
      alert("Sequence name cannot be empty");
      return;
    }
    if (
      allSequences.value.find(
        (sequence) => sequence.name == currentSequenceName.value,
      )
    ) {
      isRecording.value = false;
      alert("Sequence name already exists");

      return;
    }
  } else {
    if (currentSequence.value.length == 0) {
      alert("Sequence cannot be empty");
      return;
    }
    console.log("final sequence", currentSequence.value);
    allSequences.value.push({
      name: currentSequenceName.value,
      movements: currentSequence.value,
    });
  }
};

const handleNewDevice = () => {
  const deviceName = prompt("Please enter the device name", "Device Name");
  const deviceIp = prompt("Please enter the device ip", "192.168.0.0");
  if (deviceName == null || deviceName == "") {
    alert("Device name cannot be empty");
    return;
  }

  if (deviceIp == null || deviceIp == "") {
    alert("Device ip cannot be empty");
    return;
  }

  if (allDevices.value.find((device) => device.name == deviceName)) {
    alert("Device name already exists");
    return;
  }

  if (allDevices.value.find((device) => device.ip == deviceIp)) {
    alert("Device ip already exists");
    return;
  }

  let newDevice = {
    name: deviceName,
    ip: deviceIp,
    active: allDevices.value.length == 0,
    id: Date.now(),
  };

  if (allDevices.value.length == 0) {
    currentDevice.value = newDevice;
  }

  allDevices.value.push(newDevice);

  console.log(allDevices.value);
};

const handleDeviceClicked = (deviceId) => {
  for (var i = 0; i < allDevices.value.length; i++) {
    if (allDevices.value[i].id == deviceId) {
      currentDevice.value = allDevices.value[i];
      break;
    }
  }
};

const handleDeleteSequence = () => {
  const sequencename = prompt("Please enter the sequence name", "New Sequence");
  if (sequencename == null || sequencename == "") {
    alert("Sequence name cannot be empty");
    return;
  }

  const found = allSequences.value.find(
    (sequence) => sequence.name == sequencename,
  );
  if (!found) {
    alert("Sequence not found");
  }
  for (var i = 0; i < allSequences.value.length; i++) {
    if (allSequences.value[i].name == sequencename) {
      allSequences.value.splice(i, 1);
      break;
    }
  }
};

const handlePlaySequence = async (sequenceName) => {
  const sequence = allSequences.value.find(
    (sequence) => sequence.name == sequenceName,
  );
  console.log("playing sequence", sequence);
};

const handleDeleteDevice = () => {
  const devicename = prompt("Please enter the device name", "New Device");
  if (devicename == null || devicename == "") {
    alert("Device name cannot be empty");
    return;
  }

  const found = allDevices.value.find((device) => device.name == devicename);
  if (!found) {
    alert("Device not found");
  }
  for (var i = 0; i < allDevices.value.length; i++) {
    if (allDevices.value[i].name == devicename) {
      allDevices.value.splice(i, 1);
      break;
    }
  }

  if (allDevices.value.length > 0) {
    currentDevice.value = allDevices.value[0];
  } else {
    currentDevice.value = "";
  }
};

onMounted(async () => {
  protocol = await Protocol.load("armwar.proto");
  toast.value = useToast();

  // Force dismiss specific toast
  // instance.dismiss();

  // Dismiss all opened toast immediately
  // $toast.clear();
});
</script>

<template>
  <div class="container">
    <div class="main-container">
      <Header :name="currentDevice.name" />
      <div class="content">
        <Devices
          v-bind:allDevices="allDevices"
          @new-device="handleNewDevice"
          @device-clicked="handleDeviceClicked"
          @delete-device="handleDeleteDevice"
        />
        <Commands @button-clicked-parent="handleClickParent" />
        <Sequences
          @new-sequence="handleNewSequence"
          v-bind:isRecording="isRecording"
          v-bind:allSequences="allSequences"
          @delete-sequence="handleDeleteSequence"
          @play-sequence="handlePlaySequence"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  background-color: var(--background);
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
}

.main-container {
  max-width: 1600px;
  margin: 0 auto;
}

.content {
  background-color: var(--content);
  border-radius: 20px 20px 0 0;
  min-height: calc(100vh - 70px);
  display: grid;
  grid-template-columns: 30% 30% 30%;
  gap: 5%;
}

:global(body) {
  margin: 0;
  padding: 0;
}

* {
  --background: #131d35;

  --green: #aff8af;

  --content: #242d44;

  --primary: #2e364a;
  --secondary: #53607c;

  --terciary: #404b62;
  --terciary-hover: #2e364a;

  --white-text: #f0f0f0;

  font-family: "AR One Sans", sans-serif;
}
</style>
