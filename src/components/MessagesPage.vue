<template>
  <div>
    <h1>Messages</h1>

    <div v-if="step == 1">
      <p class="lead">
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
      <simple-chat :messages="chatOne"></simple-chat>
    </div>



    <user-guide
      ref="assistant"
      :msg="'On social media everyone can send you messages.\n\But be careful with messages, because they could be dangerous.'"
      actionA="Learn more about it."
      :actionAFunc="showTask1Pre"
    ></user-guide>
  </div>
</template>

<script>
import UserGuide from "./UserGuide.vue";
import { mapGetters } from "vuex";
import ContainerGame from './Games/ContainerGame.vue';
import SimpleChat from './SimpleChat.vue';

export default {
  name: "MessagesPage",
  components: { UserGuide, ContainerGame, SimpleChat },
  data() {
    return {
      step: 0,
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
      chatOne: [
        {id: 1, sender: 'other', text: 'Hey, I am your new friend. I am from Nigeria and I want to send you some money. Can you give me your bank account number?'},
      ]
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    showTask1Pre() {
      this.step = 1;
      this.$refs.assistant.updateMessage(
        "As always, I have prepared a little task for you where you can practice what you have learned."
      );
      this.$refs.assistant.updateActions("Continue.", this.showTask1);
    },
    showTask1() {
      this.step = 2;
      this.$refs.assistant.updateMessage("Just tell me, when ever I should check your work.");
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
      this.step = 3;
      this.$refs.assistant.updateMessage("What do you think about this message. What should we do?");
      this.$refs.assistant.updateActions('Continue', this.next);
    },
    next() {
      this.$emit("next");
    },
  },
};
</script>
