<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CommentItem
      v-for="(item, index) in list"
      :key="index"
      :title="item.content"
      :commentInfo="list[index]"
      @changeIsLiking="list[index].is_liking = !list[index].is_liking"
      @changeLikeCount="list[index].like_count = $event"
      @showSecondaryComment="$emit('showSecondaryComment')"
      @sendCommentInfo="$emit('sendCommentInfo', $event)"
      />
    </van-list>
  </div>
</template>

<script>
import { comments } from '@/api/comment.js'
import CommentItem from '@/components/comment/CommentItem.vue'
import bus from '@/utils/bus'

export default {
  name: 'CommentList',
  data () {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      list: []
    }
  },
  props: {
    source: {
      type: [String, Number, Object],
      required: true
    },
    newObj: {
      type: Object
    },
    type: {
      type: String,
      required: true
    }
  },
  watch: {
    newObj () {
      this.onLoad()
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await comments({
          type: this.type,
          source: this.source,
          offset: this.offset,
          limit: this.limit
        })
        this.list.push(...data.data.results)
        // 加载状态结束
        this.loading = false
        // 判断是否还有数据
        if (data.data.results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.$toast('获取评论失败')
      }
      this.$emit('sendCommnetCount', this.list.length)
    }
  },
  components: {
    CommentItem
  },
  updated () {
    bus.$on('update-reply-count', val => {
      this.list.unshift(val)
      this.onLoad()
    })
  }
}
</script>

<style>

</style>
