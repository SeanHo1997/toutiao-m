<template>
  <div class="container">
    <img :src="img" alt="" class="avator" ref="avator">
    <div class="toolbar">
      <span @click="$emit('closePopup')">返回</span>
      <span @click="onConfirm">确认</span>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updatePhoto } from '@/api/user.js'
export default {
  name: 'UserAvator',
  props: {
    img: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      cropper: null,
      blob: null
    }
  },
  mounted () {
    const image = this.$refs.avator
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  },
  methods: {
    onConfirm () {
      // 基于服务端的裁切处理，使用getData()
      // console.log(this.cropper.getData())
      // 此处是基于客户端处理
      this.cropper.getCroppedCanvas().toBlob(async blob => {
        // console.log(blob)
        const formdata = new FormData()
        formdata.append('photo', blob)
        const { data } = await updatePhoto(formdata)
        console.log(data)
        this.blob = data.data.photo
        this.$emit('sendBlob', this.blob)
        this.$emit('closePopup')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  background: #000;
  height: 100%;
  .avator {
    max-width: 100%;
    display: block;
  }
  .toolbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    font-size: 33px;
    color: #fff;
  }
}
</style>
