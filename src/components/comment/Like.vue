<template>
  <van-icon
    :name="islike==-1?'good-job-o':'good-job'"
    :class="{like: islike==1}"
    @click="changeLike"
  />
</template>

<script>
import { unlikeArticle, likeArticle } from '@/api/article.js'
export default {
  name: 'LikeCom',
  props: {
    islike: {
      type: Number
    },
    articleID: {
      type: [String, Number]
    }
  },
  methods: {
    async changeLike () {
      try {
        if (this.islike === 1) {
          await unlikeArticle(this.articleID)
          this.$emit('changeLike')
        } else if (this.islike === -1) {
          await likeArticle(this.articleID)
          this.$emit('changeUnlike')
        }
      } catch {
        this.$toast.fail('点赞失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.like {
  color: #3296fa;
}
</style>
