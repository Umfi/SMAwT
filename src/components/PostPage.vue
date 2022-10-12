<template>
  <div>
    <h1>Posts</h1>




    <div v-if="step == 1">
      
        <h3>Keep does rules in mind!</h3>
        <ul class="list-group">
            <li class="list-group-item">Think before you post.</li>
            <li class="list-group-item">Be empathetic and consider your choice of words.</li>
            <li class="list-group-item">Be respectful of differences.</li>
            <li class="list-group-item">Do not be rude even if you don't agree with their views.</li>
            <li class="list-group-item">Do not spread false information or rumours.</li>
            <li class="list-group-item" >Do not post private information.</li>
            <li class="list-group-item" >Do not post negative thoughts and opinions about your school or workplace.</li>
        </ul>
    </div>

    <div v-if="step == 2">
        <container-game ref="game1" :items="firstGame"></container-game>
    </div>

    <div v-if="step == 3">
      <simple-post :author="user" message="I will make a party next weekend. Come all to my place in the Dancer Street 12 at 8pm."></simple-post>
    </div>

    <user-guide
      ref="assistant"
      msg="Great. Now you know how to set a secure password and what data is personal information and should kept private.\nBut before you post something, lets learn what we can and post and what we better do not post."
      actionA="Continue"
      :actionAFunc="showTask1Pre"
    ></user-guide>
  </div>
</template>

<script>

import UserGuide from './UserGuide.vue';
import SimplePost from './SimplePost.vue';
import {mapGetters} from 'vuex';

export default {
  name: "PostPage",
  components: {UserGuide, SimplePost},
  data() {
    return {
      step: 0,
      firstGame: [
         { name: "Think before posting.", type: 'good'},
         { name: "Consider choice of words.", type: 'good' },
         { name: "Be respectful of differences.", type: 'good' },
         { name: "Do not be rude.", type: 'good' },
         { name: "Be rude if you don't agree with something.", type: 'bad' },
         { name: "Spread false information.", type: 'bad' },
         { name: "Post something that is not true.", type: 'bad'},
         { name: "Post private information.", type: 'bad' },
         { name: "Post negative thoughts and opinions about school or workplace.", type: 'bad'},
         { name: "Check grammar of the post.", type: 'good' },
         { name: "Share secrets with others.", type: 'bad' },
      ],
    };
  },
  computed: {
    ...mapGetters([
        'user'
    ]),
  },
  methods: {
    showTask1Pre() {
      this.step = 1;
      this.$refs.assistant.updateMessage("All this should be common sense anyway, right?\n\nBut it doesn't hurt to learn about it.");
      this.$refs.assistant.updateActions('Sure, good idea.', this.showTask1);
    },
    showTask1() {
      this.allList.sort(() => Math.random() - 0.5);
      this.step = 2;
      this.$refs.assistant.updateMessage("Just tell me, when every i should check your work.");
      this.$refs.assistant.updateActions('I think I am done.', this.task1Check);
    },
    task1Check() {
      const result = this.$refs.game1.check();

      if (result == -1) {
        this.$refs.assistant.updateMessage("There are still some items in the 'all' column. Move all items to the according colum and i will check it again.");
        return;
      } else if (result == 0) {
        this.$refs.assistant.updateMessage("There are still some mistakes. Try again. I am sure you will manage it now.");
        return;
      } else {
        this.step = -1;
        this.$refs.assistant.updateMessage('You are right. Everything was correct.');
        this.$refs.assistant.updateActions('Continue', this.showTask2);
      }
    },
    showTask2() {
      this.step = 3;
      this.$refs.assistant.updateMessage("What do you think about this post? Can we post it without any problem?");
      this.$refs.assistant.updateActions('This post is fine!', this.task2Fail, 'No, we should not post this!', this.task2Pass);
    },
    task2Fail() {
      this.$refs.assistant.updateMessage('Nope. You should never post your adress online.');
      this.$refs.assistant.updateActions('Continue', this.next);
    },
    task2Pass() {
      this.$refs.assistant.updateMessage('You are right. The adress is private information and should not be shared online.');
      this.$refs.assistant.updateActions('Continue', this.next);
    },
    next() {
      this.$emit('next')
    },
  },
};
</script>