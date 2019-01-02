<template>
  <div class="app-container">
    <div class="income-d1">
      <div class="td1">
        <span>历史累计奖励金</span>
        <span>{{partner.details.hisAmount}}</span>
      </div>
      <div class="td2">
        <span>预计到账</span>
        <span>{{partner.details.notArrivedAmount}}</span>
      </div>
      <div class="td2" style="background-color: #EC8870; margin-left: 20px;">
        <span>当前余额</span>
        <span>{{partner.details.arrivalAmount}}</span>
      </div>
      <div style="clear:both"></div>
    </div>
    <!--已到账-->
    <el-tabs v-model="activeName2" type="card" style="margin-top: 30px;">
      <el-tab-pane label="已到账" name="first">
        <el-form :model="formTestY" :inline="true">
          <el-form-item label="来源类别">
            <el-select v-model="formTestY.sourceType" placeholder="来源类别" clearable>
              <el-option label="订单返佣" value="0"></el-option>
              <el-option label="其他" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="到账时间">
            <el-date-picker
              v-model="timeValueY"
              type="daterange"
              range-separator="至"
              clearable
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitY">查询</el-button>
          </el-form-item>
        </el-form>

        <el-table :data="listY" border>
          <el-table-column label="奖励金" prop="amount"></el-table-column>
          <el-table-column label="到账时间" prop="arrivalTime">
            <template slot-scope="scope">
              <span>{{scope.row.arrivalTime|time}}</span>
            </template>
          </el-table-column>
          <el-table-column label="来源类别" prop="sonId">
            <template slot-scope="scope">
              <span v-if="scope.row.sourceType == 0">订单返佣</span>
              <span v-else-if="scope.row.sourceType == 1">其他</span>
            </template>
          </el-table-column>
          <el-table-column label="来源" prop="source"></el-table-column>
        </el-table>
        <div class="block" align="center">
          <el-pagination
            @size-change="handleSizeChangeY"
            @current-change="handleCurrentChangeY"
            :current-page="formTestY.start"
            :page-sizes="paginationY.sizes"
            :page-size="formTestY.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="paginationY.total">
          </el-pagination>
          </div>
      </el-tab-pane>
      <!--即将到账-->
      <el-tab-pane label="即将到账" name="second">
        <el-form :model="formTestN" :inline="true">
          <el-form-item label="来源类别">
            <el-select v-model="formTestN.sourceType" placeholder="来源类别" clearable>
             <el-option label="订单返佣" value="0"></el-option>
             <el-option label="其他" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="预计到账时间">
            <el-date-picker
              v-model="timeValueN"
              type="daterange"
              range-separator="至"
              clearable
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitN">查询</el-button>
          </el-form-item>
        </el-form>

        <el-table :data="listN" border>
          <el-table-column label="奖励金" prop="amount">
            <template slot-scope="scope">
              <span>{{scope.row.amount}}</span>
              <el-tag type="warning" v-if="scope.row.status == 2">取消发放</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="预计到账时间" prop="rebateTime">
            <template slot-scope="scope">
              <span>{{scope.row.rebateTime|time}}</span>
            </template>
          </el-table-column>
          <el-table-column label="来源类别">
            <template slot-scope="scope">
              <span v-if="scope.row.sourceType == 0">订单返佣</span>
              <span v-else-if="scope.row.sourceType == 1">其他</span>
            </template>
          </el-table-column>
          <el-table-column label="来源" prop="source">
          </el-table-column>
        </el-table>
        <div class="block" align="center">
          <el-pagination
            @size-change="handleSizeChangeN"
            @current-change="handleCurrentChangeN"
            :current-page="formTestN.start"
            :page-sizes="paginationN.sizes"
            :page-size="formTestN.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="paginationN.total">
          </el-pagination>
          </div>
      </el-tab-pane>
      <!--兑换记录-->
      <el-tab-pane label="兑换记录" name="third">
        <el-form :model="formTestG" :inline="true">
          <el-form-item label="兑换类型">
            <el-select v-model="formTestG.type" placeholder="兑换类型" clearable>
              <el-option label="优惠券" value="1"></el-option>
              <el-option label="余额" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="兑换时间">
            <el-date-picker
              v-model="timeValueG"
              type="daterange"
              range-separator="至"
              clearable
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitG">查询</el-button>
          </el-form-item>
        </el-form>

        <el-table :data="listG" border>
          <el-table-column label="兑换" prop="exchangeName">
          </el-table-column>
          <el-table-column label="类型" prop="type">
            <template slot-scope="scope">
              <span v-if="scope.row.type == 1">优惠券</span>
              <span v-else-if="scope.row.type == 2">余额</span>
            </template>
          </el-table-column>
          <el-table-column label="消耗" prop="bonusNum">
          </el-table-column>
          <el-table-column label="兑换时间">
            <template slot-scope="scope">
              <span>{{scope.row.createTime|time}}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" align="center">
          <el-pagination
            @size-change="handleSizeChangeG"
            @current-change="handleCurrentChangeG"
            :current-page="formTestG.start"
            :page-sizes="paginationG.sizes"
            :page-size="formTestG.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="paginationG.total">
          </el-pagination>
          </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getArrivedIncomeDetails, getNotArrivedIncomeDetails, getExchangeRecord } from "@/api/details";
export default {
  data() {
    return {
      activeName2: 'first',
      formTestY: {
        start: 1,
        sourceType: '',
        pageSize: 10,
        subId: '',
        startTime: '',
        endTime: ''
      },
      paginationY: { // 分页
        total: 0,
        sizes: [100, 50, 20, 10]
      },
      formTestN: {
        start: 1,
        pageSize: 10,
        subId: '',
        sourceType: '',
        startTime: '',
        endTime: ''
      },
      paginationN: { // 分页
        total: 0,
        sizes: [100, 50, 20, 10]
      },
      formTestG: {
        start: 1,
        pageSize: 10,
        subId: '',
        type: '',
        startTime: '',
        endTime: ''
      },
      paginationG: { // 分页
        total: 0,
        sizes: [100, 50, 20, 10]
      },
      timeValueY: [],
      timeValueN: [],
      timeValueG: [],
      listY: [],
      listN: [],
      listG: []
    }
  },
  mounted () {
    this.getListY()
    this.getListN()
    this.getExchangeRecord()
  },
  methods: {
    // 获取已到账的列表
    getListY() {
      this.formTestY.subId = this.partner.details.subId;
      // this.formTestY.subId = '4028812a63fefcff0164014acb5e0572'
      if (this.timeValueY && this.timeValueY.length > 0) {
        this.formTestY.startTime = this.timeValueY[0];
        this.formTestY.endTime = this.timeValueY[1];
      } else {
        this.formTestY.startTime = '';
        this.formTestY.endTime = '';
      }
      getArrivedIncomeDetails(this.formTestY).then(res => {
        this.paginationY.total = res.total
        this.listY = res.list
      }).catch(err => {
        this.$message.error(err);
      })
    },
    // 获取未到账的列表
    getListN() {
      this.formTestN.subId = this.partner.details.subId;
      if (this.timeValueN && this.timeValueN.length > 0) {
        this.formTestN.startTime = this.timeValueN[0];
        this.formTestN.endTime = this.timeValueN[1];
      } else {
        this.formTestN.startTime = '';
        this.formTestN.endTime = '';
      }
      // this.formTestN.subId = '4028812a63fefcff0164014acb5e0572'
      getNotArrivedIncomeDetails(this.formTestN).then(res => {
        this.paginationN.total = res.total
        this.listN = res.list
      }).catch(err => {
        this.$message.error(err);
      })
    },
    // 获取兑换记录
    getExchangeRecord() {
      this.formTestG.subId = this.partner.details.subId;
      if (this.timeValueG && this.timeValueG.length > 0) {
        this.formTestG.startTime = this.timeValueG[0];
        this.formTestG.endTime = this.timeValueG[1];
      } else {
        this.formTestG.startTime = '';
        this.formTestG.endTime = '';
      }
      getExchangeRecord(this.formTestG).then(res => {
        this.paginationG.total = res.total
        this.listG = res.list
      })
    },
    // 已到账每页多少条
    handleSizeChangeY(val) {
      this.formTestY.pageSize = val;
      this.getListY()
    },
    // 已到账当前第几页
    handleCurrentChangeY(val) {
      this.formTestY.start = val;
      this.getListY()
    },
    // 已到账每页多少条
    handleSizeChangeN(val) {
      this.formTestN.pageSize = val;
      this.getListN()
    },
    // 已到账当前第几页
    handleCurrentChangeN(val) {
      this.formTestN.start = val;
      this.getListN()
    },
    // 已到账每页多少条
    handleSizeChangeG(val) {
      this.formTestgG.pageSize = val;
      this.getExchangeRecord()
    },
    // 已到账当前第几页
    handleCurrentChangeG(val) {
      this.formTestG.start = val;
      this.getExchangeRecord()
    },
    // 已到账的查询
    onSubmitY() {
      this.formTestY.start = 1
      this.getListY()
    },
    // 即将到账的查询
    onSubmitN() {
      this.formTestN.start = 1
      this.getListN()
    },
    // 兑换记录的查询
    onSubmitG() {
      this.formTestG.start = 1;
      this.getExchangeRecord()
    }

  }
}
</script>

<style>
  .income-d1 {
    border-bottom: 1px dotted #ccc;
  }
  .income-d1 .td1{
    width: 150px;
    padding: 15px;
    border-right: 1px solid #ccc;
    float: left;
  }
  .income-d1 .td1 span{
    display: block;
  }
  .income-d1 .td1 :nth-child(1) {
    text-align: center;
    font-size: 13px;
  }
  .income-d1 .td1 :nth-child(2) {
    font-size: 40px;
    margin-top: 16px;
    font-weight: 600;
  }
  .income-d1 .td2 {
    float: left;
    width: 150px;
    background-color: #8D7AE8;
    padding: 17px 20px;
    margin-top: 12px;
    margin-left: 40px;
  }
  .income-d1 .td2 :nth-child(1) {
    font-size: 13px;
    color: #fff;
    display: block;
  }
  .income-d1 .td2 :nth-child(2) {
    font-size: 22px;
    color: #fff;
    display: block;
    font-weight: 600;
    margin-top: 10px;
  }
</style>

