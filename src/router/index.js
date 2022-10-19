import Vue from 'vue'
import VueRouter from 'vue-router'

import LandingView from '../views/LandingView.vue'
import SetupView from '../views/SetupView.vue'
import LevelSelectionView from '../views/LevelSelectionView.vue'
import PasswordSecurityView from '../views/Levels/PasswordSecurityView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: LandingView
  },
  {
    path: '/setup',
    name: 'setup',
    component: SetupView
  },
  {
    path: '/levels',
    name: 'level',
    component: LevelSelectionView
  },
  {
    path: '/levels/password-security',
    name: 'level-password-security',
    component: PasswordSecurityView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
