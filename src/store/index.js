import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: ''
  },
  getters: {
    user: state => {
      return state.user
    },
  },
  mutations: {
    SET_USER(state, user) {
      return state.user = user
    },
  },
  actions: {
    setUser({commit}, user) {
      commit("SET_USER", user);
    },
  },
  modules: {
  }
})
