<template>
  <div class="container">
    <!-- 头部 -->
    <van-nav-bar class="navBar" title="智能客服" fixed>
      <i
      slot="left"
      class="toutiao toutiao-zuojiantou"
      @click="$router.back()"
      ></i>
    </van-nav-bar>
    <!-- /头部 -->
    <!-- 中间 -->
    <div class="content" ref="content">
      <div class="chat" v-for="(item, i) in messagesList" :key="i">
        <div class="item left" v-if="item.service">
          <img class="avator" src="https://tse2-mm.cn.bing.net/th/id/OIP-C.ZO2UnkvC5wL3-vo0FeHfdgHaHa?pid=ImgDet&rs=1" alt="">
          <span class="box box-left">{{ item.msg }}</span>
        </div>
        <div class="item right" v-else>
          <span class="box box-right">{{ item.msg }}</span>
          <img class="avator" :src="$store.state.userData.photo" alt="">
        </div>
      </div>
    </div>
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
      ref="send"
      @click="sendMessage"
    >发送</van-button>
    </van-field>
    <!-- /底部 -->
  </div>
</template>

<script>
import { io } from 'socket.io-client'

export default {
  name: 'ServiceFeiFei',
  data () {
    return {
      message: '',
      // socket通讯对象
      socket: null,
      // 消息列表
      messagesList: [],
      content: ''
    }
  },
  created () {
    // 建立连接
    const socket = io('http://toutiao.itheima.net', {
      query: {
        token: this.$store.state.userInfo.token
      },
      transports: ['websocket']
    })
    this.socket = socket
    this.socket.on('connect', () => {
      console.log('连接成功')
    })
    // 断开
    this.socket.on('disconnet', () => {
      console.log('断开连接')
    })
    // 接收消息
    this.socket.on('message', data => {
      data.service = true
      this.messagesList.push(data)
      // 滚动条置底
      this.$nextTick(() => {
        document.documentElement.scrollTop = document.documentElement.scrollHeight
      })
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
      // 滚动条置底
      this.$nextTick(() => {
        document.documentElement.scrollTop = document.documentElement.scrollHeight
      })
      this.freezeBtn()
    },
    freezeBtn () {
      // 冻结发送按钮,控制发送频率
      this.$refs.send.disabled = true
      setTimeout(() => {
        this.$refs.send.disabled = false
      }, 2000)
    }
  },
  destroyed () {
    this.socket.close()
    this.socket = null
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
    .item {
      display: flex;
      align-items: center;
      padding: 20px;
      .avator {
        width: 75px;
        height: 75px;
        border-radius: 50%;
      }
      .box {
        display: inline-block;
        // min-width: 370px;
        width: auto;
        min-height: 32px;
        background-color: #fff;
        border-radius: 9px;
        font-size: 32px;
        padding: 15px;
        margin: 20px;
      }
    }
    .left {
      float: left;
      .box-left {
        margin-left: 20px;
      }
    }
    .right {
      float: right;
      .box-right {
        margin-right: 20px;
      }
    }
  }

  .input-wrap {
    position: fixed;
    bottom: 0;
  }
}
</style>
