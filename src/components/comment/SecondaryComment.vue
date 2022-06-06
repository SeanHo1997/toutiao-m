<template>
  <div class="containner">
    <div class="comment-containner">
      <!-- 导航栏 -->
      <van-nav-bar>
        <span class="reply-title" slot="title">{{`评论回复(${commentInfo.reply_count})`}}</span>
        <i class="leftarrow toutiao toutiao-youjiantou" slot="left" @click="$emit('closePopup')"></i>
      </van-nav-bar>
      <!-- /导航栏 -->
    <!-- 本次评论项 -->
      <CommentItem :commentInfo="commentInfo"></CommentItem>
    <!-- /本次评论项 -->
    </div>
    <!-- /分割线 -->
    <van-divider />
    <!-- /分割线 -->
    <span class="all-reply">全部回复</span>
    <!-- 评论回复列表 -->
    <CommentList
    type="c"
    :source="commentInfo.com_id"
    :secCmtlist="commentList"
    ></CommentList>
    <!-- /评论回复列表 -->
    <!-- 写评论按钮 -->
    <van-button type="default" class="comment-btn" @click="secCmtEdit=true" >回复评论</van-button>
    <!-- /写评论按钮 -->
    <!-- 写评论回复弹出层 -->
    <van-popup
    v-model="secCmtEdit"
    close-icon-position="top-right"
    position="bottom"
    >
    <CommentPopup
    :target="commentInfo.com_id"
    :articleID="articleID"
    :com_id="commentInfo.com_id"
    @newComment="pubSecCmt"
    ></CommentPopup>
    </van-popup>
    <!-- /写评论回复弹出层 -->
  </div>
</template>

<script>
import CommentItem from '@/components/comment/CommentItem.vue'
import CommentList from '@/components/comment/CommentList.vue'
import CommentPopup from '@/components/comment/CommentPopup.vue'

export default {
  name: 'SecondaryComment',
  props: {
    commentInfo: {
      type: Object
    },
    articleID: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      list: [],
      listLength: 0,
      secCmtEdit: false,
      commentList: []
    }
  },
  components: {
    CommentItem,
    CommentList,
    CommentPopup
  },
  methods: {
    pubSecCmt (newSecCmt) {
      this.commentList.unshift(newSecCmt.new_obj)
      this.secCmtEdit = false
      this.$emit('replyCountAdd1')
    }
  }
}
</script>

<style scoped lang="less">
.containner {
  .comment-containner {
    // 新增导航栏
    .van-nav-bar {
      background-color: #fff;
      .reply-title {
        color: #000;
        font-weight: 400;
      }
    }
    // 从CommentItem复制过来的原样式
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
  }
  .all-reply {
    font-size: 27px;
    padding-left: 25px;
    color: #333;
  }
  .comment-btn {
    position: fixed;
    bottom: 0;
    left: 0%;
    width: 100%;
  }
}
</style>
