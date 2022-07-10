<template>
  <div class="wrap">
    <HeaderVC
      title="浏览历史"
    />
    <!-- 浏览历史 -->
    <van-list
      class="vanlist"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ArticleItem
      v-for="(item, index) in history.results"
      :article="history.results[index]"
      :key="index"
      ></ArticleItem>
    </van-list>
  </div>
</template>

<script>
import { articleHistory } from '@/api/article'
import ArticleItem from '@/views/index/components/ArticleItem.vue'

export default {
  name: 'HistoryCom',
  components: {
    ArticleItem
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      query: {
        page: 1,
        per_page: 10
      },
      history: {
        results: []
      }
    }
  },
  methods: {
    async onLoad () {
      await articleHistory(this.query).then(res => {
        const results = res.data.data.results
        this.history.results.push(...results)
        this.query.page += 1
        this.loading = false
        if (results.length < this.query.per_page) {
          this.finished = true
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.wrap {
  position: relative;
  padding-top: 92px;
  padding-bottom: -50px;
}
</style>
