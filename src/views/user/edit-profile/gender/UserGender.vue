<template>
  <van-picker
    title="性别"
    show-toolbar
    :columns="columns"
    @confirm="onConfirm"
    @cancel="onCancel"
  />
</template>

<script>
import { changeUserProfile } from '@/api/user.js'
export default {
  name: 'UserGender',
  data () {
    return {
      columns: ['男', '女'],
      gender: 0
    }
  },
  methods: {
    async onConfirm (val) {
      // 将男女字符串转化为0/1供接口传参
      if (val === '男') {
        this.gender = 0
      } else {
        this.gender = 1
      }
      this.$toast.loading({
        message: '加载中',
        forbidClick: true
      })
      try {
        await changeUserProfile({
          gender: this.gender
        })
        this.$emit('changeGender', this.gender)
        this.$emit('closePopup')
        this.$toast.success('修改完成')
      } catch {
        this.$toast.fail('请重试')
      }
    },
    onCancel () {
      this.$emit('closePopup')
    }
  }

}
</script>

<style lang="less" scoped>

</style>
