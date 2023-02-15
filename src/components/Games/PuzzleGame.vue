<template>
    <div>
      <div class="alert alert-primary" role="alert">
          {{ $t(description) }}
      </div>

        <div v-if="img" style="width: 400px;height: 400px;" class="mx-auto overflow-hidden">
        <vue-slide-puzzle
            ref="puzzle"
            :ratio=3
            :steps=10
            mode="free"
            :src="img"
            @card-drop="gameover"
        />
        </div>
    </div>
</template>

<script>

import { VueSlidePuzzle } from 'vue-slide-puzzle';
import 'vue-slide-puzzle/dist/VueSlidePuzzle.css';

export default {
  name: 'PuzzleGame',
  components: {
    VueSlidePuzzle
  },
  props: {
    image: {
        default: '',
        type: String
    },
    description: {
        default: '',
        type: String
    },
  },
  data() {
    return {
      done: 0,
      img: ''
    }
  },
  mounted() {
    this.img = require(`@/assets/${this.$props.image}`);
  },
  methods: {
    currentState() {
     return this.done;
    },
    gameover() {
        if (this.$refs.puzzle.$state.gameSuccess) {
            this.done = 1;
            this.$emit('game-over', 1);
        }
    }
  },
}
</script>
