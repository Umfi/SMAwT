<template>
     <div id="falling-text-game-container">
        <div class="points">{{ $t('Points') }}: {{ points}} </div>
        <div class="time">{{ $t('Time left') }}: {{ elements }}</div>
    </div>
</template>

<script>
export default {
  name: "FallingTextGame",
  props: {
    items: [],
  },
  data() {
    return {
      points: 0,
      elements: 50,
      winSound: null,
      loseSound: null,
      timer: null
    };
  },
  mounted() {
    this.startGame();
    this.winSound = new Audio('/sounds/correct.wav');
    this.loseSound = new Audio('/sounds/error.wav');
  },
  destroyed() {
      clearInterval(this.timer);
      this.elements = 0;
  },
  methods: {
    startGame() {
      this.timer = setInterval(() => {
        this.elements--;
        this.makeFruit();

        if (this.elements == 0) {
          clearInterval(this.timer);
          this.$emit('game-over', this.points);
        }
      }, 1000);
    },
    makeFruit() {
      var target = document.querySelector("#falling-text-game-container");

      // Add fruit element
      var fruitElement = document.createElement("div");
      fruitElement.classList.add("falling-text-game-item");

      // Add image source
      var randomItem = this.items[Math.floor(Math.random() * this.items.length)];

      fruitElement.innerHTML = randomItem.text;
      fruitElement.setAttribute('data-result', randomItem.value);

      // Add fruit element to the screen
      target.append(fruitElement);

      // Generate random number for x position
      var xPos = this.getRandomInt(0, 500);
      fruitElement.style.left = xPos + "px";

      const randomColor = () => {
        let color = Math.floor(Math.random() * 16777215).toString(16);

        while (color.length < 6) {
          color = Math.floor(Math.random() * 16777215).toString(16);
        }

        let red = parseInt(color.substring(0, 2), 16);
        let green = parseInt(color.substring(2, 4), 16);
        let blue = parseInt(color.substring(4, 6), 16);
        let brightness = red * 0.299 + green * 0.587 + blue * 0.114;

        if (brightness > 180) {
          return {
            backgroundColor: "#" + color,
            color: "#000000",
          };
        } else
          return {
            backgroundColor: "#" + color,
            color: "#ffffff",
          };
      };

      const color = randomColor();

      fruitElement.style.background = color.backgroundColor;
      fruitElement.style.color = color.color;

      fruitElement.style.top = "-100px";
      // Get random animation interval
      var speed = this.getRandomInt(5000, 10000);

      // Start animation
      const animation = fruitElement.animate(
        { top: ["-100px", "430px"] },
        { duration: speed, iterations: 1, easing: "linear" }
      );

      // Add click listener for fruits
      fruitElement.addEventListener("click", () => {
        if (fruitElement.getAttribute('data-result') == "1") {
          this.winSound.play();
          this.points++;
        } else {
          this.loseSound.play();
          this.points--;
        }
        animation.cancel();
        fruitElement.remove();
      });

      animation.onfinish = () => {
        if (fruitElement.getAttribute('data-result') == "1") {
          this.loseSound.play();
          this.points--;
        }
      };
    },
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
  },
};
</script>
<style>
#falling-text-game-container {
    width: 600px;
    height: 400px;
    margin: 0 auto;
    border: 1px solid rgb(109, 107, 107);
    position: relative;
    background-color: rgb(128, 169, 169);
    overflow: hidden;
}
.falling-text-game-item {
    position: absolute;
    cursor: crosshair;
    padding: 15px;
    border-radius: 5px;
    user-select: none;
}

#falling-text-game-container .time {
    position: absolute;
    padding: 10px;
    width: 50%;
    right: 0;
    background-color: #99c5c96b;
    border-bottom: 1px solid rgb(109, 107, 107);
    border-left: 2px solid rgb(109, 107, 107);
    user-select: none;
    text-align: right;
}

#falling-text-game-container .points {
    position: absolute;
    padding: 10px;
    width: 50%;
    left: 0;
    background-color: #99c5c96b;
    border-bottom: 1px solid rgb(109, 107, 107);
    user-select: none;
}
</style>