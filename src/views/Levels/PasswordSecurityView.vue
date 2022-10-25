<template>
  <div>
    <level-progress :step="step" :max="7"></level-progress>
    <div class="container mt-5">
      
      <div v-if="step == 1">
          <h1 class="text-center">Password Security</h1>

          <div class="text-center">
          <iframe class="w-75" height="500" src="https://www.youtube-nocookie.com/embed/cqE1djdxipc?controls=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
      </div>

      <div v-if="step == 2">
          <h1 class="text-center">Password Security</h1>

          <p class="lead">That's how a password should look like</p>
          <ul class="list-group">
              <li class="list-group-item">Use at least eight characters. The longer the better (as long as you can remember it!).</li>
              <li class="list-group-item">Make it memorable, but avoid using personal information like names or birthdays.</li>
              <li class="list-group-item">Use a mix of uppercase letters, lowercase letters, symbols and numbers.</li>
              <li class="list-group-item">R3pl@ce le++ers wit# sYmb0ls and n^mb3rs 1ike thi$.</li>
              <li class="list-group-item">Do not use the same password on multiple sites.</li>
              <li class="list-group-item">Do not use personal information (name, address, birth dates or even a pet's name, etc.) in your password.</li>
              <li class="list-group-item">Do not use a password that is easy to guess (like "password", "123456", "qwerty", etc.).</li>
              <li class="list-group-item">Do not use a password that can be found in a dictionary.</li>
              <li class="list-group-item">Do not share your password with anyone.</li>
              <li class="list-group-item" >Do not write your password down.</li>
          </ul>
      </div>

      <div v-if="step == 3">
        <container-game ref="game1" :items="firstGame"></container-game>
      </div>

      <div v-if="step == 4">
        <quiz-game key="quiz1" ref="quiz1" :question="'Is ' + this.user.name +'123 a secure passwort?'" :answers="quiz1.answers"></quiz-game>
      </div>

      <div v-if="step == 5">
        <quiz-game key="quiz2" ref="quiz2" :question="quiz2.question" :answers="quiz2.answers"></quiz-game>
      </div>

      <div v-if="step == 6">
        <container-game ref="game2" :items="secondGame"></container-game>
      </div>

      <div v-if="step == 7">
          <level-complete :level_id="1" :level_name="'Password Security'" :score="points" :max_score="max_points" @play-again="playAgain" @finish="next"></level-complete>
      </div>

      <user-guide
      ref="assistant"
      :msg="'Hello ' + user.name + '. Nice to meet you.\n\nNow we need to choose a password for your account. \nIn the next step we will show you how to create a secure password.'"
      actionA="Continue"
      :actionAFunc="showVideo"
      ></user-guide>

    </div>
  </div>
</template>

<script>
import UserGuide from '../../components/UserGuide.vue';
import {mapGetters} from 'vuex';
import ContainerGame from '../../components/Games/ContainerGame.vue';
import LevelComplete from '../../components/LevelComplete.vue';
import LevelProgress from '../../components/LevelProgress.vue';
import QuizGame from '../../components/Games/QuizGame.vue';

export default {
  components: { UserGuide, ContainerGame, LevelComplete, LevelProgress, QuizGame },
  name: 'PasswordSecurityView',
  data() {
    return {
      step: 0,
      points: 0,
      max_points: 14,
      firstGame: [
         { name: "Use at least eight characters.", type: 'good'},
         { name: "Make it memorable, but avoid using personal information like names or birthdays.", type: 'good' },
         { name: "Use a mix of uppercase letters, lowercase letters, symbols and numbers.", type: 'good' },
         { name: "R3pl@ce le++ers wit# sYmb0ls and n^mb3rs 1ike thi$.", type: 'good' },
         { name: "Use the same password on multiple sites.", type: 'bad' },
         { name: "Use personal information (name, address, birth dates etc.) in your password.", type: 'bad'},
         { name: "Use a password that is easy to guess.", type: 'bad' },
         { name: "Use a password that can be found in a dictionary.", type: 'bad'},
         { name: "Share your password with a close friend in case you forget it.", type: 'bad' },
         { name: "Write your password down if it is hard to remember.", type: 'bad' },
         { name: "Change your password if you think someone else knows it.", type: 'good' }
      ],
      secondGame: [
         { name: "L3t$_Pl@y", type: 'good'},
         { name: "Rucksack", type: 'bad'},
         { name: "rose2002", type: 'bad'},
         { name: "1ch_l1€b3-b3rg€!", type: 'good'},
         { name: "S@ub3reEn3rg1€", type: 'good'},
         { name: "bello", type: 'bad'},
         { name: "passwort", type: 'bad'},
         { name: "g3he1m", type: 'bad'},
         { name: "G3#3Im!1", type: 'good'},
         { name: "sportistmord", type: 'bad'},
      ],
      quiz1: {
        answers: [
          {id: 0, text: "Not really", correct: true},
          {id: 1, text: "Yes, it is safe", correct: false},
        ]
      },
      quiz2: {
        question: "Is '01.12.2000' a secure password?",
        answers: [
          {id: 0, text: "Yes", correct: false},
          {id: 1, text: "No", correct: true},
        ]
      },
    }
  },
  computed: {
    ...mapGetters([
        'user'
    ]),
  },
  methods: {
    showVideo() {
      this.step = 1;
      this.$refs.assistant.updateMessage("Just tell me, whenever you have finished watching the video.");
      this.$refs.assistant.updateActions('I am done.', this.showTask1Pre);
    },
    showTask1Pre() {
      this.step = 2;
      this.$refs.assistant.updateMessage("It's not that hard right? Let's practice it a bit.");
      this.$refs.assistant.updateActions('Yeah, good idea.', this.showTask1);
    },
    showTask1() {
      this.step = 3;
      this.$refs.assistant.updateMessage("Just tell me, when ever I should check your work.");
      this.$refs.assistant.updateActions('I think I am done.', this.task1Check);
    },
    task1Check() {
      const result = this.$refs.game1.check();

      if (result == -1) {
        this.$refs.assistant.updateMessage("There are still some items in the 'ALL' column. Move all items to the according colum and i will check it again.");
      } else if (result == 0) {
        this.points--;
        this.$refs.assistant.updateMessage("There are still some mistakes. Try again. I am sure you will manage it now.");
      } else {
        this.points += 5;
        this.$refs.assistant.updateMessage('You are right. Everything was correct.');
        this.$refs.assistant.updateActions('Continue', this.showTask2);
      }
    },
    showTask2() {
      this.step = 4;
      this.$refs.assistant.updateMessage('What do you think about this question?');
      this.$refs.assistant.updateActions('Check my answer.', this.task2Check);
    },
    task2Check() {
       if (this.$refs.quiz1.check() == 1) {
        this.points += 2;
        this.$refs.assistant.updateMessage('You are right. That is a really bad password because it contains your name.');
        this.$refs.assistant.updateActions('Continue', this.showTask3);
      } else {
        this.points--;
        this.$refs.assistant.updateMessage('Nope. Your password should never include your name.');
        this.$refs.assistant.updateActions('Continue', this.showTask3);
      }
    },
    showTask3() {
      this.step = 5;
      this.$refs.assistant.updateMessage('What do you think about this question?');
      this.$refs.assistant.updateActions('Check my answer.', this.task3Check);
    },
    task3Check() {
       if (this.$refs.quiz2.check() == 1) {
        this.points += 2;
        this.$refs.assistant.updateMessage('You are right. That is a really bad password because its just a date. Never use your birthday or any other date that is related to you as a password.');
        this.$refs.assistant.updateActions('Continue', this.showTask4);
      } else {
        this.points--;
        this.$refs.assistant.updateMessage('Nope. Your password should never be date.');
        this.$refs.assistant.updateActions('Continue', this.showTask4);
      }
    },
    showTask4() {
      this.step = 6;
      this.$refs.assistant.updateMessage("I have found a list of passwords. Can you tell me which of that is a good and which is a bad password? Tell me again when i should check your result.");
      this.$refs.assistant.updateActions('I think I am done.', this.task4Check);
    },
    task4Check() {
      const result = this.$refs.game2.check();

      if (result == -1) {
        this.$refs.assistant.updateMessage("There are still some items in the 'ALL' column. Move all items to the according colum and i will check it again.");
      } else if (result == 0) {
        this.points--;
        this.$refs.assistant.updateMessage("There are still some mistakes. Try again. I am sure you will manage it now.");
      } else {
        this.points += 5;
        this.$refs.assistant.updateMessage('You are right. Everything was correct. Lets continue with the next topic.');
        this.$refs.assistant.updateActions('Continue', this.finishLevel);
      }
    },
    finishLevel() {
      this.$refs.assistant.hide();
      this.step = 7;
    },
    playAgain() {
      this.$router.go();
    },
    next() {
      this.$router.replace('/levels');
    }
  }
}
</script>