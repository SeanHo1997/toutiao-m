import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const Token = 'USER-TOKEN'

export default new Vuex.Store({
  state: {
    token: JSON.parse(window.localStorage.getItem(Token)) || null,
    cachePages: ['IndexCom']
  },
  mutations: {
    setToken (state, val) {
      state.token = val
      // 此时还需要把token存储到本地中
      window.localStorage.setItem(Token, JSON.stringify(state.token))
    },
    addcachePages (state, pageName) {
      if (!state.cachePages.includes(pageName)) {
        state.cachePages.push(pageName)
      }
    },
    deletecachePages (state, pageName) {
      const index = state.cachePages.indexOf(pageName)
      if (index !== -1) {
        state.cachePages.splice(index, 1)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
