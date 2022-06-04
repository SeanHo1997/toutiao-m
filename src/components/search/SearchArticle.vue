<template>
  <div class="search-containner">
      <form action="/" class="search-form">
        <van-search
          v-model="value"
          show-action
          background="#5babfb"
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
          @focus="isResultsShow=false"
        />
      </form>
      <!-- 搜索结果 -->
      <SearchRes
      v-if="isResultsShow"
      :searchText="value"
      ></SearchRes>
      <!-- 联想建议 -->
      <LinkedSuggestions
       v-else-if="value"
       :searchText="value"
       @search="onSearch"
       ></LinkedSuggestions>
      <!-- 历史记录 -->
      <SearchHistory
      v-else
      :searchhistory="searchHistory"
      @deleteHistory="deleteHistory(index)"
      @deleteAll="deleteAll"
      @search="onSearch"
      >
      </SearchHistory>

  </div>
</template>

<script>
import LinkedSuggestions from './components/LinkedSuggestions.vue'
import SearchHistory from './components/SearchHistory.vue'
import SearchRes from './components/SearchArticlesRes.vue'
import { getItem } from '@/utils/localStorage'

export default {
  name: 'SearchCom',
  data () {
    return {
      value: '',
      isResultsShow: false,
      searchHistory: getItem('USER-SEARCH-HISTORIES-ARTICLE') || []
    }
  },
  components: {
    LinkedSuggestions,
    SearchHistory,
    SearchRes
  },
  methods: {
    onSearch (val) {
      this.isResultsShow = true
      this.value = val
      // 存储历史记录
      const index = this.searchHistory.indexOf(val)
      if (index !== -1) {
        this.searchHistory.splice(index, 1)
      }
      this.searchHistory.unshift(val)
    },
    onCancel () {
      this.$router.back()
    },
    deleteHistory (index) {
      this.searchHistory.splice(index, 1)
    },
    deleteAll () {
      this.searchHistory = []
    }
  },
  watch: {
    searchHistory (newVal) {
      window.localStorage.setItem('USER-SEARCH-HISTORIES-ARTICLE', JSON.stringify(newVal))
    }
  }
}
</script>

<style lang="less" scoped>
.search-containner {
  padding-top: 108px;
  .van-search {
    .van-search__action {
      color: #ffffff;
      font-size: 28px;
    }
  }
  .search-form {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 10;
  }
}
</style>
