<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="文字规则" name="first">
        <verbal></verbal>
      </el-tab-pane>
      <el-tab-pane label="图片" name="second">
        <picture-mant></picture-mant>
      </el-tab-pane>
      <el-tab-pane label="微信分享设置" name="third">
        <wx-share></wx-share>
      </el-tab-pane>
      <el-tab-pane label="奖励设置" name="fourth">
        <reward-set></reward-set>
      </el-tab-pane>
      <el-tab-pane label="签到设置" name="fifth">
        <sign-set></sign-set>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first'
    }
  },
  components: {
    'verbal': () => import ('./verbal'),
    'picture-mant': () => import ('./picture'),
    'wx-share': () => import ('./weChatShare'),
    'reward-set': () => import('./reward'),
    'sign-set': () => import('./sign')
  },
  methods: {

  }
}
</script>

<style>
</style>

