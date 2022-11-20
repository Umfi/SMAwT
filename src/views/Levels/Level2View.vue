<template>
    <base-level :level_id="level_id" :level_name="level_name" :max_points="max_points" :max_steps="max_steps" ref="base">
    <template v-slot="{step}">
      <div v-if="step == 1">
          <h1 class="text-center">Digital Footprint</h1>

          <p class="lead bg-success shadow border p-3 text-white">
          Social media is a great way to communicate with others and express yourself. You can also use it to show others, including colleges or future employers, who you are as a person.
          However, social media use can also have drawbacks. What you and others share is permanent, and it's easy to get caught in sharing things you may later regret.<br>
          <br>
          Your digital footprint can affect your reputation online and offline. 
          <b>It's important to manage it as much as you can!</b>
          </p>
      </div>

      <div v-if="step == 2">
          <quiz-game key="quiz0" ref="quiz0" :question="quiz0.question" :answers="quiz0.answers"></quiz-game>
      </div>

      <div v-if="step == 3">
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
      </div>

      <div v-if="step == 4">
          <container-game ref="game1" :items="firstGame"></container-game>
      </div>


      <div v-if="step == 5">
        <div class="row">
          <div class="col">
            <simple-post id="1" :author="user" message="Yesterday was a crazy party. I can't wait for the next one." :image="'https://live.staticflickr.com/3035/3053053815_2aafbba224_b.jpg'"></simple-post>
          </div>
          <div class="col m-auto">
            <quiz-game key="quiz1" ref="quiz1" :question="quiz1.question" :answers="quiz1.answers"></quiz-game>
          </div>
        </div>
      </div>

      <div v-if="step == 6">
        <div class="row">
          <div class="col">
            <simple-post id="1" :author="user" message="I will make a party next weekend. Come all to my place in the Dancer Street 12 at 8pm."></simple-post>
          </div>
          <div class="col m-auto">
            <quiz-game key="quiz1_1" ref="quiz1_1" :question="quiz1_1.question" :answers="quiz1_1.answers"></quiz-game>
          </div>
        </div>
      </div>

      <div v-if="step == 7">
        <div class="row">
          <div class="col">
            <simple-post id="1" :author="user" message="Hahaha I just found out that Max can't count till 100. LOL he is so stupid."></simple-post>
          </div>
          <div class="col m-auto">
            <quiz-game key="quiz2" ref="quiz2" :question="quiz2.question" :answers="quiz2.answers"></quiz-game>
          </div>
        </div>
      </div>

      <div v-if="step == 8">
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

      <div v-if="step == 9" class="text-center">
        <image-game key="imagegame1" ref="imagegame1" image="1.png" :bb="{ x: 160, y: 215, width: 25, height: 20 }" @game-over="imageGameOver"/>
      </div>

      <div v-if="step == 10" class="text-center">
        <image-game key="imagegame2" ref="imagegame2" image="2.png" :bb="{ x: 328, y: 118, width: 30, height: 20 }" @game-over="imageGameOver"/>
      </div>

    </template>
  </base-level>
</template>

<script>
import BaseLevel from '../../components/BaseLevel.vue';
import ContainerGame from '../../components/Games/ContainerGame.vue';
import QuizGame from '../../components/Games/QuizGame.vue';
import SimplePost from '../../components/SimplePost.vue';
import ImageGame from '../../components/Games/ImageGame.vue';
import {mapGetters} from 'vuex';

export default {
  components: {BaseLevel, SimplePost, ContainerGame, QuizGame, ImageGame},
  name: 'Level2View',
  data() {
    return {
      level_id: 2,
      level_name: "Social Media and You",
      max_points: 14,
      max_steps: 11,
      //----------------
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
      quiz1_1: {
        question: "Would you post something like that?",
        answers: [
          {id: 0, text: "Yes sure.", correct: false},
          {id: 1, text: "Not really.", correct: true},
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
          {id: 4, text: "People think I am stupid.", correct: false},
        ]
      },
      secondGame: [
         { name: "Your digital footprint is permanent.", type: 'good'},
         { name: "Your actions online contribute to your digital footprint.", type: 'good' },
         { name: "What other people post online does not affect your digital footprint.", type: 'bad' },
         { name: "You hvae full controll over who sees your digital footprint.", type: 'bad' },
      ],
      // ----------------
      game: {
        steps: [
            {
                id: 1,
                assistant: {
                    text: "You have already learned how to create an account and what data you should kept private.\n\nNow you will learn how to protect your digital footprint.",
                    action: {
                        text: "Digital what?",
                        func: 2
                    },
                },
            },
            {
                id: 2,
                step: 1,
                assistant: {
                    text: "Everything you post online will be part of your digital footprint. This includes your posts, comments, pictures, videos, and more.\n\nYour digital footprint is permanent and can be seen by anyone. It can be used to judge you and your character.",
                    action:{
                        text: "I see, how can i shape my digital footprint?",
                        func: 3
                    },
                }, 
            },
            {
                id: 3,
                assistant: {
                    text: "It is important to think about what you post online. You should always think about the consequences of your actions.\nAsk yourself if you would be okay with your parents, teachers, or future employers seeing your post.\n\nYou should also think about how your post will affect others.\nWould you be okay with your post being shared with your friends, family, or classmates.",
                    action: {
                        text: "Ok, I got it.",
                        func: 4
                    }, 
                },
            },
            {
                id: 4,
                step: 2,
                assistant: {
                    text: "Let's test your knowledge about digital footprint. Can you answer the question above?",
                        action: {
                        text: "Check my answers.",
                    },
                },
                mode: 'quiz',
                modeDetails: {
                    ref: 'quiz0',
                    error: {
                        points: -1,
                        assistant: {
                            text: "Ups. Not everything was right.",
                            action: {
                                text: "Continue.",
                                func: 5
                            },
                        },
                    },
                    correct: {
                        points: 2,
                        assistant: {
                            text: "You are right. Good job!",
                            action: {
                                text: "Continue.",
                                func: 5
                            },
                        },
                    }
                }
            },
            {
                id: 5,
                step: 3,
                assistant: {
                    text: "Have a look at the text above.\nThat are some general easy to follow rules for keeping your digital footprint clean.\n\nIf something is not clear, just ask me by clicking the button with the questionmark for the according item.",
                    action: {
                        text: "Continue",
                        func: 6
                    },
                },
            },
            {
                id: 6,
                assistant: {
                    text: "It is really not that hard. Am I right?\n\nI have prepared a small task for you, where you can practice what you have learned.",
                    action: {
                        text: "Continue",
                        func: 7
                    }, 
                },
            },
            {
                id: 7,
                step: 4,
                assistant: {
                    text: "Just tell me, when ever I should check your work.",
                    action: {
                        text: "Check my answers.",
                    },
                },
                mode: 'containergame',
                modeDetails: {
                    ref: 'game1',
                    unfinished: {
                        assistant: {
                            text: "There are still some items in the 'ALL' column. Move all items to the according colum and i will check it again.",
                        },
                    },
                    error: {
                        points: -1,
                        assistant: {
                            text: "There are still some mistakes. Try again. I am sure you will manage it now.",
                        },
                    },
                    correct: {
                        points: 2,
                        assistant: {
                            text: "You are right. Everything was correct. Well done.",
                            action: {
                                text: "Continue.",
                                func: 8
                            },
                        },
                    }
                }
            },
            {
                id: 8,
                step: 5,
                assistant: {
                    text: "Have a look at the post above. What do you think about this post?",
                    action: {
                        text: "Check my answers.",
                    },
                },
                mode: 'quiz',
                modeDetails: {
                    ref: 'quiz1',
                    error: {
                        points: -1,
                        assistant: {
                            text: "Nope. You should not post this. This post will be not good for your digital footprint.",
                            action: {
                                text: "Continue.",
                                func: 9
                            },
                        },
                    },
                    correct: {
                        points: 2,
                        assistant: {
                            text: "You are right. You should not post this.",
                            action: {
                                text: "Continue.",
                                func: 9
                            },
                        },
                    }
                }
            },
            {
                id: 9,
                step: 6,
                assistant: {
                    text: "What do you think about this post? Can we post it without any problem?",
                    action: {
                        text: "Check my answers.",
                    },
                },
                mode: 'quiz',
                modeDetails: {
                    ref: 'quiz1_1',
                    error: {
                        points: -1,
                        assistant: {
                            text: "Nope. You should never post your adress online.",
                            action: {
                                text: "Continue",
                                func: 10
                            },
                        },
                    },
                    correct: {
                        points: 2,
                        assistant: {
                            text: "You are right. The adress is private information and should not be shared online.",
                            action: {
                                text: "Continue",
                                func: 10
                            },
                        },
                    }
                }
            },
            {
                id: 10,
                step: 7,
                assistant: {
                    text: "What do you think about this post?",
                    action: {
                        text: "Check my answers.",
                    },
                },
                mode: 'quiz',
                modeDetails: {
                    ref: 'quiz2',
                    error: {
                        points: -1,
                        assistant: {
                            text: "Nope. You should not post this. This post will be not good for your digital footprint.",
                            action: {
                                text: "Continue",
                                func: 11
                            },
                        },
                    },
                    correct: {
                        points: 2,
                        assistant: {
                            text: "You are right. You should not post this.",
                            action: {
                                text: "Continue",
                                func: 11
                            },
                        },
                    }
                }
            },
            {
                id: 11,
                step: 8,
                assistant: {
                    text: "What do you think about this post?",
                    action: {
                        text: "Check my answers.",
                    },
                },
                mode: 'quiz',
                modeDetails: {
                    ref: 'quiz3',
                    error: {
                        points: -1,
                        assistant: {
                            text: "Nope. This posts are fine.",
                            action: {
                                text: "Continue",
                                func: 12
                            },
                        },
                    },
                    correct: {
                        points: 2,
                        assistant: {
                            text: "You are right. These posts are fine and will not have a negative inpact on your digital footprint.",
                            action: {
                                text: "Continue",
                                func: 12
                            },
                        },
                    }
                }
            },
            {
                id: 12,
                hide: true,
                assistant: {
                    text: "Great. Now you know what you can post and what not. But watch out this also count for photos.\nI will show you what I mean.",
                    action: {
                        text: "Continue",
                        func: 13
                    }, 
                },
            },
            {
                id: 13,
                step: 9,
                assistant: {
                     text: "What do you think about this picture? Should we post it?",
                    action: {
                        text: "There is nothing problematic with this picture.",
                    }, 
                },
                mode: 'imagegame',
                modeDetails: {
                    ref: 'imagegame1',
                    unfinished: {
                        points: -1,
                        assistant: {
                            text: "Nothing problematic with that. Anything else?",
                        },
                    },
                    error: {
                        points: -1,
                        assistant: {
                            text: "Watch out. On this picture personal information like the house number is leaked.",
                            action: {
                                text: "Continue",
                                func: 14
                            },
                        },
                    },
                    correct: {
                        points: 2,
                        assistant: {
                            text: "You are right. On this picture we leak the house number. We do not want this information on the internet.",
                            action: {
                                text: "Continue",
                                func: 14
                            },
                        },
                    }
                }
            },
            {
                id: 14,
                step: 10,
                assistant: {
                    text: "What do you think about this picture? Should we post it?",
                    action: {
                        text: "There is nothing problematic with this picture.",
                    }, 
                },
                mode: 'imagegame',
                modeDetails: {
                    ref: 'imagegame2',
                    unfinished: {
                        points: -1,
                        assistant: {
                            text: "Nothing problematic with that. Anything else?",
                        },
                    },
                    error: {
                        points: -1,
                        assistant: {
                            text: "Watch out. On this picture personal information like a password is leaked.",
                            action: {
                                text: "Continue",
                                func: "COMPLETE"
                            },
                        },
                    },
                    correct: {
                        points: 2,
                        assistant: {
                            text: "You are right. On this picture we leak a password. We do not want this information on the internet.",
                            action: {
                                text: "Continue",
                                func: "COMPLETE"
                            },
                        },
                    }
                }
            },
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
        'user'
    ]),
  },
  mounted() {
    this.$refs.base.nextMove(this.game, this);
  },
  methods: {
    imageGameOver() {
        this.$refs.base.nextMove(this.game, this);
    },
    explain(id) {
      if (id == 1) {
        this.$refs.base.$refs.assistant.updateMessage("Always think before you post something online. Ask yourself if you would be okay with your parents, teachers, or future employers seeing your post.");
      } else if (id == 2) {
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
  }
}
</script>
<style scoped>
.feed {
  background-color: rgb(151, 182, 223);
  padding: 10px;
  max-height: 60vh;
  overflow-y: scroll;
}
</style>