<template>
  <div class="articleList-containner" ref="articleList">
    <!-- 下拉刷新(包裹住vanlist) -->
      <van-pull-refresh
        v-model="isRefreshLoading"
        :success-text="successText"
        @refresh="onRefresh"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
        >
        <!-- 文章列表封装成组件 -->
        <ArticleItem
        :article="articleList[index]"
        v-for="(item, index) in articleList"
        :key="index"
        ></ArticleItem>
        </van-list>
      </van-pull-refresh>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
import ArticleItem from '@/components/article/ArticleItem.vue'

export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    userChannels: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      articleList: [],
      timestamp: null,
      error: false,
      isRefreshLoading: false,
      successText: '',
      scrollTop: 0
    }
  },
  methods: {
    async onLoad () {
      // 请求数据
      try {
        const { data } = await getArticle({
          channel_id: this.userChannels.id,
          timestamp: this.timestamp || Date.now()
        })
        // 把结果数据放在data中
        this.articleList.push(...data.data.results)
        // 将加载状态关闭
        this.loading = false
        // 加载完毕后将finished设置为true
        if (data.data.results) {
          // 继续加载数据，更新下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 如果没有数据则加载完成
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    async onRefresh () {
      // 请求数据
      // 将数据放置在列表 顶部
      try {
        const { data } = await getArticle({
          channel_id: this.userChannels.id,
          // 下拉刷新，每次传递最新数据，所以传递最新时间戳
          timestamp: Date.now()
        })
        // 把结果数据放在data中
        this.articleList.unshift(...data.data.results)
        // 关闭刷新状态
        this.isRefreshLoading = false
        this.successText = `刷新了${data.data.results.length}条文章`
      } catch (err) {
        this.isRefreshLoading = false
        this.successText = '刷新失败'
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
