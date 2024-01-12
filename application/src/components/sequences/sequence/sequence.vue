<script setup scoped>
import { ref } from "vue";
import SequenceItem from "./../sequence-item/sequence-item.vue";
import { defineProps, getCurrentInstance } from "vue";
import play_icon from "@/assets/play_icon.png";
import erase_icon from "@/assets/erase_icon.png";
const { emit } = getCurrentInstance();

const { sequenceName, items, id } = defineProps([
  "sequenceName",
  "items",
  "id",
]);
const isCollapsed = ref(false);

function collapseSequence() {
  isCollapsed.value = !isCollapsed.value;
}

function playSequence() {
  emit("play-sequence", id);
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
      <button class="play_btn" @click="playSequence">
        <img class="play_icon" :src="play_icon" alt="play_icon" />
      </button>
      <h1 @click="collapseSequence">{{ sequenceName }}</h1>
      <button class="erase_btn" @click="$emit('delete-sequence', id)">
        <img class="erase_icon" :src="erase_icon" alt="erase_icon" />
      </button>
    </div>
    <div class="movements-holder" v-if="!isCollapsed">
      <SequenceItem
        :icon="item.image"
        :duration="item.duration"
        v-for="item in items"
      />
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
  background-color: transparent;
  border: none;
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
}

.play_icon {
  width: 24px;
  height: 24px;
  border-radius: 25px;
  padding: 3px;
  transition: background-color 0.3s;
}

.play_btn:hover .play_icon {
  background-color: var(--green);
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

.metadata {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
