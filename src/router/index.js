import Vue from 'vue'
import VueRouter from 'vue-router'

import LandingView from '../views/LandingView.vue'
import SetupView from '../views/SetupView.vue'
import LevelSelectionView from '../views/LevelSelectionView.vue'

import StoryView from '../views/Levels/StoryView.vue'

import Level1View from '../views/Levels/Level1/Level1View.vue'
import Level2View from '../views/Levels/Level2/Level2View.vue'
import Level3View from '../views/Levels/Level3/Level3View.vue'
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
    name: 'level',
    component: LevelSelectionView
  },
  {
    path: '/levels/1',
    name: 'level-1',
    component: Level1View
  },
  {
    path: '/levels/2',
    name: 'level-2',
    component: Level2View
  },
  {
    path: '/levels/3',
    name: 'level-3',
    component: Level3View
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
