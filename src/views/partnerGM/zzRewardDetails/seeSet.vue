<template>
  <div>
    <div>
      <el-form :model="brokerage" :inline="true">
        <el-form-item label="一级合伙人提佣">
          <el-input :value="brokerage.firstRebateAmount" disabled></el-input>
        </el-form-item>
        <el-form-item label="返佣">
          <el-col :span="12">
            <el-input :value="brokerage.firstRebateStagingNum" disabled></el-input>
          </el-col>
          <el-col :span="2" :offset="1">
            <span>期</span>
          </el-col>
        </el-form-item>
      </el-form>
    </div>

    <div>
      <el-form :model="brokerage" :inline="true">
        <el-form-item label="二级合伙人提佣">
          <el-input :value="brokerage.secondRebateAmount" disabled></el-input>
        </el-form-item>
        <el-form-item label="返佣">
          <el-col :span="12">
            <el-input :value="brokerage.secondRebateStagingNum" disabled></el-input>
          </el-col>
          <el-col :span="2" :offset="1">
            <span>期</span>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getPartnerBonusSettingInstanceByOrdersNo } from "@/api/cdzRewardDetails";
export default {
  props: ['setData'],
  data() {
    return {
      brokerage: {
        firstRebateAmount: 0,
        firstRebateStagingNum: 0,
        secondRebateAmount: 0,
        secondRebateStagingNum: 0
      }
    }
  },
  mounted () {
    this.getterSet()
  },
  methods: {
    // 查看策略设置
    getterSet() {
      const o = {
        ordersNo: this.setData.ordersNo,
        orderType: this.setData.orderType
      }
      getPartnerBonusSettingInstanceByOrdersNo(o).then(res => {
        this.brokerage = {...res};
      }).catch(err => {
        this.$message.error(err);
      })
    }
  }
}
</script>

<style>
</style>

