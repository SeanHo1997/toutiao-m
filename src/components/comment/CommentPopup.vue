<template>
  <div class="popup-containner">
    <van-field
      v-model="commentContent"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入评论内容"
      show-word-limit
      class="textarea"
    />
    <van-button
    type="default"
    class="send-btn"
    @click="addComment"
    :disabled="commentContent.trim().length === 0"
     >发布</van-button>
  </div>
</template>

<script>
import { pubComments } from '@/api/comment.js'

export default {
  name: 'CommentPopup',
  data () {
    return {
      commentContent: ''
    }
  },
  methods: {
    async addComment () {
      await pubComments({
        target: this.target,
        content: this.commentContent,
        art_id: this.articleID ? this.articleID : null
      }).then((res) => {
        const data = res.data.data
        this.$emit('newComment', data)
        this.commentContent = ''
      })
    }
  },
  props: {
    target: {
      type: String
    },
    articleID: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="less" scoped>
.popup-containner {
  display: flex;
  padding: 32px 0 32px 32px;
  align-items: center;
  .textarea {
    background-color: #f5f7f9;
  }
  .send-btn {
    font-size: 25px;
    width: 150px;
    color: #6ba3d8;
    border: none;
  }
}
</style>
