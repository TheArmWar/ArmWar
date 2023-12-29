<script setup>
import { getCurrentInstance } from "vue";
const { emit } = getCurrentInstance();

import Sequence from "./sequence/sequence.vue";

const { isRecording, allSequences } = defineProps([
  "isRecording",
  "allSequences",
]);

const handleDeleteSequence = (sequenceId) => {
  emit("delete-sequence", sequenceId);
};

const handlePlaySequence = (sequenceId) => {
  emit("play-sequence", sequenceId);
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
        :id="sequence.id"
        @delete-sequence="handleDeleteSequence"
        @play-sequence="handlePlaySequence"
      />
    </div>
    <div>
      <button
        class="button"
        :class="{ recording: isRecording }"
        @click="$emit('new-sequence')"
      >
        {{ isRecording ? "save" : "new" }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.sequences {
  width: 90%;
}

.recording {
  background-color: var(--green) !important;
  color: var(--black-text) !important;
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

h1 {
  color: var(--black-text);
  font-weight: 400;
  margin-bottom: 40px;
  text-align: center;
  font-size: var(--medium);
}
</style>
