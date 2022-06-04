<template>
  <div class="profile-containner">
    <!-- 头部区域 -->
    <div class="top">
      <div class="basic-data">
        <!-- 头像、ID -->
        <div class="id">
          <!-- 头像 -->
          <van-image-preview v-model="showPreview" :images='[this.userData.photo]' :showIndex='false'/>
          <van-image
            class="avator"
            :src="userData.photo"
            fit="cover"
            round
            @click="showPreview=true"
          />
          <!-- ID -->
          <span class="name">{{ userData.name }}</span>
        </div>
        <!-- 编辑资料 -->
        <div class="editProfile">
          <van-button
          type="default"
          class="editProfileBtn"
          round
          to="/editprofile"
          >编辑资料</van-button>
        </div>
      </div>
      <div class="detail-data">
    <!-- 关注、粉丝 -->
        <van-row class="vanrow" justify="space-around">
          <van-col span="6" class="vanrow-item">{{ userData.art_count }}<div class="word" @click="$toast.fail('接口文档不完整')">头条</div></van-col>
          <van-col span="6" class="vanrow-item">{{ userData.follow_count }}<div class="word" @click="$router.push('/user/following')">关注</div></van-col>
          <van-col span="6" class="vanrow-item">{{ userData.fans_count }}<div class="word" @click="$router.push('/user/followed')">粉丝</div></van-col>
          <van-col span="6" class="vanrow-item" @click.native="getLikes">{{ userData.like_count }}<div class="word">获赞</div></van-col>
        </van-row>
      </div>
    </div>
    <!-- 收藏、历史 -->
    <van-grid :column-num="2" class="star-andf-history" clickable>
      <van-grid-item icon="photo-o" text="收藏" class="gridItem" id="gridItem1" @click="$router.push('/collection')">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
      </van-grid-item>
      <van-grid-item icon="photo-o" text="浏览历史" class="gridItem" id="gridItem2" @click="$router.push('/history')">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
      </van-grid-item>
    </van-grid>
    <!-- 通知、小智同学 -->
      <div class="cell-list">
        <van-cell title="通知消息" size="middle" @click="$toast.fail('接口文档不完整')" />
        <van-cell title="客服" size="middle" @click="xiaoZhi"/>
      </div>
    <van-button class="logout" @click="confirmLogout" >退出登录</van-button>
    <!-- 点赞 -->
    <van-overlay :show="showOverlay" @click="showOverlay = false">
      <div class="wrapper" @click.stop>
        <div class="block" >
          <p id="name">{{ userData.name }}</p>
          <p id="desc">共获得<span> {{ userData.like_count }} </span>个赞</p>
          <van-button id="btn" @click="showOverlay=false">好的</van-button>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { getUserData } from '@/api/user.js'

export default {
  name: 'ProfileCom',
  data () {
    return {
      userData: '',
      showOverlay: false,
      showPreview: false
    }
  },
  async created () {
    try {
      const { data: { data } } = await getUserData()
      this.userData = data
    } catch (err) {
      return this.$toast.fail('加载信息失败')
    }
  },
  methods: {
    confirmLogout () {
      this.$dialog.confirm({
        title: '退出登录'
      }).then(() => {
        // 确认退出后，需要清除vuex和localstorage中的token数据
        this.$store.commit('delToken')
        this.$router.push('/login')
        this.$store.clearCachePages()
      }).catch(() => {
        // this.$router.back()
      })
    },
    xiaoZhi () {
      // 因跨域问题未完成此功能
      // this.$router.push('/xiaozhi')
      this.$toast('因跨域问题未完成此功能')
    },
    getLikes () {
      this.showOverlay = true
    }
  }
}
</script>

<style lang="less" scoped>
.profile-containner {
  .top {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    justify-content: space-between;
    padding: 32px;
    width: 750px;
    height: 401px;
    background-color: #3296fa;
    background-image: url('@/assets/banner.png');
    .basic-data {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 60px;
      .id {
        display: flex;
        align-items: center;
        .avator {
          width: 132px;
          height: 132px;
          border: 1px #fff solid;
          margin-right: 22px;
        }
        .name {
          font-size: 30px;
          color: #ffffff;
        }
      }
      .editProfile {
        /deep/.editProfileBtn {
        width: 160px;
        height: 46px;
        line-height: 33px;
        background-color: #ffffff;
        color: #666666;
        font-size: 20px;
        }
      }
    }
    .detail-data {
      .vanrow {
        .vanrow-item {
          text-align: center;
          font-size: 36px;
          height: 66px;
          color: #ffffff;
        .word {
          font-size: 23px;
          color: #ffffff;
          }
        }
      }
    }
  }

  .star-andf-history {
    #gridItem1 {
      color: #eb5253;
    }
    #gridItem2 {
      color: #ff9d1d;
    }
    .gridItem {
      font-size: 28px;
      .toutiao {
        font-size: 45px;
      }
    }
  }
  .cell-list {
    margin-top: 10px;
  }
  .logout {
    width: 694px;
    height: 88x;
    margin-left: 28px;
    margin-top: 50px;
    border-radius: 10px;
    border: unset;
    font-size: 30px;
    color: #d86262;
  }
  .wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  .block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 470px;
    height: 400px;
    background-color: #fff;
    position: relative;
    #name {
      font-size: 14px;
    }
    #desc {
      font-size: 32px;
      span {
        color: red;
      }
    }
    #btn {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #3296fa;
      border: unset;
    }
  }
}
</style>
