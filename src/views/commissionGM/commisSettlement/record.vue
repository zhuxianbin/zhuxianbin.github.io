<template>
  <div>
    <el-table :data="list" border>
      <el-table-column label="操作人" prop="operatorName"></el-table-column>
      <el-table-column label="操作时间" prop="operateDate">
        <template slot-scope="scope">
          <span>{{scope.row.operateDate|time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作类型" prop="operateRemark">
        <template slot-scope="scope">
          <span v-if="scope.row.operateRemark == 'update'">编辑</span>
          <span v-else>添加</span>
        </template>
      </el-table-column>
      <el-table-column label="操作内容" prop="operateContent"></el-table-column>
    </el-table>

    <div class="block" align="center">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formTest.start" :page-sizes="pagination.sizes" :page-size="formTest.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { selectOperateLogList } from "@/api/commisOrder.js";
export default {
  props: ["storeId"],
  data() {
    return {
      formTest: {
        id: "",
        start: 1,
        pageSize: 10
      },
      list: [],
      pagination: {
        total: 0,
        sizes: [100, 50, 20, 10]
      }
    };
  },
  mounted () {
    this.selectOperateLogList()
  },
  methods: {
    selectOperateLogList() {
      this.formTest.id = this.storeId;
      selectOperateLogList(this.formTest).then(res => {
        this.pagination.total = res.total;
        this.list = res.list;
      })
    },
     // 改变每页多少条
    handleSizeChange(val) {
      this.formTest.pageSize = val;
      this.selectOperateLogList();
    },
    // 切换当前页
    handleCurrentChange(val) {
      this.formTest.start = val;
      this.selectOperateLogList();
    }
  }
};
</script>

<style>
</style>

