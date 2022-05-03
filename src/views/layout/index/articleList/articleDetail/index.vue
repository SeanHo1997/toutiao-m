<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
    >
      <i
      slot="left"
      class="toutiao toutiao-zuojiantou"
      @click="$router.back()"
      ></i>
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="!loaded">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else>
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleData.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleData.aut_photo"
          />
          <div slot="title" class="user-name">{{articleData.aut_name}}</div>
          <div slot="label" class="publish-date">{{articleData.pubdate}}</div>
          <!-- 将关注功能封装为组件以便复用 -->
          <Follow
          :is_followed="articleData.is_followed"
          :aut_id="articleData.aut_id"
          @updateIsFollowed="update()"
          >
          </Follow>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
        class="article-content markdown-body"
        v-html="articleData.content"
        ></div>
        <van-divider>正文结束</van-divider>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-if="httpCode===404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->
      <!-- 底部区域 -->
      <div class="article-bottom">
        <van-button
          class="comment-btn"
          type="default"
          round
          size="small"
        >写评论</van-button>
        <van-icon
          name="comment-o"
          badge=123
          color="#777"
        />
        <Collect
        v-model="articleData.is_collected"
        @changeCollected="articleData.is_collected=!articleData.is_collected"
        ></Collect>
        <van-icon
          color="#777"
          name="good-job-o"
        />
        <van-icon name="share" color="#777777"></van-icon>
      </div>
      <!-- /底部区域 -->

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
import Follow from '@/components/Follow.vue'
import Collect from '@/components/Collect.vue'

export default {
  components: {
    Follow,
    Collect
  },
  name: 'ArticleDetail',
  props: {
    article_id: {
      type: [String, Number],
      required: true
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
        // console.log(data)
        this.httpCode = 0
      } catch (err) {
        console.log('错误', err)
        if (err.response && err.response.status === 404) {
          this.httpCode = 404
        } else {
          this.httpCode = 507
        }
      }
    },
    update () {
      this.articleData.is_followed = !this.articleData.is_followed
    }
  },
  data () {
    return {
      articleData: {},
      loaded: false,
      httpCode: 0
    }
  }
}
</script>

<style lang="less" scoped>
@import './github-markdown.css';
.article-container {
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
