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
        >
          <i slot="left-icon" class="toutiao toutiao-shouji"></i>
        </van-field>
        <van-field
          class="vanfield"
          name="code"
          v-model="user.code"
          placeholder="请输入验证码"
        >
          <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
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
export default {
  name: 'loginCom',
  data () {
    return {
      user: {
        mobile: '13800000000',
        code: '246810'
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
