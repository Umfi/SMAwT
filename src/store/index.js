import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: '',
      avatar: '',
      image: ''
    },
    levels: [],
    examUnlocked: false,
  },
  getters: {
    user: state => {
      if (localStorage.getItem('sometra_user')) {
        state.user = JSON.parse(localStorage.getItem('sometra_user'));
      }
      return state.user
    },
    levels: state => {
      if (localStorage.getItem('sometra_levels')) {
        state.levels = JSON.parse(localStorage.getItem('sometra_levels'));
      }
      return state.levels
    },
    examUnlocked: state => {
      if (localStorage.getItem('sometra_exam')) {
        state.examUnlocked = true;
      } else {
        state.examUnlocked = false;
      }
      return state.examUnlocked
    }
  },
  mutations: {
    START_GAME(state, user) {
      const levelData = require('../assets/levels/levels.json');

      state.levels = [...levelData.levels];
      localStorage.setItem('sometra_levels', JSON.stringify(state.levels));

      state.user = user;
      localStorage.setItem('sometra_user', JSON.stringify(user));

      state.examUnlocked = false;
      localStorage.removeItem('sometra_exam');
    },
    UPDATE_LEVEL(state, level) {
      const index = state.levels.findIndex(item => item.id === level.id)
      state.levels[index].stars = level.stars
      if (level.stars > 0) {
        if (state.levels.length > index + 1) {
          state.levels[index+1].locked = false;
        } else {
          state.examUnlocked = true;
          localStorage.setItem('sometra_exam', true);
        }
        localStorage.setItem('sometra_levels', JSON.stringify(state.levels));
      }
    },
  },
  actions: {
    startGame({commit}, user) {
      commit("START_GAME", user);
    },
    updateLevel({commit}, level) {
      commit("UPDATE_LEVEL", level);
    }
  }
})
