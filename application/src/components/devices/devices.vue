<script setup>
import { ref } from "vue";
import { getCurrentInstance } from "vue";
const { emit } = getCurrentInstance();
import Device from "./device/device.vue";

const { allDevices } = defineProps(["allDevices"]);

const handleNewDevice = () => {
  emit("new-device");
};
const deleteDevice = () => {
  emit("delete-device");
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
    />
    <button class="button" @click="handleNewDevice">new</button>
    <button
      class="button delete"
      @click="deleteDevice"
      v-if="allDevices.length > 0"
    >
      Delete a device
    </button>
  </div>
</template>

<style scoped>
h1 {
  color: var(--white-text);
  font-weight: 400;
  text-align: center;
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
  background-color: var(--secondary);
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;
  outline: none;
  border: none;
  margin-bottom: 25px;
  color: var(--white-text);
}

.button:hover {
  background-color: var(--terciary);
}

.button:active {
  background-color: var(--terciary-hover);
}

.delete {
  background-color: red;
  margin-top: -5px;
  width: 144px;
}

.delete:hover {
  background-color: #ff0000a6;
}

.delete:active {
  background-color: #ff000077;
}
</style>
