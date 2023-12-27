<script setup>
import { ref } from "vue";
import { getCurrentInstance } from "vue";
const { emit } = getCurrentInstance();
import robot_arm_icon from "@/assets/robot_arm_icon.png";
import erase_icon from "@/assets/erase_icon.png";

defineProps(["name", "connected", "id"]);
</script>

<style scoped>
.container {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  cursor: pointer;
  display: grid;
  grid-template-columns: 80% 20%;
}

.connected {
  color: var(--green);
}

.arm_icon {
  margin-right: 20px;
  width: 32px;
  height: 32px;
}

.erase_icon {
  width: 24px;
  height: 24px;
}

a {
  display: flex;
}

h1 {
  font-weight: 400;
  color: var(--black-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: var(--small);
}

button {
  margin: auto;
  outline: none;
  background-color: transparent;
  border: none;
}
</style>

<template>
  <div class="container">
    <a @click="$emit('device-clicked', id)">
      <img class="arm_icon" :src="robot_arm_icon" alt="robot arm icon" />
      <h1 :class="{ connected: connected }">{{ name }}</h1>
    </a>
    <button @click="$emit('delete-device', id)">
      <img class="erase_icon" :src="erase_icon" alt="erase icon" />
    </button>
  </div>
</template>
