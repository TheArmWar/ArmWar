<script setup>
// Imports ref
import { onMounted, ref } from "vue";

import Header from "./components/header/header.vue";
import Devices from "./components/devices/devices.vue";
import Commands from "./components/commands/commands.vue";
import Sequences from "./components/sequences/sequences.vue";

import { Toaster, ToastType } from "./scripts/toaster/toaster.js";

// Imports protocol
import {
  Protocol,
  MessageType,
  CommandType,
} from "./scripts/protocol/protocol.js";

/*----------------------------------------------------------------------------*/
const timeout_ms = 3000;

var protocol = null;

const allSequences = ref([]);
const allDevices = ref([]);

const currentDevice = ref("");

const isRecording = ref(false);
const recordingTimerRefMs = ref(0);
const recordingTimerHandler = ref(0);
const currentSequence = ref([]);
const currentSequenceName = ref("");

const selectedMode = ref("press");
const timerValue = ref(1000);

const toast = ref("");

/*----------------------------------------------------------------------------*/
function isDeviceSelected(currentDevice) {
  if (currentDevice == null || currentDevice == "") {
    toast.value.display(ToastType.Error, "No device selected");
    return false;
  }

  return true;
}

async function processCommand(payload) {
  // Encode the payload
  const encodedPayload = protocol.encode(MessageType.ArmCommand, payload);

  console.log("Sent payload: ");
  console.log(payload);
  console.log(encodedPayload);

  // Sends the requests and wait for the response
  try {
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
      toast.value.display(ToastType.Success, "Command success");
    else toast.value.display(ToastType.Error, "Command failed");
  } catch (error) {
    toast.value.display(ToastType.Error, error.message);
  }
}

function handleRecordingTimer() {
  timerValue.value = Date.now() - recordingTimerRefMs.value;
}

/*----------------------------------------------------------------------------*/
const handleCommandPressed = async (buttonName, image) => {
  // If the mode is not "press" then it should do nothing too
  if (selectedMode.value != "press") {
    return;
  }

  recordingTimerRefMs.value = Date.now();
  recordingTimerHandler.value = window.setInterval(handleRecordingTimer, 1);

  // Playing
  if (!isRecording.value) {
    if (!isDeviceSelected(currentDevice.value)) return;

    // Build a payload matching a start stated command
    const payload = protocol.buildStatedCommand(buttonName, true);

    // Send the command and wait the response
    processCommand(payload);
  }
};

const handleCommandReleased = async (buttonName, image) => {
  if (selectedMode.value == "press") {
    window.clearInterval(recordingTimerHandler.value);
    timerValue.value = Date.now() - recordingTimerRefMs.value;
  }

  // Recording
  if (isRecording.value) {
    currentSequence.value.push({ image: image, duration: timerValue.value });
  }

  // Playing
  else {
    if (!isDeviceSelected(currentDevice.value)) return;

    // Build a payload based on the selected mode
    const payload =
      selectedMode.value == "press"
        ? protocol.buildStatedCommand(buttonName, false) // Press mode
        : protocol.buildTimedCommand(buttonName, timerValue.value); // Timed mode

    // Send the command and wait the response
    processCommand(payload);
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
      toast.value.display(ToastType.Error, "Sequence name cannot be empty");
      return;
    }
    if (
      allSequences.value.find(
        (sequence) => sequence.name == currentSequenceName.value,
      )
    ) {
      isRecording.value = false;
      toast.value.display(ToastType.Error, "Sequence name already exists");
      return;
    }
  } else {
    if (currentSequence.value.length == 0) {
      toast.value.display(ToastType.Error, "Sequence cannot be empty");
      return;
    }
    console.log("final sequence", currentSequence.value);
    allSequences.value.push({
      name: currentSequenceName.value,
      items: currentSequence.value,
      id: Date.now(),
    });
  }
};

const handleNewDevice = () => {
  const deviceName = prompt("Please enter the device name", "Device Name");
  const deviceIp = prompt("Please enter the device ip", "192.168.0.0");
  if (deviceName == null || deviceName == "") {
    toast.value.display(ToastType.Error, "Device name cannot be empty");
    return;
  }

  if (deviceIp == null || deviceIp == "") {
    toast.value.display(ToastType.Error, "Device ip cannot be empty");
    return;
  }

  if (allDevices.value.find((device) => device.name == deviceName)) {
    toast.value.display(ToastType.Error, "Device name already exists");
    return;
  }

  if (allDevices.value.find((device) => device.ip == deviceIp)) {
    toast.value.display(ToastType.Error, "Device ip already exists");
    return;
  }

  let newDevice = {
    name: deviceName,
    ip: deviceIp,
    connected: false,
    id: Date.now(),
  };

  allDevices.value.push(newDevice);

  console.log(allDevices.value);
};

const handleDeviceClicked = (deviceId) => {
  let device = allDevices.value.find((device) => device.id == deviceId);

  // Disconnect if the clicked device is connected
  if (device.connected) {
    device.connected = false;
    currentDevice.value = "";
  }

  // Device is not already connected so disconnect the previous connceted device
  // and connect the clicked device
  else {
    let alreadyConnectedDevice = allDevices.value.find(
      (device) => device.connected,
    );

    device.connected = true;

    if (alreadyConnectedDevice != null)
      alreadyConnectedDevice.connected = false;

    currentDevice.value = device;
  }
};

const handleDeleteSequence = (sequenceId) => {
  const found = allSequences.value.find(
    (sequence) => sequence.id == sequenceId,
  );

  for (var i = 0; i < allSequences.value.length; i++) {
    if (allSequences.value[i].id == sequenceId) {
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

const handleDeleteDevice = (deviceId) => {
  const found = allDevices.value.find((device) => device.id == deviceId);

  if (found.connected) {
    toast.value.display(ToastType.Error, "Can't delete a connected device");
    return;
  }

  for (var i = 0; i < allDevices.value.length; i++) {
    if (allDevices.value[i].id == deviceId) {
      allDevices.value.splice(i, 1);
      break;
    }
  }
};

const handleModeSwitch = (mode) => {
  console.log("Mode: " + mode);
  selectedMode.value = mode;
};

const handleTimerChanged = (value) => {
  let parsedValue = parseInt(value);

  if (isNaN(parsedValue)) {
    toast.value.display(ToastType.Error, "Timer value is invalid");
    return;
  } else if (parsedValue < 0) {
    toast.value.display(
      ToastType.Error,
      "Timer value must be a positive number",
    );
    return;
  } else {
    timerValue.value = parsedValue;
  }
};

/*----------------------------------------------------------------------------*/
onMounted(async () => {
  protocol = await Protocol.load("armwar.proto");
  toast.value = new Toaster();

  // Force dismiss specific toast
  // instance.dismiss();

  // Dismiss all opened toast immediately
  // $toast.clear();
});
</script>

<!----------------------------------------------------------------------------->
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
        <Commands
          :selectedMode="selectedMode"
          :timerValue="timerValue"
          @button-mousedown="handleCommandPressed"
          @button-mouseup="handleCommandReleased"
          @mode-clicked="handleModeSwitch"
          @timer-changed="handleTimerChanged"
        />
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

<!----------------------------------------------------------------------------->
<style scoped>
@font-face {
  font-family: KronaOne;
  src: url("@/assets/KronaOne-Regular.ttf");
}

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
  background-color: var(--background);
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
  --background: #ffffff;

  --green: #a2da87;
  --red: #fb6d6a;
  --faded-red: #ff9d9b;
  --blue: #8bc8f4;
  --faded-blue: #a0c4de;
  --orange: #fbb46a;
  --faded-orange: #ffcb96;
  --purple: #d196ff;
  --faded-purple: #e0b9ff;
  --pink: #ff96b3;
  --faded-pink: #ffbccf;
  --grey: #d9d9d9;
  --black-text: #000000;

  --large: 50px;
  --medium: 25px;
  --small: 15px;
  --very-small: 12px;

  font-family: "KronaOne", sans-serif;
}
</style>
