<template>
  <div>
    <h1>Images</h1>

    <div v-if="step == 1">
      <image-game key="game1" ref="game1" image="1.png" :bb="{ x: 160, y: 215, width: 25, height: 20 }" @game-over="task1ImageResult"/>
    </div>

    <div v-if="step == 2">
       <image-game key="game2" ref="game2" image="2.png" :bb="{ x: 328, y: 118, width: 30, height: 20 }" @game-over="task2ImageResult"/>
    </div>

    <user-guide
      ref="assistant"
      :msg="'Great. Now you know what you can post and what not. But watch out this also count for photos.\nI will show you what I mean.'"
      actionA="Yes, tell me more about it!"
      :actionAFunc="showTask1"
    ></user-guide>
  </div>
</template>

<script>

import UserGuide from './UserGuide.vue';
import ImageGame from './Games/ImageGame.vue';

export default {
  name: "ImagePage",
  components: {UserGuide, ImageGame},
  data() {
    return {
      name: "",
      step: 0,
    };
  },
  methods: {
    showTask1() {
      this.step = 1;
      this.$refs.assistant.updateMessage('What do you think about this picture? Should we post it? If not show me what could be a problem.');
      this.$refs.assistant.updateActions("I don't find anything problematic", this.task1Fail);
    },
    task1ImageResult(result) {
      if (result == -1) {
        this.$refs.assistant.updateMessage("Nothing problematic with that. Anything else?");
      } else if (result == 0) {
        this.task1Fail()
      } else if (result == 1) {
        this.task1Pass()
      } 
    },
    task1Fail() {
      this.$refs.game1.showHint();
      this.$refs.assistant.updateMessage('Watch out. On this picture personal information like the house number is leaked.');
      this.$refs.assistant.updateActions('Continue', this.showTask2);
    },
    task1Pass() {
      this.$refs.assistant.updateMessage('You are right. On this picture we leak the house number. We do not want this information on the internet.');
      this.$refs.assistant.updateActions('Continue', this.showTask2);
    },
    showTask2() {
      this.step = 2;
      this.$refs.assistant.updateMessage('What do you think about this picture? Should we post it?');
      this.$refs.assistant.updateActions("I don't find anything problematic", this.task2Fail);
    },
    task2ImageResult(result) {
      
      if (result == -1) {
        this.$refs.assistant.updateMessage("Nothing problematic with that. Anything else?");
      } else if (result == 0) {
        this.task2Fail()
      } else if (result == 1) {
        this.task2Pass()
      } 
    },
    task2Fail() {
      this.$refs.game2.showHint();
      this.$refs.assistant.updateMessage('Watch out. On this picture personal information like a password is leaked.');
      this.$refs.assistant.updateActions('Continue', this.next);
    },
    task2Pass() {
      this.$refs.assistant.updateMessage('You are right. On this picture we leak a password. We do not want this information on the internet.');
      this.$refs.assistant.updateActions('Continue', this.next);
    },
    next() {
      this.$emit('next')
    },
  },
};
</script>