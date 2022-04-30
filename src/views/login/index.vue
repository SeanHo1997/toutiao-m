<template>
  <div class="login-containner">
    <van-form @submit="onSubmit" ref="loginForm">
      <!-- 导航栏 -->
      <van-nav-bar
      title="登录"
      />
      <!-- 导航栏 -->
      <!-- 输入框 -->
      <van-cell-group class="vancellgroup">
        <van-field
          class="vanfield"
          v-model="user.mobile"
          name="mobile"
          placeholder="请输入手机号"
          :rules="userformRules.mobile"
        >
          <i slot="left-icon" class="toutiao toutiao-shouji"></i>
        </van-field>
        <van-field
          class="vanfield"
          name="code"
          v-model="user.code"
          placeholder="请输入验证码"
          :rules="userformRules.code"
        >
          <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
          <template #button>
            <van-count-down :time= "1000 * 5" format="ss s" v-if="isCountDownShow" @finish="isCountDownShow = false"/>
            <van-button
            class="sms"
            size="small"
            type="default"
            round
            native-type="button"
            @click="getMSM"
            v-else
            >
            获取验证码
            </van-button>
          </template>
        </van-field>
      </van-cell-group>
      <!-- 输入框 -->
      <!-- 登录按钮 -->
      <van-button class="loginBtn" type="info" native-type="submit">登录</van-button>
      <!-- 登录按钮 -->
      <!-- 隐私条款 -->
      <p class="privacy">隐私条款 验证码246810</p>
      <!-- 隐私条款 -->
    </van-form>
  </div>
</template>

<script>
import { login, SMS } from '@/api/login'

export default {
  name: 'loginCom',
  data () {
    return {
      user: {
        mobile: '13800000000',
        code: '246810'
      },
      userformRules: {
        code: [
          { required: true, message: '请填写验证码', trigger: 'onBlur' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码', trigger: 'onBlur' }],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'onBlur' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'onBlur' }
        ]
      },
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      // 表单验证(如上)
      // 提交数据
      try {
        const { data } = await login(this.user)
        this.$toast.success('登录成功')
        console.log(data)
        // console.log('请求成功', data)
      } catch (err) {
        this.$toast.fail({
          message: '登录失败',
          forbidClick: true
        })
        console.log('请求失败', err)
      }
    },
    async getMSM () {
      // 验证手机号 通过组件的表单的validate方法(返回pormise)
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return this.$toast.fail('手机号不存在')
      }
      // 显示倒计时
      this.isCountDownShow = true
      // 发送验证码
      try {
        await SMS(this.user.mobile)
        this.$toast.success('发送验证码成功')
      } catch (err) {
        return this.$toast.fail('发送验证码失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-containner {
  .vancellgroup {
    .vanfield {
      .toutiao {
        font-size: 37px;
      }
      .sms {
        width: 162px;
        height: 46px;
        line-height: 46px;
        background-color: #ededed;
        font-size: 12px;
      }
    }
  }
  .loginBtn {
    width: 694px;
    height: 88x;
    margin-left: 28px;
    margin-top: 53px;
    background-color: #6db4fb;
    border-radius: 10px;
    border: unset;
  }
  .privacy {
    position: absolute;
    font-size: 25px;
    color: #666666;
    bottom: 0;
    left: 324px;
  }
}
</style>
