<template>
<div>
  <level-progress :step="step" :max="max_steps"></level-progress>
  <div id="container" class="container mt-5">

    <slot v-if="!complete" :step="step"></slot>

    <level-complete
      v-if="complete"
      :level_id="level_id"
      :level_name="level_name"
      :score="points"
      :max_score="max_points"
      @play-again="playAgain"
      @finish="next"
    ></level-complete>

    <user-guide ref="assistant"></user-guide>
  </div>
</div>
</template>

<script>
import UserGuide from "./UserGuide.vue";
import LevelComplete from "./LevelComplete.vue";
import LevelProgress from "./LevelProgress.vue";

export default {
  name: "BaseLevel",
  components: { UserGuide, LevelComplete, LevelProgress },
  props: {
    level_id: {
      type: Number,
      required: true,
    },
    level_name: {
      type: String,
      required: true,
    },
    max_points: {
      type: Number,
      required: true,
    },
    max_steps: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      complete: false,
      step: 0,
      points: 0,
    };
  },
  methods: {
    finishLevel() {
      this.step = this.$props.max_steps;
      this.$refs.assistant.hide();
      this.complete = true;
    },
    playAgain() {
      this.$router.go();
    },
    next() {
      this.$router.replace("/levels");
    },
  },
};
</script>