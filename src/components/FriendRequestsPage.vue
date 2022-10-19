<template>
  <div>
    <h1>Friend Requests</h1>

    <div v-if="step == 1">
      <p class="lead">
        Today more and more people use the internet. Not all of themn really
        want to be your friend. Some of them are just trying to get your
        personal information. Keep in mind, that every new "friend" you accept
        on the internet is a new person that can see your personal information
        that you share. For example they can see all your photos that you have
        posted!
      </p>

      <br />
      <p class="lead">
        Keep the following rules in mind, and you should be safe.
      </p>

      <ul class="list-group">
        <li class="list-group-item">
          Don't Accept Friend Requests From People You Don't Know
        </li>
        <li class="list-group-item">
          Only Send Friend Requests to People You Know
        </li>
        <li class="list-group-item">
          If you are not sure, check the profile of the person (pictures, info,
          mutal friends)
        </li>
        <li class="list-group-item">Report Spammy Friend Requests</li>
      </ul>
    </div>

    <div v-if="step == 2">
      <friend-request :image="'https://i.pinimg.com/originals/05/c9/d0/05c9d08e8b49371122b9d8d9a450b096.jpg'" :name="'Josh Maier'" :mutalFriends="24"></friend-request>
    </div>

    <div v-if="step == 3">
      <friend-request :image="'https://qph.cf2.quoracdn.net/main-qimg-3c8d362550687b40929aaa8c1e737b41-pjlq'" :name="'Lisa Hofer'" :mutalFriends="0"></friend-request>
    </div>

    <div v-if="step == 4">
      <friend-request :image="'https://www.bravo.de/assets/field/image/pikachu_bts.jpg'" :name="'Markus Rabein'" :mutalFriends="1"></friend-request>
    </div>

    <user-guide
      ref="assistant"
      :msg="'Social media would not be social if there would not been any other humans.\nIn many social media platttforms you can connect with other people and become friends.\n\nBut be careful, not everybody is your friend. Some people just want to get your personal information.'"
      actionA="Tell me something about those 'friends'."
      :actionAFunc="showTask1Pre"
    ></user-guide>
  </div>
</template>

<script>
import UserGuide from "./UserGuide.vue";
import { mapGetters } from "vuex";
import FriendRequest from './FriendRequest.vue';

export default {
  name: "FriendRequestsPage",
  components: { UserGuide, FriendRequest },
  data() {
    return {
      step: 0,
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    showTask1Pre() {
      this.step = 1;
      this.$refs.assistant.updateMessage(
        "As always, I have prepared a little task for you where you can practice what you have learned."
      );
      this.$refs.assistant.updateActions("Continue.", this.showTask1);
    },
    showTask1() {
      this.step = 2;
      this.$refs.assistant.updateMessage("Ah look. You have got a friend request from your pal Josh. What do you think? Should we acceot it?");
      this.$refs.assistant.updateActions('Yes, add him!', this.task1Pass, 'No, better not!', this.task1Fail);
    },
    task1Pass() {
      this.$refs.assistant.updateMessage("You are right. Josh is a good friend. And you have lots of mutal friends. We should accept his friend request.");
      this.$refs.assistant.updateActions("Continue", this.showTask2);
    },
    task1Fail() {
      this.$refs.assistant.updateMessage("You are wrong. Josh is a good friend. And you have lots of mutal friends. We should accept his friend request.");
      this.$refs.assistant.updateActions("Continue", this.showTask2);
    },
    showTask2() {
      this.step = 3;
      this.$refs.assistant.updateMessage("You have got a friend request from your a woman called Lisa. What do you think? Should we acceot it?");
      this.$refs.assistant.updateActions('Yes, add her!', this.task2Fail, 'No, better not!', this.task2Pass);
    },
    task2Pass() {
      this.$refs.assistant.updateMessage("You are right. This is very strange. You don't have any common friends. You probably don't know her. We should delete this friend request.");
      this.$refs.assistant.updateActions("Continue", this.showTask3);
    },
    task2Fail() {
      this.$refs.assistant.updateMessage("You are wrong. This is very strange. You don't have any common friends. You probably don't know her. We should delete this friend request.");
      this.$refs.assistant.updateActions("Continue", this.showTask2);
    },
    showTask3() {
      this.step = 4;
      this.$refs.assistant.updateMessage("You have got a friend request from your a guy with a picture of a cartoon. What do you think? Should we acceot it?");
      this.$refs.assistant.updateActions('Yes, add him!', this.task3Fail, 'No, better not!', this.task3Pass);
    },
    task3Pass() {
      this.$refs.assistant.updateMessage("You are right. You only have one common friend, but the fact that he is using a photo of a cartoon is strage. Before accepting this friend requests, you should check the profile of the person in detail.");
      this.$refs.assistant.updateActions("Continue", this.next);
    },
    task3Fail() {
      this.$refs.assistant.updateMessage("You are wrong. You only have one common friend, but the fact that he is using a photo of a cartoon is strage. Before accepting this friend requests, you should check the profile of the person in detail.");
      this.$refs.assistant.updateActions("Continue", this.next);
    },
    next() {
      this.$emit("next");
    },
  },
};
</script>