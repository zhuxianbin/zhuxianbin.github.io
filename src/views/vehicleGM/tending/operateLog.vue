<template>
  <div>
    <el-table :data="tabelLog" border>
      <el-table-column label="操作人" width="120" prop="operatorName">
      </el-table-column>
      <el-table-column label="操作时间" prop="operateDate">
        <template slot-scope="scope">
          <span>{{scope.row.operateDate|time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作内容" prop="operateContent"></el-table-column>
    </el-table>

    <!--分页-->
      <div class="block" align="center">
        <el-pagination
          @size-change="handleSizeChange1"
          @current-change="handleCurrentChange1"
          :current-page="formLog.start"
          :page-sizes="pagination1.sizes"
          :page-size="formLog.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination1.total">
        </el-pagination>
      </div>
  </div>
</template>

<script>
import { getOperateLogList } from "@/api/tending";
export default {
  props: ["dataRow"],
  data () {
    return {
      tabelLog: [],
      formLog: {
        start: 1,
        pageSize: 10,
        carNo: ''
      },
      pagination1: {
        total: 0,
        sizes: [100, 50, 20, 10]
      }
    }
  },
  mounted () {
    this.getOperateLogList()
  },
  methods: {
    // 获取操作记录的接口
    getOperateLogList() {
      this.formLog.carNo = this.dataRow.carNo
      getOperateLogList(this.formLog).then(res => {
        this.tabelLog = res.list
        this.pagination1.total = res.recordTotal
      }).catch(err => {
        console.log(err);
      })
    },
    // 改变显示的页数
    handleSizeChange1(val) {
      this.formLog.pageSize = val
      this.getOperateLogList()
    },
    // 当前的第几页
    handleCurrentChange1(val) {
      this.formLog.start = val
      this.getOperateLogList()
    }
  }
}
</script>

<style>
</style>

