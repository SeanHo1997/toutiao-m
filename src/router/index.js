import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog } from 'vant'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout'
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  // 布局页面
  {
    path: '/layout',
    name: 'layout',
    redirect: '/layout/index',
    component: () => import('@/views/layout/index.vue'),
    meta: { requiredAuth: true },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/index/index.vue'),
        meta: {
          scrollTop: 0
        }
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/profile/index.vue'),
        meta: { requiredAuth: true }
      }
    ]
  },
  // 搜索页面
  {
    path: '/search',
    name: 'searArticles',
    component: () => import('@/components/search/SearchArticle.vue'),
    children: [
      {
        path: 'results/:content',
        name: 'results',
        component: () => import('@/components/search/components/SearchArticlesRes.vue')
      }
    ]
  },
  // 文章详情
  {
    path: '/article/:article_id',
    name: 'article',
    component: () => import('@/views/index/components/articleDetail/articleDetail.vue'),
    props: true
  },
  // 编辑资料
  {
    path: '/editprofile',
    name: 'editprofile',
    component: () => import('@/views/profile/components/EditProfile.vue'),
    meta: { requiredAuth: true }
  },
  // 小智同学
  {
    path: '/serviceFeiFei',
    name: 'serviceFeiFei',
    component: () => import('@/views/service/Service.vue'),
    meta: { requiredAuth: true }
  },
  // 举报文章
  {
    path: '/article/report/:id',
    name: 'reportarticle',
    component: () => import('@/components/article/ArticleReport.vue'),
    meta: { requiredAuth: true }
  },
  // 收藏列表
  {
    path: '/collection',
    name: 'collection',
    component: () => import('@/views/profile/components/Collection.vue'),
    meta: { requiredAuth: true }
  },
  // 阅读历史
  {
    path: '/history',
    name: history,
    component: () => import('@/views/profile/components/History.vue'),
    meta: { requiredAuth: true }
  },
  // 关注列表
  {
    path: '/user/following',
    name: 'userfollowing',
    component: () => import('@/views/profile/components/Following.vue'),
    meta: { requiredAuth: true }
  },
  // 粉丝列表
  {
    path: '/user/followed',
    name: 'userfollowed',
    component: () => import('@/views/profile/components/Followed.vue'),
    meta: { requiredAuth: true }
  }
]

const router = new VueRouter({
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (!store.state.userInfo) {
    if (to.meta.requiredAuth) {
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
  } else {
    next()
  }
})

export default router
