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
    </div>

    <div v-if="step == 4">
        
        <div class="card w-75 m-auto">
          <div class="card-header bg-primary text-white">
            <h3>Your Profile</h3>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <label for="name" class="form-label">First Name</label>
              <input type="text" class="form-control" id="name" v-model="fname">
            </div>
            <div class="mb-3">
              <label for="name" class="form-label">Last Name</label>
              <input type="text" class="form-control" id="name" v-model="lname">
            </div>
            <div class="mb-3">
              <label for="dob" class="form-label">Birthday</label>
              <input type="text" class="form-control" id="dob" v-model="dob">
            </div>
            <div class="mb-3">
              <label for="city" class="form-label">City</label>
              <input type="text" class="form-control" id="city" v-model="city">
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">Address</label>
              <input type="text" class="form-control" id="address" v-model="address">
            </div>
            <div class="mb-3">
              <label for="phone" class="form-label">Phone Number</label>
              <input type="number" class="form-control" id="phone" v-model="phone">
            </div>
          </div>
        </div>
    </div>

    <div v-if="step == 5">
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
      max_steps: 5,
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
      ],
      fname: '',
      lname: '',
      dob: '',
      city: '',
      address: '',
      phone: '',
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
      this.$refs.base.$refs.assistant.hideOptions();
    },
    finishTask1(points) {
      if (points > 10) {
        this.$refs.base.points = points;
        this.$refs.base.$refs.assistant.updateMessage("You did a great job. You are now an expert in personal information.\n\nNow you are ready to fill out your own profile.");
        this.$refs.base.$refs.assistant.updateActions('Continue', this.showTask2Pre);
      } else {
        this.$refs.base.$refs.assistant.updateMessage("Hm, better try one more time. This time you will manage it.");
        this.$refs.base.$refs.assistant.updateActions('Let me try again', this.showTask1Pre);
      }

      this.$refs.base.$refs.assistant.showOptions();
    },
    showTask2Pre() {
      this.$refs.base.step = 3;
      this.$refs.base.$refs.assistant.updateMessage("Social media platforms want to get as much information from you as they could.\nThis is because they want to show you ads that are interesting for you.\nThey also want to sell your information to other companies.\n\nSo, be careful what you share on social media.");
     this.$refs.base.$refs.assistant.updateActions('Can I do something about it?', this.showTask2Pre1);
    },
    showTask2Pre1() {
       this.$refs.base.$refs.assistant.updateMessage("Sure, it is possible to limit the information that you share on social media.\n\nLet's have a look at your profile. There are lots of fields that you can fill out. But you don't have to fill out all of them.\n\nLet's see what you can do.");
       this.$refs.base.$refs.assistant.updateActions('Yeah, lets fill out my profile.', this.showTask2);
    },
    showTask2() {
      this.$refs.base.step = 4;
      this.$refs.base.$refs.assistant.updateMessage("Fill out your profile. You can skip the fields that you don't want to fill out.");
      this.$refs.base.$refs.assistant.updateActions('I have completed my profile.', this.checkTask2);
    },
    checkTask2() {
      if (this.fname.trim().length == 0) {
        this.$refs.base.$refs.assistant.updateMessage("Sharing your first name is not problematic.\n\nGo ahead and fix it.");
        return;
      }

      if (this.lname.trim().length > 1) {
        this.$refs.base.$refs.assistant.updateMessage("It's not recommend to share your last name. If you really want to share it, better share only the first letter of it.\n\nGo ahead and fix it.");
        return;
      }

      if (this.dob.length > 0) {
        this.$refs.base.$refs.assistant.updateMessage("Do you really want to tell everyone how old you are?.\n\nGo ahead and fix it.");
        return;
      }

      if (this.address.length > 0) {
        this.$refs.base.$refs.assistant.updateMessage("You should never share your address online.\nStrangers should never know where you live!\n\nGo ahead and fix it.");
        return;
      }

      if (this.phone.length > 0) {
        this.$refs.base.$refs.assistant.updateMessage("Never share such private inforamtion like your phone number online!\n\nGo ahead and fix it.");
        return;
      }

      this.$refs.base.$refs.assistant.updateMessage("Well done. You now have your own profile. And no senstive data is available publicly.\n\nLet's continue with the next topic.");
      this.$refs.base.$refs.assistant.updateActions('Finish lesson.', this.$refs.base.finishLevel);
    }
  },
};
</script>