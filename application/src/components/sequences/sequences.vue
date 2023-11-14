<script setup>
import { ref } from "vue";
import { getCurrentInstance } from "vue";
const { emit } = getCurrentInstance();

import Sequence from "./sequence/sequence.vue";

const { isRecording, allSequences } = defineProps([
  "isRecording",
  "allSequences",
]);

const handleNewSequence = () => {
  emit("new-sequence");
};

const handleDeleteSequence = (sequenceName) => {
  emit("delete-sequence", sequenceName);
  console.log(allSequences);
};

const handlePlaySequence = (sequenceName) => {
  emit("play-sequence", sequenceName);
};

const deleteSequence = () => {
  emit("delete-sequence");
};
</script>

<template>
  <div class="sequences">
    <h1>Sequences</h1>
    <div class="sequences-holder">
      <Sequence
        v-for="sequence in allSequences"
        :sequenceName="sequence.name"
        :movements="sequence.movements"
        @delete-sequence="handleDeleteSequence"
        @play-sequence="handlePlaySequence"
      />
    </div>
    <div>
      <button
        class="button"
        :class="{ recording: isRecording }"
        @click="handleNewSequence"
      >
        {{ isRecording ? "save" : "new" }}
      </button>
    </div>
    <button
      class="button delete"
      @click="deleteSequence"
      v-if="allSequences.length > 0"
    >
      Delete a sequence
    </button>
  </div>
</template>

<style scoped>
.sequences {
  width: 90%;
}

.recording {
  background-color: var(--green) !important;
  color: var(--secondary) !important;
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

h1 {
  color: var(--white-text);
  font-weight: 400;
  margin-bottom: 40px;
  text-align: center;
}
</style>
