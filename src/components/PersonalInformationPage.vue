<template>
  <div>
    <h1>Personal information</h1>


    <div v-if="step == 1">
      
        <p class="lead">You should tread personal information like secrets. Don't tell them anybody in the internet.</p>
        <p class="lead">Following personal information is information that can be used to identify you.</p>
        
        <ul class="list-group">
            <li class="list-group-item">Name</li>
            <li class="list-group-item">Address</li>
            <li class="list-group-item">Phone Number</li>
            <li class="list-group-item">E-Mail Address</li>
            <li class="list-group-item">Date of birth</li>
            <li class="list-group-item">Social Security Number</li>
        </ul>
    </div>

    <div v-if="step == 2">

        <div class="alert alert-primary" role="alert">
          Click on all personal information items. Ignore the rest.
        </div>
        
        <falling-text-game :items="gameItems" @game-over="finishTask1"></falling-text-game>
    </div>


    <user-guide
      ref="assistant"
      msg="We have now often talked about personal information.\nWe know that we should not share this information and tread it like secrets.\n\nLets have a look what personal information actually is."
      actionA="Sure, tell me more about it."
      :actionAFunc="showTask1Pre"
    ></user-guide>
  </div>
</template>

<script>

import UserGuide from './UserGuide.vue';
import {mapGetters} from 'vuex';
import FallingTextGame from './Games/FallingTextGame.vue';

export default {
  name: "PersonalInformationPage",
  components: {UserGuide, FallingTextGame},
  data() {
    return {
      step: 0,
      gameItems: [
        {text: "Name", value: 1},
        {text: "Address", value: 1},
        {text: "Phone Number", value: 1},
        {text: "E-Mail Address", value: 1},
        {text: "Date of birth", value: 1},
        {text: "Social Security Number", value: 1},
        {text: "Favorite color", value: 0},
        {text: "Name of friend", value: 0},
        {text: "Name of pet", value: 0},
        {text: "Favorite meal", value: 0},
        {text: "Favorite number", value: 0},
        {text: "Password", value: 1},
        {text: "Credit Card", value: 1},
      ]
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
      this.$refs.assistant.updateMessage("Make sense, right?\n\nLet's practice it a bit with a fun game.");
      this.$refs.assistant.updateActions('Yes, lets play.', this.showTask1);
    },
    showTask1() {
      this.step = 2;
      this.$refs.assistant.updateMessage("Have fun, playing the game. Click on all personal information items. Ignore the rest.");
      this.$refs.assistant.updateActions('Thank you.', () => {});
    },
    finishTask1(points) {
      if (points > 10) {
        this.$refs.assistant.updateMessage("You did a great job. You are now an expert in personal information.\n\nLet's continue with the next topic.");
        this.$refs.assistant.updateActions('Continue', this.next);
      } else {
        this.$refs.assistant.updateMessage("Hm, better try one more time. This time you will manage it.");
        this.$refs.assistant.updateActions('Let me try again', this.showTask1Pre);
      }
    },
    next() {
      this.$emit('next')
    },
  },
};
</script>