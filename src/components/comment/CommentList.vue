<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
      :error.sync="error"
    >
      <CommentItem
      v-for="(item, index) in list"
      :key="index"
      :title="item.content"
      :commentInfo="item"
      @changeIsLiking="item.is_liking=!item.is_liking"
      @changeLikeCount="item.like_count=$event"
      @showSecCmt="$emit('showSecCmt', $event)"
      />
    </van-list>
  </div>
</template>

<script>
import { comments } from '@/api/comment.js'
import CommentItem from '@/components/comment/CommentItem.vue'

export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  data () {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      list: this.secCmtlist || [],
      totalCount: 0,
      error: false
    }
  },
  props: {
    source: {
      type: [String, Number, Object],
      required: true
    },
    newCmt: {
      type: Object
    },
    type: {
      type: String,
      require: true
    },
    secCmtlist: {
      type: Array,
      defualt: () => []
    }
  },
  created () {
    this.loadComments()
  },
  methods: {
    async loadComments () {
      // 此方法只获取评论总数更新到评论图标上
      await comments({
        type: this.type,
        source: this.source,
        offset: this.offset,
        limit: this.limit
      }).then(res => {
        const data = res.data.data
        this.totalCount = data.total_count
        this.$emit('sendCommnetCount', this.totalCount)
        this.list.push(...data.results)
        // 加载状态结束
        this.loading = false
        // 判断是否还有数据
        if (data.results.length) {
          this.offset = data.last_id
        } else {
          this.finished = true
        }
      }).catch(() => {
        this.error = true
      })
    },
    async onLoad () {
      await comments({
        type: this.type,
        source: this.source,
        offset: this.offset,
        limit: this.limit
      }).then(res => {
        const data = res.data.data
        this.list.push(...data.results)
        // 加载状态结束
        this.loading = false
        // 判断是否还有数据
        if (data.results.length) {
          this.offset = data.last_id
        } else {
          this.finished = true
        }
      }).catch(() => {
        this.error = true
      })
    }
  }
}
</script>

<style>

</style>
