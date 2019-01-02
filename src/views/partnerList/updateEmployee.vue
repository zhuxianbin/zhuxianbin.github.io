<template>
  <div>
    <div>
      <el-radio v-model="radio" label="1">是</el-radio>
      <el-radio v-model="radio" label="0">否</el-radio>
    </div>
    <el-button type="primary" style="margin-top: 20px" @click="submitEmp">修改</el-button>
  </div>
</template>

<script>
import { isEmployee } from "@/api/partnerList";
export default {
  props: ['employeeObj'],
  data() {
    return {
      radio: '1'
    }
  },
  methods: {
    submitEmp() {
        const obj = {
          id: this.employeeObj.id,
          isEmployee: this.radio
        }
        isEmployee(obj).then(res => {
          this.$emit('relClose')
        })
    }
  }
}
</script>

<style>
</style>



