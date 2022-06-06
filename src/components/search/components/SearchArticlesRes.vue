<template>
  <div class="searchresults-containner">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <ArticleItem
      v-for="(item, index) in resultList"
      :key="index"
      :title="item.title"
      :article="resultList[index]"
      ></ArticleItem>
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/article'
import ArticleItem from '@/views/index/components/ArticleItem.vue'

export default {
  name: 'SearchArticlesRes',
  components: {
    ArticleItem
  },
  data () {
    return {
      loading: false,
      finished: false,
      resultList: [],
      page: 1,
      error: false,
      searchText: this.$route.params.content
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data: { data: { results } } } = await getSearchResults({
          page: this.page,
          per_page: 20,
          q: this.searchText
        })
        this.resultList.push(...results)
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (results.length) {
          this.page += 1
        } else {
          this.finished = true
        }
      } catch {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
