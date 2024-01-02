<script setup>
import { ref } from "vue";
import { getCurrentInstance } from "vue";
const { emit } = getCurrentInstance();
import Device from "./device/device.vue";

const { allDevices } = defineProps(["allDevices"]);

const handleDeleteDevice = (deviceId) => {
  emit("delete-device", deviceId);
};

const handleDeviceClicked = (deviceId) => {
  allDevices.forEach((device) => {
    device.active = device.id == deviceId;
  });
  emit("device-clicked", deviceId);
};
</script>

<template>
  <div class="devices">
    <h1>Available devices</h1>
    <Device
      v-for="device in allDevices"
      :name="device.name"
      :connected="device.connected"
      :id="device.id"
      @device-clicked="handleDeviceClicked"
      @delete-device="handleDeleteDevice"
    />
    <button class="button" @click="$emit('new-device')">new</button>
  </div>
</template>

<style scoped>
h1 {
  color: var(--black-text);
  font-weight: 400;
  text-align: center;
  font-size: var(--medium);
}

.devices {
  display: flex;
  flex-direction: column;
  gap: 0px;
}

.button {
  margin: auto;
  margin-top: 25px;
  width: 72px;
  height: 32px;
  border-radius: 20px;
  display: flex;
  background-color: var(--orange);
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;
  outline: none;
  border: none;
  margin-bottom: 25px;
  color: var(--black-text);
  font-size: var(--small);
}

.button:hover {
  background-color: var(--faded-orange);
}
</style>
