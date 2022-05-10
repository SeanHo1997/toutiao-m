<template>
  <div class="layout-containner">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <van-tabbar route class="tabber">
      <van-tabbar-item icon="home-o" to="/index" class="tabber-item">
      <i slot="icon" class="toutiao toutiao-shouye"></i>
      首页
      </van-tabbar-item>
      <van-tabbar-item icon="search" to="/qa" class="tabber-item">
      <i slot="icon" class="toutiao toutiao-wenda"></i>
      问答
      </van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/video" class="tabber-item">
      <i slot="icon" class="toutiao toutiao-shipin"></i>
      视频
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/profile" class="tabber-item">
      <i slot="icon" class="toutiao toutiao-wode"></i>
      我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutCom'
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
