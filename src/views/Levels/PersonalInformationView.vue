<template>
  <base-level :level_id="level_id" :level_name="level_name" :max_points="max_points" :max_steps="max_steps" ref="base">
    <template v-slot="{step}">
    
    <div v-if="step == 1">
      
        <div class="row mb-3">
          <div class="col">
            <div class="card">
              <div class="card-header">
                <h3>Private Information</h3>
              </div>
              <div class="card-body">
                <p>
                  Information about you that can be used to identify you because it's unique to you (e.g., your full name or your address).
                  You should tread personal information like secrets. Don't tell them anybody in the internet.
                </p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card h-100">
              <div class="card-header">
                <h3>Personal Information</h3>
              </div>
              <div class="card-body">
                <p>
                  Information about you that cannot be used to identify you because it is also true for many other people (e.g., your hair color or the city you live in)
                </p>
              </div>
            </div>
          </div>
        </div>
        <p class="lead text-center">Following personal information is information that can be used to identify you.</p>
        
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
          Click on all private information items. Ignore the persoanl information that could be shared.
        </div>
        
        <falling-text-game :items="gameItems" @game-over="finishTask1"></falling-text-game>
    </div>

    <div v-if="step == 3">
        <level-complete :level_id="2" :level_name="'Personal Information'" :score="points" :max_score="max_points" @play-again="playAgain" @finish="next"></level-complete>
    </div>

    </template>
  </base-level>
</template>

<script>

import BaseLevel from "../../components/BaseLevel.vue";
import {mapGetters} from 'vuex';
import FallingTextGame from '../../components/Games/FallingTextGame.vue';

export default {
  name: "PersonalInformationView",
  components: {BaseLevel, FallingTextGame},
  data() {
    return {
      level_id: 2,
      level_name: "Personal Information",
      max_points: 25,
      max_steps: 3,
      //----------------
      gameItems: [
        {text: "Full Name", value: 1},
        {text: "Address", value: 1},
        {text: "Phone Number", value: 1},
        {text: "E-Mail Address", value: 1},
        {text: "Date of birth", value: 1},
        {text: "Social Security Number", value: 1},
        {text: "Favorite color", value: 0},
        {text: "Hair color", value: 0},
        {text: "City", value: 0},
        {text: "Favorite meal", value: 0},
        {text: "Favorite music", value: 0},
        {text: "Password", value: 1},
        {text: "Height", value: 0},
        {text: "Weight", value: 0},
        {text: "First Name", value: 0},
        {text: "Credit Card Information", value: 1},
        {text: "Name of pet", value: 0},
      ]
    };
  },
  computed: {
    ...mapGetters([
        'user'
    ]),
  },
  mounted() { 
    this.$refs.base.$refs.assistant.updateMessage("We have now often talked about private information.\nWe know that we should not share this information and tread it like secrets.\n\nLets have a look what the difference between personal and private information actually is.");
    this.$refs.base.$refs.assistant.updateActions('Sure, tell me about it!', this.showTask1Pre);
  },
  methods: {
    showTask1Pre() {
      this.$refs.base.step = 1;
      this.$refs.base.$refs.assistant.updateMessage("Make sense, right?\n\nLet's practice it a bit with a fun game.");
      this.$refs.base.$refs.assistant.updateActions('Yes, lets play.', this.showTask1);
    },
    showTask1() {
      this.$refs.base.step = 2;
      this.$refs.base.$refs.assistant.updateMessage("Have fun, playing the game. Click on all personal information items. Ignore the rest.");
      this.$refs.base.$refs.assistant.updateActions('Thank you.', () => {});
    },
    finishTask1(points) {
      if (points > 10) {
        this.$refs.base.points = points;
        this.$refs.base.$refs.assistant.updateMessage("You did a great job. You are now an expert in personal information.\n\nLet's continue with the next topic.");
        this.$refs.base.$refs.assistant.updateActions('Continue', this.$refs.base.finishLevel);
      } else {
        this.$refs.base.$refs.assistant.updateMessage("Hm, better try one more time. This time you will manage it.");
        this.$refs.base.$refs.assistant.updateActions('Let me try again', this.showTask1Pre);
      }
    },
  },
};
</script>