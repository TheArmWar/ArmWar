<script setup>
import { ref } from "vue";
import { getCurrentInstance } from "vue";
const { emit } = getCurrentInstance();
import connect_icon from "@/assets/connect_icon.png";
import disconnect_icon from "@/assets/disconnect_icon.png";
defineProps(["name", "connected", "id"]);
</script>

<style scoped>
.main {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
}

a {
  margin: auto;
  width: 70%;
  display: flex;
  justify-content: left;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s;
  outline: none;
  border: none;
}

h1 {
  margin: auto;
  margin-left: 0;
  font-weight: 400;
  color: var(--white-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  align-items: center;
  justify-content: left;
}

.connected {
  color: var(--green);
}

img {
  width: 32px;
  height: 32px;
  margin-right: 10px;
  filter: invert(1);
}
</style>

<template>
  <div class="main">
    <a @click="$emit('device-clicked', id)">
      <img v-if="connected" :src="connect_icon" alt="connect icon" />
      <img
        v-else-if="!connected"
        :src="disconnect_icon"
        alt="disconnect icon"
      />
      <h1 :class="{ connected: connected }">{{ name }}</h1>
    </a>
  </div>
</template>
