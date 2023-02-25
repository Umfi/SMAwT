<template>
    <div>
      <div class="alert alert-primary" role="alert">
        {{ description }}
      </div>

      <div id="falling-text-game-container">
          <div class="points"><span class="badge bg-light text-dark">{{ $t('Points') }}: {{ points}}</span></div>
          <div class="time"><span class="badge bg-light text-dark">{{ $t('Time left') }}: {{ time }}</span></div>

          <button type="button" class="btn btn-danger startbtn btn-lg" @click="startGame()" v-if="!start">{{ $t('Start') }}</button>
      </div>
    </div>
</template>

<script>
export default {
  name: "FallingTextGame",
  props: {
    items: {
      type: Array,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      start: false,
      points: 0,
      winSound: null,
      loseSound: null,
      spawnTimer: null,
      gameTimer: null,
      time: 45,
      minPoints: 0,
    };
  },
  mounted() {
    this.winSound = new Audio(require('../../assets/sounds/correct.wav'));
    this.loseSound = new Audio(require('../../assets/sounds/error.wav'));
  },
  destroyed() {
      clearInterval(this.spawnTimer);
      clearInterval(this.gameTimer);
  },
  methods: {
    startGame() {
      this.start = true;

      this.gameTimer = setInterval(() => {
        this.time--;

        if (this.time == 0) {
          clearInterval(this.spawnTimer);
          clearInterval(this.gameTimer);

          if (this.points >= (this.minPoints / 2)) {
              this.$emit('game-over', 1);
          } else {
              this.$emit('game-over', 0);
          }
          
        }
      }, 1000);

      this.spawnTimer = setInterval(() => {
        this.makeFruit();
      }, 1500);
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

      if (randomItem.value == 1) {
        this.minPoints++;
      }

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
      var speed = 0;
      
       if (this.time > 30) {
          speed = this.getRandomInt(8000, 10000);
       } else if (this.time > 20 && this.time <= 30) {
          speed = this.getRandomInt(7000, 8000);  
       } else if (this.time > 10 && this.time <= 20) {
          speed = this.getRandomInt(6000, 7000);
       } else if (this.time <= 10) {
          speed = this.getRandomInt(4000, 6000);
       } 


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
    border: 3px solid rgb(177, 44, 44);
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
    border-bottom: 3px solid rgb(177, 44, 44);
    border-left: 3px solid rgb(177, 44, 44);
    user-select: none;
    text-align: right;
}

#falling-text-game-container .points {
    position: absolute;
    padding: 10px;
    width: 50%;
    left: 0;
    background-color: #99c5c96b;
    border-bottom: 3px solid rgb(177, 44, 44);
    user-select: none;
}

.startbtn {
  position: absolute;
  left: 45%;
  top: 50%;
}
</style>