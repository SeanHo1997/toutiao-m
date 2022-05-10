import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog } from 'vant'
import store from '@/store'

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
    meta: { requiredAuth: true },
    children: [
      { path: 'index', component: () => import('@/views/layout/index/index.vue') },
      { path: 'profile', name: 'profile', component: () => import('@/views/layout/profile/index.vue'), meta: { requiredAuth: true } },
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
  },
  {
    path: '/editprofile',
    name: 'editprofile',
    component: () => import('@/views/user/components/EditProfile.vue'),
    meta: { requiredAuth: true }
  }
]

const router = new VueRouter({
  routes
})

// 前置守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requiredAuth) {
    if (store.state.token) {
      return next()
    }
    Dialog.confirm({
      title: '提示',
      message: '该功能需要登录，确认登录吗?'
    }).then(() => {
      router.push('/login')
    }).catch(() => {
      from()
    })
  } else {
    next()
  }
})

export default router
