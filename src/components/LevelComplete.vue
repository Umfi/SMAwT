<template>
  <div class="game-done-card shadow card w-50 m-auto">
    <div class="card-header">
        <h1 class="text-center text-uppercase text-white">Complete</h1>
    </div>
    <div class="card-body">
                <div class="row">
            <div class="col-12 text-center">
                <h2>{{ level }}</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-12 stars text-center">
                <i :class="stars > 0 ? 'fas fa-star fa-3x filled' : 'fas fa-star fa-3x'"></i>
                <i :class="stars > 1 ? 'fas fa-star fa-4x filled' : 'fas fa-star fa-4x'"></i>
                <i :class="stars > 2 ? 'fas fa-star fa-3x filled' : 'fas fa-star fa-3x'"></i>
            </div>
        </div>

        <div class="row">
            <div class="col-12 text-center">
                <h3>Your Score</h3>
            </div>
            <div class="col-12 text-center">
                <h2>{{ score }}</h2>
            </div>
        </div>
    </div>
    <div class="card-footer">
        <button type="button" class="btn btn-secondary btn-lg mt-4" @click="playAgain">Play Again</button>
        <button type="button" class="btn btn-primary btn-lg mt-4 float-end" @click="finish">Continue</button>
    </div>
</div>
</template>

<script>
import Vue from 'vue'
import VueConfetti from 'vue-confetti'

Vue.use(VueConfetti)

export default {
    name: "LevelComplete",
    props: {
        level: {
            type: String,
            required: true
        },
        score: {
            type: Number,
            required: true
        },
        stars: {
            type: Number,
            required: true
        }
    },
    methods: {
        playAgain() {
            this.$emit('play-again');
        },
        finish() {
            this.$emit('finish');
        }
    },
     data() {
        return {
            sound: null,
        };
    },
    mounted() {
        this.$confetti.start({
            particles: [
                {
                dropRate: 5,
                }
            ],
        });
        this.sound = new Audio('/sounds/win.mp3'); 
        this.sound.play();

        window.setTimeout(() => {
            this.$confetti.stop();
        }, 5000);
    },
    destroyed() {
        this.$confetti.stop();
        this.$confetti.remove();
        this.sound.pause();
    }
}
</script>

<style scoped>
    .stars .filled {
        color: #ffd700;
    }

    .game-done-card .card-header {
        background-color: rgba(29,119,147,1) 100%;
        border-bottom: 0;
    }

    .game-done-card {
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        left: 50%;
        background: rgb(113,186,200);
        background: linear-gradient(0deg, rgba(113,186,200,1) 43%, rgba(29,119,147,1) 100%);
        border: solid 6px rgb(25, 116, 142);
        border-radius: 20px;
        color: white;
        z-index: 10;
    }
</style>