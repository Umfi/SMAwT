<template>
  <div id="assistant" v-show="visible">

    <div class="border container fixed-bottom mb-3 shadow bg-white" v-show="!isMinimized">
        <div class="row p-2">
            <div class="col-2">
                <img src="../assets/assistant_right.png" class="img-fluid rounded-circle assistant" alt="User Image">
            </div>
            <div class="col-9 align-self-center" v-if="this.message.length > 0">
                <vue-typer
                :text="$t(message)"
                :repeat='0'
                :type-delay='20'
                :pre-erase-delay='0'
                :erase-delay='0'
                erase-style='clear'
                caret-animation='blink'
              ></vue-typer>
            </div>
            <div class="col-1" v-if="this.message.length > 0">
                <button type="button" class="btn btn-outline-primary btn-block float-end" @click="minimize"><i class="fa-solid fa-window-minimize"></i></button>
            </div>
        </div>
        <div class="row border-top" v-show="visibleOptions">
            <div class="col p-0">
                <button type="button" :class="actionBText ? 'btn btn-block w-100 text-uppercase btn-outline-dark' : 'btn btn-block w-100 text-uppercase btn-outline-primary'" @click="actionAFunction">{{ $t(actionAText) }}</button>
            </div>
            <div class="col p-0" v-if="actionBText.length > 0">
                <button type="button" class="btn btn-outline-primary btn-block w-100 text-uppercase" @click="actionBFunction">{{ $t(actionBText) }}</button>
            </div>
        </div>
    </div>

    <div :class="'border mb-3 bg-white rounded-circle miniassiatant ' + animationcss" v-show="isMinimized" @click="maximize">
        <img src="../assets/assistant_right.png" class="bg-opacity-75 bg-primary img-fluid rounded-circle" alt="User Image" width="100">
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
      isMinimized: false,
      visible: true,
      visibleOptions: true,
      message: '',
      actionAText: '',
      actionBText: '',
      animationcss: '',
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
      this.maximize();
    },
    updateActions(actionA = '', actionAFunc = () => { return -1; }, actionB = '', actionBFunc = () => { return -1; }) {
      this.actionAText = actionA;
      this.actionAFunction = actionAFunc;
      this.actionBText = actionB;
      this.actionBFunction = actionBFunc;
      this.maximize();
    },
    hide() {
      this.visible = false;
    },
    show() {
      this.visible = true;
      this.maximize();
    },
    hideOptions() {
      this.visibleOptions = false;
    },
    showOptions() {
      this.visibleOptions = true;
    },
    minimize() {
      this.isMinimized = true;
      this.animationcss = 'animate__animated animate__pulse animate__slower animate__infinite';
    },
    maximize() {
      this.isMinimized = false;
    },
    getAttention() {
      if (this.isMinimized) {
        this.animationcss = 'animate__animated animate__bounce animate__infinite';
      }
    }
  }
}
</script>
<style scoped>
.assistant {
  user-select: none;
}

#assistant {
  user-select: none;
  z-index: 9999;
}

.miniassiatant {
  width: 100px;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
}
</style>
