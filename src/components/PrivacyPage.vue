<template>
  <div>
    <h1>Privacy</h1>


    <div v-if="step == 1">
        <p class="lead">
          When you post something online you often have the posibility to limit who actually can see your posts.
          <br>
          This is great, because you can decide who can see your posts and who not. 
          <br>
          Most social networks have a privacy setting where you can decide who can see your posts.
        </p>

        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Friends
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                Only your friends can see your posts.<br>
                This is a good setting if you want to share something with all your friends.<br>
                But be careful, maybe not all your friends are your real friends.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Selected Friends
              </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                Only your selected friends can see your posts.<br>
                This is a good setting if you want to share something with a few friends.<br>
                For example your close friends.    
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Public
              </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                  Everyone can see your posts.<br>
                  This is a dangerous setting, because everyone in the world can see your posts.<br>
                  Watch out what you post with this setting. Be absolutley sure that you want to share this with everyone.
                
              </div>
            </div>
          </div>
        </div>
    </div>

    <div v-if="step == 2">
      <post-privacy-game 
      ref="pg1"
      :author="user" 
      message="I saw a really cool movie yesterday. It was called 'The Matrix'. It is a 10/10."
      answer="public"
      ></post-privacy-game>
    </div>

    <user-guide
      ref="assistant"
      :msg="'Wow you have already learned alot today. You know what you can post and what you better do not post.\nBut there is still one thing we need to talk about. And that is your privacy.'"
      actionA="What's that?"
      :actionAFunc="showTask1Pre"
    ></user-guide>
  </div>
</template>

<script>

import UserGuide from './UserGuide.vue';
import PostPrivacyGame from './Games/PostPrivacyGame.vue';
import {mapGetters} from 'vuex';

export default {
  name: "PrivacyPage",
  components: {UserGuide, PostPrivacyGame},
  data() {
    return {
      step: 0,
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
      this.$refs.assistant.updateMessage("I'm pretty sure you understood everything.\nI will show you now some examples and you will tell me what privacy setting we should choose.");
      this.$refs.assistant.updateActions('Yes, lets practice a bit.', this.showTask1);
    },
    showTask1() {
      this.step = 2;
      this.$refs.assistant.updateMessage("What do you think about this post?");
      this.$refs.assistant.updateActions('Please check my answer.', this.task1Check);
    },
    task1Check() {
      const answer = this.$refs.pg1.checkAnswer();

      if (answer == -1) {
        this.$refs.assistant.updateMessage("Please choose an answer.");
      } else if (answer == 1) {
        this.$refs.assistant.updateMessage("You are right. There is nothing harmful in this post and it could be posted publicly.");
        this.$refs.assistant.updateActions('Continue', this.next);
      } else {
        this.$refs.assistant.updateMessage("You are wrong. There is nothing harmful in this post and it could be posted publicly.");
        this.$refs.assistant.updateActions('Continue', this.next);
      }
    },
    next() {
      this.$emit('next')
    },
  },
};
</script>