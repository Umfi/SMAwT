<template>
  <div>
    <h1>What's your name?</h1>

    <div class="row justify-content-center mt-3">
      <div class="col-8">
        <input
          ref="name"
          type="text"
          class="form-control"
          placeholder="Enter your name"
          v-model="name"
        />
      </div>
    </div>

    <user-guide
      ref="assistant"
      msg="Before we start, can you tell me your name?"
      actionA="Continue"
      :actionAFunc="start"
    ></user-guide>
  </div>
</template>

<script>

import UserGuide from './UserGuide.vue';

export default {
  name: "SetupPage",
  components: {UserGuide},
  data() {
    return {
      name: "",
    };
  },
  mounted() {
    this.$refs.name.focus();
  },
  methods: {
    start() {
      if (this.name.length == 0) {
        this.$refs.assistant.updateMessage("Don't be a spoilsport. Tell me your name please.");
        this.$refs.name.focus();
      } else {
        this.$store.dispatch('setUser', this.name);
        this.$emit("next");
      }
    },
  },
};
</script>
