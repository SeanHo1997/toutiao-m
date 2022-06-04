<template>
  <div class="video-containner">
    <!-- 搜索栏 -->
    <van-nav-bar class="navBar" fixed>
      <van-button type="primary" slot="title" class="searchBtn" round @click="clickSearch">
        <i class="toutiao toutiao-sousuo"></i>
        搜索
      </van-button>
    </van-nav-bar>
    <!-- /搜索栏 -->
    <!-- 标签栏 -->
    <van-tabs v-model="active" class="vantabs">
      <van-tab v-for="(item,index) in tablist" :key="index" :title="item" >
        <VideoList></VideoList>
      </van-tab>
    </van-tabs>
    <!-- /标签栏 -->
  </div>
</template>

<script>
import VideoList from './components/VideoList.vue'

export default {
  name: 'VideoCom',
  components: {
    VideoList
  },
  data () {
    return {
      tablist: ['科技', '广场舞', '娱乐', '旅游', '情感', '军事', 'NBA', '穿搭'],
      active: 0
    }
  },
  methods: {
    clickSearch () {
      this.$toast.fail('文档无接口，功能暂时不能使用')
    }
  }
}
</script>

<style lang="less" scoped>
.video-containner {
  .navBar {
    /deep/.van-nav-bar__content {
      .van-nav-bar__title {
        max-width: 100%;
      }
    }
    .searchBtn {
      width: 555px;
      height: 64px;
      background-color: #5babfb;
      font-size: 28px;
      color: #ffffff;
      border: unset;
        .toutiao {
          font-size: 32px;
        }
    }
  }
  .vantabs {
    position: fixed;
    top: 92px;
    /deep/.van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
    }
  }
}
</style>
