<template>
  <div>
    <el-form :model="formTest2" label-width="100px">
      <el-form-item label="任务规则">
        <el-input value="分享" disabled></el-input>
      </el-form-item>
      <el-form-item label="任务名称">
        <el-col :span="12">
          <el-input placeholder="请输入任务名称" clearable></el-input>
        </el-col>
        <el-col :span="11" :offset="1">
          <span>请控制在15字以内</span>
        </el-col>  
      </el-form-item>
      <el-form-item label="推广链接">
        <el-input  placeholder="请输入地址" clearable></el-input>
      </el-form-item>
      <el-form-item label="任务奖励">
        <el-col :span="6">
          <el-input v-model="formTest2.shareBonusAmout" clearable placeholder="任务奖励" onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"></el-input>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-select v-model="formTest2.shareBonusType" placeholder="任务奖类型">
            <el-option label="金币" :value="1"></el-option>
            <el-option label="优惠券" :value="2"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="到账时间">
        <el-row>
          <el-radio v-model="formTest2.isImmediately" :label="1">立即到账</el-radio>
        </el-row>
         <el-row style="margin-top: 15px">
           <el-col :span="4">
             <el-radio v-model="formTest2.isImmediately" :label="2">分享后</el-radio>
           </el-col>
           <el-col :span="4">
             <el-input v-model="formTest2.dayNum" placeholder="几" clearable onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
           </el-col>
           <el-col :span="4" :offset="1">
             <span>天到账</span>
           </el-col>
         </el-row>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-row>
          <el-radio v-model="formTest2.isEnable" :label="1">是</el-radio>
        </el-row>
        <el-row>
          <el-radio v-model="formTest2.isEnable" :label="0">否</el-radio>
        </el-row>
      </el-form-item>  
      <el-form-item>
        <el-button type="primary" @click="onSubmit1">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { insertShareConfigInfo, updateShareConfigInfo } from "@/api/shareSet";
export default {
  props: ['shareData'],
  data() {
    return {
      formTest2: {
        id: '',
        shareName: '',
        shareType: '',
        isEnable: 1,
        shareDesc: '',
        shareBonusType: '',
        shareBonusAmout: 0,
        isImmediately: 1,
        dayNum: 0
      }
    }
  },
  mounted () {
    console.log(this.shareData);
    this.formTest2 = {...this.shareData}
  },
  methods: {
    // 提交功能
    onSubmit1() {
      if (this.shareData.uzi === 'add') {
        const o = {
          shareName: this.formTest2.shareName,
          shareType: this.formTest2.shareType,
          isEnable: this.formTest2.isEnable,
          shareDesc: this.formTest2.shareDesc,
          shareBonusType: this.formTest2.shareBonusType,
          shareBonusAmout: this.formTest2.shareBonusAmout,
          isImmediately: this.formTest2.isImmediately,
          dayNum: this.formTest2.dayNum
        }
        insertShareConfigInfo(o).then(res => {
          this.$emit('relClose');
        }).catch(err => {
          this.$message.error(err);
        })
      } else {
        const o = {
          id: this.shareData.id,
          shareName: this.formTest2.shareName,
          shareType: this.formTest2.shareType,
          isEnable: this.formTest2.isEnable,
          shareDesc: this.formTest2.shareDesc,
          shareBonusType: this.formTest2.shareBonusType,
          shareBonusAmout: this.formTest2.shareBonusAmout,
          isImmediately: this.formTest2.isImmediately,
          dayNum: this.formTest2.dayNum
        }
        updateShareConfigInfo(o).then(res => {
          this.$emit('relClose');
        }).catch(err => {
          this.$message.error(err);
        })
      }
    }
  }
}
</script>

<style>

</style>

