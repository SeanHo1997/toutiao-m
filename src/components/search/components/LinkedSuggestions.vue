<template>
    <div class="linked-suggestions">
      <!-- 联想建议 -->
      <van-cell
      v-for="(item, index) in suggestions"
      :key="index"
      @click="$emit('search', item)"
      >
      <div slot="title" v-html="highlight(item)"></div>
      </van-cell>
    </div>
    <!-- <span style="color: blue"></span> -->
</template>

<script>
import { getSuggestions } from '@/api/article.js'
import { debounce } from 'lodash'

export default {
  name: 'LinkedSuggestions',
  props: {
    searchText: {
      type: String
    }
  },
  watch: {
    searchText: {
      handler: debounce(function (newVal) {
        this.onGetSuggestions(newVal)
      }, 500),
      immediate: true
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  methods: {
    async onGetSuggestions (q) {
      try {
        const { data } = await getSuggestions({
          q
        })
        this.suggestions = data.data.options
        // console.log(data)
      } catch {
        console.log('获取联想建议失败')
      }
    },
    highlight (item) {
      const reg = new RegExp(this.searchText, 'gi')
      return item.replace(reg, `<span style="color: blue">${this.searchText}</span>`)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
