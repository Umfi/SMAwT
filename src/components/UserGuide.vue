<template>
  <div id="assistant" class="border container fixed-bottom mb-3 shadow">
    <div class="row p-2">
        <div class="col-2">
            <img src="../assets/assistant.png" class="img-fluid rounded-circle assistant" alt="User Image">
        </div>
        <div class="col-10 align-self-center" v-if="this.message.length > 0">
            <vue-typer
            :text="message"
            :repeat='0'
            :type-delay='20'
            :pre-erase-delay='0'
            :erase-delay='0'
            erase-style='clear'
            caret-animation='blink'
          ></vue-typer>
        </div>
    </div>
    <div class="row border-top">
        <div class="col p-0">
            <button type="button" :class="actionBText ? 'btn btn-block w-100 text-uppercase btn-outline-dark' : 'btn btn-block w-100 text-uppercase btn-outline-primary'" @click="actionAFunction">{{ actionAText }}</button>
        </div>
        <div class="col p-0" v-if="actionBText.length > 0">
            <button type="button" class="btn btn-outline-primary btn-block w-100 text-uppercase" @click="actionBFunction">{{ actionBText }}</button>
        </div>
    </div>
  </div>
</template>

<script>
import { VueTyper } from 'vue-typer'

export default {
  name: 'UserGuide',
  components: { VueTyper },
  props: {
    msg: {
        default: '',
        type: String
    },
    actionA: {
        default: '',
        type: String
    },
    actionB: {
        default: '',
        type: String
    },
    actionAFunc: {
        default: () => { return -1; },
        type: Function
    },
    actionBFunc: {
        default: () => { return -1; },
        type: Function
    },
  },
  data() {
    return {
      message: '',
      actionAText: '',
      actionBText: '',
      actionAFunction: () => { return -1; },
      actionBFunction: () => { return -1; }
    }
  },
  mounted() {
    this.message = this.msg;
    this.actionAText = this.actionA;
    this.actionAFunction = this.actionAFunc;
    this.actionBText = this.actionB;
    this.actionBFunction = this.actionBFunc;
  },
  methods: {
    updateMessage(newMsg) {
      this.message = newMsg;
    },
    updateActions(actionA = '', actionAFunc = () => { return -1; }, actionB = '', actionBFunc = () => { return -1; }) {
      this.actionAText = actionA;
      this.actionAFunction = actionAFunc;
      this.actionBText = actionB;
      this.actionBFunction = actionBFunc;
    },
  }
}
</script>
<style scoped>
.assistant {
  user-select: none;
}
</style>
