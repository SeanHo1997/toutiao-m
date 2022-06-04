<template>
  <div class="editChannel">
    <div class="editCell">
      <van-cell title="我的频道" class="vancell">
        <van-button v-if="!editStatus" plain type="default" size="mini" round @click="editStatus=true">编辑</van-button>
        <van-button v-if="editStatus" plain type="default" size="mini" round @click="editStatus=false">取消编辑</van-button>
        <van-button v-if="editStatus" plain type="primary" size="mini" round @click="confirmDel">确定</van-button>
      </van-cell>
    </div>
    <van-grid :gutter="16">
      <van-grid-item class="item" :text="item.name" v-for="(item, index) in userChannels" :key="item.id"
      :icon="editStatus && index !== 0?'cross':''"
      @click="delOrEnterChannel(index)">
      </van-grid-item>
    </van-grid>
    <div class="editCell">
      <van-cell title="频道编辑" class="vancell" />
    </div>
    <van-grid :gutter="16">
      <van-grid-item class="item" :text="item.name" v-for="(item, index) in recommendChannels" :key="index"
        @click="addChannel(item)">
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getChannels } from '@/api/user.js'

export default {
  name: 'EditChannel',
  data () {
    return {
      allChannels: [],
      editStatus: false
    }
  },
  computed: {
    recommendChannels () {
      // 数组去重
      // const combineArr = [...this.allChannels, ...this.userChannels]
      // return Array.from(new Set(combineArr))
      // 数组对象去重
      const resArr = []
      for (const item1 of this.allChannels) {
        let flag = true
        for (const item2 of this.userChannels) {
          if (item2.id === item1.id) {
            flag = false
          }
        }
        if (flag) {
          resArr.push(item1)
        }
      }
      return resArr
    }
  },
  props: {
    userChannels: {
      type: Array,
      require: true
    }
  },
  created () {
    this.getAllChannels()
  },
  methods: {
    async getAllChannels () {
      await getChannels().then(res => {
        this.allChannels = res.data.data.channels
      })
    },
    addChannel (item) {
      this.$emit('addChannel', item)
    },
    enterChannel (index) {
      this.$emit('enterChannel', index)
    },
    delChannel (index) {
      this.$emit('delChannel', index)
    },
    delOrEnterChannel (index) {
      if (this.editStatus) {
        this.delChannel(index)
      } else {
        this.enterChannel(index)
      }
    },
    confirmDel () {
      this.editStatus = false
      this.$emit('confirmDel')
    }
  }
}
</script>

<style lang="less" scoped>
.editChannel {
  .editCell {
    margin-top: 76px;
    margin-bottom: 30px;
  }
  /deep/.item {
    position: relative;
    width: 50px;
    height: 50px;
    // word-break: keep-all;
    white-space: nowrap;
    // overflow: hidden;
    // text-overflow: ellipsis;
    .van-grid-item__content {
      background-color: whitesmoke;
    .van-icon {
      position: absolute;
      right: -10px;
      top: -10px;
      border: 1px solid #5babfb;
      border-radius: 50%;
      background-color: #5babfb;
      color: #fff;
      font-size: 12px;
    }
    }
  }
}
</style>
