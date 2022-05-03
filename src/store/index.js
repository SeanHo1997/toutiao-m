import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const Token = 'USER-TOKEN'

export default new Vuex.Store({
  state: {
    token: JSON.parse(window.localStorage.getItem(Token)) || null
  },
  mutations: {
    setToken (state, val) {
      state.token = val
      // 此时还需要把token存储到本地中
      window.localStorage.setItem(Token, JSON.stringify(state.token))
    }
  },
  actions: {
  },
  modules: {
  }
})
