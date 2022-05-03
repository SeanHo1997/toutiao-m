<template>
  <div class="follow-containner">
    <van-button
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      v-if="is_followed"
      @click="onAddFollow"
    >关注
    </van-button>
    <van-button
      class="follow-btn"
      round
      size="small"
      v-else
      @click="onAddFollow"
    >已关注
    </van-button>
  </div>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user.js'

export default {
  name: 'FollowCom',
  props: {
    is_followed: {
      type: Boolean,
      required: true
    },
    aut_id: {
      type: [String, Number],
      required: true
    }
  },
  methods: {
    async onAddFollow () {
      // 如果已关注
      try {
        if (!this.is_followed) {
          const { data } = await addFollow(this.aut_id)
          // this.is_followed = true
          console.log(data)
        } else {
          const { data } = await deleteFollow(this.aut_id)
          // this.is_followed = false
          console.log(data)
        }
        this.$emit('updateIsFollowed')
      } catch (err) {
        console.log('操作关注功能失败', err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.follow-containner {
  .follow-btn {
  width: 170px;
  height: 58px;
  }
}
</style>
