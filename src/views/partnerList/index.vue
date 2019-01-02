<template>
  <div class="app-container">
    <!--form表单-->
    <el-form :inline="true" :model="formTest" class="demo-form-inline">
      <!-- <el-form-item label="所属公司">
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
      <el-form-item label="手机号码">
        <el-input v-model="formTest.phoneNo" clearable placeholder="手机号码"></el-input>
      </el-form-item>
      <el-form-item label="合伙人姓名">
        <el-input v-model="formTest.name" clearable placeholder="合伙人姓名"></el-input>
      </el-form-item>
      <el-form-item label="身份证号码">
        <el-input v-model="formTest.idCode" clearable placeholder="身份证号码"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formTest.status" clearable placeholder="状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="有效" value="0"></el-option>
          <el-option label="被禁用" value="1"></el-option>
        </el-select>
     </el-form-item>
     <el-form-item label="是否员工">
        <el-select v-model="formTest.isEmployee" clearable placeholder="是否员工">
          <el-option label="全部" value=""></el-option>
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
     </el-form-item>
     <el-form-item label="开启时间">
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
     <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
     </el-form-item>
    </el-form>
    <!--导出-->
    <div class="xlsx-box">
      <el-button type="success" icon="el-icon-download" v-loading="downloadLoading" @click="handleDownload">导出表格</el-button>
    </div>  
    <!--表格列表-->
    <el-table :data="list" border style="margin-top: 20px">
      <el-table-column label="合伙人姓名" width="100" prop="name"></el-table-column>
      <el-table-column label="手机号" width="120" prop="phoneNo"></el-table-column>
      <el-table-column label="身份证" width="180" prop="idCode"></el-table-column>
      <el-table-column label="邀请识别码" width="120" prop="invitationCode"></el-table-column>
      <el-table-column label="状态" width="70" prop="status">
        <template slot-scope="scope">
          <span>{{scope.row.status == '0' ? '有效' : '被禁用'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否员工" width="70" prop="isEmployee">
        <template slot-scope="scope">
          <span style="color: #558FF2;cursor: pointer;" @click="editEmployee(scope.row)">{{scope.row.isEmployee == '1' ? '是' : '否'}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="注册公司" prop="registerCompanyId" width="150">
        <template slot-scope="scope">
          <span>{{gainCompanyName(scope.row.registerCompanyId)}}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="所属公司" prop="companySn" width="150">
        <template slot-scope="scope">
          <span>{{getCompanyName(scope.row.companySn)}}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="上线" prop="pName">
        <template slot-scope="scope">
          <span>{{scope.row.pName ? scope.row.pName : '/'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="一级粉丝数量" width="120" prop="pCount">
        <template slot-scope="scope">
          <span>{{scope.row.pCount ? scope.row.pCount : 0}}</span>
        </template>
      </el-table-column>
      <el-table-column label="二级粉丝数量" width="120" prop="gpCount">
        <template slot-scope="scope">
          <span>{{scope.row.gpCount ? scope.row.gpCount : 0}}</span>
        </template>
      </el-table-column>
      <el-table-column label="累计奖励金数额" width="150" prop="hisAmount"></el-table-column>
      <el-table-column label="开启时间" prop="openTime" width="150">
        <template slot-scope="scope" >
          <span>{{scope.row.openTime|time}}</span>
        </template>
      </el-table-column>
      <el-table-column width="160" label="操作">
        <template slot-scope="scope">
          <el-button type="text" style="color: red;" v-if="scope.row.status == '0'" @click="relieve(scope.row)">禁用合伙人</el-button>
          <el-button type="text" style="color: #E6A23C" v-else @click="relieve(scope.row)">解除禁用</el-button>
          <el-button type="text" @click="nextDetails(scope.row)">查看详情</el-button>
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
    <el-dialog
      :title="dialogObj.title"
      :visible.sync="dialogVisible"
      :width="dialogObj.width"
      @close="handleClose">
      <rel-partner v-if="dialogObj.diaIndex === 1" :partner-obj="diaPart" @relClose="refeFun"></rel-partner>
      <update-employee v-else-if="dialogObj.diaIndex === 2" @relClose="refeFun" :employee-obj="empObj"></update-employee>
    </el-dialog>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import FileSaver from 'file-saver'
import { getPartnerInfoList } from "@/api/partnerList";
export default {
  name: "partnerList",
  data() {
    return {
      formTest: { // 查询条件
        start: 1,
        pageSize: 10,
        phoneNo: "",
        name: "",
        isEmployee: "",
        idCode: "",
        status: "",
        sn: "",
        startTime: '',
        endTime: ''
      },
      selectedOptions: [], // 级联的对应值
      list: [], // 表格数据
      pagination: { // 分页
        total: 0,
        sizes: [100, 50, 20, 10]
      },
      timeValue: [],
      dialogVisible: false, // 弹出框是否显示
      dialogObj: { // 弹出框的属性
        width: '360px',
        title: '',
        diaIndex: -1 // 出哪个弹
      },
      diaPart: undefined,
      downloadLoading: false,
      empObj: ''
    };
  },
  components: {
    'rel-partner': () => import ('./relievePartner'),
    'update-employee': () => import ('./updateEmployee')
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 查询功能
    onSubmit() {
      this.formTest.start = 1;
      this.getData();
    },
    // 获取列表数据
    getData() {
      if (this.timeValue && this.timeValue.length > 0) {
        this.formTest.startTime = this.timeValue[0] + " 00:00:00";
        this.formTest.endTime = this.timeValue[1] + " 23:59:59";
      } else {
        this.formTest.startTime = '';
        this.formTest.endTime = '';
      }
      getPartnerInfoList(this.formTest)
        .then(res => {
          this.pagination.total = res.total;
          this.list = res.list;
        })
        .catch(err => {
          this.$message.error(err);
        });
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
    // 关闭dialog
    handleClose() {
      this.dialogObj.diaIndex = -1;
      this.dialogVisible = false;
    },
    // 解除禁用的方法
    relieve(row) {
      this.diaPart = row;
      this.dialogVisible = true;
      this.dialogObj.width = '675px';
      if (row.status === '1') {
        this.dialogObj.title = '解除禁用';
      } else {
        this.dialogObj.title = '禁用合伙人';
      }
      this.dialogObj.diaIndex = 1;
    },
    // 刷新提交后的页面
    refeFun() {
      this.dialogObj.diaIndex = -1;
      this.dialogVisible = false;
      this.getData();
    },
    // 前往详情界面
    nextDetails(row) {
      this.$router.push({path: '/partnerGM/partnerDetails', query: {...row}})
    },
    // 改变公司级联
    changeCompany(val) {
      this.formTest.sn = val[val.length - 1];
    },
     // 导出的功能
    handleDownload() {
      this.downloadLoading = true
      const defaultCellStyle = {font: {name: 'Verdana', sz: 11, color: 'FF00FF88'}, fill: {fgColor: {rgb: 'FFFFAA00'}}}
      const wopts = {bookType: 'xlsx', bookSST: false, type: 'binary', defaultCellStyle: defaultCellStyle, showGridLines: false}
      const wb = { SheetNames: ['Sheet1'], Sheets: {}, Props: {} }
      let data = []
      const formSerach = Object.assign({}, this.formTest)
      formSerach.start = 1
      formSerach.pageSize = this.pagination.total
      getPartnerInfoList(formSerach).then(res => {
        const result = res.list;
        const objArr = []
        if (result.length > 0) {
          result.forEach(ele => {
            const obj = {
                '合伙人姓名': ele.name,
                '手机号': ele.phoneNo,
                '身份证': ele.idCode,
                '邀请识别码': ele.invitationCode,
                '状态': ele.status == '0' ? '有效' : '被禁用',
                '是否员工': ele.isEmployee == '1' ? '是' : '否',
                '注册公司': this.gainCompanyName(ele.registerCompanyId),
                '所属公司': this.getCompanyName(ele.companySn),
                '上线': ele.pName ? ele.pName : '/',
                '一级粉丝数量': ele.pCount ? ele.pCount : 0,
                '二级粉丝数量': ele.gpCount ? ele.gpCount : 0,
                '累计奖励金': ele.hisAmount,
                '开启时间': ele.hisAmount
              }
              objArr.push(obj)
              this.downloadLoading = false
          })
        }
        data = objArr
        wb.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(data)
        // 创建二进制对象写入转换好的字节流
        const tmpDown = new Blob([this.s2ab(XLSX.write(wb, wopts))], { type: 'application/octet-stream' })
        FileSaver.saveAs(tmpDown, '合伙人列表.xlsx')
      });
    },
    // 编辑是否为员工
    editEmployee(row) {
      this.empObj = row;
      this.dialogObj.diaIndex = 2;
      this.dialogObj.width = '260px';
      this.dialogObj.title = '修改员工';
      this.dialogVisible = true;
      // if (row.isEmployee == 1) {
      //   row.isEmployee = 0
      // } else {
      //   row.isEmployee = 1
      // }
      // isEmployee({id: row.id, isEmployee: row.isEmployee}).then(res => {
      //   const n = this.list.findIndex(ele => {
      //     return ele.id === row.id
      //   })
      //   this.$set(this.list, n, row)
      // })
    }
  }
};
</script>

<style>
</style>