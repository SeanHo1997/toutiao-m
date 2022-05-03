import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    name: 'layout',
    redirect: 'index',
    component: () => import('@/views/layout/index.vue'),
    children: [
      // 默认子路由
      { path: 'index', component: () => import('@/views/layout/index/index.vue') },
      { path: 'profile', name: 'profile', component: () => import('@/views/layout/profile/index.vue') },
      { path: 'qa', name: 'qa', component: () => import('@/views/layout/qa/index.vue') },
      { path: 'video', name: 'video', component: () => import('@/views/layout/video/index.vue') }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/layout/index/search/Search.vue')
  },
  {
    path: '/article/:article_id',
    name: 'article',
    component: () => import('@/views/layout/index/articleList/articleDetail/index.vue'),
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
