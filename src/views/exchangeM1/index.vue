<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="优惠券兑换" name="first">
        <coupon-list></coupon-list>
      </el-tab-pane>
      <!-- <el-tab-pane label="余额兑换" name="second">余额兑换</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first'

    }
  },
  components: {
    'couponList': () => import('./couponList')
  },
  methods: {

  }
}
</script>

<style>

</style>



