<template>
    <div>
      <div class="alert alert-primary" role="alert">
          {{ explanation }}
      </div>

      <div class="img-container">
        <img id="image-game-image" :src="require('@/assets/' + image)" width="500" @click="check"/>
        <div class="hint" v-show="show"></div>
      </div>

    </div>
</template>

<script>
export default {
  name: "ImageGame",
  props: {
    image: String,
    bb: Object,
    explanation: String,
  },
  data() {
    return {
      state: -1,
      failCount: 0,
      winSound: null,
      loseSound: null,
      show: false,
    };
  },
  mounted() {
    this.winSound = new Audio(require('../../assets/sounds/correct.wav'));
    this.loseSound = new Audio(require('../../assets/sounds/error.wav'));
  },
  methods: {
    currentState() {
      return this.state;
    },
    check(event) {
      const rect = document.getElementById("image-game-image").getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      if (this._checkIfInRectangle(x, y)) {
        this.winSound.play();
        this.showHint();
        this.state = 1;
        this.$emit('game-over', 1);
      } else {
        this.loseSound.play();
        this.failCount++;
        if (this.failCount < 3) {
          this.state = -1;
          this.$emit('game-over', -1);
        } else {
          this.showHint();
          this.state = 0;
          this.$emit('game-over', 0);
        }
      }
    },
    _checkIfInRectangle(x, y) {
      const rect = this.$props.bb;
      return x > rect.x && x < rect.x + rect.width && y > rect.y && y < rect.y + rect.height
    },
    showHint() {
        const rect = document.getElementById("image-game-image").getBoundingClientRect();
        const container = document.getElementById("container");
        var style = container.currentStyle || window.getComputedStyle(container);
        const hint = document.getElementsByClassName("hint")[0];
        hint.style.left = (this.$props.bb.x + rect.left - parseInt(style.marginLeft) - parseInt(style.paddingLeft) ) + "px";
        hint.style.top = (this.$props.bb.y) + "px";
        hint.style.width = this.$props.bb.width + "px";
        hint.style.height = this.$props.bb.height + "px";
        this.show = true;
    }
  },
};
</script>
<style scoped>
.img-container {
    position: relative;
}

.hint {
    position: absolute;
    border: solid 3px red;
    z-index: 1;
}

img {
    cursor: crosshair;
  }
</style>