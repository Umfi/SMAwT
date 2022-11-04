<template>
  <base-level :level_id="level_id" :level_name="level_name" :max_points="max_points" :max_steps="max_steps" ref="base">
    <template v-slot="{step}">

    <div v-if="step == 1">
      
        <h1 class="text-center">Fake or Real?</h1>

        <p class="lead bg-success shadow border p-3 text-white">
        Social media is a great way to read news and stay informed. But it can also be a great way to spread fake news.
        Don't trust everything you read on social media. Always check the source of the news and make sure it's a reliable source.
        </p>
        <br>
        <h3 class="text-center">Keep following rules in mind and you should be safe!</h3>
        <ul class="list-group">
            <li class="list-group-item">Check the source of the article.</li>
            <li class="list-group-item">Look for strange web adress or site names. (The often sound real but include small typos or have different top level domain)</li>
            <li class="list-group-item">Check for bad grammar or typos.</li>
            <li class="list-group-item">Fake News often use shocking headlines.</li>
            <li class="list-group-item">Fake News often use sensational flashy images.</li>
            <li class="list-group-item">Headlines with lots of punctuation and ALL CAPS are an indicator for fake news.</li>
        </ul>
    </div>

    <div v-if="step == 2">
        <container-game ref="game1" :items="firstGame" :titleLeft="'True'" :titleRight="'False'"></container-game>
    </div>

    <div v-if="step == 3">
      <div class="row">
        <div class="col">
          <simple-post id="1" :author="author" :image="'https://media.istockphoto.com/photos/unbelievable-shocking-news-portrait-of-stunned-brunette-man-keeping-picture-id1198137096?k=20&m=1198137096&s=612x612&w=0&h=yIlPYBxoqqLraJwvRKYMzSI_qbL1y7e4X6LMROZqsIs='" message="OMG guys, check this out!!!" link="NEWS-CENTR.COM" headline="Eating BURGERS will KILL YOU!!!!"></simple-post>
       </div>
        <div class="col m-auto">
          <quiz-game key="quiz1" ref="quiz1" :question="quiz1.question" :answers="quiz1.answers"></quiz-game>
        </div>
      </div>
    </div>

    </template>
  </base-level>
</template>

<script>

import BaseLevel from '../../components/BaseLevel.vue';
import ContainerGame from '../../components/Games/ContainerGame.vue';
import QuizGame from '../../components/Games/QuizGame.vue';
import SimplePost from '../../components/SimplePost.vue';
import {mapGetters} from 'vuex';

export default {
  name: "FakeView",
  components: {BaseLevel, SimplePost, ContainerGame, QuizGame},
  data() {
    return {
      level_id: 8,
      level_name: "Fake or Real?",
      max_points: 10,
      max_steps: 4,
      // ------------
      author: {
        name: 'Markus',
        avatar: 'https://avatars.dicebear.com/api/avataaars/fafada.png'
      },
      firstGame: [
         { name: "The web adress or site name can help to indicate fake news.", type: 'good'},
         { name: "Shocking headlines are an indicator for trustworthy news.", type: 'bad' },
         { name: "Words in ALL CAPS is an indicator for trustworthy news.", type: 'bad' },
         { name: "Grammatical errors are an indicator for fake news.", type: 'good' },
         { name: "Sensational images are often used for serious news.", type: 'bad' },
         { name: "The use of many punctuation character is an indicator for fake news.", type: 'good' },
         { name: "Unusual web adresses are a sign of fake news.", type: 'good'},
         { name: "Websites ending with .gov.at are always trustworthy.", type: 'good' },
         { name: "Websites ending with .at are always trustworthy.", type: 'bad'},
      ],
      quiz1: {
        question: "Are there any signs of fake news?",
        answers: [
          {id: 0, text: "Shocking and exaggerated headline.", correct: true},
          {id: 1, text: "Sensational image.", correct: true},
          {id: 2, text: "Strange web adress or site name.", correct: true},
          {id: 3, text: "Spelling errors, ALL CAPS or dramatic punctuation.", correct: true},
          {id: 4, text: "This article probably is fake.", correct: true},
          {id: 5, text: "This article probably is real.", correct: false},
        ]
      },
    };
  },
  computed: {
    ...mapGetters([
        'user'
    ]),
  },
  mounted() {
    this.$refs.base.$refs.assistant.updateMessage("Not everything you see on the internet is true. You should always check the source of the information before you share it.");
    this.$refs.base.$refs.assistant.updateActions('Continue', this.showTask1Pre);
  },
  methods: {
    showTask1Pre() {
      this.$refs.base.step = 1;
      this.$refs.base.$refs.assistant.updateMessage("All this should be common sense anyway, right?\n\nBut it doesn't hurt to learn about it.");
      this.$refs.base.$refs.assistant.updateActions('Sure, good idea.', this.showTask1);
    },
    showTask1() {
      this.$refs.base.step = 2;
      this.$refs.base.$refs.assistant.updateMessage("Just tell me, when every i should check your work.");
      this.$refs.base.$refs.assistant.updateActions('I think I am done.', this.task1Check);
    },
    task1Check() {
      const result = this.$refs.game1.check();

      if (result == -1) {
        this.$refs.base.$refs.assistant.updateMessage("There are still some items in the 'all' column. Move all items to the according colum and i will check it again.");
        return;
      } else if (result == 0) {
        this.$refs.base.$refs.assistant.updateMessage("There are still some mistakes. Try again. I am sure you will manage it now.");
        return;
      } else {
        this.$refs.base.$refs.assistant.updateMessage('You are right. Everything was correct.');
        this.$refs.base.$refs.assistant.updateActions('Continue', this.showTask2);
      }
    },
    showTask2() {
      this.$refs.base.step = 3;
      this.$refs.base.$refs.assistant.updateMessage("What do you think about this post?");
      this.$refs.base.$refs.assistant.updateActions('Check my answer.', this.task2Check);
    },
    task2Check() {
       if (this.$refs.quiz1.check() == 1) {
        this.$refs.base.points += 2;
        this.$refs.base.$refs.assistant.updateMessage('You are right. This is probaly fake news. To be absolutly sure you have to check the source.');
        this.$refs.base.$refs.assistant.updateActions('Continue', this.$refs.base.finishLevel);
      } else {
        this.$refs.base.points--;
        this.$refs.base.$refs.assistant.updateMessage('You are wrong. This is probaly fake news. To be absolutly sure you have to check the source');
        this.$refs.base.$refs.assistant.updateActions('Continue', this.$refs.base.finishLevel);
      }
    },
  },
};
</script>