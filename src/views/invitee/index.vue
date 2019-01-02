<template>
  <div class="app-container">
     <!--form表单-->
    <el-form :inline="true" :model="formTest" class="demo-form-inline">
      <el-form-item label="是否认证">
        <el-select v-model="formTest.state" clearable placeholder="是否认证">
          <el-option label="全部" value=""></el-option>
          <el-option label="未认证" value="0"></el-option>
          <el-option label="已认证" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所选城市">
        <el-cascader
          :options="company.areasInfo"
          v-model="selectedOptions1"
          filterable
          :props="{value: 'name', label: 'name'}"
          :show-all-levels="false"
          clearable
          change-on-select
          @change="changeCity">
        </el-cascader>
      </el-form-item>
      <!-- <el-form-item label="注册公司">
        <el-cascader
          :options="company.arr"
          v-model="selectedOptions"
          filterable
          :show-all-levels="false"
          clearable
          change-on-select
          @change="changeCompany">
        </el-cascader>
      </el-form-item> -->
      <el-form-item label="当前身份">
        <el-select v-model="formTest.type" clearable placeholder="当前身份">
          <el-option label="全部" value=""></el-option>
          <el-option label="合伙人" value="1"></el-option>
          <el-option label="普通会员" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="受邀人手机">
         <el-input v-model="formTest.phoneNo" clearable placeholder="受邀人手机"></el-input>
       </el-form-item>
      <el-form-item label="受邀人姓名">
         <el-input v-model="formTest.name" clearable placeholder="受邀人姓名"></el-input>
       </el-form-item>
      <el-form-item label="受邀时间">
        <el-date-picker
          v-model="timeValues"
          type="daterange"
          range-separator="至"
          clearable
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
     </el-form-item>
     
     <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
     </el-form-item>
    </el-form>
     <!--导出-->
    <div class="xlsx-box">
      <el-button type="success" icon="el-icon-download" v-loading="downloadLoading" @click="handleDownload">导出表格</el-button>
    </div> 
    <!--表格列表-->
    <el-table :data="list" border style="margin-top: 20px;">
      <el-table-column label="所填姓名" prop="nickName"></el-table-column>
      <el-table-column label="会员姓名" prop="name"></el-table-column>
      <el-table-column label="所选城市" prop="selectCityName"></el-table-column>
      <!-- <el-table-column label="注册公司">
        <template slot-scope="scope">
          <span>{{getCompanyName(scope.row.registerCompanyName)}}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="手机号" prop="phoneNo"></el-table-column>
      <el-table-column label="当前身份" prop="type">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 1">合伙人</span>
          <span v-else>普通会员</span>
        </template>
      </el-table-column>
      <el-table-column label="上线" prop="parentName"></el-table-column>
      <el-table-column label="受邀时间" prop="createTime">
        <template slot-scope="scope">
          <span>{{scope.row.createTime|time}}</span>
        </template>
      </el-table-column>
    </el-table>

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
  </div>
</template>

<script>
import XLSX from 'xlsx'
import FileSaver from 'file-saver'
import { inviteeGetList } from "@/api/invitee";
export default {
  data() {
    return {
      formTest: {
        start: 1,
        pageSize: 10,
        type: '',
        state: '',
        selectCityName: '',
        startTime: '',
        endTime: '',
        name: '',
        phoneNo: '',
        registerCompanyName: ''
      },
      selectedOptions: [],
      selectedOptions1: [],
      list: [],
      timeValues: [],
      pagination: {
        total: 0,
        sizes: [100, 50, 20, 10]
      },
      downloadLoading: false
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    // 查询功能
    onSubmit() {
      this.formTest.start = 1;
      this.getData();
    },
    // 获取数据
    getData() {
      if (this.timeValues && this.timeValues.length > 0) {
        this.formTest.startTime = this.timeValues[0];
        this.formTest.endTime = this.timeValues[1];
      } else {
        this.formTest.startTime = '';
        this.formTest.endTime = '';
      }
      inviteeGetList(this.formTest).then(res => {
        this.pagination.total = res.total
        this.list = res.list;
      }).catch(err => {
          this.$message.error(err);
      });
    },
    // 选择公司的结果
    changeCompany(val) {
      this.formTest.registerCompanyName = val[val.length - 1];
    },
    // 选择城市的结果
    changeCity(val) {
      this.formTest.selectCityName = val[val.length - 1];
    },
    // 每页多少条
    handleSizeChange(val) {
     this.formTest.pageSize = val;
     this.getData();
    },
    // 当前第几页
    handleCurrentChange(val) {
      this.formTest.start = val;
      this.getData();
    },
    // 导出功能
    handleDownload() {
      this.downloadLoading = true
      const defaultCellStyle = {font: {name: 'Verdana', sz: 11, color: 'FF00FF88'}, fill: {fgColor: {rgb: 'FFFFAA00'}}}
      const wopts = {bookType: 'xlsx', bookSST: false, type: 'binary', defaultCellStyle: defaultCellStyle, showGridLines: false}
      const wb = { SheetNames: ['Sheet1'], Sheets: {}, Props: {} }
      let data = []
      const formSerach = Object.assign({}, this.formTest)
      formSerach.start = 1;
      if (this.pagination.total > 5000) {
        formSerach.pageSize = 5000;
      } else {
        formSerach.pageSize = this.pagination.total
      }
      inviteeGetList(formSerach).then(res => {
        const result = res.list;
        const objArr = []
        if (result.length > 0) {
          result.forEach(ele => {
            const obj = {
                '所填姓名': ele.nickName,
                '会员姓名': ele.name,
                '所选城市': ele.selectCityName,
                '注册公司': this.getCompanyName(ele.registerCompanyName),
                '手机号': ele.phoneNo,
                '当前身份': ele.type == '1' ? '合伙人' : '普通会员',
                '上线': ele.parentName,
                '受邀时间': this.time(ele.createTime)
              }
              objArr.push(obj)
              this.downloadLoading = false
          })
        }
        data = objArr
        wb.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(data)
        // 创建二进制对象写入转换好的字节流
        const tmpDown = new Blob([this.s2ab(XLSX.write(wb, wopts))], { type: 'application/octet-stream' })
        FileSaver.saveAs(tmpDown, '受邀人列表.xlsx')
      });
    }
  }
}
</script>

<style>
</style>

