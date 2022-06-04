<template>
  <div>
    <HeaderVC
      title="收藏"
    />
    <!-- 收藏列表 -->
    <van-list
      class="vanlist"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ArticleItem
      v-for="(item, index) in colleciton.results"
      :article="colleciton.results[index]"
      :key="index"
      ></ArticleItem>
    </van-list>
  </div>
</template>

<script>
import { collection } from '@/api/article'

export default {
  name: 'CollecitonCom',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      query: {
        page: 1,
        per_page: 10
      },
      colleciton: {
        results: 0
      }
    }
  },
  created () {
    this.getCollection()
  },
  methods: {
    async onLoad () {
      await collection(this.query).then(res => {
        const results = res.data.data.results
        this.colleciton.results.push(...results)
        this.query.page += 1
        this.loading = false
        if (results.length < this.query.per_page) {
          this.finished = true
        }
      })
    },
    async getCollection () {
      await collection(this.query).then(res => {
        this.colleciton = res.data.data
        this.page += 1
      })
    }
  }
}
</script>

<style lang="less" scoped>
.vanlist {
  position: absolute;
  top: 92px;
  bottom: -50px;
}
</style>
