<script setup>
import { getCurrentInstance, ref } from "vue";
import press_mode_icon from "@/assets/press_mode_icon.png";
import timer_icon from "@/assets/timer_icon.png";
const { emit } = getCurrentInstance();

defineProps(["selectedMode", "timerValue"]);

function handleModeClicked(mode) {
  emit("mode-clicked", mode);

  if (mode == "timer") {
    let timerValue = prompt("Timer in milliseconds");
    emit("timer-changed", timerValue);
  }
}
</script>

<template>
  <div class="container">
    <button
      class="press_btn"
      :class="{ selected: selectedMode == 'press' }"
      @click="handleModeClicked('press')"
    >
      <img :src="press_mode_icon" />
    </button>
    <!--
    <p :style="selectedMode == 'timer'
        ? { visibilty: 'visible' }
        : { visibility: 'hidden' }
      ">
      {{ timerValue }} ms
    </p>
    -->
    <p>{{ timerValue }} ms</p>
    <button
      class="timer_btn"
      :class="{ selected: selectedMode == 'timer' }"
      @click="handleModeClicked('timer')"
    >
      <img :src="timer_icon" />
    </button>
  </div>
</template>

<style scoped>
.selected {
  background-color: var(--pink);
}

.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 120px;
}

p {
  text-align: center;
  width: 200px;
  font-size: var(--small);
  font-style: italic;
}

button {
  cursor: pointer;
  outline: none;
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: 64px;
  height: 64px;
  padding: 10px;
  transition: background-color 0.3s;
}

button img {
  width: 100%;
  height: 100%;
}

button:hover {
  background-color: var(--pink);
}

button:active {
  background-color: var(--faded-pink);
}
</style>
