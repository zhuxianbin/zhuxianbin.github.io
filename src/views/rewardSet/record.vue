<template>
  <div>
    <el-table :data="recordList" border>
      <el-table-column label="操作人" prop="operatorName">
      </el-table-column>
      <el-table-column label="操作类型" prop="operateRemark">
        <template slot-scope="scope">
          <span v-if="scope.row.operateRemark == 'update'">编辑</span>
          <span v-else>新增</span>
        </template>
      </el-table-column>
      <el-table-column label="操作时间" prop="operateDate">
        <template slot-scope="scope">
          <span>{{scope.row.operateDate|time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作内容" prop="operateContent" width="300">
      </el-table-column>
    </el-table>

    <!--分页-->
    <div class="block" align="center">
      <el-pagination
        @size-change="handleSizeChangeR"
        @current-change="handleCurrentChangeR"
        :current-page="formTestR.start"
        :page-sizes="paginationR.sizes"
        :page-size="formTestR.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paginationR.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getOperateLogList } from "@/api/rewardSet";
export default {
  props: ["operateId"],
  data() {
    return {
      formTestR: {
        start: 1,
        pageSize: 10,
        id: ""
      },
      recordList: [],
      paginationR: {
        total: 0,
        sizes: [10, 20, 50, 100]
      }
    }
  },
  mounted () {
    this.getOperateLogList();
  },
  methods: {
    // 获取操作记录
    getOperateLogList() {
      this.formTestR.id = this.operateId;
      getOperateLogList(this.formTestR).then(res => {
        this.paginationR.total = res.total;
        this.recordList = res.list;
      })
    },
    // 选择每页多少条
    handleSizeChangeR(val) {
      this.formTestR.pageSize = val;
      this.getOperateLogList();
    },
    // 选择第几页
    handleCurrentChangeR(val) {
      this.formTestR.start = val;
      this.getOperateLogList();
    }
  }
}
</script>

<style>

</style>
