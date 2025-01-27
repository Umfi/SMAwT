import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: '',
      avatar: '',
      image: '',
      data: {}
    },
    points: 0,
    levels: [],
    examUnlocked: false,
    preTestDone: false,
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
    },
    preTestDone: state => {
      if (localStorage.getItem('sometra_preTest')) {
        state.preTestDone = true;
      } else {
        state.preTestDone = false;
      }
      return state.preTestDone
    },
    points: state => {
      if (localStorage.getItem('sometra_points')) {
        state.points = parseInt(localStorage.getItem('sometra_points'));
      }
      return state.points
    },
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

      state.preTestDone = false;
      localStorage.removeItem('sometra_preTest');

      state.points = 0;
      localStorage.setItem('sometra_points', state.points);
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
    UPDATE_POINTS(state, points) {
      state.points += (points * 10);
      localStorage.setItem('sometra_points', state.points);
    },
    UPDATE_USER_DATA(state, answer) {
      if (!state.user.data.interviewData) {
        state.user.data.interviewData = [];
      }

      // check if item with key exists
      const index = state.user.data.interviewData.findIndex(item => item.key === answer.key);
      if (index > -1) {
        state.user.data.interviewData[index] = answer;
      } else {
        state.user.data.interviewData.push(answer);
      }
      localStorage.setItem('sometra_user', JSON.stringify(state.user));
    },
    UPDATE_PRETEST(state) {
      state.preTestDone = true;
      localStorage.setItem('sometra_preTest', true);
    },
  },
  actions: {
    startGame({commit}, user) {
      commit("START_GAME", user);
    },
    updateLevel({commit}, level) {
      commit("UPDATE_LEVEL", level);
    },
    updatePoints({commit}, points) {
      commit("UPDATE_POINTS", points);
    },
    updateUserData({commit}, answer) {
      commit("UPDATE_USER_DATA", answer);
    },
    updatePreTest({commit}) {
      commit("UPDATE_PRETEST");
    },
  }
})
