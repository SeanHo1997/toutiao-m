import ArticleItem from './article/ArticleItem.vue'
import Header from './header/Header.vue'

export default {
  install (Vue) {
    Vue.component('ArticleItem', ArticleItem)
    Vue.component('HeaderVC', Header)
  }
}
