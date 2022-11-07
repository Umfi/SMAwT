<template>
    <base-level :level_id="level_id" :level_name="level_name" :max_points="max_points" :max_steps="max_steps" ref="base">
    <template v-slot="{step}">
      

      <div v-if="step == 2">
          <h1 class="text-center">Password Security</h1>

          <p class="lead">That's how a password should look like</p>
          <ul class="list-group">
              <li class="list-group-item">Use at least eight characters. The longer the better (as long as you can remember it!). <button type="button" class="btn btn-primary btn-sm float-end" @click="explain(1)"><i class="fas fa-question"></i></button></li>
              <li class="list-group-item">Make it memorable, but avoid using personal information like names or birthdays. <button type="button" class="btn btn-primary btn-sm float-end" @click="explain(2)"><i class="fas fa-question"></i></button></li>
              <li class="list-group-item">Use a mix of uppercase letters, lowercase letters, symbols and numbers. <button type="button" class="btn btn-primary btn-sm float-end" @click="explain(3)"><i class="fas fa-question"></i></button></li>
              <li class="list-group-item">R3pl@ce le++ers wit# sYmb0ls and n^mb3rs 1ike thi$. <button type="button" class="btn btn-primary btn-sm float-end" @click="explain(4)"><i class="fas fa-question"></i></button></li>
              <li class="list-group-item">Do not use the same password on multiple sites. <button type="button" class="btn btn-primary btn-sm float-end" @click="explain(5)"><i class="fas fa-question"></i></button></li>
              <li class="list-group-item">Do not use personal information (name, address, birth dates or even a pet's name, etc.) in your password. <button type="button" class="btn btn-primary btn-sm float-end" @click="explain(6)"><i class="fas fa-question"></i></button></li>
              <li class="list-group-item">Do not use a password that is easy to guess (like "password", "123456", "qwerty", etc.). <button type="button" class="btn btn-primary btn-sm float-end" @click="explain(7)"><i class="fas fa-question"></i></button></li>
              <li class="list-group-item">Do not use a password that can be found in a dictionary. <button type="button" class="btn btn-primary btn-sm float-end" @click="explain(8)"><i class="fas fa-question"></i></button></li>
              <li class="list-group-item">Do not share your password with anyone. <button type="button" class="btn btn-primary btn-sm float-end" @click="explain(9)"><i class="fas fa-question"></i></button></li>
              <li class="list-group-item" >Do not write your password down. <button type="button" class="btn btn-primary btn-sm float-end" @click="explain(10)"><i class="fas fa-question"></i></button></li>
          </ul>

          <button v-show="!hideContinueBtn" type="button" class="btn btn-primary btn-lg btn-block mt-5 w-100" @click="showTask1Pre()">Continue</button>
      </div>

      <div v-if="step == 3">
        <container-game ref="game1" :items="firstGame"></container-game>
      </div>

      <div v-if="step == 4">
        <quiz-game key="quiz1" ref="quiz1" :question="'Is ' + user.name +'123 a secure passwort?'" :answers="quiz1.answers"></quiz-game>
      </div>

      <div v-if="step == 5">
        <quiz-game key="quiz2" ref="quiz2" :question="quiz2.question" :answers="quiz2.answers"></quiz-game>
      </div>

      <div v-if="step == 6">
        <h1 class="text-center mb-5">How to create strong rememberable passwords?</h1>


        <div class="card bg-dark-50 w-75 m-auto">
          <div class="card-header">
              <h2 class="text-primary">Use a "Donkey Bridge" or a Mnemonic</h2>
          </div>
          <div class="card-body">
            <h3>Write down an senctence that you can easily remeber.</h3>
            <p>For example</p>
            <p class="lead">
              <span style="color: red;">I</span> <span style="color: blue;">h</span>ave 
              <span style="color: green;">3</span>  <span style="color: orange;">s</span>isters 
              <span style="color: salmon;">a</span>nd 
              <span style="color: maroon;">I</span> <span style="color: olive;">l</span>ive 
              <span style="color: gold;">i</span>n 
              <span style="color: magenta;">a</span> <span style="color: navy;">b</span>lue 
              <span style="color: pink;">h</span>ouse
              <span style="color: violet;">!</span>
              </p>

            <h3>Use the first letter of each word.</h3>
            <p class="lead">
              <span style="color: red;">I</span>
              <span style="color: blue;">h</span>
              <span style="color: green;">3</span>
              <span style="color: orange;">s</span>
              <span style="color: salmon;">a</span>
              <span style="color: maroon;">I</span>
              <span style="color: olive;">l</span>
              <span style="color: gold;">i</span>
              <span style="color: magenta;">a</span>
              <span style="color: navy;">b</span>
              <span style="color: pink;">h</span>
              <span style="color: violet;">!</span>
            </p>

            <h3>Replace letters with numbers and symbols.</h3>
            <p class="lead">Ih3<span style="color: orange;">$</span><span style="color: salmon;">@</span>Ili<span style="color: magenta;">@</span>bh!</p>
            </div>
        </div>
      </div>

      <div v-if="step == 7">
        <container-game ref="game2" :items="secondGame"></container-game>
      </div>

    </template>
  </base-level>
</template>

<script>
import BaseLevel from '../../components/BaseLevel.vue'
import {mapGetters} from 'vuex';
import ContainerGame from '../../components/Games/ContainerGame.vue';
import QuizGame from '../../components/Games/QuizGame.vue';

export default {
  components: {BaseLevel, ContainerGame, QuizGame },
  name: 'PasswordSecurityView',
  data() {
    return {
      level_id: 1,
      level_name: "Password Security",
      max_points: 14,
      max_steps: 9,
      //----------------
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
      hideContinueBtn: false
    }
  },
  computed: {
    ...mapGetters([
        'user'
    ]),
  },
  mounted() {
    this.$refs.base.$refs.assistant.updateMessage('Hello ' + this.user.name + '. Nice to meet you!\n\nI am your personal social media expert and I will help you to learn how to use social media safely.');
    this.$refs.base.$refs.assistant.updateActions('Continue', this.showIntro1);
  },
  methods: {
    showIntro1() {
      this.$refs.base.$refs.assistant.updateMessage("Before you can do anything on social media, you need to create an account.\n\nFor that you need a username and a password.");
      this.$refs.base.$refs.assistant.updateActions('I already know that.', this.showIntro2_1, "Whats that?", this.showIntro2_2);
    },
    showIntro2_1() {
      this.$refs.base.$refs.assistant.updateMessage("That's great. But it doesn't hurt when we shortly talk about it.\n\nA username is the name you choose for your account. It can be your real name or a nickname.\nIt is public and everyone can see it. Have that in mind when you choose a username.");
      this.$refs.base.$refs.assistant.updateActions('Ok, I got it.', this.showIntro3);
    },
    showIntro2_2() {
      this.$refs.base.$refs.assistant.updateMessage("Don't worry. That is why I am here.\n\nA username is the name you choose for your account. It can be your real name or a nickname.\nIt is public and everyone can see it. Have that in mind when you choose a username.");
      this.$refs.base.$refs.assistant.updateActions('Ok, I got it.', this.showIntro3);
    },
    showIntro3() {
      this.$refs.base.$refs.assistant.updateMessage("Next is the password. It is a secret code that you need to enter to log in to your account.\n\nIt is important that you choose a strong password.\nDo you know how a strong password should look like?");
      this.$refs.base.$refs.assistant.updateActions('Sure.', this.showIntro3_1, "Not really.", this.showIntro3_2);
    },
    showIntro3_1() {
      this.$refs.base.$refs.assistant.updateMessage("Well great. Than should be the next task really easy for you.");
      this.$refs.base.$refs.assistant.updateActions('Yeah, show me what you have got.', this.showIntro4);
    },
    showIntro3_2() {
      this.$refs.base.$refs.assistant.updateMessage("No problem.\n\nI will teach you everything you need to know about strong passwords.");
      this.$refs.base.$refs.assistant.updateActions('That is great.', this.showIntro4);
    },
    showIntro4() {
      this.$refs.base.step = 2;
      this.$refs.base.$refs.assistant.updateMessage("Have a look at the text above.\nThat are some general easy to follow rules for strong and save password.\n\nIf something is not clear, just ask me by clicking the button with the questionmark for the according item.");
      this.$refs.base.$refs.assistant.hideOptions();
    },
    explain(id) {
      if (id == 1) {
        this.$refs.base.$refs.assistant.updateMessage("A strong password should be at least eight characters long.\n\nThat is because it is harder to guess a longer password.");
      } else if (id == 2) {
        this.$refs.base.$refs.assistant.updateMessage("A strong password should be memorable, so that you don't have to write it somewhere.\n\nBut if you include personal information like your name in it it is easier to guess.\nAnd we definalty don't want that.");
      } else if (id == 3) {
        this.$refs.base.$refs.assistant.updateMessage("Use a mix of upper and lower case letters, numbers and special characters.\n\nThat is because it is harder to guess such passwords.");
      } else if (id == 4) {
        this.$refs.base.$refs.assistant.updateMessage("You can replace letters with numbers or special characters that look the same.\n\nFor example: 'e' can be replaced with '3' and 'a' can be replaced with '@'.\n\nWith that you can easily add hard to guess symbols to you password, but they are still easy to remeber for you.");
      } else if (id == 5) {
        this.$refs.base.$refs.assistant.updateMessage("Don't use the same password for multiple accounts.\n\nIf someone gets access to one of your accounts, he can use the same password to get access to all your accounts.");
      } else if (id == 6) {
        this.$refs.base.$refs.assistant.updateMessage("Dont include personal information like your name, birthday or address in your password.\n\nThat is because it is easier to guess such passwords.");
      } else if (id == 7) {
        this.$refs.base.$refs.assistant.updateMessage("Don't use easy and commonly used passwords.\n\nAttackers use programs that try to guess passwords by using common words and numbers.");
      } else if (id == 8) {
        this.$refs.base.$refs.assistant.updateMessage("Try to avoid using passwords that can be found in a dictionary.\n\nAttackers use programs that try to guess passwords by using words from dictionaries.");
      } else if (id == 9) {
        this.$refs.base.$refs.assistant.updateMessage("Never share your password with anyone.\n\nIf you do that, they can use your account and do whatever they want. Even if you trust them, you should never share your password with anyone.");
      } else if (id == 10) {
        this.$refs.base.$refs.assistant.updateMessage("Never write your password down.\n\nIf you do that, someone else can find it and use your account.\n\nIf your password is really hard to remember, you can use a password manager to save it.");
      }
    },
    showTask1Pre() {
      this.hideContinueBtn = true;
      this.$refs.base.$refs.assistant.updateMessage("If you follow the rules above, you should be able to create a strong password.\n\nNow it is your turn. I have prepared a small task where you can show me what you have learnt so far.");
      this.$refs.base.$refs.assistant.updateActions('Yeah, we can do that.', this.showTask1);
      this.$refs.base.$refs.assistant.showOptions();
    },
    showTask1() {
      this.$refs.base.step = 3;
      this.$refs.base.$refs.assistant.updateMessage("Just tell me, when ever I should check your work.");
      this.$refs.base.$refs.assistant.updateActions('I think I am done.', this.task1Check);
    },
    task1Check() {
      const result = this.$refs.game1.check();

      if (result == -1) {
        this.$refs.base.$refs.assistant.updateMessage("There are still some items in the 'ALL' column. Move all items to the according colum and i will check it again.");
      } else if (result == 0) {
        this.$refs.base.points--;
        this.$refs.base.$refs.assistant.updateMessage("There are still some mistakes. Try again. I am sure you will manage it now.");
      } else {
        this.$refs.base.points += 5;
        this.$refs.base.$refs.assistant.updateMessage('You are right. Everything was correct. Well done.');
        this.$refs.base.$refs.assistant.updateActions('Continue', this.showTask2);
      }
    },
    showTask2() {
      this.$refs.base.step = 4;
      this.$refs.base.$refs.assistant.updateMessage('What do you think about this question?');
      this.$refs.base.$refs.assistant.updateActions('Check my answer.', this.task2Check);
    },
    task2Check() {
       if (this.$refs.quiz1.check() == 1) {
        this.$refs.base.points += 2;
        this.$refs.base.$refs.assistant.updateMessage('You are right. That is a really bad password because it contains your name.');
        this.$refs.base.$refs.assistant.updateActions('Continue', this.showTask3);
      } else {
        this.$refs.base.points--;
        this.$refs.base.$refs.assistant.updateMessage('Nope. Your password should never include your name.');
        this.$refs.base.$refs.assistant.updateActions('Continue', this.showTask3);
      }
    },
    showTask3() {
      this.$refs.base.step = 5;
      this.$refs.base.$refs.assistant.updateMessage('What do you think about this question?');
      this.$refs.base.$refs.assistant.updateActions('Check my answer.', this.task3Check);
    },
    task3Check() {
       if (this.$refs.quiz2.check() == 1) {
        this.$refs.base.points += 2;
        this.$refs.base.$refs.assistant.updateMessage('You are right. That is a really bad password because its just a date. Never use your birthday or any other date that is related to you as a password.');
        this.$refs.base.$refs.assistant.updateActions('Continue', this.showTask4Pre);
      } else {
        this.$refs.base.points--;
        this.$refs.base.$refs.assistant.updateMessage('Nope. Your password should never be date.');
        this.$refs.base.$refs.assistant.updateActions('Continue', this.showTask4Pre);
      }
    },
    showTask4Pre() {
      this.$refs.base.$refs.assistant.updateMessage("Well done so far. Now you should know how a strong password looks like.\n\nIn the next section I will show you how you can create a strong password which is easy to remember.");
      this.$refs.base.$refs.assistant.updateActions('Yes, I am really currious.', this.showTask4Pre2);
    },
    showTask4Pre2() {
      this.$refs.base.step = 6;
      this.$refs.base.$refs.assistant.updateMessage("Use donkey bridges. Above you can find an example.\n\nIt is a sentence that you can use to create a strong password.\nYou can use any sentence you like. Just make sure that it is easy to remember.");
      this.$refs.base.$refs.assistant.updateActions('Continue.', this.showTask4);
    },
    showTask4() {
      this.$refs.base.step = 7;
      this.$refs.base.$refs.assistant.updateMessage("Look, I have found a list of passwords.\n\nCan you tell me which of that is a good and which is a bad password? Tell me again when i should check your result.");
      this.$refs.base.$refs.assistant.updateActions('I think I am done.', this.task4Check);
    },
    task4Check() {
      const result = this.$refs.game2.check();

      if (result == -1) {
        this.$refs.base.$refs.assistant.updateMessage("There are still some items in the 'ALL' column. Move all items to the according colum and i will check it again.");
      } else if (result == 0) {
        this.$refs.base.points--;
        this.$refs.base.$refs.assistant.updateMessage("There are still some mistakes. Try again. I am sure you will manage it now.");
      } else {
        this.$refs.base.points += 5;
        this.$refs.base.$refs.assistant.updateMessage('You are right. Everything was correct.');
        this.$refs.base.$refs.assistant.updateActions('Continue', this.showTask5);
      }
    },
    showTask5() {
      this.$refs.base.step = 8;
      this.$refs.base.$refs.assistant.updateMessage('Good job, ' + this.user.name + '!\n\nYou have learned a lot about passwords.\n\nNow you can know everything that you need to know to create an account in a social network.');
      this.$refs.base.$refs.assistant.updateActions('Finish this lesson!', this.$refs.base.finishLevel);
    },
  }
}
</script>