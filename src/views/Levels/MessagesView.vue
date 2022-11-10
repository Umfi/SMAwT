<template>
  <base-level :level_id="level_id" :level_name="level_name" :max_points="max_points" :max_steps="max_steps" ref="base">
    <template v-slot="{step}">

    <div v-if="step == 1">
      <h1 class="text-center">Messages</h1>

      <p class="lead bg-success shadow border p-3 text-white">
        On social media everyone can send you messages. It could happen that you get a message from a stranger who wants to harm you or who wants to steal your personal data.
      </p>

      <br />
      <p class="lead">
        Keep the following rules in mind, and you should be safe.
      </p>

      <ul class="list-group">
        <li class="list-group-item">
          Check if you know the person who sent you the message
        </li>
        <li class="list-group-item">
          Don't click on any links in messages
        </li>
        <li class="list-group-item">
          Check for spelling mistakes in messages (this is often an indicator for spam messages)
        </li>
        <li class="list-group-item">Report Spammy Messages</li>
        <li class="list-group-item">Don't send personal information to anyone</li>
        <li class="list-group-item">Don't send pictures to anyone</li>
      </ul>
    </div>

    <div v-if="step == 2">
      <container-game ref="game1" :items="firstGame"></container-game>
    </div>

    <div v-if="step == 3">
      <div class="row">
        <div class="col">
          <simple-chat :messages="chat1"></simple-chat>
      </div>
        <div class="col m-auto">
          <quiz-game key="quiz1" ref="quiz1" :question="quiz1.question" :answers="quiz1.answers"></quiz-game>
        </div>
      </div>
    </div>

    <div v-if="step == 4">
      <div class="row">
        <div class="col">
          <simple-chat :messages="chat2"></simple-chat>
      </div>
        <div class="col m-auto">
          <quiz-game key="quiz2" ref="quiz2" :question="quiz2.question" :answers="quiz2.answers"></quiz-game>
        </div>
      </div>
    </div>

    <div v-if="step == 5">
      <div class="row">
        <div class="col">
          <simple-chat :messages="chat3"></simple-chat>
      </div>
        <div class="col m-auto">
          <quiz-game key="quiz3" ref="quiz3" :question="quiz3.question" :answers="quiz3.answers"></quiz-game>
        </div>
      </div>
    </div>

      </template>
  </base-level>
</template>

<script>
import BaseLevel from "../../components/BaseLevel.vue";
import { mapGetters } from "vuex";
import ContainerGame from '../../components/Games/ContainerGame.vue';
import QuizGame from '../../components/Games/QuizGame.vue';
import SimpleChat from '../../components/SimpleChat.vue';

export default {
  name: "MessagesView",
  components: { BaseLevel, ContainerGame, QuizGame, SimpleChat },
  data() {
    return {
      level_id: 7,
      level_name: "Messages",
      max_points: 10,
      max_steps: 6,
      // ---------------
      firstGame: [
         { name: "I can trust links in messages.", type: 'bad'},
         { name: "I can trust every message.", type: 'bad'},
         { name: "Speling mistakes are an indicator for spam messages.", type: 'good'},
         { name: "I should report suspious messages.", type: 'good'},
         { name: "I should send personal information to everyone.", type: 'bad'},
         { name: "If somebody asks for my phone number, I will send it to him.", type: 'bad'},
         { name: "I should check if I know the sender of the message", type: 'good'},
         { name: "I should reply to every message", type:'bad'},
      ],
      chat1: [
        {id: 1, sender: 'other', text: 'Hey, I am your new friend. I am from Nigeria and I want to send you some money. Can you give me your bank account number?'},
      ],
      quiz1: {
        question: "What do you think about this message?",
        answers: [
          {id: 0, text: "This is a safe message. I can reply.", correct: false},
          {id: 1, text: "This is probably a scam.", correct: true},
          {id: 2, text: "I should reply.", correct: false},
          {id: 3, text: "I should report the sender and block him.", correct: true},
        ]
      },
      chat2: [
        {id: 1, sender: 'other', text: 'Hey!'},
        {id: 2, sender: 'me', text: 'Hello! Who are you?'},
        {id: 3, sender: 'other', text: 'I am Max. One of your friends told me you like dogs.'},
        {id: 4, sender: 'other', text: 'Lets meet in the park and I will show you my dog.'},
      ],
      quiz2: {
        question: "What do you think about this message?",
        answers: [
          {id: 0, text: "This is a safe message. I can reply.", correct: false},
          {id: 1, text: "This is probably a scam.", correct: true},
          {id: 2, text: "I should reply.", correct: false},
          {id: 3, text: "I should report the sender and block him.", correct: true},
        ]
      },
      chat3: [
        {id: 1, sender: 'other', text: 'Congratulazion! You have won a PS5. Click this link to claim your prize. http://win.cc/ps5'},
      ],
      quiz3: {
        question: "What do you think about this message?",
        answers: [
          {id: 0, text: "This is a safe message. I can reply.", correct: false},
          {id: 1, text: "This is probably a scam.", correct: true},
          {id: 2, text: "I should reply.", correct: false},
          {id: 3, text: "I should report the sender and block him.", correct: true},
        ]
      },

    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    this.$refs.base.$refs.assistant.updateMessage("On social media everyone can send you messages.\nBut be careful with messages, because they could be dangerous.");
    this.$refs.base.$refs.assistant.updateActions('Learn more about it', this.showTask1Pre);
  },
  methods: {
    showTask1Pre() {
      this.$refs.base.step = 1;
      this.$refs.base.$refs.assistant.updateMessage(
        "As always, I have prepared a little task for you where you can practice what you have learned."
      );
      this.$refs.base.$refs.assistant.updateActions("Continue.", this.showTask1);
    },
    showTask1() {
      this.$refs.base.step = 2;
      this.$refs.base.$refs.assistant.updateMessage("Just tell me, when ever I should check your work.");
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
      this.$refs.base.$refs.assistant.updateMessage("What do you think about this message. What should we do?");
      this.$refs.base.$refs.assistant.updateActions('Check my answer.', this.task2Check);
    },
    task2Check() {
       if (this.$refs.quiz1.check() == 1) {
        this.$refs.base.points += 2;
        this.$refs.base.$refs.assistant.updateMessage('You are right. This is a dangerous message. We should report it.');
        this.$refs.base.$refs.assistant.updateActions('Continue', this.showTask3);
      } else {
        this.$refs.base.points--;
        this.$refs.base.$refs.assistant.updateMessage('You are wrong. This is a dangerous message. We should report it.');
        this.$refs.base.$refs.assistant.updateActions('Continue', this.showTask3);
      }
    },
    showTask3() {
      this.$refs.base.step = 4;
      this.$refs.base.$refs.assistant.updateMessage("What do you think about this message. What should we do?");
      this.$refs.base.$refs.assistant.updateActions('Check my answer.', this.task3Check);
    },
    task3Check() {
       if (this.$refs.quiz2.check() == 1) {
        this.$refs.base.points += 2;
        this.$refs.base.$refs.assistant.updateMessage('You are right. This is a dangerous message. We should report it.');
        this.$refs.base.$refs.assistant.updateActions('Continue', this.showTask4);
      } else {
        this.$refs.base.points--;
        this.$refs.base.$refs.assistant.updateMessage('You are wrong. This is a dangerous message. We should report it.');
        this.$refs.base.$refs.assistant.updateActions('Continue', this.showTask4);
      }
    },
    showTask4() {
      this.$refs.base.step = 5;
      this.$refs.base.$refs.assistant.updateMessage("What do you think about this message. What should we do?");
      this.$refs.base.$refs.assistant.updateActions('Check my answer.', this.task4Check);
    },
    task4Check() {
       if (this.$refs.quiz3.check() == 1) {
        this.$refs.base.points += 2;
        this.$refs.base.$refs.assistant.updateMessage('You are right. This is a dangerous message. We should report it.');
        this.$refs.base.$refs.assistant.updateActions('Continue', this.$refs.base.finishLevel);
      } else {
        this.$refs.base.points--;
        this.$refs.base.$refs.assistant.updateMessage('You are wrong. This is a dangerous message. We should report it.');
        this.$refs.base.$refs.assistant.updateActions('Continue', this.$refs.base.finishLevel);
      }
    },
  },
};
</script>
