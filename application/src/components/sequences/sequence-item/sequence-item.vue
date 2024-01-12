<script setup scoped>
import { ref } from "vue";

const { icon, duration } = defineProps(["icon", "duration"]);
</script>

<template>
  <div class="sequence-item">
    <img :src="icon" />
    <p class="duration">{{ duration }}</p>
  </div>
</template>

<style scoped>
.sequence-item {
  position: relative;
  display: inline-block;
  cursor: pointer;
  margin-right: 10px;
  width: 40px;
  height: 40px;
}

img {
  width: 100%;
  height: 100%;
}

p {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  text-align: center;
  visibility: hidden;
  font-size: var(--very-small);
}

.sequence-item:hover img {
  opacity: 0.1;
  transition: 0.2s;
}

.sequence-item:hover p {
  visibility: visible;
  transition: 0.2s;
}
</style>
