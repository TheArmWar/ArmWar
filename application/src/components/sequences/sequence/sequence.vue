<script setup scoped>
import { ref } from "vue";
import { defineProps, getCurrentInstance } from "vue";
const { emit } = getCurrentInstance();
import play_icon from "@/assets/play_icon.png";
import chevron_icon from "@/assets/chevron_icon.png";
import delete_icon from "@/assets/delete_icon.png";

const { sequenceName, movements } = defineProps(["sequenceName", "movements"]);
const isCollapsed = ref(false);

function collapseSequence() {
  isCollapsed.value = !isCollapsed.value;
}

function playSequence() {
  emit("play-sequence", sequenceName);
}
</script>

<template>
  <div
    class="sequence"
    :style="
      isCollapsed ? 'border-radius: 27px' : 'border-radius: 27px 27px 0 0'
    "
  >
    <div class="metadata">
      <button class="button" @click="playSequence">
        <img :src="play_icon" alt="arrow" />
      </button>
      <h1>{{ sequenceName }}</h1>
      <button class="button half" @click="collapseSequence">
        <img
          :src="chevron_icon"
          alt="arrow"
          :style="
            isCollapsed
              ? 'transform: rotate(0deg)'
              : 'transform: rotate(-90deg)'
          "
        />
      </button>
    </div>
    <div class="movements-holder" v-if="!isCollapsed">
      <div class="movement" v-for="movement in movements">
        <img :src="movement" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* the button here are just clickable svg so disable everything except the cursor changr */
.button {
  margin: auto;
  cursor: pointer;
  outline: none;
  border: none;
  width: 90%;
  height: 100%;
  background-color: transparent;
}

.half {
  width: 45% !important;
}

.button > img {
  width: 32px;
  height: 32px;
}

h1 {
  color: var(--white-text);
  font-weight: 400;
  text-align: center;
  margin-bottom: 5px;
  margin-top: 5px;
  /* ellipsis */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.metadata {
  display: grid;
  grid-template-columns: 10% 70% 20%;
  margin: auto;
}

.sequence {
  background-color: var(--secondary);
}

.sequence:first-child {
  margin-top: 0;
  border-radius: 20px 20px 0 0;
  margin-bottom: 10px;
}

.sequence-bottom-border-radius {
  border-radius: 20px 20px 20px 20px;
}

.sequence-header {
  display: grid;
  grid-template-columns: 10% 70% 10%;
  gap: 5%;
  justify-items: center;
  align-items: center;
}

.sequence-header img {
  width: 32px !important;
  height: 32px !important;
}

.sequence-header button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.sequence-header h1 {
  align-self: center;
  margin: auto;
}

.movements-holder {
  background-color: var(--primary);
  color: var(--white-text);
  overflow-x: auto;
  white-space: nowrap;
  padding: 10px;
}

.movement {
  display: inline-block;
  margin-right: 10px;
}

.movement > img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.movement > img:last-child {
  margin-right: 0;
}

.movements-holder::-webkit-scrollbar {
  width: 10px;
}

.movements-holder::-webkit-scrollbar-track {
  background: var(--primary);
}

.movements-holder::-webkit-scrollbar-thumb {
  background-color: var(--secondary);
  border-radius: 20px;
  border: 3px solid var(--primary);
}
</style>
