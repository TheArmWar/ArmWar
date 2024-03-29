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
  buildTimedCommand,
  buildStatedCommand,
  buildSpannedCommand,
  buildTimedSequence,
  buildConnectCommand,
  buildDisconnectCommand,
} from "./scripts/protocol/protocol.js";

// Imports requests
import { RequestStatus, request } from "./scripts/requests/requests.js";
import { armwar } from "./scripts/protocol/armwar";
/*----------------------------------------------------------------------------*/
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
function isSpan(command) {
  return (
    command == armwar.Command.STOP ||
    command == armwar.Command.SET ||
    command == armwar.Command.RESET
  );
}

async function disconnect(device) {
  const disconnectCommand = buildDisconnectCommand();
  const disconnected = await processRequest(
    device.ip,
    "logout",
    disconnectCommand,
  );

  if (disconnected) {
    device.connected = false;
    currentDevice.value = "";
  }

  return disconnected;
}

async function connect(device) {
  const connectCommand = buildConnectCommand();
  const connected = await processRequest(device.ip, "login", connectCommand);

  if (connected) {
    device.connected = true;
    currentDevice.value = device;
  }
  return connected;
}

/**
 * @function processRequest Wraps the request to avoid telling the toast each time
 * @param {String} ip
 * @param {String} endpoint
 * @param {Uint8Array<Byte>} payload
 * @returns boolean (True on success, False on error)
 */
async function processRequest(ip, endpoint, payload) {
  const result = await request(ip, endpoint, payload);

  if (result.result == RequestStatus.SUCCESS) {
    toast.value.display(ToastType.Success, "Command success");
    return true;
  } else if (result.result == RequestStatus.ERROR) {
    if (result.message == "You are not connected to the arm.") {
      toast.value.display(
        ToastType.Error,
        "Not connected to the arm anymore, disconnecting... ",
      );
      currentDevice.value.connected = false;
      currentDevice.value = "";
    } else
      toast.value.display(ToastType.Error, "Command error: " + result.message);
    return false;
  } else {
    toast.value.display(ToastType.Error, "Command failed: " + result.message);
    return false;
  }
}

function isDeviceSelected(currentDevice) {
  if (currentDevice == null || currentDevice == "") {
    toast.value.display(ToastType.Error, "No device selected");
    return false;
  }

  return true;
}

function handleRecordingTimer() {
  timerValue.value = Date.now() - recordingTimerRefMs.value;
}

/*----------------------------------------------------------------------------*/
const handleStop = async () => {
  if (!isDeviceSelected(currentDevice.value)) return;

  await processRequest(currentDevice.value.ip, "stop", new Uint8Array());
};

const handleSequencePlay = (sequenceId) => {
  if (!isDeviceSelected(currentDevice.value)) return;

  const sequence = allSequences.value.find(
    (sequence) => sequence.id == sequenceId,
  );

  const commands = sequence.items.map((items) => items.command);
  const durations = sequence.items.map((items) => items.duration);

  const payload = buildTimedSequence(commands, durations);

  console.log(payload);

  processRequest(currentDevice.value.ip, "command", payload);
};

const handleCommandPressed = (command, image) => {
  // If the mode is not "press" then it should do nothing too
  if (selectedMode.value != "press") {
    return;
  }

  recordingTimerRefMs.value = Date.now();
  recordingTimerHandler.value = window.setInterval(handleRecordingTimer, 1);

  // Playing
  if (!isRecording.value) {
    if (!isDeviceSelected(currentDevice.value)) return;

    // Build a payload based on the mode
    let payload = "";
    if (isSpan(command)) {
      payload = buildSpannedCommand(command, 0.0);
    } else {
      payload = buildStatedCommand(command, true);
    }

    // Send the command and wait the response
    processRequest(currentDevice.value.ip, "command", payload);
  }
};

const handleCommandReleased = (command, image) => {
  if (selectedMode.value == "press") {
    window.clearInterval(recordingTimerHandler.value);
    timerValue.value = Date.now() - recordingTimerRefMs.value;
  }

  // Recording
  if (isRecording.value) {
    currentSequence.value.push({
      command: command,
      image: image,
      duration: timerValue.value,
    });
  }

  // Playing
  else {
    if (!isDeviceSelected(currentDevice.value)) return;

    // Build a payload based on the selected mode
    let payload = "";
    if (isSpan(command) && selectedMode.value == "press") {
      return;
    } else if (isSpan(command) && selectedMode.value == "timer") {
      payload = buildSpannedCommand(command, 0.0);
    } else if (selectedMode.value == "press") {
      payload = buildStatedCommand(command, false); // Press mode
    } else {
      payload = buildTimedCommand(command, timerValue.value); // Timed mode
    }

    // Send the command and wait the response
    processRequest(currentDevice.value.ip, "command", payload);
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

const handleDeviceClicked = async (deviceId) => {
  let device = allDevices.value.find((device) => device.id == deviceId);

  // Update the active device
  allDevices.value.forEach((device) => {
    device.active = device.id == deviceId;
  });

  // Disconnect if the clicked device is connected
  if (device.connected) {
    await disconnect(device);
  }

  // Device is not already connected so disconnect the previous connected device and connect the clicked device
  else {
    let alreadyConnectedDevice = allDevices.value.find(
      (device) => device.connected,
    );

    // Check if there is an already connected device
    if (alreadyConnectedDevice != null) {
      await disconnect(alreadyConnectedDevice);
    }

    await connect(device);
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
          @button-stop="handleStop"
          @mode-clicked="handleModeSwitch"
          @timer-changed="handleTimerChanged"
        />
        <Sequences
          @new-sequence="handleNewSequence"
          v-bind:isRecording="isRecording"
          v-bind:allSequences="allSequences"
          @delete-sequence="handleDeleteSequence"
          @play-sequence="handleSequencePlay"
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
