import Vue from 'vue'
import VueRouter from 'vue-router'

import LandingView from '../views/LandingView.vue'
import SetupView from '../views/SetupView.vue'
import LevelSelectionView from '../views/LevelSelectionView.vue'

import StoryView from '../views/Levels/StoryView.vue'

import LevelView from '../views/LevelView.vue'
import ExamView from '../views/ExamView.vue'

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
    name: 'level-selection',
    component: LevelSelectionView
  },
  {
    path: '/levels/:id',
    name: 'level',
    component: LevelView
  },
  {
    path: '/exam',
    name: 'exam',
    component: ExamView
  },

  {
    path: '/levels/story',
    name: 'level-story',
    component: StoryView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
