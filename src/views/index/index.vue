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
      <van-tabs class="tabs" v-model="tabId" @click="changeTab">
        <!-- 汉堡按钮 -->
        <!-- <div class="placeholder" slot="nav-right" ></div> -->
        <div class="placeholder" slot="nav-right"></div>
        <div class="hamburger" slot="nav-right" @click="showPopup=true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <van-tab
        class="tab-item"
        :title="item.name"
        v-for="item in userChannels"
        :key="item.id"
        >
          <!-- 文章列表 -->
          <ArticleList :userChannels="item"></ArticleList>
        </van-tab>
      </van-tabs>
      <!-- 弹出层编辑频道 -->
      <van-popup
      closeable
      position="bottom"
      v-model="showPopup"
      :style="{ height: '92%' }"
      round
      >
      <EditChannel
        :userChannels="userChannels"
        @enterChannel="enterChannel"
        @delChannel="delChannel"
        @addChannel="addChannel"
        @confirmDel="confirmDel"
       />
      </van-popup>
  </div>
</template>

<script>
import { getUserChannels, setChannels1, delChannel, getChannels } from '@/api/user.js'
import ArticleList from '@/views/index/components/articleList.vue'
import EditChannel from './components/EditChannel.vue'
import { getItem, setItem } from '@/utils/localStorage.js'

export default {
  name: 'IndexCom',
  components: {
    EditChannel,
    ArticleList
  },
  data () {
    return {
      tabId: 0,
      userChannels: [],
      isShowSearch: false,
      showPopup: false,
      slicedArr: [],
      tabsScrollTop: {}
    }
  },
  async created () {
    this.getUserChannels()
  },
  methods: {
    async getUserChannels () {
      // 判断是否登录
      if (this.$store.state.userInfo) {
        // 如果已登录, 在接口中获取用户频道
        await getUserChannels().then(res => {
          this.userChannels = res.data.data.channels
        })
      } else {
        // 如果没有登录, 先去localStorage中拿取本地频道数据
        const localChannels = getItem('user-channels')
        if (localChannels) {
          this.userChannels = localChannels
        } else {
          await getChannels().then(res => {
            this.userChannels = res.data.data.channels
          })
        }
      }
    },
    enterChannel (index) {
      this.showPopup = false
      this.$refs.tabs.currentIndex = index
    },
    delChannel (index) {
      this.slicedArr.push(this.userChannels[index])
      this.userChannels.splice(index, 1)
    },
    async addChannel (item) {
      this.userChannels.push(item)
      setItem('user-channels', this.userChannels)
      // 添加用户频道接口
      await setChannels1({
        channels: {
          id: item.id,
          seq: this.userChannels.length
        }
      })
    },
    async confirmDel () {
      if (this.$store.state.userInfo) {
        for (let i = 0; i < this.slicedArr.length; i++) {
          await delChannel(this.slicedArr[i].id)
        }
      }
      setItem('user-channels', this.userChannels)
    },
    // 当发生tab切换时，将记录的数据赋值给当前的scrollTop
    changeTab () {
      document.documentElement.scrollTop = this.tabsScrollTop[this.tabId]
    }
  },
  deactivated () {
    // deacctivated后保存不到
    // this.$route.meta.scrollTop = document.documentElement.screenTop
    window.removeEventListener('scroll', () => {})
  },
  activated () {
    window.addEventListener('scroll', () => {
      this.$route.meta.scrollTop = document.documentElement.scrollTop
      // 记录每一个tab item的滚动高度到数据中
      this.tabsScrollTop[this.tabId] = document.documentElement.scrollTop
    })
    document.documentElement.scrollTop = this.$route.meta.scrollTop
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
      top: 92px;
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
      .placeholder {
        flex-shrink: 0;
        width: 80px;
        height: 80px;
      }
      .hamburger {
        width: 80px;
        height: 80px;
        background-color: #fff;
        position: fixed;
        top: 92px;
        right: 0;
        text-align: center;
        line-height: 80px;
        opacity: 0.9;
        .toutiao {
          font-size: 48px;
        }
      }
    }
  }
}
</style>
