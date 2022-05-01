import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: JSON.parse(window.localStorage.getItem('USER-TOKEN'))
  },
  getters: {
  },
  mutations: {
    setToken (state, data) {
      state.token = data
      // 此时还需要把token存储到本地中
      window.localStorage.setItem('USER-TOKEN', JSON.stringify(data))
    }
  },
  actions: {
  },
  modules: {
  }
})
