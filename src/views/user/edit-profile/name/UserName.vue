<template>
  <div class="username">
    <!-- 导航栏 -->
      <van-nav-bar
      class="navbar"
        left-text="取消"
        right-text="确定"
        @click-left="closePopup"
        @click-right="changeName"
      >
        <span slot="title" class="title">昵称</span>
      </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 输入框 -->
    <div class="field-wrap">
      <van-field
        v-model="localName"
        rows="1"
        autosize
        type="textarea"
        placeholder="昵称(最多10个字符)"
        show-word-limit
      />
    </div>
    <!-- 输入框 -->
  </div>
</template>

<script>
import { changeUserProfile } from '@/api/user.js'
export default {
  name: 'UserName',
  props: {
    value: {
      type: String
    }
  },
  data () {
    return {
      show: false,
      localName: this.value
    }
  },
  methods: {
    async changeName () {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true
      })
      try {
        if (this.localName.length) {
          await changeUserProfile({
            name: this.localName
          })
          this.$emit('changeName', this.localName)
          this.$emit('closePopup')
          this.$toast.success('更新成功')
        } else {
          this.$toast('昵称不能为空')
        }
      } catch {
        this.$toast.fail('修改失败')
      }
    },
    closePopup () {
      this.$emit('closePopup')
      this.localName = this.value
    }
  }

}
</script>

<style lang="less" scoped>
.username {
  /deep/.navbar {
    background-color: #fff;
    .title {
      color: #333333 !important;
      font-weight: normal;
    }
  }
  .field-wrap {
    padding: 19px;
  }
}
</style>
