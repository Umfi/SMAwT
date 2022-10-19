<template>
  <div class="container text-center mt-5">
    <h1>Welcome to the the Social Media Training Tool!</h1>

    <div class="row justify-content-center mt-3">
      <div class="col-8">
            <p class="lead">
              The Internet makes it so easy to communicate with family, friends—everybody. We send
              messages, share photos, join chats and livestream—sometimes without thinking about
              who can see them, either right then or at a completely different time. A picture or post
              you think is funny and harmless could be misunderstood by people you never thought
              would see it—now or way off in the future. Feelings could get hurt. Someone who
              doesn’t get the joke could think you’re mean just because they don’t know you. Once
              somethingʼs out there, it’s hard to take it back, and people can copy, screenshot it and
              share it. 
              <br><br>
              <b>This tool is designed to help you learn how to use social media safely.</b>
            </p>
      </div>
    </div>


    <user-guide 
    msg="Hey. I am Mike your social media expert. I will help you to become an expert too." 
    actionA="Sounds good!" 
    :actionAFunc="start"></user-guide>

  </div>
</template>

<script>
import UserGuide from '../components/UserGuide.vue';
import {mapGetters} from 'vuex';


export default {
  name: 'LandingView',
  components: { UserGuide },
  computed: {
    ...mapGetters([
        'user'
    ])
  },
  methods: {
    start() {
      if (this.user && this.user.name.length > 0) {
        this.$router.push('/levels');
      } else {
        this.$router.push('/setup');
      }
    }
  }
}
</script>
