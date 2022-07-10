<template>
  <div class="login-containner">
    <van-form @submit="onSubmit" ref="loginForm">
      <!-- 导航栏 -->
      <van-nav-bar
      title="登录"
      >
        <i
        slot="left"
        class="toutiao toutiao-zuojiantou"
        style="color: #fff; font-size: 18px;"
        @click="$router.back()"
        ></i>
      </van-nav-bar>
      <!-- 导航栏 -->
      <!-- 输入框 -->
      <van-cell-group class="vancellgroup">
        <van-field
          class="vanfield"
          v-model="user.mobile"
          name="mobile"
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '手机号不能为空', trigger: 'onBlur' },
          { pattern:/^1[3-9]\d{9}$/, message: '手机号格式错误', trigger: 'onBlur' }
          ]"
        >
          <i slot="left-icon" class="toutiao toutiao-shouji"></i>
        </van-field>
        <van-field
          class="vanfield"
          name="code"
          v-model="user.code"
          placeholder="请输入验证码"
          :rules="[{ required: true, message: '验证码不能为空', trigger: 'onBlur' },
          { pattern:/\d{6}/, message: '验证码格式错误', trigger: 'onBlur' }
          ]"
        >
          <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
          <template #button>
            <van-count-down :time="time" format="ss 秒" v-if="isCountDownShow" @finish="isCountDownShow = false"/>
            <van-button size="small" type="default" class="sendBtn"  native-type="button" round v-else @click="onSendSMS">发送验证码</van-button>
          </template>
        </van-field>
      </van-cell-group>
      <!-- 输入框 -->
      <!-- 登录按钮 -->
      <van-button class="loginBtn" type="info">登录</van-button>
      <!-- 登录按钮 -->
      <!-- 隐私条款 -->
      <p class="privacy">隐私条款 验证码246810</p>
      <!-- 隐私条款 -->
    </van-form>
  </div>
</template>

<script>
import { sendSMS, login } from '@/api/login.js'
export default {
  name: 'loginCom',
  data () {
    return {
      user: {
        mobile: '13800000000',
        code: '246810'
      },
      time: 5 * 1000,
      isCountDownShow: false
    }
  },
  methods: {
    // 点击获取验证码
    async onSendSMS () {
      // 验证手机号是否存在（通过组件的validate方法同时传入name属性值
      try {
        this.$refs.loginForm.validate('mobile')
      } catch {
        return this.$toast.fail('手机号不正确')
      }
      try {
        await sendSMS(this.user.mobile)
        this.isCountDownShow = true
      } catch (err) {
        return this.$toast.fail('手机号不存在')
      }
    },
    // 点击登录
    async onSubmit () {
      // 通过接口向服务器提交账号和密码
      const { data: { data } } = await login(this.user)
      // 里面是token和refreshToken
      this.$toast.success('登录成功')
      this.$store.commit('setToken', data)
      // (中途加入代码)清除layout组件缓存，重新渲染
      // this.$store.commit('deletecachePages', 'LayoutCom')
      // this.$store.commit('clearCachePages')
      this.$router.push('/layout/profile')
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
      /deep/.sendBtn {
        width: 162px;
        height: 46px;
        line-height: 46px;
        background-color: #ededed;
        font-size: 4px;
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
