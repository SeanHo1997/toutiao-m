<template>
  <div class="article-container">
    <HeaderVC/>
    <div class="main-wrap" ref="mainwrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="!loaded">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->
      <!-- 加载完成-文章详情 -->
      <div class="article-detail" ref="articleDetail" v-else>
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleData.title }}</h1>
        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleData.aut_photo"
            @click="toUserProfile"
          />
          <div slot="title" class="user-name">{{articleData.aut_name}}</div>
          <div slot="label" class="publish-date">{{articleData.pubdate}}</div>
          <Follow
          :is_followed="articleData.is_followed"
          :aut_id="articleData.aut_id"
          @updateIsFollowed="articleData.is_followed=!articleData.is_followed"
          >
          </Follow>
        </van-cell>
        <!-- /用户信息 -->
        <!-- 文章内容 -->
        <div
        class="article-content markdown-body"
        v-html="articleData.content"
        ></div>
        <van-divider ref="divider">正文结束</van-divider>
      </div>
      <!-- /加载完成-文章详情 -->
      <!-- 评论列表 -->
      <CommentList
      ref="commentList"
      :source="article_id"
      @sendCommnetCount="getCommentCount"
      @showSecCmt="showSecCmt"
      type='a'
      />
      <!-- /评论列表 -->
      <!-- 加载失败：404 -->
      <div class="error-wrap" v-if="httpCode===404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->
      <!-- 底部区域 -->
      <div class="article-bottom">
        <!-- 写评论按钮 -->
        <van-button
          class="comment-btn"
          type="default"
          round
          size="small"
          @click="show=true"
        >写评论</van-button>
        <!-- 评论图标 -->
        <van-icon
          name="comment-o"
          :badge="commentCount"
          color="#777"
          @click="jumpToComment"
        />
        <!-- 收藏 -->
        <Collect
        :isCollected="articleData.is_collected"
        :articleID="this.articleData.art_id"
        @changeCollect="articleData.is_collected=!articleData.is_collected"
        ></Collect>
        <!-- 点赞 -->
        <Like
        :islike="articleData.attitude"
        :articleID="articleData.art_id"
        @changeLike="articleData.attitude=-1"
        @changeUnlike="articleData.attitude=1"
        ></Like>
        <!-- 更多按钮 -->
        <van-icon name="share" color="#777777" @click="showShare=true"></van-icon>
        <!-- 分享面板 -->
        <van-share-sheet
          v-model="showShare"
          title="更多"
          :options="options"
          @select="onSelect"
        />
      </div>
      <!-- /底部区域 -->
      <!-- 评论编辑弹出层 -->
      <van-popup
        v-model="show"
        close-icon-position="top-right"
        position="bottom"
      >
        <CommentPopup
        :target="articleData.art_id"
        @newComment="newComment"
        ></CommentPopup>
      </van-popup>
      <!-- /评论编辑弹出层 -->

      <!-- 二级评论弹出层 -->
      <van-popup
        v-model="showSecondaryComment"
        position="bottom"
        :style="{ height: '80%' }"
      >
        <SecondaryComment
        :commentInfo="commentInfo"
        @closePopup="showSecondaryComment=false"
        v-if="showSecondaryComment"
        :articleID="articleData.art_id"
        @replyCountAdd1="commentInfo.reply_count++"
        ></SecondaryComment>
          <!-- 由于弹出层默认为懒渲染，所以在关闭弹出层后，
          里面的组件不会被销毁，一直会存在，当下次点击其他评论时，底下的回复数据不会更变，
          所以需要加一个v-if让它动态创建销毁达到实时渲染更新最新数据 -->
      </van-popup>
      <!-- /二级评论弹出层 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-if="httpCode===507">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="onGetArticleDetail(article_id)">点击重试</van-button>
       </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
  </div>
</template>

<script>
import { getArticleDetail } from '@/api/article.js'
import Follow from '@/components/comment/Follow.vue'
import Collect from '@/components/comment/Collect.vue'
import Like from '@/components/comment/Like.vue'
import CommentList from '@/components/comment/CommentList.vue'
import CommentPopup from '@/components/comment/CommentPopup.vue'
import SecondaryComment from '@/components/comment/SecondaryComment.vue'

export default {
  name: 'ArticleDetail',
  components: {
    Follow,
    Collect,
    Like,
    CommentList,
    CommentPopup,
    SecondaryComment
  },
  props: {
    article_id: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      articleData: {},
      loaded: false,
      httpCode: 0,
      commentCount: 0,
      show: false,
      newCmt: {},
      showSecondaryComment: false,
      commentInfo: {},
      showShare: false,
      options: [
        { name: '举报文章', icon: 'poster' }
      ]
    }
  },
  created () {
    this.onGetArticleDetail(this.article_id)
  },
  methods: {
    async onGetArticleDetail (articleID) {
      try {
        this.loaded = false
        const { data } = await getArticleDetail(articleID)
        this.loaded = true
        this.articleData = data.data
        this.httpCode = 0
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.httpCode = 404
        } else {
          this.httpCode = 507
        }
      }
    },
    getCommentCount (totalCount) {
      this.commentCount = totalCount
    },
    jumpToComment () {
      // 点击评论图标快速下滑到评论区域
      // document.documentElement.scrollTop = this.$refs.mainwrap.scrollHeight - this.$refs.commentList.$el.clientHeight + 236
      this.$refs.mainwrap.scrollTop = this.$refs.articleDetail.scrollHeight
    },
    async onSelect (option) {
      if (option.name === '举报文章') {
        this.$router.push(`/article/report/${this.article_id}`)
      } else {
        this.$toast('无此功能接口,敬请期待...')
      }
    },
    newComment (newCmt) {
      this.commentCount += 1
      this.$refs.commentList.list.unshift(newCmt.new_obj)
      this.show = false
    },
    toUserProfile () {
      this.$toast('无此接口,敬请期待')
    },
    showSecCmt ($event) {
      this.showSecondaryComment = true
      this.commentInfo = $event
    }
  }
}
</script>

<style lang="less" scoped>
@import './github-markdown.css';

.article-container {
  .page-nav-bar {
    .van-nav-bar__content {
      .van-nav-bar__left {
        .toutiao {
          color: #fff;
        }
      }
    }
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }
    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }
    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }
  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }
  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }
  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
