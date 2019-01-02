<template>
  <div class="app-container">
     <!--form表单-->
    <el-form :inline="true" :model="formTest" class="demo-form-inline">
      <el-form-item label="是否启用">
        <el-select v-model="formTest.isEnable" clearable placeholder="是否启用">
          <el-option label="否" value="0"></el-option>
          <el-option label="是" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任务奖励">
        <el-select v-model="formTest.bonusType" clearable placeholder="任务奖励">
          <el-option label="金币" value="1"></el-option>
          <el-option label="优惠券" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关键词">
        <el-input v-model="formTest.keyName" clearable></el-input>
      </el-form-item>  
     <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
     </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" @click="relieve(null, 1)">添加分享任务</el-button>
    </div>
    <!--表格列表-->
    <el-table :data="list" border style="margin-top: 20px;">
      <el-table-column label="任务规则" prop="shareType">
        <template slot-scope="scope">
          <span>分享</span>
        </template>
      </el-table-column>
      <el-table-column label="任务编号" prop="shareNo">
      </el-table-column>
      <el-table-column label="任务名称" prop="shareName"></el-table-column>
      <el-table-column label="是否启用" prop="isEnable">
        <template slot-scope="scope">
          <span v-if="scope.row.isEnable == 1">启用</span>
          <span v-else>未启用</span>
        </template>
      </el-table-column>
      <el-table-column label="任务奖励" prop="isEnable">
        <template slot-scope="scope">
          <span v-if="scope.row.shareBonusType == 1">金币</span>
          <span v-else-if="scope.row.shareBonusType == 2">优惠券</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" style="color: #E6A23C" @click="relieve(scope.row, 1)">编辑</el-button>
          <el-button v-if="scope.row.isEnable == 0" type="text" @click="operFun(scope.row, 1)" style="color: #65B686">启用</el-button>
          <el-button v-else-if="scope.row.isEnable == 1" type="text" @click="operFun(scope.row, 0)" style="color: #CA2A1C">停用</el-button>
          <!-- <el-button type="text">记录</el-button> -->
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
    <!--弹出框-->
    <!-- <el-dialog
      :title="dialogObj.title"
      :visible.sync="dialogVisible"
      :width="dialogObj.width"
      @close="handleClose">
      <share-set v-if="dialogObj.diaIndex === 1" :share-data="shareData" @relClose="refeFun"></share-set>
    </el-dialog> -->
  </div>
</template>

<script>
import { getShareConfigInfo, shareConfigIsEnable } from "@/api/shareSet";
export default {
  data() {
    return {
      formTest: {
        start: 1,
        pageSize: 10,
        bonusType: '',
        isEnable: '',
        keyName: ''
      },
      list: [],
      pagination: {
        total: 0,
        sizes: [10, 20, 50, 100]
      },
      dialogVisible: false,
      dialogObj: {
        title: '',
        width: '400px',
        diaIndex: -1 // 出哪个弹
      },
      shareData: undefined
    }
  },
  components: {
    
  },
  mounted () {
    this.getData();
  },
  methods: {
    // 查询功能
    onSubmit() {
      this.formTest.start = 1;
      this.getData();
    },
    // 获取数据
    getData() {
      getShareConfigInfo(this.formTest).then(res => {
        this.pagination.total = res.total;
        this.list = res.list;
      }).catch(err => {
        this.$message.error(err);
      })
    },
    // 每页多少条
    handleSizeChange(val) {
      this.formTest.pageSize = val;
      this.getData()
    },
    // 当前第几页
    handleCurrentChange(val) {
      this.formTest.start = val;
      this.getData()
    },
    // 关闭dialog
    handleClose() {
      this.dialogObj.diaIndex = -1;
      this.dialogVisible = false;
    },
    // 跳转到编辑界面
    relieve(row, n) {
      switch (n) {
        case 1:
          let obj;
          if (row) {
            obj = {id: row.id}
          } else {
            obj = {id: ''}
          }
          this.$router.push({path: '/partnerGM/updateShare', query: obj})
          break;
        default:
          break;
      }
    },
    // 刷新提交后的页面
    refeFun() {
      this.dialogObj.diaIndex = -1;
      this.dialogVisible = false;
      this.getData();
    },
    // 操作的方法
    operFun(row, n) {
      shareConfigIsEnable({configId: row.id, isEnable: n}).then(res => {
        this.getData()
      })
    }
  }
}
</script>

<style>
</style>

