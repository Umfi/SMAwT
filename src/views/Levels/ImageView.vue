<template>
  <base-level :level_id="level_id" :level_name="level_name" :max_points="max_points" :max_steps="max_steps" ref="base">
    <template v-slot="{step}">

    <div v-if="step == 1" class="text-center">
      <h1>Images</h1>
      <image-game key="game1" ref="game1" image="1.png" :bb="{ x: 160, y: 215, width: 25, height: 20 }" @game-over="task1ImageResult"/>
    </div>

    <div v-if="step == 2" class="text-center">
      <h1>Images</h1>
      <image-game key="game2" ref="game2" image="2.png" :bb="{ x: 328, y: 118, width: 30, height: 20 }" @game-over="task2ImageResult"/>
    </div>

    </template>
  </base-level>
</template>

<script>

import BaseLevel from '../../components/BaseLevel.vue';
import ImageGame from '../../components/Games/ImageGame.vue';

export default {
  name: "ImageView",
  components: {BaseLevel, ImageGame},
  data() {
    return {
      level_id: 4,
      level_name: "Images",
      max_points: 10,
      max_steps: 3,
    };
  },
  mounted() {
    this.$refs.base.$refs.assistant.updateMessage("Great. Now you know what you can post and what not. But watch out this also count for photos.\nI will show you what I mean.");
    this.$refs.base.$refs.assistant.updateActions('Yes, tell me more about it!', this.showTask1);
  },
  methods: {
    showTask1() {
      this.$refs.base.step = 1;
      this.$refs.base.$refs.assistant.updateMessage('What do you think about this picture? Should we post it? If not show me what could be a problem.');
      this.$refs.base.$refs.assistant.updateActions("I don't find anything problematic", this.task1Fail);
    },
    task1ImageResult(result) {
      if (result == -1) {
        this.$refs.base.$refs.assistant.updateMessage("Nothing problematic with that. Anything else?");
        this.$refs.base.points--;
      } else if (result == 0) {
        this.task1Fail()
      } else if (result == 1) {
        this.task1Pass()
      } 
    },
    task1Fail() {
      this.$refs.base.points--;
      this.$refs.game1.showHint();
      this.$refs.base.$refs.assistant.updateMessage('Watch out. On this picture personal information like the house number is leaked.');
      this.$refs.base.$refs.assistant.updateActions('Continue', this.showTask2);
    },
    task1Pass() {
      this.$refs.base.points += 5;
      this.$refs.base.$refs.assistant.updateMessage('You are right. On this picture we leak the house number. We do not want this information on the internet.');
      this.$refs.base.$refs.assistant.updateActions('Continue', this.showTask2);
    },
    showTask2() {
      this.$refs.base.step = 2;
      this.$refs.base.$refs.assistant.updateMessage('What do you think about this picture? Should we post it?');
      this.$refs.base.$refs.assistant.updateActions("I don't find anything problematic", this.task2Fail);
    },
    task2ImageResult(result) {
      
      if (result == -1) {
        this.$refs.base.$refs.assistant.updateMessage("Nothing problematic with that. Anything else?");
        this.$refs.base.points--;
      } else if (result == 0) {
        this.task2Fail()
      } else if (result == 1) {
        this.task2Pass()
      } 
    },
    task2Fail() {
      this.$refs.base.points--;
      this.$refs.game2.showHint();
      this.$refs.base.$refs.assistant.updateMessage('Watch out. On this picture personal information like a password is leaked.');
      this.$refs.base.$refs.assistant.updateActions('Continue', this.$refs.base.finishLevel);
    },
    task2Pass() {
      this.$refs.base.points += 5;
      this.$refs.base.$refs.assistant.updateMessage('You are right. On this picture we leak a password. We do not want this information on the internet.');
      this.$refs.base.$refs.assistant.updateActions('Continue', this.$refs.base.finishLevel);
    },
  },
};
</script>