<template>
  <van-button
  :icon="value?'star':'star-o'"
  :class="{collected: value}"
  @click="$emit('changeCollected')"
  />
</template>

<script>
export default {
  name: 'CollectCom',
  props: {
    value: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.van-button {
  border: unset;
}
.collected {
  .van-icon {
    color: yellow;
  }
}
</style>
