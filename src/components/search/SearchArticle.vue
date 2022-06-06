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
      <router-view v-if="isResultsShow"></router-view>
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
import { getItem, setItem } from '@/utils/localStorage'

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
    SearchHistory
  },
  methods: {
    onSearch (val) {
      this.$router.push(`/search/results/${val}`)
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
      this.$router.push('/')
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
      setItem('USER-SEARCH-HISTORIES-ARTICLE', newVal)
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
