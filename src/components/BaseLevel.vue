<template>
<div>
  <level-progress :step="gameStep" :max="level_data.steps.length"></level-progress>
  <div id="container" class="container mt-5">

    <div v-if="!complete" class="content">
      <html-viewer v-if="currentGameStep && currentGameStep.mode && currentGameStep.mode == 'html'"  :path="currentGameStep.modeDetails.data.path"></html-viewer>
      
      <video-viewer v-if="currentGameStep && currentGameStep.mode && currentGameStep.mode == 'video'" :ref="currentGameStep.modeDetails.ref" :path="currentGameStep.modeDetails.data.path" :type="currentGameStep.modeDetails.data.type"></video-viewer>
      
      <explain-component v-if="currentGameStep && currentGameStep.mode && currentGameStep.mode == 'explain'"  :title="currentGameStep.modeDetails.data.title" :description="currentGameStep.modeDetails.data.description" :items="currentGameStep.modeDetails.data.items" @explain="explain"></explain-component>
      
      <passwort-strength-checker v-if="currentGameStep && currentGameStep.mode && currentGameStep.mode == 'password-strength-checker'" :ref="currentGameStep.modeDetails.ref"></passwort-strength-checker>
      
      <container-game v-if="currentGameStep && currentGameStep.mode && currentGameStep.mode == 'sortinggame'" :ref="currentGameStep.modeDetails.ref" :items="currentGameStep.modeDetails.data.items"  :explanation="currentGameStep.modeDetails.data.explanation" :titleLeft="currentGameStep.modeDetails.data.left" :titleRight="currentGameStep.modeDetails.data.right" @ready="activateAssistant"></container-game>

      <div v-if="currentGameStep && currentGameStep.mode && currentGameStep.mode == 'quiz'">
        <div class="row" v-if="currentGameStep.modeDetails.content">
          <div class="col align-self-center">
            <simple-post v-if="currentGameStep.modeDetails.content.component == 'fb-post'" :author="currentGameStep.modeDetails.content.author" :message="currentGameStep.modeDetails.content.message" :image="currentGameStep.modeDetails.content.image"></simple-post>
            <simple-insta-post v-if="currentGameStep.modeDetails.content.component == 'insta-post'" :author="currentGameStep.modeDetails.content.author" :message="currentGameStep.modeDetails.content.message" :image="currentGameStep.modeDetails.content.image"></simple-insta-post>
            <simple-snap-post v-if="currentGameStep.modeDetails.content.component == 'snap-post'" :message="currentGameStep.modeDetails.content.message" :image="currentGameStep.modeDetails.content.image" :position="currentGameStep.modeDetails.content.position"></simple-snap-post>
            <simple-friend-request v-if="currentGameStep.modeDetails.content.component == 'friend-request'" :name="currentGameStep.modeDetails.content.name" :avatar="currentGameStep.modeDetails.content.avatar" :mutal="currentGameStep.modeDetails.content.mutal" :network="currentGameStep.modeDetails.content.network"></simple-friend-request>
            <simple-chat v-if="currentGameStep.modeDetails.content.component == 'chat'" :messages="currentGameStep.modeDetails.content.messages"></simple-chat>
            <simple-post v-if="currentGameStep.modeDetails.content.component == 'news-post'" :author="currentGameStep.modeDetails.content.author" :image="currentGameStep.modeDetails.content.image" :message="currentGameStep.modeDetails.content.message" :link="currentGameStep.modeDetails.content.link" :headline="currentGameStep.modeDetails.content.headline"></simple-post>
          </div>
          <div class="col m-auto">
              <quiz-game :key="currentGameStep.modeDetails.ref" :ref="currentGameStep.modeDetails.ref" :question="currentGameStep.modeDetails.data.question" :answers="currentGameStep.modeDetails.data.answers" @ready="activateAssistant"></quiz-game>
          </div>
        </div>
        <div v-else>
          <quiz-game :key="currentGameStep.modeDetails.ref" :ref="currentGameStep.modeDetails.ref" :question="currentGameStep.modeDetails.data.question" :answers="currentGameStep.modeDetails.data.answers" @ready="activateAssistant"></quiz-game>
        </div>
      </div>

      <falling-text-game v-if="currentGameStep && currentGameStep.mode && currentGameStep.mode == 'fallinggame'" :description="currentGameStep.modeDetails.data.description" :items="currentGameStep.modeDetails.data.items" :ref="currentGameStep.modeDetails.ref" @game-over="gameCallback"></falling-text-game>

      <profile-setup v-if="currentGameStep && currentGameStep.mode && currentGameStep.mode == 'profilesetup'" :ref="currentGameStep.modeDetails.ref"></profile-setup>

      <div class="text-center" v-if="currentGameStep && currentGameStep.mode && currentGameStep.mode == 'imagegame'">
        <image-game :key="currentGameStep.modeDetails.ref" :ref="currentGameStep.modeDetails.ref" :image="currentGameStep.modeDetails.data.image" :bb="currentGameStep.modeDetails.data.bb" :explanation="currentGameStep.modeDetails.data.explanation" @game-over="gameCallback"></image-game>
      </div>

      <post-privacy-game v-if="currentGameStep && currentGameStep.mode && currentGameStep.mode == 'privacygame'" :ref="currentGameStep.modeDetails.ref" :message="currentGameStep.modeDetails.data.message" :answer="currentGameStep.modeDetails.data.answer" @ready="activateAssistant"></post-privacy-game>

      <div v-if="currentGameStep && currentGameStep.mode && currentGameStep.mode == 'information-chat'">
        <information-chat :key="currentGameStep.modeDetails.ref" :ref="currentGameStep.modeDetails.ref" :question="currentGameStep.modeDetails.data.question" :answers="currentGameStep.modeDetails.data.answers" :mode="currentGameStep.modeDetails.data.mode" :store="currentGameStep.modeDetails.data.store" :chat="currentGameStep.modeDetails.data.chat"  @ready="activateAssistant"></information-chat>
      </div>

      <puzzle-game v-if="currentGameStep && currentGameStep.mode && currentGameStep.mode == 'puzzlegame'" :ref="currentGameStep.modeDetails.ref" :image="currentGameStep.modeDetails.data.image" :description="currentGameStep.modeDetails.data.description" @game-over="gameCallback"></puzzle-game>

    </div>

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
import { mapGetters } from "vuex";

import UserGuide from "./UserGuide.vue";
import LevelComplete from "./LevelComplete.vue";
import LevelProgress from "./LevelProgress.vue";

import HtmlViewer from "./HtmlViewer.vue";
import VideoViewer from "./VideoViewer.vue";
import ExplainComponent from "./ExplainComponent.vue";
import ContainerGame from "./Games/ContainerGame.vue";
import QuizGame from "./Games/QuizGame.vue";
import FallingTextGame from "./Games/FallingTextGame.vue";
import ProfileSetup from "./ProfileSetup.vue";
import ImageGame from "./Games/ImageGame.vue";
import SimplePost from "./SimplePost.vue";
import SimpleInstaPost from "./SimpleInstaPost.vue";
import SimpleSnapPost from "./SimpleSnapPost.vue";
import PostPrivacyGame from "./Games/PostPrivacyGame.vue";
import SimpleFriendRequest from "./SimpleFriendRequest.vue";
import SimpleChat from "./SimpleChat.vue";
import PasswortStrengthChecker from "./PasswortStrengthChecker.vue";
import InformationChat from "./InformationChat.vue";
import PuzzleGame from "./Games/PuzzleGame.vue";

export default {
  name: "BaseLevel",
  components: { 
    UserGuide, 
    LevelComplete, 
    LevelProgress, 
    HtmlViewer, 
    VideoViewer,
    ExplainComponent, 
    ContainerGame, 
    QuizGame, 
    FallingTextGame, 
    ProfileSetup,
    ImageGame,
    SimplePost,
    SimpleInstaPost,
    SimpleSnapPost,
    PostPrivacyGame,
    SimpleFriendRequest,
    SimpleChat,
    PasswortStrengthChecker,
    InformationChat,
    PuzzleGame
  },
  props: {
    level_id: {
      type: Number,
      required: true,
    },
    level_name: {
      type: String,
      required: true,
    },
    level_data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      complete: false,
      points: 0,
      gameStep: 1,
      currentGameStep: null,
    };
  },
  computed: {
    ...mapGetters([
        'user'
    ]),
    max_points() {
      let max = 0;
      for (let step of this.level_data.steps) {
        if (step.modeDetails && step.modeDetails.correct && step.modeDetails.correct.points) {
          max += step.modeDetails.correct.points;
        }
      }
      return max;
    },
  },
  watch: {
    points(newVal, oldVal) {
      if (newVal > oldVal) {
        this.updateGlobalPoints(parseInt(newVal - oldVal));
      } else if (newVal < oldVal) {
        this.updateGlobalPoints(parseInt((oldVal - newVal)) * -1);
      }
    },
  },
  methods: {
    async nextMove() {
      if (this.gameStep === "COMPLETE") {
        this.finishLevel();
        return;
      }

      this.currentGameStep = this.level_data.steps.find(step => step.id === this.gameStep);

      this.$refs.assistant.updateMessage(this.currentGameStep.assistant.text);
      if ((this.currentGameStep.mode === undefined || this.currentGameStep.mode === 'html' || this.currentGameStep.mode === 'explain')  && this.currentGameStep.assistant.action.func) {
        this.$refs.assistant.updateActions(this.currentGameStep.assistant.action.text, () => { this.gameStep = this.currentGameStep.assistant.action.func; this.nextMove(); });
      }

       if (this.currentGameStep.mode == "video") {
        this.$refs.assistant.updateActions(this.currentGameStep.assistant.action.text, () => { 
          const canContinue = this.$refs[this.currentGameStep.modeDetails.ref].check(); 
          
          if (canContinue) {
            this.gameStep = this.currentGameStep.assistant.action.func; this.nextMove();
          } else {
            this.$refs.assistant.updateMessage("Das Video ist noch nicht zu Ende.");
          } 
        });
      }

      if (this.currentGameStep.mode == "sortinggame") {
        this.$refs.assistant.updateActions(this.currentGameStep.assistant.action.text, () => { 

          const result = this.$refs[this.currentGameStep.modeDetails.ref].check(); 
          if (result == -1) {
            this.$refs.assistant.updateMessage(this.currentGameStep.modeDetails.unfinished.assistant.text);
          } else if (result == 0) {
            this.$refs.assistant.updateMessage(this.currentGameStep.modeDetails.error.assistant.text);

            if (this.currentGameStep.modeDetails.error.points) {
               this.points += this.currentGameStep.modeDetails.error.points;
            }
          } else if (result == 1) {
            this.$refs.assistant.updateMessage(this.currentGameStep.modeDetails.correct.assistant.text);

            if (this.currentGameStep.modeDetails.correct.points) {
               this.points += this.currentGameStep.modeDetails.correct.points;
            }

            if (this.currentGameStep.modeDetails.correct.assistant.action) {
              this.$refs.assistant.updateActions(this.currentGameStep.modeDetails.correct.assistant.action.text, () => { this.gameStep = this.currentGameStep.modeDetails.correct.assistant.action.func; this.nextMove(); });
            }
          }
        });
      }

      if (this.currentGameStep.mode == "quiz") {
        this.$refs.assistant.updateActions(this.currentGameStep.assistant.action.text, () => { 
          const result = this.$refs[this.currentGameStep.modeDetails.ref].check(); 
          
          if (result == 1) {
            this.$refs.assistant.updateMessage(this.currentGameStep.modeDetails.correct.assistant.text);

            if (this.currentGameStep.modeDetails.correct.points) {
               this.points += this.currentGameStep.modeDetails.correct.points;
            }

            if (this.currentGameStep.modeDetails.correct.assistant.action) {
              this.$refs.assistant.updateActions(this.currentGameStep.modeDetails.correct.assistant.action.text, () => { this.gameStep = this.currentGameStep.modeDetails.correct.assistant.action.func; this.nextMove(); });
            }
          } else {
            this.$refs.assistant.updateMessage(this.currentGameStep.modeDetails.error.assistant.text);

            if (this.currentGameStep.modeDetails.error.points) {
               this.points += this.currentGameStep.modeDetails.error.points;
            }

            if (this.currentGameStep.modeDetails.error.assistant.action) {
              this.$refs.assistant.updateActions(this.currentGameStep.modeDetails.error.assistant.action.text, () => { this.gameStep = this.currentGameStep.modeDetails.error.assistant.action.func; this.nextMove(); });
            }
          } 
        });
      }

      if (this.currentGameStep.mode == "fallinggame") {
        this.$refs.assistant.hideOptions();
      }

      if (this.currentGameStep.mode == "imagegame") {
        this.$refs.assistant.hideOptions();
      }

      if (this.currentGameStep.mode == "puzzlegame") {
        this.$refs.assistant.hideOptions();
      }

      if (this.currentGameStep.mode == "password-strength-checker") {
        this.$refs.assistant.updateActions(this.currentGameStep.assistant.action.text, () => { 

          const result = this.$refs[this.currentGameStep.modeDetails.ref].check(); 

          this.$refs.assistant.updateMessage(result.message);
          if (result.status >= 3) {
            
            if (this.currentGameStep.modeDetails.correct.points) {
               this.points += this.currentGameStep.modeDetails.correct.points;
            }

            if (this.currentGameStep.modeDetails.correct.assistant.action) {
              this.$refs.assistant.updateActions(this.currentGameStep.modeDetails.correct.assistant.action.text, () => { this.gameStep = this.currentGameStep.modeDetails.correct.assistant.action.func; this.nextMove(); });
            }
          } else {
            if (this.currentGameStep.modeDetails.error.points) {
               this.points += this.currentGameStep.modeDetails.error.points;
            }
          }
        });
      }

      if (this.currentGameStep.mode == "profilesetup") {
        this.$refs.assistant.updateActions(this.currentGameStep.assistant.action.text, () => { 

          const result = this.$refs[this.currentGameStep.modeDetails.ref].check(); 

          if (result.status == 1) {
            this.$refs.assistant.updateMessage(this.currentGameStep.modeDetails.correct.assistant.text);

            if (this.currentGameStep.modeDetails.correct.points) {
               this.points += this.currentGameStep.modeDetails.correct.points;
            }

            if (this.currentGameStep.modeDetails.correct.assistant.action) {
              this.$refs.assistant.updateActions(this.currentGameStep.modeDetails.correct.assistant.action.text, () => { this.gameStep = this.currentGameStep.modeDetails.correct.assistant.action.func; this.nextMove(); });
            }
          } else {
            this.$refs.assistant.updateMessage(result.message);

            if (this.currentGameStep.modeDetails.error.points) {
               this.points += this.currentGameStep.modeDetails.error.points;
            }
          }
        });
      }

      if (this.currentGameStep.mode == "privacygame") {
        this.$refs.assistant.updateActions(this.currentGameStep.assistant.action.text, () => { 

          const result = this.$refs[this.currentGameStep.modeDetails.ref].checkAnswer(); 
          if (result == -1) {
            this.$refs.assistant.updateMessage(this.currentGameStep.modeDetails.unfinished.assistant.text);
          } else if (result == 0) {
            this.$refs.assistant.updateMessage(this.currentGameStep.modeDetails.error.assistant.text);

            if (this.currentGameStep.modeDetails.error.points) {
               this.points += this.currentGameStep.modeDetails.error.points;
            }

            if (this.currentGameStep.modeDetails.error.assistant.action) {
              this.$refs.assistant.updateActions(this.currentGameStep.modeDetails.error.assistant.action.text, () => { this.gameStep = this.currentGameStep.modeDetails.error.assistant.action.func; this.nextMove(); });
            }
          } else if (result == 1) {
            this.$refs.assistant.updateMessage(this.currentGameStep.modeDetails.correct.assistant.text);

            if (this.currentGameStep.modeDetails.correct.points) {
               this.points += this.currentGameStep.modeDetails.correct.points;
            }

            if (this.currentGameStep.modeDetails.correct.assistant.action) {
              this.$refs.assistant.updateActions(this.currentGameStep.modeDetails.correct.assistant.action.text, () => { this.gameStep = this.currentGameStep.modeDetails.correct.assistant.action.func; this.nextMove(); });
            }
          }
        });
      }

      if (this.currentGameStep.mode == "information-chat") {
        this.$refs.assistant.updateActions(this.currentGameStep.assistant.action.text, () => { 
          const result = this.$refs[this.currentGameStep.modeDetails.ref].check(); 
          if (result > 0) {
            this.gameStep = result; 
            this.nextMove(); 
          }
        });
      }

    },
    updateGlobalPoints(points) {
      this.$store.dispatch("updatePoints", points);
    },
    finishLevel() {
      this.$refs.assistant.hide();
      this.complete = true;
    },
    playAgain() {
      this.$router.go();
    },
    next() {
      this.$router.replace("/levels");
    },
    //////////////////////////////
    activateAssistant() {
      this.$refs.assistant.getAttention();
    },
    explain(msg) {
      this.$refs.assistant.updateMessage(msg);
    },
    gameCallback(result) {
      this.$refs.assistant.showOptions();

      if (result == -1) {
        this.$refs.assistant.updateMessage(this.currentGameStep.modeDetails.unfinished.assistant.text);

          if (this.currentGameStep.modeDetails.unfinished.points) {
            this.points += this.currentGameStep.modeDetails.unfinished.points;
          }

          this.$refs.assistant.hideOptions();
      } else if (result == 0) {
        this.$refs.assistant.updateMessage(this.currentGameStep.modeDetails.error.assistant.text);

        if (this.currentGameStep.modeDetails.error.points) {
            this.points += this.currentGameStep.modeDetails.error.points;
        }

        if (this.currentGameStep.modeDetails.error.assistant.action) {
          this.$refs.assistant.updateActions(this.currentGameStep.modeDetails.error.assistant.action.text, () => { this.gameStep = this.currentGameStep.modeDetails.error.assistant.action.func; this.nextMove(); });
        }
      } else if (result == 1) {
        this.$refs.assistant.updateMessage(this.currentGameStep.modeDetails.correct.assistant.text);

        if (this.currentGameStep.modeDetails.correct.points) {
            this.points += this.currentGameStep.modeDetails.correct.points;
        }

        if (this.currentGameStep.modeDetails.correct.assistant.action) {
          this.$refs.assistant.updateActions(this.currentGameStep.modeDetails.correct.assistant.action.text, () => { this.gameStep = this.currentGameStep.modeDetails.correct.assistant.action.func; this.nextMove(); });
        }
      }
    },
  },
};
</script>
<style scoped>
.content {
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 80vh;
}
</style>