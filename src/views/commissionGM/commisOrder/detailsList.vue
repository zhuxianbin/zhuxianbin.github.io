<template>
  <div>
    <el-table :data="detailsList" border>
      <el-table-column label="订单编号" prop="orderNo"></el-table-column>
      <el-table-column label="结算对象" prop="commissionSettlementObjectName"></el-table-column>
      <el-table-column label="结算对象类型" width="120" prop="commissionSettlementObjectType"></el-table-column>
      <el-table-column label="体验店名称" width="120" prop="experienceName"></el-table-column>
      <el-table-column label="所属公司" prop="experienceParentName"></el-table-column>
      <el-table-column label="客户姓名" prop="custemerName"></el-table-column>
      <el-table-column label="合伙人是否有上线" prop="hasSuperior"></el-table-column>
      <el-table-column label="电话号码" prop="custemerPhoneNo"></el-table-column>
      <el-table-column label="车型" prop="carModel"></el-table-column>
      <el-table-column label="车牌号" prop="carNo"></el-table-column>
      <el-table-column label="承租时间">
        <template slot-scope="scope">
          <span>{{scope.row.leaseTime|time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="租赁类型" prop="leaseType"></el-table-column>
      <el-table-column label="租赁产品" prop="strName"></el-table-column>
      <el-table-column label="租金" prop="rent"></el-table-column>
      <el-table-column label="佣金" prop="commission"></el-table-column>
    </el-table>

    <!--分页-->
   <div class="block" align="center">
      <el-pagination
        @size-change="handleSizeChangedd"
        @current-change="handleCurrentChangedd"
        :current-page="formTestdd.start"
        :page-sizes="paginationdd.sizes"
        :page-size="formTestdd.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paginationdd.total">
      </el-pagination>
   </div>
  </div>
</template>

<script>
import { getCommissionSettlementOrderDetai } from '@/api/commisOrder.js'
export default {
  props: ["orderDetails"],
  data() {
    return {
      formTestdd: {
        start: 1,
        pageSize: 10,
        id: ""
      },
      detailsList: [],
      paginationdd: {
        total: 0,
        sizes: [100, 50, 20, 10]
      }
    }
  },
  mounted () {
    this.getCommissionSettlementOrderDetai();
  },
  methods: {
    // 改变当前页条数
    handleSizeChangedd(val) {
      this.formTestdd.pageSize = val;
      this.getCommissionSettlementOrderDetai();
    },
    // 选择第几页
    handleCurrentChangedd(val) {
      this.formTestdd.start = val;
      this.getCommissionSettlementOrderDetai();
    },
    // 获取详情列表
    getCommissionSettlementOrderDetai() {
      this.formTestdd.id = this.orderDetails.id;
      getCommissionSettlementOrderDetai(this.formTestdd).then(res => {
        this.paginationdd.total = res.total;
        this.detailsList = res.list;
        let n = 1;
        this.detailsList.forEach(ele => {
          ele.xx = n;
          n++;
        })
      })
    }
  }
}
</script>

<style>
</style>

