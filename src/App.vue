<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="/">Social Media Training</a>
        </div>
    </nav>
    <div class="container">
        <div class="text-center mt-5">
            <LandingPage v-if="step == 0" @next="nextStep"/>
            <SetupPage v-if="step == 1" @next="nextStep"/>
            <PasswordPage v-if="step == 2" @next="nextStep"/>
            <PersonalInformationPage v-if="step == 3" @next="nextStep"/>
            <PostPage v-if="step == 4" @next="nextStep"/>
            <ImagePage v-if="step == 5" @next="nextStep"/>
            <PrivacyPage v-if="step == 6" @next="nextStep"/>
        </div>
    </div>
  </div>
</template>

<script>
import LandingPage from './components/LandingPage.vue'
import SetupPage from './components/SetupPage.vue'
import PasswordPage from './components/PasswordPage.vue'
import PersonalInformationPage from './components/PersonalInformationPage.vue'
import PostPage from './components/PostPage.vue'
import ImagePage from './components/ImagePage.vue'
import PrivacyPage from './components/PrivacyPage.vue'

export default {
  name: 'App',
  data() {
    return {
      step: 0
    }
  },
  components: {
    LandingPage,
    SetupPage,
    PasswordPage,
    PersonalInformationPage,
    PostPage,
    ImagePage,
    PrivacyPage
  },
  methods: {
    nextStep() {
      this.step++;
    }
  }
}
</script>
