<script setup>
import { ref } from "vue";
import { getCurrentInstance } from "vue";

import robot_arm_icon from "@/assets/robot_arm_icon.png";
import erase_icon from "@/assets/erase_icon.png";

const { emit } = getCurrentInstance();
defineProps(["name", "connected", "id"]);
</script>

<style scoped>
.device_container {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  cursor: pointer;
  display: grid;
  grid-template-columns: 90% 10%;
  border-radius: 20px;
}

.erase_btn {
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.erase_icon {
  width: 24px;
  height: 24px;
  border-radius: 25px;
  padding: 3px;
  transition: background-color 0.3s;
}

.erase_btn:hover .erase_icon {
  background-color: var(--red);
}

.connected {
  color: var(--green);
}

.arm_icon {
  margin-right: 20px;
  width: 48px;
  height: 48px;
}

a {
  display: flex;
  justify-content: left;
  align-items: center;
}

h1 {
  font-weight: 400;
  color: var(--black-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: var(--small);
}
</style>

<template>
  <div class="device_container">
    <a @click="$emit('device-clicked', id)">
      <img class="arm_icon" :src="robot_arm_icon" alt="robot arm icon" />
      <h1 :class="{ connected: connected }">{{ name }}</h1>
    </a>
    <button class="erase_btn" @click="$emit('delete-device', id)">
      <img class="erase_icon" :src="erase_icon" alt="erase icon" />
    </button>
  </div>
</template>
