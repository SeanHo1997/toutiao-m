<template>
  <div class="article-item-containner">
    <van-cell
    class="vancell"
    :to="`/article/${article.art_id}`"
    >
    <div slot="title" class="title van-multi-ellipsis--l2">{{ article.title }}</div>
    <div slot="label" class="label" >
      <div v-if="article.cover.type === 3" class="cover-wrapper">
        <van-image
        class="cover-item"
        fit="cover"
        v-for="(item, index) in article.cover.images"
        :key="index"
        :src="article.cover.images[index]"
        />
      </div>
      <div class="wrapper">
        <!-- <span id="is-top" v-if="isTopShow">置顶</span> -->
        <span id="username">{{ article.aut_name }}</span>
        <span id="comment">{{ article.comm_count }}</span>
        <span id="pubTime">{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <div slot="default" >
      <van-image
      v-if="article.cover.type === 1"
      fit="cover"
      :src="article.cover.images[0]"
      />
    </div>
    </van-cell>
  </div>
</template>

<script>
import '@/utils/dayjs.js'
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.article-item-containner {
  .vancell {
    .title {
      font-size: 32px;
    }
    .label {
      font-size: 23px;
      .wrapper {
        margin-top: 10px;
        #is-top {
          color: #e22829;
          margin-right: 15px;
        }
        #username {
          color: #b4b4b4;
          margin-right: 10px;
        }
        #comment {
          color: #b4b4b4;
          margin-right: 10px;
        }
        #pubTime {
          color: #b4b4b4;
          margin-right: 10px;
        }
      }

    }
    .van-cell__value {
      flex: unset;
      padding-left: 20px;
      width: 232px;
      height: 160px;
    }
    .label {
      .cover-wrapper {
        display: flex;
        .cover-item {
          width: 232px;
          height: 160px;
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
