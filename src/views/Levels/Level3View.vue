<template>
    <base-level :level_id="level_id" :level_name="level_name" :max_points="max_points" :max_steps="max_steps" ref="base">
    <template v-slot="{step}">
      <div class="row" v-if="step == 0">
        Friends -> Messages -> Fake -> Story
      </div>
    </template>
  </base-level>
</template>

<script>
import BaseLevel from '../../components/BaseLevel.vue'
import {mapGetters} from 'vuex';

export default {
  components: { BaseLevel },
  name: 'Level3View',
  data() {
    return {
      level_id: 1,
      level_name: "The Dark Side of Social Media",
      max_points: 14,
      max_steps: 9,
      //----------------
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

  }
}
</script>