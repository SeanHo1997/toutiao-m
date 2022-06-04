<template>
  <div class="report">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
    >
      <i
      slot="left"
      class="toutiao toutiao-zuojiantou"
      @click="$router.back()"
      ></i>
    </van-nav-bar>
    <!-- 输入框 -->
    <!-- 选择器 -->
    <van-field
      readonly
      clickable
      label="举报类型"
      :value="pickerValue"
      @click="showPicker = true"
    />
    <van-field class="remark" v-model="remark" label="举报描述" type="textarea" rows="3" maxlength="50" />
    <!-- 提交按钮 -->
    <van-button class="submit" type="default" @click="confirmReport">提交</van-button>

    <!-- popup -->
    <van-cell-group>
      <van-popup v-model="showPicker" round position="bottom">
        <van-picker
          title="举报类型"
          show-toolbar
          :columns="columns"
          @confirm="confirm"
          @cancel="showPicker = false"
        />
      </van-popup>
    </van-cell-group>
  </div>
</template>

<script>
import { reportArticle } from '@/api/article.js'

export default {
  name: 'ArticleReport',
  data () {
    return {
      columns: ['其他问题', '标题夸张', '低俗色情', '错别字多', '旧闻重复', '广告软文', '内容不实', '涉嫌违法犯罪', '侵权'],
      showPicker: false,
      pickerValue: '',
      remark: '',
      type: null
    }
  },
  methods: {
    confirm (value) {
      this.type = this.columns.indexOf(value)
      this.pickerValue = value
      this.showPicker = false
    },
    async confirmReport () {
      await reportArticle({
        target: this.$route.params.id,
        type: this.type,
        remark: this.remark
      }).then(() => {
        this.$toast.success('已提交')
        this.$router.back()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.report {
  .submit {
    position: absolute;
    left: 50%;
    margin: 76px auto;
    transform: translate(-50%);
  }
}
</style>
