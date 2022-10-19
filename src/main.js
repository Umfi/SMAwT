import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/scss/solid.scss';

Vue.config.productionTip = false

new Vue({
  store,
  router,
  beforeCreate() { 
    this.$store.commit('GET_USER');
    this.$store.commit('GET_LEVELS');
  },
  render: h => h(App)
}).$mount('#app')
