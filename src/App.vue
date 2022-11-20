<template>
  <div id="app" :class="'d-flex flex-column min-vh-100 min-vw-100 ' + currentRoute">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <router-link to="/" class="navbar-brand">Social Media Training</router-link> 

            <div class="float-end">
              <select class="form-select" v-model="language">
                <option value="en">EN</option>
                <option value="de">DE</option>
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

export default {
  name: 'App',
  data() {
    return {
      currentRoute: 'home',
      language: 'de'
    }
  },
  watch:{
    $route (to){
        this.currentRoute = to.name;
    },
    language: function (val) {
      this.$i18n.locale = val;
    }
  }
}
</script>
<style>

#app {
  min-height: 100vh;
}

#app.level {
    background: url('~@/assets/bg.jpg') no-repeat center center fixed; 
    min-height: 100vh;
    background-size: cover;
}

#app.home {
  background: #fff !important;
  min-height: 100vh;
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