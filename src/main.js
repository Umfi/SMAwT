import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router';

import 'bootstrap';
import '../scss/main.scss';

import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/scss/solid.scss';

import 'shepherd.js/dist/css/shepherd.css';

import 'animate.css';

Vue.config.productionTip = false


import VueI18n from 'vue-i18n'
import messages from './lang/messages.js'

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'de',
  fallbackLocale: 'en', 
  messages, 
})

new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
