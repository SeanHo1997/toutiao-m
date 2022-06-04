<template>
  <div class="containner">
    <!-- 下拉刷新(包裹住vanlist) -->
    <van-pull-refresh
      v-model="isRefreshLoading"
      :success-text="successText"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell-group class="cellgroup">
          <van-cell
            class="vancell"
          >
          <div class="account">
            <div>
              <span class="icon">avator</span>
              <span class="accountName"> accountName</span>
            </div>
            <div>
              <van-button type="default" size="mini" disabled round>关注</van-button>
              <van-button type="default" size="mini" disabled round>...</van-button>
            </div>
          </div>
          <div class="title">Title</div>
          <div class="img">
            <img
            src="@/assets/R-C.jpeg"
            />
          </div>
          </van-cell>
          <van-cell
          class="vancell"
          >
          <div class="account">
            <div>
              <span class="icon">avator</span>
              <span class="accountName"> accountName</span>
            </div>
            <div>
              <van-button type="default" size="mini" disabled round>关注</van-button>
              <van-button type="default" size="mini" disabled round>...</van-button>
            </div>
          </div>
          <div class="title">Title</div>
          <div class="img">
            <img
            src="@/assets/R-C.jpeg"
            />
          </div>
          </van-cell>
          <van-cell
          class="vancell"
          >
          <div class="account">
            <div>
              <span class="icon">icon</span>
              <span class="accountName"> accountName</span>
            </div>
            <div>
              <van-button type="default" size="mini" disabled round>关注</van-button>
              <van-button type="default" size="mini" disabled round>...</van-button>
            </div>
          </div>
          <div class="title">Title</div>
          <div class="img">
            <img
            src="@/assets/R-C.jpeg"
            />
          </div>
          </van-cell>
        </van-cell-group>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: 'VideoList',
  data () {
    return {
      isRefreshLoading: false,
      successText: '',
      loading: false,
      finished: false
    }
  },
  methods: {
    async onLoad () {
      this.loading = false
    },
    async onRefresh () {
      this.isRefreshLoading = false
      this.successText = '刷新成功'
    }
  }
}
</script>

<style lang="less" scoped>
.containner {
  .cellgroup {
    overflow-y: auto;
    .vancell {
      height: auto;
      .account {
        display: flex;
        justify-content: space-between;
        height: 50px;
        line-height: 50px;
        font-weight: bold;
        margin: 10px 0;
        // border: 1px solid black;
      }
      .title {
        font-size: 48px;
        margin-bottom: 20px;
      }
      img {
        object-fit: cover;
        width: 100%;
        height: 400px;
        padding: 0;
      }
    }
  }

}
</style>
