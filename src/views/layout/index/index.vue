<template>
  <div class="index-containner">
    <!-- 导航栏 -->
    <van-nav-bar class="navBar">
    <van-button type="default" slot="title" class="searchBtn">搜索</van-button>
    </van-nav-bar>
    <!-- 标签页 -->
    <van-tabs v-model="active">
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'IndexCom'
}
</script>

<style lang="less" scoped>
.index-containner {
  .navBar {
    /deep/.van-nav-bar__content {
      .van-nav-bar__title {
        max-width: 100%;
      }
    }
    .searchBtn {
    width: 555px;
    height: 64px;
    }
  }
}
</style>
