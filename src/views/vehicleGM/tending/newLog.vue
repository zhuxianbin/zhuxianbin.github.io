<template>
  <div>
    <el-form :model="diagForm" ref="diagForm" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="保养车辆">
            <el-input v-model="dataRow.carNo" disabled placeholder="保养车辆"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="车辆类型">
            <el-input v-model="dataRow.carTypeName" disabled placeholder="车辆类型"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="保期">
            <el-input v-model="dataRow.lastMaintainPeriodName" disabled placeholder="保期"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="保养日期" prop="maintainTime">
            <el-date-picker
              v-model="diagForm.maintainTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="保养日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item label="实际维护里程(KM)" label-width="150px" prop="maintainMileage">
            <el-input v-model="diagForm.maintainMileage" placeholder="" onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')" @blur="fixedFun(diagForm.maintainMileage, 'maintainMileage')"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-row>
        <el-col :span="8">
          <el-form-item label="配件费用" prop="partsFee">
            <el-input v-model="diagForm.partsFee" placeholder="" onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')" @blur="fixedFun(diagForm.partsFee, 'partsFee')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工时费用" prop="timeFee">
            <el-input v-model="diagForm.timeFee" placeholder="" onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')" @blur="fixedFun(diagForm.timeFee, 'timeFee')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="费用合计">
            <el-input v-model="summation" disabled placeholder=""></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="维护项目" prop="itemCode">
            <el-select v-model="diagForm.itemCode" placeholder="维护项目" clearable>
              <el-option v-for="item in projects" 
                :key="item.id"
                :label="item.cnName"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item label="办理人">
            <el-input v-model="operatorName" disabled placeholder="办理人"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-row style="margin-top: 40px;">
        <div align="center">
          <el-button type="primary" @click="addVehicleMaintainRecord('diagForm')">提交</el-button>
          <el-button @click="closeThen">取消</el-button>
        </div>  
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getMaintainItemList, initMaintainInfo, addVehicleMaintainRecord } from "@/api/tending";
export default {
  props: ["dataRow"],
  data() {
    return {
      diagForm: {
        carNo: '',
        carType: '',
        maintainPeriod: '',
        maintainTime: this.time(new Date(), 'YYYY-MM-DD'),
        maintainMileage: '0.00',
        partsFee: '0.00',
        timeFee: '0.00',
        feeTotal: '0.00',
        itemCode: ''
      },
      projects: [],
      rules: {
        itemCode: [{required: true, message: '请选择维护项目', trigger: 'blur'}],
        timeFee: [{required: true, message: '请输入工时费', trigger: 'blur'},
                  { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }],
        partsFee: [{required: true, message: '请输入配件费', trigger: 'blur'},
                   { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }],
        maintainMileage: [{required: true, message: '请输入实际维护里程', trigger: 'blur'},
                          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }],
        maintainTime: [{required: true, message: '请输入保养日期', trigger: 'blur'}]

      },
      operatorName: ''
    }
  },
  mounted () {
    this.getMaintainItemList()
    this.initMaintainInfo()
  },
  computed: {
    summation: {
      set() {
        this.diagForm.feeTotal = this.diagForm.partsFee * 1 + this.diagForm.timeFee * 1
      },
      get() {
        this.diagForm.feeTotal = this.diagForm.partsFee * 1 + this.diagForm.timeFee * 1
        if (this.diagForm.feeTotal == 0) {
          this.diagForm.feeTotal = '0.00'
        } else {
          this.diagForm.feeTotal = (this.diagForm.feeTotal * 1).toFixed(2)
        }
        return this.diagForm.feeTotal
      }
    }
  },
  methods: {
    // 点击取消的功能
    closeThen() {
      this.$emit('closeDialog')
    },
    // 获取维护
    getMaintainItemList() {
      getMaintainItemList().then(res => {
        this.projects = res
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取操作人员
    initMaintainInfo() {
      initMaintainInfo({carNo: this.dataRow.carNo}).then(res => {
        this.operatorName = res.operateName
      }).catch(err => {
        console.log(err)
      })
    },
    // 新增车辆保养记录
    addVehicleMaintainRecord(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.diagForm.carNo = this.dataRow.carNo
            this.diagForm.carType = this.dataRow.carType
            this.diagForm.maintainPeriod = this.dataRow.lastMaintainPeriod
            this.diagForm.maintainMileage = (this.diagForm.maintainMileage * 1).toFixed(2)
            this.diagForm.partsFee = (this.diagForm.partsFee * 1).toFixed(2)
            this.diagForm.timeFee = (this.diagForm.timeFee * 1).toFixed(2)
            this.diagForm.feeTotal = (this.diagForm.feeTotal * 1).toFixed(2)
            addVehicleMaintainRecord(this.diagForm).then(res => {
              this.$emit('refeClose')
            }).catch(err => {
              console.log(err)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
      });
    },
    // 数据保留2位小数
    fixedFun(ele, str) {
      if (str === 'maintainMileage') {
        this.diagForm.maintainMileage = (parseFloat(ele) * 1).toFixed(2)
        if (isNaN(this.diagForm.maintainMileage)) {
          this.diagForm.maintainMileage = '0.00'
        }
      } else if (str === 'partsFee') {
        this.diagForm.partsFee = (parseFloat(ele) * 1).toFixed(2)
        if (isNaN(this.diagForm.partsFee)) {
          this.diagForm.partsFee = '0.00'
        }
      } else if (str === 'timeFee') {
        this.diagForm.timeFee = (parseFloat(ele) * 1).toFixed(2)
        if (isNaN(this.diagForm.timeFee)) {
          this.diagForm.timeFee = '0.00'
        }
      }
    }
  }
}
</script>

<style>
</style>

