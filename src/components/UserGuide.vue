<template>
  <div id="assistant" class="border container fixed-bottom mb-3 shadow">
    <div class="row p-2">
        <div class="col-2">
            <img src="../assets/assistant.png" class="img-fluid rounded-circle" alt="User Image">
        </div>
        <div class="col-10 align-self-center">
            <p v-html="message"></p>
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
export default {
  name: 'UserGuide',
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
