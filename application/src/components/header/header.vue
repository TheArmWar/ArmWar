<script setup>
import { ref } from "vue";
import connect_icon from "@/assets/connect_icon.png";
const { name } = defineProps(["name"]);
</script>
<style scoped>
.main {
  width: 100%;
  border-radius: 0 0 20px 20px;
  margin-bottom: 20px;
  display: flex;
  background-color: var(--background);
  padding-top: 25px;
}

.menu {
  height: 50px;
  width: 100%;
  display: grid;
  grid-template-columns: 3.5% 16.5% 60% 20%;
}

h1 {
  max-width: 300px;
  margin: auto;
  padding-left: 10px;
  font-weight: 400;
  color: var(--black-text);
  font-size: var(--large);
  /* ellipsis */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.name {
  justify-content: left;
  margin-left: 0px !important;
  font-size: var(--medium);
}

img {
  width: 32px;
  height: 32px;
  margin: auto;
  margin-right: 10px;
}
</style>

<template>
  <div class="main">
    <div class="menu">
      <img v-if="name" :src="connect_icon" alt="connect icon" />
      <span v-else-if="!name" />
      <h1 class="name">{{ name }}</h1>
      <h1>ArmWar</h1>
    </div>
  </div>
</template>
