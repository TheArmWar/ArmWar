<script setup scoped>
import { ref } from "vue";
import { defineProps, getCurrentInstance } from "vue";
const { emit } = getCurrentInstance();
import play_icon from "@/assets/play_icon.png";
import erase_icon from "@/assets/erase_icon.png";

const { sequenceName, movements, id } = defineProps([
  "sequenceName",
  "movements",
  "id",
]);
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
      <button @click="playSequence">
        <img class="play_icon" :src="play_icon" alt="play_icon" />
      </button>
      <h1 @click="collapseSequence">{{ sequenceName }}</h1>
      <button @click="$emit('delete-sequence', id)">
        <img class="erase_icon" :src="erase_icon" alt="erase_icon" />
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
h1 {
  color: var(--black-text);
  font-size: var(--small);
  font-weight: 400;
  text-align: center;
  /* ellipsis */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}

button {
  cursor: pointer;
  outline: none;
  border: none;
  background-color: transparent;
  margin-left: 5px;
  margin-right: 5px;
}

.play_icon {
  width: 32px;
  height: 32px;
}

.erase_icon {
  width: 24px;
  height: 24px;
}

.metadata {
  display: flex;
  justify-content: space-between;
}

.sequence {
  background-color: var(--blue);
  margin-bottom: 20px;
}

.movements-holder {
  background-color: var(--faded-blue);
  color: var(--black-text);
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
  background: var(--black-text);
}

.movements-holder::-webkit-scrollbar-thumb {
  background-color: var(--black-text);
  border-radius: 20px;
  border: 3px solid var(--black-text);
}
</style>
