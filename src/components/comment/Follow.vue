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
      if (!this.is_followed) {
        this.$dialog.confirm({
          title: '取消关注',
          message: '确认取消关注该用户吗?'
        }).then(async () => {
          await addFollow(this.aut_id)
        }).then(() => {
          this.$toast('已取消关注')
          this.$emit('updateIsFollowed')
        })
      } else {
        await deleteFollow(this.aut_id).then(() => {
          this.$toast.success('关注成功')
          this.$emit('updateIsFollowed')
        })
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
