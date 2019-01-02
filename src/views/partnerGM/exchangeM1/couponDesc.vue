<template>
  <div>
    <el-form :model="formCoupon" label-width="120px">
      <el-form-item label="优惠券名称">
        <el-input style="width: 220px" v-model="formCoupon.name" placeholder="" disabled></el-input>
      </el-form-item>
      <el-form-item label="有效起始日期">
        <el-date-picker
          type="date"
          disabled
          v-model="formCoupon.validStartTime"
          placeholder="有效起始日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="有效终止日期">
        <el-date-picker
          type="date"
          disabled
          v-model="formCoupon.validEndTime"
          placeholder="有效终止日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="使用开始时间">
        <el-input style="width: 220px" v-model="formCoupon.useStartTime" placeholder="" disabled></el-input>
      </el-form-item>
      <el-form-item label="使用结束时间">
        <el-input style="width: 220px" v-model="formCoupon.useEndTime" placeholder="" disabled></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="formCoupon.type" placeholder="类型" disabled>
          <el-option label="满减" value="mj"></el-option>
          <el-option label="折扣" value="zk"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="减" v-if="formCoupon.type == 'mj'">
        <el-input v-model="formCoupon.minusAmount" style="width: 220px" disabled></el-input>
      </el-form-item>
      <el-form-item label="最高抵扣" v-else-if="formCoupon.type == 'zk'">
        <el-input v-model="formCoupon.discountLimit" style="width: 220px" disabled></el-input>
      </el-form-item>
      <el-form-item label="满" v-if="formCoupon.type == 'mj'">
        <el-input v-model="formCoupon.fullAmount" style="width: 220px" disabled></el-input>
      </el-form-item>
      <el-form-item label="折" v-else-if="formCoupon.type == 'zk'">
        <el-input v-model="formCoupon.discount" style="width: 220px" disabled></el-input>
      </el-form-item>
      <el-form-item label="启用">
        <el-select v-model="formCoupon.isEnable" placeholder="启用" disabled>
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="可用车型">
        <el-input type="textarea" :rows="4" v-model="formCoupon.carModelIntro" style="width: 220px" disabled></el-input>
      </el-form-item> 
      <el-form-item label="简介">
        <el-input type="textarea" :rows="4" v-model="formCoupon.intro" style="width: 220px" disabled></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getCouponsDetail } from '@/api/exchangeM1'
export default {
  props: ['relateId'],
  data() {
    return {
      formCoupon: {
        name: '',
        validStartTime: '',
        validEndTime: '',
        useStartTime: '',
        useEndTime: '',
        type: '',
        isEnable: 0,
        minusAmount: 0,
        fullAmount: 0
      },
      value2: new Date(),
      value1: new Date()
    }
  },
  mounted () {
    this.getCouponsDetail()
  },
  methods: {
    getCouponsDetail() {
      getCouponsDetail({id: this.relateId}).then(res => {
        this.formCoupon = {...res}
      })
    }
  }
}
</script>

<style>
</style>

