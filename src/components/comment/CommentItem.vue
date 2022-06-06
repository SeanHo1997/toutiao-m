<template>
  <div class="containner">
    <van-cell class="comment-item">
      <van-image
        slot="icon"
        class="avatar"
        round
        fit="cover"
        :src="commentInfo.aut_photo"
      />
      <div slot="title" class="title-wrap">
        <div class="user-name">{{ commentInfo.aut_name }}</div>
        <van-button
          class="like-btn"
          :class="{ like: commentInfo.is_liking }"
          :icon="commentInfo.is_liking?'good-job':'good-job-o'"
          @click="like"
        >{{ commentInfo.like_count > 0 ? commentInfo.like_count : '赞' }}
        </van-button>
      </div>

      <div slot="label">
        <p class="comment-content">{{ commentInfo.content }}</p>
        <div class="bottom-info">
          <span class="comment-pubdate">{{ commentInfo.pubdate }}</span>
          <van-button
            class="reply-btn"
            round
            @click="showSecCmt"
          >回复{{ commentInfo.reply_count }}</van-button>
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
import { addLike, deleteLike } from '@/api/comment.js'

export default {
  name: 'CommentItem',
  props: {
    commentInfo: {
      type: Object
    }
  },
  methods: {
    async like () {
      try {
        if (this.commentInfo.is_liking) {
          await deleteLike(this.commentInfo.com_id)
          this.$emit('changeLikeCount', this.commentInfo.like_count - 1)
        } else {
          await addLike(this.commentInfo.com_id)
          this.$emit('changeLikeCount', this.commentInfo.like_count + 1)
        }
        this.$emit('changeIsLiking')
      } catch {
        this.$toast('请重试')
      }
    },
    showSecCmt () {
      // 显示回复评论弹出层、发送评论信息
      this.$emit('showSecCmt', this.commentInfo)
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 140px;
    height: 48px;
    line-height: 48px;
    font-size: 20px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
    &.like {
      color: #e5645f;
    }
  }
}
</style>
