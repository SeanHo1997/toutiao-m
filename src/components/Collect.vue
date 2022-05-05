<template>
  <van-icon
  :name="isCollected?'star':'star-o'"
  :class="{collected: isCollected}"
  @click="changeCollect"
  />
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article'
export default {
  name: 'CollectCom',
  props: {
    isCollected: {
      type: Boolean
    },
    articleID: {
      type: [String, Number]
    }
  },
  methods: {
    async changeCollect () {
      try {
        if (this.isCollected) {
          await deleteCollect(this.articleID)
        } else {
          await addCollect(this.articleID)
        }
        this.$emit('changeCollect')
      } catch (err) {
        this.$toast.fail('收藏失败，请重试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
// .van-button {
//   border: unset;
// }
.collected {
  color: yellow;
}
</style>
