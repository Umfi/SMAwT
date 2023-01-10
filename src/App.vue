<template>
  <div id="app" :class="'d-flex flex-column min-vh-100 min-vw-100 home'">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <router-link to="/" class="navbar-brand">SMAwT</router-link> 

            <div class="text-center text-dark badge bg-warning fs-6" v-if="points > 0">
            <b>{{ points }} {{ $t('Points')}}</b>
            </div>

            <div class="float-end">
              <select class="form-select" v-model="language">
                <option value="en">🇬🇧&emsp;EN</option>
                <option value="de">🇩🇪&emsp;DE</option>
              </select>
            </div>
        </div>
    </nav>

    <transition name="fade" mode="out-in">
        <router-view/>
    </transition>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      language: 'de'
    }
  },
  computed: {
    ...mapGetters([
        'points'
    ])
  },
  watch:{
    language: function (val) {
      this.$i18n.locale = val;
    }
  }
}
</script>
<style>

#app {
    background: url('~@/assets/bg1.jpg') no-repeat center center fixed; 
    min-height: 100vh;
    background-size: cover
}

#app.level {
    background: url('~@/assets/bg.jpg') no-repeat center center fixed; 
    min-height: 100vh;
    background-size: cover;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>