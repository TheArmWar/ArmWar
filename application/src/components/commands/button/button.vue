<script setup>
import { ref } from "vue";
import { defineProps, getCurrentInstance } from "vue";

const { emit } = getCurrentInstance();

const { image, buttonName, other } = defineProps([
  "image",
  "buttonName",
  "other",
]);

const handleClick = () => {
  emit("button-clicked", buttonName, image);
};
</script>

<template>
  <div class="single-button-holder">
    <button
      class="button"
      :class="other ? 'other-button' : ''"
      @click="handleClick"
    >
      <img :src="image" alt="arrow" />
    </button>
  </div>
</template>

<style scoped>
.single-button-holder {
  width: 100%;
}

.other-button {
  width: 48px !important;
  height: 48px !important;
  border-radius: 10px !important;
}

.other-button img {
  width: 28px;
  height: 28px;
}

.button {
  margin: auto;
  width: 72px;
  height: 72px;
  border-radius: 20px;
  display: flex;
  background-color: var(--grey);
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;
  outline: none;
  border: none;
}

.button:hover {
  background-color: var(--grey);
}

.button:active {
  background-color: var(--grey);
}

img {
  width: 80%;
  height: 80%;
}
</style>
