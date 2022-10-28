<template>
  <div>
    <level-progress :step="step" :max="7"></level-progress>
    <div class="container mt-5">
      
      <div v-if="step == 0">

        <h3 class="text-center mb-2">You & Your Friends</h3>
        <div class="row">
          <div class="col-3 m-auto">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title text-center">{{user.name}}</h5>
              </div>
              <div class="card-body text-center">
                <img :src="user.image" class="img-fluid rounded-circle" width="150"/>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col" v-for="friend in friends" :key="friend.name">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title text-center">{{friend.name}}</h5>
              </div>
              <div class="card-body text-center">
                <img :src="friend.avatar" class="img-fluid rounded-circle" width="150"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="step == 1">
          <social-feed ref="feed" @post="postCallback" @post-like="likePostCallback" @post-comment="commentPostCallback" @friend-request="friendRequestCallback" @report-comment="commentReportCallback"></social-feed>
      </div>

      <div v-if="step == 2">
          <level-complete :level_id="9" :level_name="'Story'" :score="points" :max_score="max_points" @play-again="playAgain" @finish="next"></level-complete>
      </div>

      <user-guide
        ref="assistant"
        :msg="'Hello ' + user.name + '. This is the final chapter where you can show us what you have learned.\n\nAbove you can see your friends.'"
        actionA="Continue"
        :actionAFunc="showSocialFeed"
      ></user-guide>

    </div>
  </div>
</template>

<script>
import UserGuide from '../../components/UserGuide.vue';
import {mapGetters} from 'vuex';
import LevelComplete from '../../components/LevelComplete.vue';
import LevelProgress from '../../components/LevelProgress.vue';

import SocialFeed from '../../components/SocialFeed.vue';
import mergeImages from 'merge-images';

import Vue from 'vue';
import VueShepherd from 'vue-shepherd';

Vue.use(VueShepherd);

export default {
  components: { UserGuide, LevelComplete, LevelProgress, SocialFeed },
  name: 'StoryView',
  data() {
    return {
      tour: null,
      step: 0,
      storyStep: 0,
      points: 1,
      max_points: 1,
      activePost: 0,
      friends: [
        {
            name: 'Lisa',
            avatar: 'https://avatars.dicebear.com/api/avataaars/656.png'
        },
        {
            name: 'Simon',
            avatar: 'https://avatars.dicebear.com/api/avataaars/gfgs.png'
        },
        {
            name: 'Marie',
            avatar: 'https://avatars.dicebear.com/api/avataaars/dfsxcas.png'
        },
        {
            name: 'Leo',
            avatar: 'https://avatars.dicebear.com/api/avataaars/qdsa.png'
        }
      ],
      evilUser: [
        {
            name: 'Linda',
            avatar: 'https://avatars.dicebear.com/api/avataaars/alex.png'
        },
        {
            name: 'Alex',
            avatar: 'https://avatars.dicebear.com/api/avataaars/linda.png'
        },
      ]
    }
  },
  computed: {
    ...mapGetters([
        'user'
    ]),
  },
  mounted() {
    this.tour = this.$shepherd({
      useModalOverlay: true,
      defaultStepOptions: {
        scrollTo: true
      }
    });
  },
  methods: {
    likePostCallback(data) {
      if (this.storyStep == 3) 
      {
          if (data.post == 4 && data.state == true) {
              this.storyStep4();
          }
      }
    },
    commentPostCallback(data) {
      if (this.storyStep == 4) 
      {
          if (data.post == 4) {
              setTimeout(() => {
                  this.$refs.feed.$refs['posts'][data.post - 1].addComment(this.friends[1], "Thanks for your comment. I really appreciate it.");
              }, 1000);
              this.storyStep5();
          }
      }
    },
    friendRequestCallback(data) {
      if (this.storyStep == 6) {
        this.storyStep7(data.status);
      }

      if (this.storyStep == 13) {
        this.storyStep14(data.status);
      }
    }, 
    postCallback(data) {
      if (this.storyStep == 8) {
        this.activePost = data.id;
        this.storyStep9(data);
      }
    },
    commentReportCallback({post, comment}) {
      if (this.storyStep == 11) {
        if (post == this.activePost && comment == 3) {
          this.storyStep12();
        }
      }
    },
    showSocialFeed() {  
      this.step = 1;
      
      
      setTimeout(() => {
        this.$refs.feed.setInteractive(false);
      }, 1000);
      
      
      this.$refs.assistant.updateMessage("Welcome to Fakebook. This is the Fakebook news feed where you and your friends can upload posts and pics.");
      this.$refs.assistant.updateActions('Looks very empty here.', this.storyStep1);
    },
    storyStep1() {
      this.storyStep = 1;
      this.$refs.assistant.updateMessage("You are right, it is looking very empty, want me to quickly add some of your friends for you?");
      this.$refs.assistant.updateActions('Yes please.', this.storyStep2);
    },
    storyStep2() {
      this.storyStep = 2;
      // https://openclipart.org/detail/324161/deserted-beach
      mergeImages([
          { src: '/story/3.png', x: 0, y: 0 },
          { src: this.friends[0].avatar, x: 1113, y: 735 },
          { src: this.friends[2].avatar, x: 1373, y: 735 }
      ], { crossOrigin: "Anonymous"}).then(b64 => {
        const post0 = this.$refs.feed.createPost(this.friends[0], 'Had a nice day on the beach with Marie!', b64, 'public')
        this.$nextTick(() => {
          this.$refs.feed.$refs['posts'][post0.id - 1].addLikes(10);
          this.$refs.feed.$refs['posts'][post0.id - 1].addComment(this.friends[1], "Awesome!");
          this.$refs.feed.$refs['posts'][post0.id - 1].addComment(this.friends[2], "So cool here!");
        });
      });

      const post3 = this.$refs.feed.createPost(this.friends[1], 'Tommorow I will get a new game! Can\'t wait!', '', 'public')
      this.$nextTick(() => {
        this.$refs.feed.$refs['posts'][post3.id - 1].addLikes(5);
      });

      const post2 = this.$refs.feed.createPost(this.friends[2], 'Just listening to music and enjoy the day in the garden.', '', 'public')
      this.$nextTick(() => {
        this.$refs.feed.$refs['posts'][post2.id - 1].addLikes(3);
      });

      setTimeout(() => {
        // https://publicdomainvectors.org/en/free-clipart/City-park/82734.html
        this.svgToPng(
          this.user.image,
          200,
          300
        )
        .then(data => {
          mergeImages([
              { src: '/story/4.png', x: 0, y: 0 },
              { src: this.friends[1].avatar, x: 413, y: 700 },
              { src: data, x: 813, y: 700 },
          ], { crossOrigin: "Anonymous"}).then(b64 => {
            const post = this.$refs.feed.createPost(this.friends[1], 'Enyoing the sun in the park with my friend ' + this.user.name, b64, 'public')
            this.$nextTick(() => {
              this.$refs.feed.$refs['posts'][post.id - 1].addLikes(3);
              this.$refs.feed.$refs['posts'][post.id - 1].addComment(this.friends[0], "Really nice pic!");
            });
          });
        });
      }, 1000);



      this.$refs.assistant.updateMessage("Viola, I've just added some of your close friends, check out their cool posts!");
      this.$refs.assistant.updateActions('Looks great!', this.storyStep3);
    },
    storyStep3() {
      this.storyStep = 3;

      this.$refs.assistant.updateMessage("Look there is a nice picture of you and Simon. In social media you can show that you like something by clicking the like button.\nYou can find the like button below the post. Try it out.");
      this.$refs.assistant.updateActions('Okay, I will try it out.', () => {});

        this.tour.addStep({
          id: 'step1',
          attachTo: { element: document.querySelector('.post-4'), on: 'top' },
          text: 'Look, here is a post with a picture of you.',
          buttons: [
            {
              text: 'Next',
              action: this.tour.next
            }
          ]
        });

        this.tour.addStep({
          id: 'step2',
          attachTo: { element: document.querySelector('.post-4 .post__option.like'), on: 'top' },
          text: 'Click here to like the post.',
          scrollTo: false,
          buttons: [
            {
              text: 'Next',
              action: this.tour.complete
            }
          ]
        });

        setTimeout(() => {
          this.tour.start();
        }, 1000);


      this.$refs.feed.setInteractive(true);
    },
    storyStep4() {
      this.storyStep = 4;
      this.$refs.assistant.updateMessage('Great! You have liked this post. Simon will be happy that you liked his post.\n\nYou can also write a nice comment to the post.\nJust click on the comment button next to the like button and write your comment.');
      this.$refs.assistant.updateActions('Yes, I will do that.', () => {});

        this.tour.removeStep('step1');
        this.tour.removeStep('step2');

        this.tour.addStep({
          id: 'step3',
          attachTo: { element: document.querySelector('.post-4 .post__option.comment'), on: 'top' },
          text: 'Click here to add a comment to the post.',
          scrollTo: false,
          buttons: [
            {
              text: 'Next',
              action: this.tour.complete
            }
          ]
        });

        setTimeout(() => {
          this.tour.start();
        }, 1000);
    },
    storyStep5() {
      this.storyStep = 5;
      this.$refs.assistant.updateMessage('Great! You have added a comment to this post. Simon already replied to your comment.');
      this.$refs.assistant.updateActions('Ah yes. I saw it.', this.storyStep6);
    },
    storyStep6() {
      this.storyStep = 6;

      this.$refs.feed.createFriendRequest(this.friends[3], 3);

      this.$refs.assistant.updateMessage('Looks like you have got a friend request. You should deal with them. Decide if you want to accept or decline them.\nYou can find the friend request in the top right corner of the screen.');
      this.$refs.assistant.updateActions('Ok, I will have a look.', () => {});

      this.tour.removeStep('step3');

      this.tour.addStep({
        id: 'step4',
        attachTo: { element: document.querySelector('.fr-btn'), on: 'bottom' },
        text: 'Click here to see all pending friend requests.',
        scrollTo: false,
        buttons: [
          {
            text: 'Next',
            action: this.tour.complete
          }
        ]
      });

      setTimeout(() => {
        this.tour.start();
      }, 1000);
    },
    storyStep7(state) {
      this.storyStep = 7;

      if (state == 'confirmed') {
        this.$refs.assistant.updateMessage('Well done, this is your friend. Now you can see his posts and he can see yours.');
        this.$refs.assistant.updateActions('Let me post something.', this.storyStep8);
      } else {
        this.$refs.assistant.updateMessage('Don\'t worry. This was your friend. You also have mutal friends. This is often a good indicator. You can accept it without any problem.');
        this.$refs.assistant.updateActions('Okay, I got it.', this.storyStep6);
      }
    },
    storyStep8() {
      this.storyStep = 8;

      this.$refs.assistant.updateMessage('Good idea. You can post something about your day.\n\nOn the top of the page there is a box where you can type whatever you want.\nBut before you post make sure that you choose the right privacy setting.');
      this.$refs.assistant.updateActions('Great, I will post something.', () => {});

      this.tour.removeStep('step4');

      this.tour.addStep({
        id: 'step5',
        attachTo: { element: document.querySelector('.create-post-content'), on: 'bottom' },
        text: 'Here you can write your post.',
        scrollTo: true,
        buttons: [
          {
            text: 'Next',
            action: this.tour.next
          }
        ]
      });

      this.tour.addStep({
        id: 'step6',
        attachTo: { element: document.querySelector('.create-post-visibility'), on: 'bottom' },
        text: 'Here you can change the visibility of you post.',
        scrollTo: false,
        buttons: [
          {
            text: 'Next',
            action: this.tour.next
          }
        ]
      });

      this.tour.addStep({
        id: 'step7',
        attachTo: { element: document.querySelector('.create-post-btn'), on: 'bottom' },
        text: 'CLick here to submit your post, when you are done.',
        scrollTo: false,
        buttons: [
          {
            text: 'Next',
            action: this.tour.complete
          }
        ]
      });

      setTimeout(() => {
        this.tour.start();
      }, 1000);
    },
    storyStep9(data) {
      this.storyStep = 9;

      var txt = "";
      if (data.privacy == "public") {
        txt = " But you have posted it publicly. Try to avoid it next time.\n";
      }
      this.$refs.assistant.updateMessage('Good job! You have posted your first post ever.' + txt + 'Let\'s wait and check out what your friends say.');
      this.$refs.assistant.updateActions('Sure, wait a bit.', this.storyStep10);
    },
    storyStep10() {
      this.$refs.feed.$refs['posts'][this.activePost - 1].addComment(this.friends[1], "Awesome!");
      this.$refs.feed.$refs['posts'][this.activePost - 1].addComment(this.friends[3], "Nice!");
      this.$refs.feed.$refs['posts'][this.activePost - 1].addComment(this.evilUser[0], "You suck!");

      this.$refs.feed.$refs['posts'][this.activePost - 1].addLikes(2);

      this.$refs.assistant.updateMessage('Wow, you have got some comments and likes. Check out what the people have commented to your post.');
      this.$refs.assistant.updateActions('I have read the comments.', this.storyStep11);
    },
    storyStep11() {
      this.storyStep = 11;
      this.$refs.assistant.updateMessage('Oh no, you have got a rude comment from a person you don\'t know. Just report it and it should be fine. You can report it by clicking on the three dots on the right side of the comment.');
      this.$refs.assistant.updateActions('Good idea, I will do that.', () => {});
    },
    storyStep12() {
      this.storyStep = 12;
      this.$refs.assistant.updateMessage('Good job! You have reported the comment. Now the comment will be hidden and the person who wrote it will be blocked.');
      this.$refs.assistant.updateActions('Great.', this.storyStep13);
    },
    storyStep13() {
      this.storyStep = 13;

      this.$refs.feed.createFriendRequest(this.evilUser[1], 0);

      this.$refs.assistant.updateMessage('Looks like you have got another friend request. You should deal with them. Decide if you want to accept or decline them.\nYou can find the friend request in the top right corner of the screen.');
      this.$refs.assistant.updateActions('Ok, I will have a look.', () => {});
    },
    storyStep14(state) {
      this.storyStep = 14;

      if (state == 'confirmed') {
        this.$refs.assistant.updateMessage('Oh no, do you really want tbe friends with this person? You have zero mutal friends with this person. You should be careful with people you don\'t know.');
        this.$refs.assistant.updateActions('You are right.', this.storyStep13);
      } else {
        this.$refs.assistant.updateMessage('Good job, you have declined the friend request. You have zero mutal friends with this person. You should be careful with people you don\'t know.');
        this.$refs.assistant.updateActions('Thanks.', this.storyStep15);
      }
    },
    storyStep15() {
      this.storyStep = 15;
      this.$refs.assistant.updateMessage('You have finished the interactive tutorial. Good job, you should now be able to use the social network.');
      this.$refs.assistant.updateActions('Thank you, bye.', this.finishLevel);
    },
    finishLevel() {
      this.$refs.assistant.hide();
      this.step = 2;
    },
    playAgain() {
      this.$router.go();
    },
    next() {
      this.$router.replace('/levels');
    },
    svgToPng(svgDataurl, width, height) {
      return new Promise((resolve) => {
          let canvas;
          let ctx;
          let img;

          img = new Image(width, height);
          img.src= svgDataurl;
          img.onload = () => {
              canvas = document.createElement('canvas');
              canvas.width = img.width;
              canvas.height = img.height;
              ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);

              img = new Image();
              img.src = canvas.toDataURL('image/png');
              img.onload = () => {
                  canvas = document.createElement('canvas');
                  canvas.width = width;
                  canvas.height = height;
                  ctx = canvas.getContext('2d');
                  ctx.drawImage(img, 0, 0);
                  resolve(canvas.toDataURL('image/png'));
              }
          };
      });
    }
  }
}
</script>