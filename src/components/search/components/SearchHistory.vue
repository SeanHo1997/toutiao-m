<template>
    <div class="search-history">
      <van-cell title="历史记录">
        <div slot="default">
          <span @click="$emit('deleteAll')">全部清空</span>
        </div>
      </van-cell>
      <van-cell
        :title="item"
        v-for="(item, index) in searchhistory"
        :key="index"
        class="history-item"
        @click="$emit('search', item)"
      >
        <i
        slot="right-icon"
        class="toutiao toutiao-shanchu"
        @click="$emit('deleteHistory', index)"
        >
        </i>
      </van-cell>
    </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchhistory: {
      type: Array
    }
  }
}
</script>

<style lang="less" scoped>
</style>
