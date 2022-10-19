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
      locked: true
  },
  {
      id: 3,
      name: 'Posts',
      url: '/levels/posts',
      stars: 0,
      locked: true
  },
  {
      id: 4,
      name: 'Images',
      url: '/levels/images',
      stars: 0,
      locked: true
  },
  {
      id: 5,
      name: 'Privacy',
      url: '/levels/privacy',
      stars: 0,
      locked: true
  },
  {
      id: 6,
      name: 'Friends',
      url: '/levels/friends',
      stars: 0,
      locked: true
  },
  {
      id: 7,
      name: 'Messages',
      url: '/levels/messages',
      stars: 0,
      locked: true
  }
];

export default new Vuex.Store({
  state: {
    user: {
      name: '',
      avatar: ''
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
