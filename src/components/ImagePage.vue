<template>
  <div>
    <h1>Images</h1>

    <div v-if="step == 1">
      <div class="alert alert-primary" role="alert">
          If there is something bad on the picture, click on it!
      </div>

      <img id="image1" src="../assets/tasks/images/1.png" width="500" @click="task1Image"/>
    </div>

    <div v-if="step == 2">
      <div class="alert alert-primary" role="alert">
          If there is something bad on the picture, click on it!
      </div>
      <img id="image2" src="../assets/tasks/images/2.png" width="500" @click="task2Image"/>
    </div>

    <user-guide
      ref="assistant"
      msg="Great. Now you know what you can post and what not. But watch out this also count for photos.\nI will show you what I mean."
      actionA="Yes, tell me more about it!"
      :actionAFunc="showTask1"
    ></user-guide>
  </div>
</template>

<script>

import UserGuide from './UserGuide.vue';

export default {
  name: "ImagePage",
  components: {UserGuide},
  data() {
    return {
      name: "",
      step: 0,
      failCount: 0,
    };
  },
  methods: {
    showTask1() {
      this.step = 1;
      this.$refs.assistant.updateMessage('What do you think about this picture? Should we post it? If not show me what could be a problem.');
      this.$refs.assistant.updateActions("I don't find anything problematic", this.task1Fail);
    },
    task1Image(event) {
      const rect = document.getElementById('image1').getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      const bb = {
        x: 160,
        y: 215,
        width: 25,
        height: 20
      }

      if (this._checkIfInRectangle(x, y, bb)) {
        this.task1Pass()
      } else {
        this.$refs.assistant.updateMessage("Nothing problematic with that. Anything else?");
        this.failCount++;
        if (this.failCount > 3) {
          this.task1Fail()
        }
      }
    },
    task1Fail() {
      this.$refs.assistant.updateMessage('Watch out. On this picture personal information like the house number is leaked.');
      this.$refs.assistant.updateActions('Continue', this.showTask2);
    },
    task1Pass() {
      this.$refs.assistant.updateMessage('You are right. On this picture we leak the house number. We do not want this information on the internet.');
      this.$refs.assistant.updateActions('Continue', this.showTask2);
    },
    showTask2() {
      this.step = 2;
      this.failCount = 0;
      this.$refs.assistant.updateMessage('What do you think about this picture? Should we post it?');
      this.$refs.assistant.updateActions("I don't find anything problematic", this.task2Fail);
    },
    task2Image(event) {
      const rect = document.getElementById('image2').getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      const bb = {
        x: 328,
        y: 118,
        width: 30,
        height: 20
      }

      if (this._checkIfInRectangle(x, y, bb)) {
        this.task2Pass()
      } else {
        this.$refs.assistant.updateMessage("Nothing problematic with that. Are you sure that we can't post it?");
        this.failCount++;
        if (this.failCount > 3) {
          this.task2Fail()
        }
      }
    },
    task2Fail() {
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
    _checkIfInRectangle(x, y, rect) {
      console.log(x, y, rect)
      return x > rect.x && x < rect.x + rect.width && y > rect.y && y < rect.y + rect.height
    }
  },
};
</script>
<style scoped>
  img {
    cursor: crosshair;
  }
</style>