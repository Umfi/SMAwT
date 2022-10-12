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

        <div class="alert alert-primary" role="alert">
          Drag each term and move it to the "Good" and "Bad" section
        </div>
        
        <div class="row">
          <div class="col">
            <h3>All</h3>
            <draggable class="list-group" :list="allList" group="people">
              <div
                class="list-group-item"
                v-for="(element) in allList"
                :key="element.name"
              >
                {{ element.name }}
              </div>
            </draggable>
          </div>

          <div class="col">
            <h3>Good</h3>
            <draggable class="list-group good" :list="goodList" group="people">
          <div
                class="list-group-item"
                v-for="(element) in goodList"
                :key="element.name"
              >
                {{ element.name }}
              </div>
            </draggable>
          </div>
          <div class="col">
            <h3>Bad</h3>
            <draggable class="list-group bad" :list="badList" group="people">
              <div
                class="list-group-item"
                v-for="(element) in badList"
                :key="element.name"
              >
                {{ element.name }}
              </div>
            </draggable>
          </div>
        </div>
    </div>

  <div v-if="step == 4">
  </div>
  
  <div v-if="step == 5">

        <div class="alert alert-primary" role="alert">
          Drag each term and move it to the "Good" and "Bad" section
        </div>
        
        <div class="row">
          <div class="col">
            <h3>All</h3>
            <draggable class="list-group" :list="allPasswordList" group="people">
              <div
                class="list-group-item"
                v-for="(element) in allPasswordList"
                :key="element.name"
              >
                {{ element.name }}
              </div>
            </draggable>
          </div>

          <div class="col">
            <h3>Good</h3>
            <draggable class="list-group good" :list="goodPasswordList" group="people">
          <div
                class="list-group-item"
                v-for="(element) in goodPasswordList"
                :key="element.name"
              >
                {{ element.name }}
              </div>
            </draggable>
          </div>
          <div class="col">
            <h3>Bad</h3>
            <draggable class="list-group bad" :list="badPasswordList" group="people">
              <div
                class="list-group-item"
                v-for="(element) in badPasswordList"
                :key="element.name"
              >
                {{ element.name }}
              </div>
            </draggable>
          </div>
        </div>
    </div>


    <user-guide
    ref="assistant"
    :msg="'Hello ' + user + '. Nice to meet you. <br><br> Now we need to choose a password for your account. In the next step we will show you how to create a secure password.'"
    actionA="Continue"
    :actionAFunc="showTask1Pre"
    ></user-guide>

  </div>
</template>

<script>
import UserGuide from './UserGuide.vue';
 import draggable from 'vuedraggable'
import {mapGetters} from 'vuex';

export default {
  components: { UserGuide, draggable },
  name: 'PasswordPage',
  data() {
    return {
      step: 1,
      allList: [
         { name: "Use at least eight characters.", id: 1, type: 'good'},
         { name: "Make it memorable, but avoid using personal information like names or birthdays.", id: 2, type: 'good' },
         { name: "Use a mix of uppercase letters, lowercase letters, symbols and numbers.", id: 3, type: 'good' },
         { name: "R3pl@ce le++ers wit# sYmb0ls and n^mb3rs 1ike thi$.", id: 4, type: 'good' },
         { name: "Use the same password on multiple sites.", id: 5, type: 'bad' },
         { name: "Use personal information (name, address, birth dates etc.) in your password.", id: 6, type: 'bad'},
         { name: "Use a password that is easy to guess.", id: 7, type: 'bad' },
         { name: "Use a password that can be found in a dictionary.", id: 8, type: 'bad'},
         { name: "Share your password with a close friend in case you forget it.", id: 9, type: 'bad' },
         { name: "Write your password down if it is hard to remember.", id: 10, type: 'bad' },
      ],
      goodList: [],
      badList: [],
      allPasswordList: [
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
      goodPasswordList: [],
      badPasswordList: []
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
      this.allList.sort(() => Math.random() - 0.5);
      this.step = 3;
      this.$refs.assistant.updateMessage("Just tell me, when every i should check your work.");
      this.$refs.assistant.updateActions('I think I am done.', this.task1Check);
    },
    task1Check() {

      if ( this.allList.length > 0) {
        this.$refs.assistant.updateMessage("There are still some items in the 'all' column. Move all items to the according colum and i will check it again.");
        return;
      }

      let newAll = [];

      this.goodList.forEach((item, index, arr) => {
        if (item.type === "bad") {
          newAll.push(item);
          arr.splice(index, 1);
        }
      });


      this.badList.forEach((item, index, arr) => {
        if (item.type === "good") {
          newAll.push(item);
          arr.splice(index, 1);
        }
      });

      this.allList = newAll;

      if ( this.allList.length > 0) {
        this.$refs.assistant.updateMessage("There are still some mistakes. Try again. I am sure you will manage it now.");
        return;
      } else {
        this.step = 4;
        this.$refs.assistant.updateMessage('You are right. Everything was correct.');
        this.$refs.assistant.updateActions('Continue', this.showTask2);
      }
    },
    showTask2() {
      this.$refs.assistant.updateMessage('What do you think about the password <b>' + this.user +'1</b>?');
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
      this.$refs.assistant.updateMessage('What do you think about the password <b>01.12.2000</b>?');
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
      this.allPasswordList.sort(() => Math.random() - 0.5);
      this.step = 5;
      this.$refs.assistant.updateMessage("I have found a list of passwords. Can you tell me which of that is a good and which is a bad password? Tell me again when i should check your result.");
      this.$refs.assistant.updateActions('I think I am done.', this.task4Check);
    },
    task4Check() {

      if ( this.allPasswordList.length > 0) {
        this.$refs.assistant.updateMessage("There are still some items in the 'all' column. Move all items to the according colum and i will check it again.");
        return;
      }

      let newAll = [];

      this.goodPasswordList.forEach((item, index, arr) => {
        if (item.type === "bad") {
          newAll.push(item);
          arr.splice(index, 1);
        }
      });


      this.badPasswordList.forEach((item, index, arr) => {
        if (item.type === "good") {
          newAll.push(item);
          arr.splice(index, 1);
        }
      });

      this.allPasswordList = newAll;

      if ( this.allPasswordList.length > 0) {
        this.$refs.assistant.updateMessage("There are still some mistakes. Try again. I am sure you will manage it now.");
        return;
      } else {
        this.$refs.assistant.updateMessage('You are right. Everything was correct.');
        this.$refs.assistant.updateActions('Continue', this.next);
      }
    },
    next() {
      this.$emit('next')
    }
  }
}
</script>
<style scoped>
.list-group.good {
  background-color: #8cd69d;
  min-height: 500px;
  padding: 5px;
}

.list-group.bad {
  background-color: #e1505c;
  min-height: 500px;
  padding: 5px;
}
</style>