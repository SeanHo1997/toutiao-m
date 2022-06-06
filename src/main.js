import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'

import './styles/index.less'

import Vant from 'vant'
import 'vant/lib/index.css'

import components from '@/components/index'

import hljs from 'highlight.js'
import 'highlight.js/styles/default.css'
import '@/consolelog.js'

Vue.directive('highlight', function (el) {
  const highlight = el.querySelectorAll('pre, code')
  highlight.forEach(block => {
    hljs.highlightElement(block)
  })
})

Vue.use(Vant)
Vue.use(components)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
