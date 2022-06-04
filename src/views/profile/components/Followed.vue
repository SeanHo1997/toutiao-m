<template>
  <div class="followedList">
    <HeaderVC
      title="粉丝"
    />
    <!-- 判断是否有关注用户 -->
    <div v-if="followerList.results.length" class="list"></div>
    <div v-else class="list">暂无粉丝</div>
  </div>
</template>

<script>
import { followerList } from '@/api/user'

export default {
  name: 'userFollowed',
  data () {
    return {
      query: {
        page: 1,
        per_page: 10
      },
      followerList: {
        results: 0
      }
    }
  },
  created () {
    this.getFollowerList()
  },
  methods: {
    async getFollowerList () {
      const { data: { data } } = await followerList(this.query)
      this.followerList = data
    }
  }
}
</script>

<style lang="less" scoped>
.followedList {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  .list {
    position: absolute;
    top: 92px;
  }
}
</style>
