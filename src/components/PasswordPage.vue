<template>
  <div>
    <h1>Password</h1>


    <div v-if="step == 2">
        <p class="lead">That's how a password should look like</p>
        <ul class="list-group">
            <li class="list-group-item">Use at least eight characters. The longer the better (as long as you can remember it!).</li>
            <li class="list-group-item">Make it memorable, but avoid using personal information like names or birthdays</li>
            <li class="list-group-item">Use a mix of uppercase letters, lowercase letters, symbols and numbers</li>
            <li class="list-group-item">R3pl@ce le++ers wit# sYmb0ls and n^mb3rs 1ike thi$</li>
            <li class="list-group-item">Do not use the same password on multiple sites</li>
            <li class="list-group-item">Do not use personal information (name, address, birth dates or even a pet's name, etc.) in your password</li>
            <li class="list-group-item">Do not use a password that is easy to guess (like "password", "123456", "qwerty", etc.)</li>
            <li class="list-group-item">Do not use a password that can be found in a dictionary</li>
            <li class="list-group-item">Do not share your password with anyone</li>
            <li class="list-group-item" >Do not write your password down</li>
        </ul>
    </div>

    <div v-if="step == 3">
      <container-game ref="game1" :items="firstGame"></container-game>
    </div>

  
    <div v-if="step == 4">
      <container-game ref="game2" :items="secondGame"></container-game>
    </div>

    <user-guide
    ref="assistant"
    :msg="'Hello ' + user + '. Nice to meet you.\n\nNow we need to choose a password for your account. In the next step we will show you how to create a secure password.'"
    actionA="Continue"
    :actionAFunc="showTask1Pre"
    ></user-guide>

  </div>
</template>

<script>
import UserGuide from './UserGuide.vue';
import {mapGetters} from 'vuex';
import ContainerGame from './Games/ContainerGame.vue';

export default {
  components: { UserGuide, ContainerGame },
  name: 'PasswordPage',
  data() {
    return {
      step: 1,
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
    }
  },
  computed: {
    ...mapGetters([
        'user'
    ]),
  },
  methods: {
    showTask1Pre() {
      this.step = 2;
      this.$refs.assistant.updateMessage("It's not that hard right? Let's practice it a bit.");
      this.$refs.assistant.updateActions('Yeah, good idea.', this.showTask1);
    },
    showTask1() {
      this.step = 3;
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
      this.$refs.assistant.updateMessage('What do you think about the password "' + this.user +'1"?');
      this.$refs.assistant.updateActions('This password is strong!', this.task2Fail, 'This is too weak', this.task2Pass);
    },
    task2Fail() {
      this.$refs.assistant.updateMessage('Nope. Your password should never include your name.');
      this.$refs.assistant.updateActions('Continue', this.showTask3);
    },
    task2Pass() {
      this.$refs.assistant.updateMessage('You are right. That is a really bad password because it contains your name.');
      this.$refs.assistant.updateActions('Continue', this.showTask3);
    },
    showTask3() {
      this.$refs.assistant.updateMessage('What do you think about the password "01.12.2000"?');
      this.$refs.assistant.updateActions('This password is strong!', this.task3Fail, 'This is too weak', this.task3Pass);
    },
    task3Fail() {
      this.$refs.assistant.updateMessage('Nope. Your password should never be date.');
      this.$refs.assistant.updateActions('Continue', this.showTask4);
    },
    task3Pass() {
      this.$refs.assistant.updateMessage('You are right. That is a really bad password because its just a date. Never use your birthday or any other date that is related to you as a password.');
      this.$refs.assistant.updateActions('Continue', this.showTask4);
    },
    showTask4() {
      this.step = 4;
      this.$refs.assistant.updateMessage("I have found a list of passwords. Can you tell me which of that is a good and which is a bad password? Tell me again when i should check your result.");
      this.$refs.assistant.updateActions('I think I am done.', this.task4Check);
    },
    task4Check() {
      const result = this.$refs.game2.check();

      if (result == -1) {
        this.$refs.assistant.updateMessage("There are still some items in the 'all' column. Move all items to the according colum and i will check it again.");
        return;
      } else if (result == 0) {
        this.$refs.assistant.updateMessage("There are still some mistakes. Try again. I am sure you will manage it now.");
        return;
      } else {
        this.$refs.assistant.updateMessage('You are right. Everything was correct. Lets continue with the next topic.');
        this.$refs.assistant.updateActions('Continue', this.next);
      }
    },
    next() {
      this.$emit('next')
    }
  }
}
</script>