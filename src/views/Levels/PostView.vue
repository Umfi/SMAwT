<template>
  <div class="container mt-5">
    <div v-if="step == 1">
      
        <h1 class="text-center">Digital Footprint</h1>

        <p class="lead bg-success shadow border p-3 text-white">
        Social media is a great way to communicate with others and express yourself. You can also use it to show others, including colleges or future employers, who you are as a person.
        However, social media use can also have drawbacks. What you and others share is permanent, and it's easy to get caught in sharing things you may later regret.<br>
        <br>
        Your digital footprint can affect your reputation online and offline. 
        <b>It's important to manage it as much as you can!</b>
        </p>
        <br>
        <h3 class="text-center">Keep following rules in mind and you should be safe!</h3>
        <ul class="list-group">
            <li class="list-group-item">Think before you post.</li>
            <li class="list-group-item">Be empathetic and consider your choice of words.</li>
            <li class="list-group-item">Be respectful of differences.</li>
            <li class="list-group-item">Do not be rude even if you don't agree with their views.</li>
            <li class="list-group-item">Do not spread false information or rumours.</li>
            <li class="list-group-item" >Do not post private information.</li>
            <li class="list-group-item" >Do not post negative thoughts and opinions about your school or workplace.</li>
        </ul>
    </div>

    <div v-if="step == 2">
        <container-game ref="game1" :items="firstGame"></container-game>
    </div>


    <div v-if="step == 3">
      <div class="row">
        <div class="col">
          <simple-post id="1" :author="user" message="Yesterday was a crazy party. I can't wait for the next one." :image="'https://live.staticflickr.com/3035/3053053815_2aafbba224_b.jpg'"></simple-post>
        </div>
        <div class="col m-auto">
          <quiz-game key="quiz1" ref="quiz1" :question="quiz1.question" :answers="quiz1.answers"></quiz-game>
        </div>
      </div>
    </div>

    <div v-if="step == 4">
      <simple-post id="1" :author="user" message="I will make a party next weekend. Come all to my place in the Dancer Street 12 at 8pm."></simple-post>
    </div>

    <div v-if="step == 5">
      <div class="row">
        <div class="col">
          <simple-post id="1" :author="user" message="Hahaha I just found out that Max can't count till 100. LOL he is so stupid."></simple-post>
        </div>
        <div class="col m-auto">
          <quiz-game key="quiz2" ref="quiz2" :question="quiz2.question" :answers="quiz2.answers"></quiz-game>
        </div>
      </div>
    </div>

    <div v-if="step == 6">
      <div class="row">
        <div class="col">
          <div class="feed border shadow">
            <h3 class="text-white text-center">My Posts</h3>
            <simple-post id="1" :author="user" message="Thanks mum for this awesome cake." :image="'https://upload.wikimedia.org/wikipedia/commons/b/b3/HK_food_%E7%BE%8E%E5%BF%83%E8%A5%BF%E9%A4%85_Maxim%27s_Cakes_%E7%B2%9F%E5%AD%90%E8%9B%8B%E7%B3%95_Chestnut_cream_birthday_cake_party_December_2021_SS2_12.jpg'"></simple-post>
            <simple-post id="2" :author="user" message="I hope the test tomorrow won't be that hard. Got luck everyone. "></simple-post>
            <simple-post id="3" :author="user" message="Kitty is so cute today." :image="'https://www.publicdomainpictures.net/pictures/40000/nahled/calico-cat-on-chair.jpg'"></simple-post>
            <simple-post id="4" :author="user" message="Today is such a wonderful day. Can it even gets better?"></simple-post>
          </div>
        </div>
        <div class="col m-auto">
          <quiz-game key="quiz3" ref="quiz3" :question="quiz3.question" :answers="quiz3.answers"></quiz-game>
        </div>
      </div>
    </div>

    <div v-if="step == 7">
        <level-complete :level="'Digital Footprint'" :score="5353" :stars="2" @play-again="playAgain" @finish="next"></level-complete>
    </div>


    <user-guide
      ref="assistant"
      :msg="'Great. Now you know how to set a secure password and what data is personal information and should kept private.\nBut before you post something, lets learn what we can and post and what we better do not post.'"
      actionA="Continue"
      :actionAFunc="showTask1Pre"
    ></user-guide>
  </div>
</template>

<script>

import UserGuide from '../../components/UserGuide.vue';
import ContainerGame from '../../components/Games/ContainerGame.vue';
import QuizGame from '../../components/Games/QuizGame.vue';
import SimplePost from '../../components/SimplePost.vue';
import LevelComplete from '../../components/LevelComplete.vue';
import {mapGetters} from 'vuex';

export default {
  name: "PostView",
  components: {UserGuide, SimplePost, ContainerGame, QuizGame, LevelComplete},
  data() {
    return {
      step: 0,
      firstGame: [
         { name: "Think before posting.", type: 'good'},
         { name: "Consider choice of words.", type: 'good' },
         { name: "Be respectful of differences.", type: 'good' },
         { name: "Do not be rude.", type: 'good' },
         { name: "Be rude if you don't agree with something.", type: 'bad' },
         { name: "Spread false information.", type: 'bad' },
         { name: "Post something that is not true.", type: 'bad'},
         { name: "Post private information.", type: 'bad' },
         { name: "Post negative thoughts and opinions about school or workplace.", type: 'bad'},
         { name: "Check grammar of the post.", type: 'good' },
         { name: "Share secrets with others.", type: 'bad' },
      ],
      quiz1: {
        question: "How would this post influence your digital footprints?",
        answers: [
          {id: 0, text: "I would probably regret it oneday.", correct: true},
          {id: 1, text: "This was a responsible post.", correct: false},
          {id: 2, text: "This post will have an impact on my digital footprint.", correct: true},
          {id: 3, text: "People think I am trustworthy.", correct: false},
        ]
      },
      quiz2: {
        question: "How would this post influence your digital footprints?",
        answers: [
          {id: 1, text: "This was a responsible post.", correct: false},
          {id: 2, text: "This post will have an impact on my digital footprint.", correct: true},
          {id: 3, text: "People think I am funny.", correct: false},
          {id: 4, text: "This post will have an impact on Maxs digital footprint.", correct: true},
        ]
      },
      quiz3: {
        question: "How would this posts influence your digital footprints?",
        answers: [
          {id: 1, text: "This are responsible posts.", correct: true},
          {id: 2, text: "This posts will have an negative impact on my digital footprint.", correct: false},
          {id: 3, text: "People think I am rude.", correct: false},
          {id: 3, text: "People think I am stupid.", correct: false},
        ]
      },
    };
  },
  computed: {
    ...mapGetters([
        'user'
    ]),
  },
  methods: {
    showTask1Pre() {
      this.step = 1;
      this.$refs.assistant.updateMessage("All this should be common sense anyway, right?\n\nBut it doesn't hurt to learn about it.");
      this.$refs.assistant.updateActions('Sure, good idea.', this.showTask1);
    },
    showTask1() {
      this.step = 2;
      this.$refs.assistant.updateMessage("Just tell me, when every i should check your work.");
      this.$refs.assistant.updateActions('I think I am done.', this.task1Check);
    },
    task1Check() {
      const result = this.$refs.game1.check();

      if (result == -1) {
        this.$refs.assistant.updateMessage("There are still some items in the 'all' column. Move all items to the according colum and i will check it again.");
        return;
      } else if (result == 0) {
        this.$refs.assistant.updateMessage("There are still some mistakes. Try again. I am sure you will manage it now.");
        return;
      } else {
        this.step = -1;
        this.$refs.assistant.updateMessage('You are right. Everything was correct.');
        this.$refs.assistant.updateActions('Continue', this.showTask2);
      }
    },
    showTask2() {
      this.step = 3;
      this.$refs.assistant.updateMessage("What do you think about this post?");
      this.$refs.assistant.updateActions('Check my answer.', this.task2Check);
    },
    task2Check() {
       if (this.$refs.quiz1.check() == 1) {
        this.points += 2;
        this.$refs.assistant.updateMessage('You are right. You should not post this.');
        this.$refs.assistant.updateActions('Continue', this.showTask3);
      } else {
        this.points--;
        this.$refs.assistant.updateMessage('Nope. You should not post this. This post will be not good for your digital footprint.');
        this.$refs.assistant.updateActions('Continue', this.showTask3);
      }
    },
    showTask3() {
      this.step = 4;
      this.$refs.assistant.updateMessage("What do you think about this post? Can we post it without any problem?");
      this.$refs.assistant.updateActions('This post is fine!', this.task3Fail, 'No, we should not post this!', this.task3Pass);
    },
    task3Fail() {
      this.$refs.assistant.updateMessage('Nope. You should never post your adress online.');
      this.$refs.assistant.updateActions('Continue', this.showTask4);
    },
    task3Pass() {
      this.$refs.assistant.updateMessage('You are right. The adress is private information and should not be shared online.');
      this.$refs.assistant.updateActions('Continue', this.showTask4);
    },
    showTask4() {
      this.step = 5;
      this.$refs.assistant.updateMessage("What do you think about this post?");
      this.$refs.assistant.updateActions('Check my answer.', this.task4Check);
    },
    task4Check() {
       if (this.$refs.quiz2.check() == 1) {
        this.points += 2;
        this.$refs.assistant.updateMessage('You are right. You should not post this.');
        this.$refs.assistant.updateActions('Continue', this.showTask5);
      } else {
        this.points--;
        this.$refs.assistant.updateMessage('Nope. You should not post this. This post will be not good for your digital footprint.');
        this.$refs.assistant.updateActions('Continue', this.showTask5);
      }
    },
    showTask5() {
      this.step = 6;
      this.$refs.assistant.updateMessage("What do you think about this post?");
      this.$refs.assistant.updateActions('Check my answer.', this.task5Check);
    },
    task5Check() {
       if (this.$refs.quiz3.check() == 1) {
        this.points += 2;
        this.$refs.assistant.updateMessage('You are right. These posts are fine and will not have a negative inpact on your digital footprint.');
        this.$refs.assistant.updateActions('Continue', this.finishLevel);
      } else {
        this.points--;
        this.$refs.assistant.updateMessage('Nope. This posts are fine.');
        this.$refs.assistant.updateActions('Continue', this.finishLevel);
      }
    },
    finishLevel() {
      this.$refs.assistant.hide();

      //calculate score and stars
      const points = 3;
      this.$store.dispatch('updateLevel', { id: 3, stars: points });

      //show level finished dialog
      this.step = 7;
    },
    playAgain() {
      this.$router.go();
    },
    next() {
      this.$router.replace('/levels');
    }
  },
};
</script>
<style scoped>
.feed {
  background-color: rgb(151, 182, 223);
  padding: 10px;
  max-height: 60vh;
  overflow-y: scroll;
}
</style>