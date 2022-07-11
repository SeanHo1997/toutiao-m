<template>
  <div class="layout-containner">
    <keep-alive include="">
      <!-- 二级路由入口 -->
      <router-view exclude="profile"></router-view>
    </keep-alive>
    <van-tabbar route class="tabber">
      <van-tabbar-item icon="home-o" to="/layout/index" class="tabber-item">
        <i slot="icon" class="toutiao toutiao-shouye"></i>
        首页
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/layout/profile" class="tabber-item">
        <i slot="icon" class="toutiao toutiao-wode"></i>
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutCom',
  mounted () {
    // 第一次渲染出组件后添加缓存
    this.$store.commit('addcachePages', 'LayoutCom')
  }
}
</script>

<style lang="less" scoped>
.layout-containner {
  .tabber {
    .tabber-item {
      .toutiao {
        font-size: 40px;
      }
    }
  }
}
</style>
