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

const timeout_ms = 3000;

var protocol = null;

const allSequences = ref([]);
const allDevices = ref([]);

const currentDevice = ref("");
const isRecording = ref(false);
const currentSequence = ref([]);
const currentSequenceName = ref("");

const toast = ref("");

const handleClickParent = async (buttonName, image) => {
  if (isRecording.value) {
    currentSequence.value.push(image);
  } else {
    try {
      if (currentDevice.value == null || currentDevice.value == "") {
        toast.value.display(ToastType.Error, "No device selected");
        return;
      }

      // Build a payload matching the buttonName command
      const payload = protocol.buildCommand(buttonName);

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
        toast.value.display(ToastType.Success, "Command success");
      else toast.value.display(ToastType.Error, "Command failed");
    } catch (error) {
      toast.value.display(ToastType.Error, error.message);
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
      movements: currentSequence.value,
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

onMounted(async () => {
  protocol = await Protocol.load("armwar.proto");
  toast.value = new Toaster();

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

  --blue: #8bc8f4;
  --faded-blue: #a0c4de;

  --grey: #d9d9d9;

  --black-text: #000000;

  --large: 50px;
  --medium: 25px;
  --small: 15px;

  font-family: "KronaOne", sans-serif;
}
</style>
