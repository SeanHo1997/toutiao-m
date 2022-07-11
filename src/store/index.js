import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem, removeItem } from '@/utils/localStorage'

Vue.use(Vuex)

const Token = 'USER-TOKEN'

export default new Vuex.Store({
  state: {
    userInfo: getItem(Token) || null,
    cachePages: [],
    userData: {}
  },
  mutations: {
    setToken (state, val) {
      state.userInfo = val
      // 此时还需要把token存储到本地中
      setItem(Token, state.userInfo)
    },
    delToken (state) {
      state.userInfo = null
      removeItem(Token)
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
    },
    clearCachePages (state) {
      state.cachePages = []
    }
  }
})
