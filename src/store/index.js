import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const initalLevels = [
  {
    id: 1,
    name: 'Password Security',
    url: '/levels/password-security',
    stars: 0,
    locked: false
  },
  {
      id: 2,
      name: 'Personal Information',
      url: '/levels/personal-information',
      stars: 0,
      locked: false
  },
  {
      id: 3,
      name: 'Digital Footprint',
      url: '/levels/posts',
      stars: 0,
      locked: false
  },
  {
      id: 4,
      name: 'Images',
      url: '/levels/images',
      stars: 0,
      locked: false
  },
  {
      id: 5,
      name: 'Privacy',
      url: '/levels/privacy',
      stars: 0,
      locked: false
  },
  {
      id: 6,
      name: 'Friends',
      url: '/levels/friends',
      stars: 0,
      locked: false
  },
  {
      id: 7,
      name: 'Messages',
      url: '/levels/messages',
      stars: 0,
      locked: false
  },
  { 
      id: 8,
      name: 'Fake or Real?',
      url: '/levels/fake-or-real',
      stars: 0,
      locked: false
  },
  {
      id: 9,
      name: 'Story',
      url: '/levels/story',
      stars: 0,
      locked: false
  }
];

export default new Vuex.Store({
  state: {
    user: {
      name: '',
      avatar: '',
      image: ''
    },
    levels: []
  },
  getters: {
    user: state => {
      return state.user
    },
    levels: state => {
      return state.levels
    },
  },
  mutations: {
    GET_USER(state) {
      if (localStorage.getItem('sometra_user')) {
        state.user = JSON.parse(localStorage.getItem('sometra_user'));
      }

      return state.user
    },
    START_GAME(state, user) {
      state.levels = [...initalLevels];
      localStorage.setItem('sometra_levels', JSON.stringify(state.levels));

      localStorage.setItem('sometra_user', JSON.stringify(user));
      return state.user = user
    },
    GET_LEVELS(state) {
      if (localStorage.getItem('sometra_levels')) {
        state.levels = JSON.parse(localStorage.getItem('sometra_levels'));
      } else {
        localStorage.setItem('sometra_levels', JSON.stringify(state.levels));
      }

      return state.levels
    },
    UPDATE_LEVEL(state, level) {
      const index = state.levels.findIndex(item => item.id === level.id)
      state.levels[index].stars = level.stars
      if (state.levels.length > index + 1) {
        state.levels[index+1].locked = false
      }
      localStorage.setItem('sometra_levels', JSON.stringify(state.levels));
    }
  },
  actions: {
    startGame({commit}, user) {
      commit("START_GAME", user);
    },
    updateLevel({commit}, level) {
      commit("UPDATE_LEVEL", level);
    }
  },
  modules: {
  }
})
