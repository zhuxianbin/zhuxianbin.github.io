<template>
  <div class="app-container">
    <el-form :model="formTest" :inline="true">
      <el-form-item label="结算对象：">
        <el-input v-model="formTest.name" placeholder="结算对象" clearable></el-input>
      </el-form-item>
      <el-form-item label="选择公司：">
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
      <el-form-item label="结算对象类型：">
        <el-select v-model="formTest.type" placeholder="结算对象类型" clearable>
          <el-option label="体验店" value="1"></el-option>
          <el-option label="体验中心" value="2"></el-option>
          <el-option label="加盟服务中心" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select v-model="formTest.status" placeholder="全部" clearable>
          <el-option label="有效" value="1"></el-option>
          <el-option label="无效" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">查询</el-button>
      </el-form-item>
    </el-form>
    <!--新增-->
    <div class="xlsx-box">
      <el-button type="primary" plain @click="clcikAdd" v-if="partner.permission.authority['HHR_SETTLEMENT_OBJECT'].includes('HHR_ADD_SETTLEMENT_OBJECT')">添加</el-button>
    </div>
    <el-table :data="list" border style="margin-top: 15px">
      <el-table-column label="编码" prop="code"></el-table-column>
      <el-table-column label="结算对象" prop="name"></el-table-column>
      <el-table-column label="结算对象类型" prop="typeName"></el-table-column>
      <el-table-column label="所属公司" prop="companyName"></el-table-column>
      <el-table-column label="状态" prop="statusName"></el-table-column>
      <el-table-column label="累计佣金" prop="totalCommission"></el-table-column>
      <el-table-column label="已结算佣金" prop="hasPayCommission"></el-table-column>
      <el-table-column label="未结算佣金" prop="noPayCommission"></el-table-column>
      <el-table-column label="未结算佣金单数" prop="noPayOrderNum"></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" style="color: #DBA54F" @click="clickEdit(scope.row)" v-if="partner.permission.authority['HHR_SETTLEMENT_OBJECT'].includes('HHR_UPDATE_SETTLEMENT_OBJECT')">编辑</el-button>
          <el-button type="text" @click="seeHistory(scope.row.id)">记录</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block" align="center">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formTest.start" :page-sizes="pagination.sizes" :page-size="formTest.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
      </el-pagination>
    </div>
    <!--弹出框-->
    <el-dialog
    :title="dialogObj.title" 
    class="bgDialog" 
    :width="dialogObj.width" 
    :visible.sync="dialogVisible" 
    :modal-append-to-body="true"
    :close-on-click-modal="false"
    @close="dialogClose">
      <comss-add v-if="dialogIndex == 1" @refreshFun="refreshFun" :store-obj="store" @closeFun="dialogClose"></comss-add>
      <comss-record v-if="dialogIndex == 0" :store-id="storeId"></comss-record>
    </el-dialog>
  </div>
</template>

<script>
import { selectSettlementObjectList } from "@/api/commisOrder.js";
import { getAreaList } from "@/api/tending";
export default {
  data() {
    return {
      formTest: {
        start: 1,
        pageSize: 10,
        name: "",
        type: "",
        status: "",
        companySn: ""
      },
      selectedOptions: [],
      aresArr: [],
      list: [],
      pagination: {
        total: 0,
        sizes: [100, 50, 20, 10]
      },
      dialogVisible: false,
      dialogIndex: -1,
      dialogObj: {
        title: "",
        width: ""
      },
      store: "",
      storeId: ""
    };
  },
  components: {
    "comss-add": () => import("./add.vue"),
    "comss-record": () => import("./record.vue")
  },
  mounted () {
    this.getAreaList();
    this.selectSettlementObjectList();
  },
  methods: {
    changeAres(val) {
      this.formTest.companySn = val[val.length - 1];
    },
    // 改变每页多少条
    handleSizeChange(val) {
      this.formTest.pageSize = val;
      this.selectSettlementObjectList();
    },
    // 切换当前页
    handleCurrentChange(val) {
      this.formTest.start = val;
      this.selectSettlementObjectList();
    },
    // 获取结算对象的列表
    selectSettlementObjectList() {
      selectSettlementObjectList(this.formTest).then(res => {
        this.pagination.total = res.total;
        this.list = res.list;
      });
    },
    // 获取所属区域的接口
    getAreaList() {
      getAreaList().then(res => {
        this.aresArr = res
      }).catch(err => {
        console.log(err);
      })
    },
     // 查询
    submit() {
      this.formTest.start = 1;
      this.selectSettlementObjectList();
    },
    // 关闭弹出框的功能
    dialogClose() {
      this.store = "";
      this.storeId = "";
      this.dialogIndex = -1;
      this.dialogVisible = false;
    },
    // 刷新当前列表
    refreshFun() {
      this.dialogIndex = -1;
      this.dialogVisible = false;
      this.selectSettlementObjectList()
    },
    // 点击编辑效果
    clickEdit(row) {
      this.dialogObj.title = "编辑";
      this.dialogObj.width = "1000px";
      this.dialogIndex = 1;
      this.store = row;
      this.dialogVisible = true;
    },
    // 点击添加效果
    clcikAdd() {
      this.dialogObj.title = "新增";
      this.dialogObj.width = "1000px";
      this.dialogIndex = 1;
      this.dialogVisible = true;
    },
    // 点击记录的效果
    seeHistory(id) {
      this.dialogObj.title = "操作记录";
      this.dialogObj.width = "760px";
      this.dialogIndex = 0;
      this.storeId = id;
      this.dialogVisible = true;
    }
  }
};
</script>

<style>
</style>
