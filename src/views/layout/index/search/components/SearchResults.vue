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
      <van-cell
      v-for="(item, index) in resultList"
      :key="index.id"
      :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/article'
export default {
  name: 'SearchResults',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      resultList: [],
      page: 1,
      error: false
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        const { data: { data: { results } } } = await getSearchResults({
          page: this.page,
          per_page: 20,
          q: this.searchText
        })
        // console.log(results)
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
