<template>
  <base-level :level_id="level_id" :level_name="level_name" :max_points="max_points" :max_steps="max_steps" ref="base">
    <template v-slot="{step}">

    <div v-if="step == 1">
      
        <div v-show="subStep == 1">
          <h1 class="text-center">Digital Footprint</h1>

          <p class="lead bg-success shadow border p-3 text-white">
          Social media is a great way to communicate with others and express yourself. You can also use it to show others, including colleges or future employers, who you are as a person.
          However, social media use can also have drawbacks. What you and others share is permanent, and it's easy to get caught in sharing things you may later regret.<br>
          <br>
          Your digital footprint can affect your reputation online and offline. 
          <b>It's important to manage it as much as you can!</b>
          </p>
        </div>

        <div v-show="subStep == 2">
          <quiz-game key="quiz0" ref="quiz0" :question="quiz0.question" :answers="quiz0.answers"></quiz-game>
        </div>

        <div v-show="subStep == 3">
          <h3 class="text-center">Keep following rules in mind and you should be safe!</h3>
          <ul class="list-group">
              <li class="list-group-item">Think before you post. <button type="button" class="btn btn-primary btn-sm float-end" @click="explain(1)"><i class="fas fa-question"></i></button></li>
              <li class="list-group-item">Be empathetic and consider your choice of words. <button type="button" class="btn btn-primary btn-sm float-end" @click="explain(2)"><i class="fas fa-question"></i></button></li>
              <li class="list-group-item">Be respectful of differences. <button type="button" class="btn btn-primary btn-sm float-end" @click="explain(3)"><i class="fas fa-question"></i></button></li>
              <li class="list-group-item">Do not be rude even if you don't agree with their views. <button type="button" class="btn btn-primary btn-sm float-end" @click="explain(4)"><i class="fas fa-question"></i></button></li>
              <li class="list-group-item">Do not spread false information or rumours. <button type="button" class="btn btn-primary btn-sm float-end" @click="explain(5)"><i class="fas fa-question"></i></button></li>
              <li class="list-group-item" >Do not post private information. <button type="button" class="btn btn-primary btn-sm float-end" @click="explain(6)"><i class="fas fa-question"></i></button></li>
              <li class="list-group-item" >Do not post negative thoughts and opinions about your school or workplace. <button type="button" class="btn btn-primary btn-sm float-end" @click="explain(7)"><i class="fas fa-question"></i></button></li>
          </ul>

           <button type="button" class="btn btn-primary btn-lg btn-block mt-5 w-100" @click="showTask1Pre3()">Continue</button>
     
        </div>
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

    </template>
  </base-level>
</template>

<script>

import BaseLevel from '../../components/BaseLevel.vue';
import ContainerGame from '../../components/Games/ContainerGame.vue';
import QuizGame from '../../components/Games/QuizGame.vue';
import SimplePost from '../../components/SimplePost.vue';
import {mapGetters} from 'vuex';

export default {
  name: "PostView",
  components: {BaseLevel, SimplePost, ContainerGame, QuizGame},
  data() {
    return {
      level_id: 3,
      level_name: "Digital Footprint",
      max_points: 10,
      max_steps: 7,
      // ---------------
      subStep: 1,
      quiz0: {
        question: "Which of the following facts about 'DIGITAL FOOTPRINT' is true?",
        answers: [
          {id: 0, text: "My digital footprint can be seen only by me.", correct: false},
          {id: 1, text: "I can influence my digital footprint.", correct: true},
          {id: 2, text: "I can not influence the digital footprint of others.", correct: false},
          {id: 3, text: "Others can influence my digital footprint.", correct: true},
          {id: 4, text: "Only photos of me can influence my digital footprint.", correct: false},
          {id: 5, text: "My digital footprint can be good for me.", correct: true},
          {id: 6, text: "My digital footprint can be bad for me.", correct: true},
          {id: 7, text: "I can easily get rid of my digital footprint.", correct: false},
        ]
      },
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
      secondGame: [
         { name: "Your digital footprint is permanent.", type: 'good'},
         { name: "Your actions online contribute to your digital footprint.", type: 'good' },
         { name: "What other people post online does not affect your digital footprint.", type: 'bad' },
         { name: "You hvae full controll over who sees your digital footprint.", type: 'bad' },
      ]
    };
  },
  computed: {
    ...mapGetters([
        'user'
    ]),
  },
  mounted() {
    this.$refs.base.$refs.assistant.updateMessage("You have already learned how to create an account and what data you should kept private.\n\nNow you will learn how to protect your digital footprint.");
    this.$refs.base.$refs.assistant.updateActions('Digital what?', this.showTask1Pre);
  },
  methods: {
    showTask1Pre() {
      this.$refs.base.step = 1;
      this.$refs.base.$refs.assistant.updateMessage("Everything you post online will be part of your digital footprint. This includes your posts, comments, pictures, videos, and more.\n\nYour digital footprint is permanent and can be seen by anyone. It can be used to judge you and your character.");
      this.$refs.base.$refs.assistant.updateActions('I see, how can i shape my digital footprint?', this.showTask1Pre1);
    },
    showTask1Pre1() {
      this.subStep = 0;
      this.$refs.base.$refs.assistant.updateMessage("It is important to think about what you post online. You should always think about the consequences of your actions.\nAsk yourself if you would be okay with your parents, teachers, or future employers seeing your post.\n\nYou should also think about how your post will affect others.\nWould you be okay with your post being shared with your friends, family, or classmates?");
      this.$refs.base.$refs.assistant.updateActions('I get it.', this.showQuiz0);
    },
    showQuiz0() {
      this.subStep = 2;
      this.$refs.base.$refs.assistant.updateMessage("Let's test your knowledge about digital footprint. Can you answer the question above?");
      this.$refs.base.$refs.assistant.updateActions('Check my answer.', this.quiz0Check);
    },
    quiz0Check() {
       if (this.$refs.quiz0.check() == 1) {
        this.$refs.base.points += 2;
        this.$refs.base.$refs.assistant.updateMessage('You are right. Good job!');
        this.$refs.base.$refs.assistant.updateActions('Continue', this.showTask1Pre2);
      } else {
        this.$refs.base.points--;
        this.$refs.base.$refs.assistant.updateMessage('Ups. Not everything was right.');
        this.$refs.base.$refs.assistant.updateActions('Continue', this.showTask1Pre2);
      }
    },
    showTask1Pre2() {
      this.subStep = 3;
      this.$refs.base.$refs.assistant.updateMessage("Have a look at the text above.\nThat are some general easy to follow rules for keeping your digital footprint clean.\n\nIf something is not clear, just ask me by clicking the button with the questionmark for the according item.");
      this.$refs.base.$refs.assistant.hideOptions();
    },
    explain(id) {
      if (id == 1) {
        this.$refs.base.$refs.assistant.updateMessage("Always think before you post something online. Ask yourself if you would be okay with your parents, teachers, or future employers seeing your post.");
      }
      else if (id == 2) {
        this.$refs.base.$refs.assistant.updateMessage("Consider the choice of words. It could be possible that your post is misinterpreted.");
      } else if (id == 3) {
        this.$refs.base.$refs.assistant.updateMessage("Be respectful of differences. Not everybody thinks the same way as you do. Respect other people's opinions.");
      } else if (id == 4) {
        this.$refs.base.$refs.assistant.updateMessage("Do not be rude. You should not post anything that could be offensive to others.");
      } else if (id == 5) {
        this.$refs.base.$refs.assistant.updateMessage("Don't spread false information. If you are not sure if something is true, don't post it.");
      } else if (id == 6) {
        this.$refs.base.$refs.assistant.updateMessage("Never post private information. This includes your address, phone number, or other personal information.");
      } else if (id == 7) {
        this.$refs.base.$refs.assistant.updateMessage("Do not post negative thoughts and opinions about school or workplace. This could affect your reputation.");
      }
    },
    showTask1Pre3() {
      this.subStep = 0;
      this.$refs.base.$refs.assistant.updateMessage("It is really not that hard. Am I right?\n\nI have prepared a small task for you, where you can practice what you have learned.");
      this.$refs.base.$refs.assistant.updateActions('Continue.', this.showTask1);
      this.$refs.base.$refs.assistant.showOptions();
    },
    showTask1() {
      this.$refs.base.step = 2;
      this.$refs.base.$refs.assistant.updateMessage("Just tell me, when every i should check your work.");
      this.$refs.base.$refs.assistant.updateActions('I think I am done.', this.task1Check);
    },
    task1Check() {
      const result = this.$refs.game1.check();

      if (result == -1) {
        this.$refs.base.$refs.assistant.updateMessage("There are still some items in the 'all' column. Move all items to the according colum and i will check it again.");
        return;
      } else if (result == 0) {
        this.$refs.base.$refs.assistant.updateMessage("There are still some mistakes. Try again. I am sure you will manage it now.");
        return;
      } else {
        this.$refs.base.$refs.assistant.updateMessage('You are right. Everything was correct.');
        this.$refs.base.$refs.assistant.updateActions('Continue', this.showTask2);
      }
    },
    showTask2() {
      this.$refs.base.step = 3;
      this.$refs.base.$refs.assistant.updateMessage("Have a look at the post above. What do you think about this post?");
      this.$refs.base.$refs.assistant.updateActions('Check my answer.', this.task2Check);
    },
    task2Check() {
       if (this.$refs.quiz1.check() == 1) {
        this.$refs.base.points += 2;
        this.$refs.base.$refs.assistant.updateMessage('You are right. You should not post this.');
        this.$refs.base.$refs.assistant.updateActions('Continue', this.showTask3);
      } else {
        this.$refs.base.points--;
        this.$refs.base.$refs.assistant.updateMessage('Nope. You should not post this. This post will be not good for your digital footprint.');
        this.$refs.base.$refs.assistant.updateActions('Continue', this.showTask3);
      }
    },
    showTask3() {
      this.$refs.base.step = 4;
      this.$refs.base.$refs.assistant.updateMessage("What do you think about this post? Can we post it without any problem?");
      this.$refs.base.$refs.assistant.updateActions('This post is fine!', this.task3Fail, 'No, we should not post this!', this.task3Pass);
    },
    task3Fail() {
      this.$refs.base.$refs.assistant.updateMessage('Nope. You should never post your adress online.');
      this.$refs.base.$refs.assistant.updateActions('Continue', this.showTask4);
    },
    task3Pass() {
      this.$refs.base.$refs.assistant.updateMessage('You are right. The adress is private information and should not be shared online.');
      this.$refs.base.$refs.assistant.updateActions('Continue', this.showTask4);
    },
    showTask4() {
      this.$refs.base.step = 5;
      this.$refs.base.$refs.assistant.updateMessage("What do you think about this post?");
      this.$refs.base.$refs.assistant.updateActions('Check my answer.', this.task4Check);
    },
    task4Check() {
       if (this.$refs.quiz2.check() == 1) {
        this.$refs.base.points += 2;
        this.$refs.base.$refs.assistant.updateMessage('You are right. You should not post this.');
        this.$refs.base.$refs.assistant.updateActions('Continue', this.showTask5);
      } else {
        this.$refs.base.points--;
        this.$refs.base.$refs.assistant.updateMessage('Nope. You should not post this. This post will be not good for your digital footprint.');
        this.$refs.base.$refs.assistant.updateActions('Continue', this.showTask5);
      }
    },
    showTask5() {
      this.$refs.base.step = 6;
      this.$refs.base.$refs.assistant.updateMessage("What do you think about this post?");
      this.$refs.base.$refs.assistant.updateActions('Check my answer.', this.task5Check);
    },
    task5Check() {
       if (this.$refs.quiz3.check() == 1) {
        this.$refs.base.points += 2;
        this.$refs.base.$refs.assistant.updateMessage('You are right. These posts are fine and will not have a negative inpact on your digital footprint.');
        this.$refs.base.$refs.assistant.updateActions('Continue', this.$refs.base.finishLevel);
      } else {
        this.$refs.base.points--;
        this.$refs.base.$refs.assistant.updateMessage('Nope. This posts are fine.');
        this.$refs.base.$refs.assistant.updateActions('Continue', this.$refs.base.finishLevel);
      }
    },
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