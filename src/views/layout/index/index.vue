<template>
  <div class="index-containner">
      <!-- 导航栏 -->
      <van-nav-bar class="navBar" fixed>
        <van-button type="primary" slot="title" class="searchBtn" round to="/search" >
        <i class="toutiao toutiao-sousuo"></i>
        搜索
        </van-button>
      </van-nav-bar>
      <!-- 标签页 -->
      <van-tabs class="tabs">
        <!-- 汉堡按钮 -->
        <div class="placeholder" slot="nav-right" ></div>
        <div class="hamburger" slot="nav-right" >
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <van-tab
        class="tab-item"
        :title="item.name"
        v-for="item in channels"
        :key="item.id"
        >
          <!-- 文章列表 -->
          <ArticleList :channels="item"></ArticleList>
        </van-tab>
      </van-tabs>
  </div>
</template>

<script>
import { getChannels } from '@/api/user.js'
import ArticleList from '@/views/layout/index/articleList/index.vue'
export default {
  name: 'IndexCom',
  data () {
    return {
      channels: [],
      isShowSearch: false
    }
  },
  async created () {
    try {
      const { data: { data } } = await getChannels()
      this.channels = data.channels
    } catch (err) {
      console.log('获取频道列表失败', err)
    }
  },
  components: {
    ArticleList
  }
}
</script>

<style lang="less" scoped>
.index-containner {
  padding-top: 174px;
  padding-bottom: 100px;
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
  /deep/.tabs {
    .van-tabs__wrap {
      height: 80px;
      position: fixed;
      top: 88px;
      z-index: 90;
      left: 0;
      right: 0;
    }
    .van-tabs__nav {
      position: relative;
      padding: 0;
      .van-tab {
        width: 200px;
        color: #777777;
        font-size: 28px;
        // padding: 0;
        border-right: 1px solid #edeff3;
      }
      .van-tab--active {
        font-size: 30px;
        color: #333333;
      }
      .van-tabs__line {
        bottom: 8px;
        width: 31px;
        height: 6px;
        background-color: #3296fa;
      }
      .hamburger {
        width: 66px;
        height: 80px;
        background-color: #ffffff;
        position: fixed;
        top: 92px;
        right: 0;
        text-align: center;
        opacity: 0.9;
        .toutiao {
          font-size: 40px;
          line-height: 80px;
        }
      }
      .placeholder {
        flex-shrink: 0;
        width: 66px;
        height: 80px;
      }
    }
  }
}
</style>
