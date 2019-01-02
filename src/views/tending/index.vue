<template>
  <div class="app-container">
      <!--查询的功能-->
      <el-form :model="formTest" :inline="true">
        <el-form-item label="所属区域">
          <el-cascader
            :options="aresArr"
            :props="{value: 'companySn', label: 'companyName'}"
            v-model="selectedOptions"
            filterable
            :show-all-levels="false"
            clearable
            change-on-select
            @change="changeAres">
          </el-cascader>
        </el-form-item>
        <el-form-item label="车牌号">
          <el-input v-model="formTest.carNo" placeholder="车牌号" clearable></el-input>
        </el-form-item>
        <el-form-item label="车架号">
          <el-input v-model="formTest.vin" placeholder="车架号" clearable></el-input>
        </el-form-item>
        <el-form-item label="上次保养时间">
          <el-date-picker
            v-model="timeValue"
            type="daterange"
            range-separator="至"
            clearable
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="保养状态">
          <el-select v-model="formTest.maintainStatus" placeholder="保养状态" clearable>
            <el-option label="立即保养" value="0"></el-option>
            <el-option label="待保养" value="1"></el-option>
            <el-option label="保养完成" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车辆类型">
          <el-select v-model="formTest.carType" clearable placeholder="选择车辆类型">
            <el-option 
              v-for="item in carTayes" 
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上次完成保期">
          <el-select v-model="formTest.maintainPeriod" clearable placeholder="上次完成保期">
            <el-option v-for="item in maintainPeriods"
              :key="item.value"
              :label="item.name"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">查询</el-button>
        </el-form-item>  
      </el-form>
      <!--导入导出功能-->
      <div class="xlsx-box">
        <el-button v-if="partner.permission.authority['HHR_MAINTAIN_MONITOR'].includes('HHR_MAINTENANCE_OUTPUT')" type="success" class="btn2" @click="leadOut" :loading="downLoading">导出</el-button>
        <upload-file
          v-if="partner.permission.authority['HHR_MAINTAIN_MONITOR'].includes('HHR_MAINTENANCE_IMPORT')"
          text="批量导入" 
          template="车辆保养.xlsx"
          class="btn1"
          @success="getUploadData"
          template-url="/static/excel/vehicle-car-upkeep.xlsx" 
          action="/api/maintenance/maintenanceImport"
          >
      </upload-file>
        <div style="clear:both"></div>
      </div>
      <!--表格数据-->
      <el-table :data="list" border style="margin-top: 20px;">
        <el-table-column label="区域" width="150" prop="companyName"></el-table-column>
        <el-table-column label="车架号" prop="vin" width="150"></el-table-column>
        <el-table-column label="车牌号" prop="carNo" width="100"></el-table-column>
        <el-table-column label="车辆类型" prop="carTypeName"></el-table-column>
        <el-table-column label="注册日期" width="150" prop="registerTimeStr">
        </el-table-column>
        <el-table-column label="上次保养时间" width="150" prop="lastMaintainTimeStr">
        </el-table-column>
        <el-table-column label="总里程(KM)" width="100" prop="totalMileage"></el-table-column>
        <el-table-column label="上次保养里程(KM)" width="130" prop="lastMaintainMileage"></el-table-column>
        <el-table-column label="保养状态" prop="maintainStatusName"></el-table-column>
        <el-table-column label="上次完成保期" width="150" prop="lastMaintainPeriodName"></el-table-column>
        <el-table-column label="操作" width="210">
          <template slot-scope="scope">
            <el-button v-if="partner.permission.authority['HHR_MAINTAIN_MONITOR'].includes('HHR_ADD_VEHICLE_MAINTAIN_RECORD')" type="text" style="color: #0C7D9D" @click="newLog(scope.row)">新增记录</el-button>
            <el-button type="text" style="color: #F0930D" @click="getHistory(scope.row)">历史记录</el-button>
            <el-button type="text" style="color: #B2CE0D" @click="openLog(scope.row)">操作记录</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <div class="block" align="center">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="formTest.start"
          :page-sizes="pagination.sizes"
          :page-size="formTest.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
      </div>
      <!--弹出框-->
      <el-dialog 
        :title="diaObj.title" 
        :width="diaObj.width" 
        :visible.sync="diaObj.dialogTableVisible"
        :close-on-click-modal="false"
        @close="exitDialog">
        <new-log v-if="diaObj.diaIndex == 0" v-on:refeClose="refreshList" v-on:closeDialog="exitDialog" :data-row="newDate"></new-log>
        <history-log v-else-if="diaObj.diaIndex == 1" :data-row="historyData"></history-log>
        <operate-log v-else-if="diaObj.diaIndex == 2" :data-row="logData"></operate-log>
      </el-dialog>
  </div>
</template>

<script>
import { getVehicleMaintainList, getAreaList, getVehicleType, getMaintainPeriod } from "@/api/tending";
import { getToken } from '@/utils/auth';
export default {
  data() {
    return {
      formTest: {
        start: 1,
        pageSize: 10,
        companySn: "",
        carNo: "",
        vin: "",
        maintainStatus: "",
        carType: "",
        maintainPeriod: "",
        startTime: "",
        endTime: ""
      },
      timeValue: [],
      carTayes: [],
      aresArr: [],
      maintainPeriods: [
        {name: '新车', value: '0'},
        {name: '一保', value: '1'},
        {name: '二保', value: '2'},
        {name: '三保', value: '3'},
        {name: '四保', value: '4'},
        {name: '五保', value: '5'},
        {name: '六保', value: '6'},
        {name: '七保', value: '7'},
        {name: '八保', value: '8'},
        {name: '九保', value: '9'}
      ],
      list: [],
      pagination: {
        total: 0,
        sizes: [100, 50, 20, 10]
      },
      selectedOptions: [],
      obj: {token: getToken()},
      diaObj: {
        title: '',
        diaIndex: -1,
        width: '400px',
        dialogTableVisible: false
      },
      newDate: {}, // 新增的数据
      historyData: {}, // 历史数据
      logData: {}, // 向操作记录传递的数据
      downLoading: false
    }
  },
  components: {
    "upload-file": () => import("@/components/Upload/file"),
    "new-log": () => import("./newLog"),
    "history-log": () => import("./historyLog"),
    "operate-log": () => import("./operateLog")
  },
  mounted () {
    this.getVehicleType()
    this.getAreaList()
    this.getList()
  },
  methods: {
    // 每页多少条
    handleSizeChange(val) {
      this.formTest.pageSize = val
      this.getList()
    },
    // 第几页
    handleCurrentChange(val) {
      this.formTest.start = val
      this.getList()
    },
    // 导入模板的功能
    getUploadData({code, data, msg}) {
         this.$message({
          message: '导入完成',
          type: 'success'
        });
    },
    // 导出功能
    leadOut() {
      this.downLoading = true
      const token = getToken();
      if (this.timeValue && this.timeValue.length > 0) {
        this.formTest.startTime = this.timeValue[0];
        this.formTest.endTime = this.timeValue[1];
      } else {
        this.formTest.startTime = '';
        this.formTest.endTime = '';
      }
      const turnForm = document.createElement("form")
      document.body.appendChild(turnForm)
      turnForm.id = 'myFrom'
      turnForm.method = 'post'
      turnForm.action = process.env.BASE_API + '/api/maintenance/maintenanceOutput'
      turnForm.onsubmit = 'bc'

      for (const item in this.formTest) {
        const input3 = document.createElement("input")
        input3.type = 'hidden'
        input3.name = item
        input3.value = this.formTest[item]
        turnForm.appendChild(input3)
      }

      const input1 = document.createElement("input")
      input1.type = 'hidden'
      input1.name = 'token'
      input1.value = token
      turnForm.appendChild(input1)

      const input2 = document.createElement("input")
      input2.type = 'submit'
      input2.value = 'submit'
      turnForm.appendChild(input2)
      document.getElementById('myFrom').submit()
      $.ajax({
        url: process.env.BASE_API + '/api/maintenance/maintenanceOutput',
        type: 'post',
        data: {token: token, ...this.formTest},
        success: () => {
          this.downLoading = false
          document.body.removeChild(turnForm)
        }
      })
    },
    // 获取列表
    getList() {
      if (this.timeValue && this.timeValue.length > 0) {
        this.formTest.startTime = this.timeValue[0];
        this.formTest.endTime = this.timeValue[1];
      } else {
        this.formTest.startTime = '';
        this.formTest.endTime = '';
      }
      getVehicleMaintainList(this.formTest).then(res => {
        this.list = res.list
        if (this.list.length > 0) {
          this.list.forEach(ele => {
            ele.totalMileage = (ele.totalMileage * 1).toFixed(2)
            ele.lastMaintainMileage = (ele.lastMaintainMileage * 1).toFixed(2)
          })
        }
        this.pagination.total = res.recordTotal
      }).catch(err => {
        console.log(err);
      })
    },
    // 获取所属区域的接口
    getAreaList() {
      getAreaList().then(res => {
        this.aresArr = res
      }).catch(err => {
        console.log(err);
      })
    },
    // 获取车辆类型列表
    getVehicleType () {
      getVehicleType().then(res => {
        this.carTayes = res
      }).catch(err => {
        console.log(err);
      })
    },
    // 点击查询的功能
    submit() {
      this.formTest.start = 1;
      this.getList()
    },
    // 选择省市区的结果
    changeAres(val) {
      this.formTest.companySn = val[val.length - 1];
    },
    // 关闭弹出框的功能
    exitDialog() {
      this.diaObj.dialogTableVisible = false
      this.diaObj.diaIndex = -1
      // this.getList()
    },
    // 关闭弹出框并刷新列表
    refreshList() {
      this.diaObj.dialogTableVisible = false
      this.diaObj.diaIndex = -1
      this.getList()
    },
    // 新增记录
    newLog(row) {
      const obj = {...row}
      obj.lastMaintainPeriod++
      obj.lastMaintainPeriodName = this.maintainPeriods[obj.lastMaintainPeriod * 1].name
      this.newDate = obj
      this.diaObj.width = '850px'
      this.diaObj.title = '新增记录'
      this.diaObj.dialogTableVisible = true
      this.diaObj.diaIndex = 0
    },
    // 历史记录
    getHistory(row) {
      this.historyData = row
      this.diaObj.width = '860px'
      this.diaObj.title = '历史记录'
      this.diaObj.dialogTableVisible = true
      this.diaObj.diaIndex = 1
    },
    // 查看操作记录
    openLog(row) {
      this.logData = row
      this.diaObj.width = '600px'
      this.diaObj.title = '操作记录'
      this.diaObj.dialogTableVisible = true
      this.diaObj.diaIndex = 2
    }

  }
}
</script>

<style>
.xlsx-box {
  padding-top: 10px;
  border-top: 1px solid #DCDFE6;
  border-bottom: 1px solid #DCDFE6;
  padding-bottom: 10px;
}
.xlsx-box .btn1 {
  float: left;
}
.xlsx-box .btn2 {
  float: right;
}
.box-table {
  margin-top: 18px;
}
</style>

