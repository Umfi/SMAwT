import Vue from 'vue'
import VueRouter from 'vue-router'

import LandingView from '../views/LandingView.vue'
import SetupView from '../views/SetupView.vue'
import LevelSelectionView from '../views/LevelSelectionView.vue'
import PasswordSecurityView from '../views/Levels/PasswordSecurityView.vue'
import PersonalInformationView from '../views/Levels/PersonalInformationView.vue'
import PostView from '../views/Levels/PostView.vue'
import ImageView from '../views/Levels/ImageView.vue'
import PrivacyView from '../views/Levels/PrivacyView.vue'
import FriendRequestsView from '../views/Levels/FriendRequestsView.vue'
import MessagesView from '../views/Levels/MessagesView.vue'
import FakeView from '../views/Levels/FakeView.vue'
import StoryView from '../views/Levels/StoryView.vue'

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
  },
  {
    path: '/levels/personal-information',
    name: 'level-personal-information',
    component: PersonalInformationView
  },
  {
    path: '/levels/posts',
    name: 'level-posts',
    component: PostView
  },
  {
    path: '/levels/images',
    name: 'level-images',
    component: ImageView
  },
  {
    path: '/levels/privacy',
    name: 'level-privacy',
    component: PrivacyView
  },
  {
    path: '/levels/friends',
    name: 'level-friends',
    component: FriendRequestsView
  },
  {
    path: '/levels/messages',
    name: 'level-messages',
    component: MessagesView
  },
  {
    path: '/levels/fake-or-real',
    name: 'level-fake-or-real',
    component: FakeView
  },
  {
    path: '/levels/story',
    name: 'level-story',
    component: StoryView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
