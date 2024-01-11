<script setup>
import Button from "./button/button.vue";
import Mode from "./mode/mode.vue";
import rotate_cw_icon from "@/assets/rotate_cw_icon.png";
import rotate_ccw_icon from "@/assets/rotate_ccw_icon.png";
import release_icon from "@/assets/release_icon.png";
import forward_icon from "@/assets/forward_icon.png";
import backward_icon from "@/assets/backward_icon.png";
import up_icon from "@/assets/up_icon.png";
import press_icon from "@/assets/press_icon.png";
import left_icon from "@/assets/left_icon.png";
import down_icon from "@/assets/down_icon.png";
import right_icon from "@/assets/right_icon.png";
import set_default_icon from "@/assets/set_default_icon.png";
import stop_icon from "@/assets/stop_icon.png";
import reset_icon from "@/assets/reset_icon.png";
import { armwar } from "./../../scripts/protocol/armwar.js";
import { ref } from "vue";
import { getCurrentInstance } from "vue";
const { emit } = getCurrentInstance();

const { selectedMode } = defineProps(["selectedMode", "timerValue"]);

const handleButtonMousedown = (command, image) => {
  emit("button-mousedown", command, image);
};

const handleButtonMouseup = (command, image) => {
  emit("button-mouseup", command, image);
};

const handleModeClicked = (mode) => {
  emit("mode-clicked", mode);
};

const handleTimerChanged = (value) => {
  emit("timer-changed", value);
};
</script>

<template>
  <div class="commands">
    <h1>Commands</h1>
    <div class="button-holder">
      <Button
        :image="release_icon"
        @button-mousedown="handleButtonMousedown"
        @button-mouseup="handleButtonMouseup"
        :command="armwar.Command.RELEASE"
      />
      <Button
        :image="up_icon"
        @button-mousedown="handleButtonMousedown"
        @button-mouseup="handleButtonMouseup"
        :command="armwar.Command.UP"
      />
      <Button
        :image="press_icon"
        @button-mousedown="handleButtonMousedown"
        @button-mouseup="handleButtonMouseup"
        :command="armwar.Command.GRAB"
      />

      <Button
        :image="rotate_ccw_icon"
        @button-mousedown="handleButtonMousedown"
        @button-mouseup="handleButtonMouseup"
        :command="armwar.Command.ROTATE_CCW"
      />
      <Button
        :image="forward_icon"
        @button-mousedown="handleButtonMousedown"
        @button-mouseup="handleButtonMouseup"
        :command="armwar.Command.FORWARD"
      />
      <Button
        :image="rotate_cw_icon"
        @button-mousedown="handleButtonMousedown"
        @button-mouseup="handleButtonMouseup"
        :command="armwar.Command.ROTATE_CW"
      />

      <Button
        :image="left_icon"
        @button-mousedown="handleButtonMousedown"
        @button-mouseup="handleButtonMouseup"
        :command="armwar.Command.LEFT"
      />
      <Button
        :image="backward_icon"
        @button-mousedown="handleButtonMousedown"
        @button-mouseup="handleButtonMouseup"
        :command="armwar.Command.BACKWARD"
      />
      <Button
        :image="right_icon"
        @button-mousedown="handleButtonMousedown"
        @button-mouseup="handleButtonMouseup"
        :command="armwar.Command.RIGHT"
      />

      <Button
        :image="set_default_icon"
        @button-mousedown="handleButtonMousedown"
        @button-mouseup="handleButtonMouseup"
        :command="armwar.Command.SET"
      />
      <Button
        :image="down_icon"
        @button-mousedown="handleButtonMousedown"
        @button-mouseup="handleButtonMouseup"
        :command="armwar.Command.DOWN"
      />
      <Button
        :image="reset_icon"
        @button-mousedown="handleButtonMousedown"
        @button-mouseup="handleButtonMouseup"
        :command="armwar.Command.RESET"
      />

      <div class="button-holder other-holder">
        <Button
          other="true"
          :image="stop_icon"
          @button-mousedown="handleButtonMousedown"
          @button-mouseup="handleButtonMouseup"
          :command="armwar.Command.SET"
        />
      </div>
    </div>
    <Mode
      :selectedMode="selectedMode"
      :timerValue="timerValue"
      @mode-clicked="handleModeClicked"
      @timer-changed="handleTimerChanged"
    />
  </div>
</template>

<style scoped>
.commands {
  width: 100%;
}

.button-holder {
  display: grid;
  grid-template-columns: 30% 30% 30%;
  gap: 5%;
  width: calc(96px * 3 - 8px);
  margin: auto;
}

h1 {
  color: var(--black-text);
  font-weight: 600;
  font-size: var(--medium);
}

.other-holder {
  margin-top: 30px;
  grid-column: 2/3;
}

h1 {
  color: var(--black-text);
  font-weight: 400;
  margin-bottom: 40px;
  text-align: center;
}
</style>
