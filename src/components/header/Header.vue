<template>
  <div class="header">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      :title="title"
    >
      <i
      slot="left"
      class="toutiao toutiao-zuojiantou"
      @click="$router.back()"
      ></i>
    </van-nav-bar>
    <!-- /导航栏 -->
  </div>
</template>

<script>
export default {
  name: 'HeaderVC',
  props: {
    title: {
      type: String,
      default: '明日头条'
    }
  }
}
</script>

<style lang="less" scoped>
@import '@/styles/icon.less';
.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  right: 0;
  .van-nav-bar {
    background-color: #3296fa;
    .van-nav-bar__content {
      .van-nav-bar__title {
        color: #fff;
        font-size: 32px;
      }
    }
  }
}
.toutiao {
  color: #fff;
}
</style>
