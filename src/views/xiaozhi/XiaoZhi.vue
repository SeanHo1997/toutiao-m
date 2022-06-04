<template>
  <div class="container">
    <!-- 头部 -->
    <van-nav-bar class="navBar" title="小智同学" fixed>
      <i
      slot="left"
      class="toutiao toutiao-zuojiantou"
      @click="$router.back()"
      ></i>
    </van-nav-bar>
    <!-- /头部 -->
    <!-- 中间 -->
    <van-cell-group class="content">
      <van-cell
        :title="item.msg"
        value="内容"
        v-for="(item, i) in messagesList"
        :key="i"/>
    </van-cell-group>
    <!-- /中间 -->
    <!-- 底部 -->
    <van-field
      class="input-wrap"
      v-model="message"
      placeholder="请输入聊天内容"
    >
    <van-button
      slot="button"
      size="small"
      type="primary"
      @click="sendMessage"
      :disabled="message.length === 0"
    >发送</van-button>
    </van-field>
    <!-- /底部 -->
  </div>
</template>

<script>
// 1: 引入websocket的封装包socketio
import { io } from 'socket.io-client'

export default {
  name: 'XiaoZhi',
  data () {
    return {
      message: '',
      // socket通讯对象
      socket: null,
      // 消息列表
      messagesList: []
    }
  },
  created () {
    // 建立连接
    const socket = io('http://toutiao.itheima.net/v1_0/socket.io/', {
      withCredentials: true,
      extraHeaders: {
        'my-custom-header': 'abcd'
      }
    })
    this.socket = socket
    socket.on('connect', () => {
      console.log('连接成功')
    })
    // 断开
    socket.on('disconnet', () => {
      console.log('断开连接')
    })
    // 接收消息
    socket.on('message', data => {
      console.log(data)
      this.messagesList.push(data)
    })
  },
  methods: {
    sendMessage () {
      // 发送消息(消息类型，{发送的数据})
      const data = {
        msg: this.message,
        timestamp: Date.now()
      }
      this.socket.emit('message', data)
      // 把发出去和接收到的消息存储起来
      this.messagesList.push(data)
      // 输入框清空
      this.message = ''
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  .navBar {
    .toutiao {
      color: #fff;
    }
  }
  .content {
    overflow-y: auto;
    padding-top: 92px;
    padding-bottom: 106px;
  }
  .input-wrap {
    position: fixed;
    bottom: 0;
  }
}
</style>
