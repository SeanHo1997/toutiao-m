<template>
  <div class="followingList">
    <HeaderVC
      title="关注"
    />
    <!-- 判断是否有关注用户 -->
    <div v-if="followingList.results.length" class="list"></div>
    <div v-else class="list">暂无关注用户</div>
  </div>
</template>

<script>
import { followingList } from '@/api/user'

export default {
  name: 'userFollowing',
  data () {
    return {
      query: {
        page: 1,
        per_page: 10
      },
      followingList: {
        results: 0
      }
    }
  },
  created () {
    this.getFollowingList()
  },
  methods: {
    async getFollowingList () {
      const { data: { data } } = await followingList(this.query)
      this.followingList = data
    }
  }
}
</script>

<style lang="less" scoped>
.followingList {
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
