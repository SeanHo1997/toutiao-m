<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      @click-left="$router.back()"
    >
      <van-icon slot="left" name="arrow-left" class="arrowicon"/>
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 个人信息 -->
    <input type="file" ref="photo" hidden @change="changeAvator">
    <van-cell class="avatar-cell" title="头像" is-link center @click="$refs.photo.click()" >
      <!-- 头像 -->
      <van-image
        class="avatar"
        round
        fit="cover"
        :src="userProfile.photo"
      />
    </van-cell>
    <van-cell title="昵称" :value="userProfile.name" @click="showName = true"/>
    <van-cell title="性别" :value="userProfile.gender ?  '女' : '男'" is-link :gender="userProfile.gender" @click="showGender = true"/>
    <van-cell title="生日" :value="userProfile.birthday" is-link :birthday="userProfile.birthday" @click="showBirthday = true" />
    <!-- /个人信息 -->
    <!-- 昵称弹出层 -->
    <van-popup
      v-model="showName"
      position="bottom"
      :style="{ height: '100%' }"
      >
      <UserName v-model="userProfile.name" @closePopup="showName = false" @changeName="userProfile.name=$event"/>
    </van-popup>
    <!-- /昵称弹出层 -->
    <!-- 性别弹出层 -->
    <van-popup
      v-model="showGender"
      position="bottom"
      :style="{ height: '50%' }"
      >
      <UserGender v-model="userProfile.gender" @closePopup="showBirthday = false" @changeGender="userProfile.gender=$event"/>
    </van-popup>
    <!-- /性别弹出层 -->
    <!-- 生日弹出层 -->
    <van-popup
      v-model="showBirthday"
      position="bottom"
      :style="{ height: '50%' }"
      >
      <UserBirthday v-model="userProfile.birthday" @closePopup="showBirthday = false" v-if="showBirthday" @changeBirthday="userProfile.birthday=$event"/>
    </van-popup>
    <!-- /生日弹出层 -->
    <!-- 头像弹出层 -->
    <van-popup
      v-model="showAvator"
      position="bottom"
      :style="{ height: '100%' }"
      >
      <UserAvator @closePopup="showAvator = false" :img="img" @sendBlob="userProfile.photo=$event"/>
    </van-popup>
    <!-- /头像弹出层 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user.js'
import UserName from '@/views/user/edit-profile/name/UserName.vue'
import UserGender from '@/views/user/edit-profile/gender/UserGender.vue'
import UserBirthday from '@/views/user/edit-profile/birthday/UserBirthday.vue'
import UserAvator from '@/views/user/edit-profile/avator/UserAvator.vue'
export default {
  name: 'UserProfile',
  components: {
    UserGender,
    UserName,
    UserBirthday,
    UserAvator
  },
  props: {},
  data () {
    return {
      userProfile: {},
      showName: false,
      showGender: false,
      showBirthday: false,
      showAvator: false,
      img: null
    }
  },
  computed: {},
  watch: {},
  async created () {
    const { data: { data } } = await getUserProfile()
    this.userProfile = data
  },
  mounted () {},
  methods: {
    changeAvator () {
      // 获取照片文件对象
      const file = this.$refs.photo.files[0]
      // 获取文件对象的blob数据
      this.img = window.URL.createObjectURL(file)
      // 打开弹出层
      this.showAvator = true
      // 当两次选择的图片文件一样时，不会触发input的change事件
      this.$refs.photo.value = ''
    }
  }
}
</script>

<style scoped lang="less">
.user-profile {
  .page-nav-bar {
    .arrowicon {
      color: #fff;
    }
  }
  .avatar-cell {
    .van-cell__value {
      display: flex;
      flex-direction: row-reverse;
    }
    .avatar {
      width: 60px;
      height: 60px;
    }
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
