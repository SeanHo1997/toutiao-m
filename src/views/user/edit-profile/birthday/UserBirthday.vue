<template>
  <van-datetime-picker
    v-model="currentDate"
    type="date"
    title="出生日期"
    :min-date="minDate"
    :max-date="maxDate"
    @confirm="onConfirm"
    @cancel="onCancel"
  />
</template>

<script>
import { changeUserProfile } from '@/api/user.js'
import dayjs from 'dayjs'
export default {
  name: 'UserBirthday',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '加载中',
        forbidClick: true
      })
      try {
        const newBirthday = dayjs(this.currentDate).format('YYYY-MM-DD')
        await changeUserProfile({
          birthday: newBirthday
        })
        this.$toast.success('已修改')
        this.$emit('changeBirthday', newBirthday)
        this.$emit('closePopup')
      } catch (err) {
        console.log(err)
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
