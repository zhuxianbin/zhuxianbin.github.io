<template>
  <div class="app-container">
    <!--form表单-->
    <el-form :inline="true" :model="formTest" class="demo-form-inline">
      <!-- <el-form-item label="所属公司">
        <el-cascader
          :options="company.arr"
          v-model="selectedOptions"
          filterable
          clearable
          :show-all-levels="false"
          change-on-select
          @change="changeCompany">
        </el-cascader>
      </el-form-item> -->
      <el-form-item label="订单状态">
        <el-select v-model="formTest.state" placeholder="订单状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="进行中" value="0"></el-option>
          <el-option label="已到期" value="1"></el-option>
          <el-option label="逾期中" value="2"></el-option>
          <el-option label="违约" value="3"></el-option>
          <el-option label="待支付" value="4"></el-option>
          <el-option label="待开启" value="5"></el-option>
          <el-option label="待验车" value="6"></el-option>
          <el-option label="违约结束" value="7"></el-option>
          <el-option label="已过户" value="8"></el-option>
          <el-option label="已取消" value="-1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择时间">
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
      <!-- <el-form-item label="是否有返佣对象">
        <el-select v-model="formTest.region2" placeholder="是否有返佣对象">
          <el-option label="全部" value="0"></el-option>
          <el-option label="一级返佣对象" value="1"></el-option>
          <el-option label="二级返佣对象" value="2"></el-option>
          <el-option label="既有一级又有二级" value="2"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="订单号">
        <el-input v-model="formTest.ordersDetailNo" clearable placeholder="订单号"></el-input>
      </el-form-item>
     
     <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
     </el-form-item>
    </el-form>
    <!--表格列表-->
    <el-table :data="list" border>
      <el-table-column label="订单号" prop="ordersNo" width="180"></el-table-column>
      <el-table-column label="订单类型">
        <template slot-scope="scope">
          <span>整租</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="所属公司" width="180" prop="companySn">
        <template slot-scope="scope">
          <span>{{getCompanyName(scope.row.companySn)}}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="策略名称" width="150" prop="strategyTitle">
        <template slot-scope="scope">
          <span style="color: #1591FA;cursor: pointer;" @click="popSet(scope.row)">{{scope.row.strategyTitle}}</span>
        </template>
      </el-table-column>
      <el-table-column label="签约时间" width="150" prop="beginTime">
        <template slot-scope="scope">
          <span>{{scope.row.beginTime|time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" prop="state">
        <template slot-scope="scope">
          <span v-if="scope.row.state == 0">进行中</span>
          <span v-else-if="scope.row.state == 1">已到期</span>
          <span v-else-if="scope.row.state == 2">逾期中</span>
          <span v-else-if="scope.row.state == 3">违约</span>
          <span v-else-if="scope.row.state == 4">待支付</span>
          <span v-else-if="scope.row.state == 5">待开启</span>
          <span v-else-if="scope.row.state == 6">待验车</span>
          <span v-else-if="scope.row.state == 7">违约结束</span>
          <span v-else-if="scope.row.state == 8">已过户</span>
          <span v-else-if="scope.row.state == -1">已取消</span>
        </template>
      </el-table-column>
      <el-table-column label="订单金额" prop="totalFee"></el-table-column>
      <el-table-column label="一级返佣" prop="firstRebateAmount">
        <template slot-scope="scope">
          <span>{{scope.row.firstRebateAmount ? scope.row.firstRebateAmount : 0}}元/
                {{scope.row.firstRebateStagingNum ? scope.row.firstRebateStagingNum : 1}}期
          </span>
        </template>
      </el-table-column>
      <el-table-column width="150" label="一级返佣领取人" prop="pName">
        <template slot-scope="scope">
          <span>{{scope.row.pName ? scope.row.pName : '/'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="二级返佣" prop="secondRebateAmount">
        <template slot-scope="scope">
          <span>{{scope.row.secondRebateAmount ? scope.row.secondRebateAmount : 0}}元/
                {{scope.row.secondRebateStagingNum ? scope.row.secondRebateStagingNum : 1}}期
          </span>
        </template>
      </el-table-column>
      <el-table-column width="150" label="二级返佣领取人" prop="gpName">
        <template slot-scope="scope">
          <span>{{scope.row.gpName ? scope.row.gpName : '/'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="到账状态" >
        <template slot-scope="scope">
          <el-button type="text" style="color: #1591FA" @click="viewState(scope.row)">查看</el-button>
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
    <el-dialog
      :title="dialogObj.title"
      :visible.sync="dialogVisible"
      :width="dialogObj.width"
      @close="handleClose">
      <reward-set v-if="dialogObj.diaIndex === 1" :set-data.sync="settada"></reward-set>
      <conet v-else-if="dialogObj.diaIndex === 2" :order-data.sync="orders"></conet>
    </el-dialog>
  </div>
</template>

<script>
import { getPartnerBonusDetailStagList } from "@/api/zzRewardDetails";
import { getPartnerBonusDetailList } from "@/api/cdzRewardDetails";
export default {
  name: 'cdzRewardDetails',
  data () {
    return {
      formTest: {
        start: 1,
        pageSize: 10,
        ordersDetailNo: '',
        sn: '',
        state: '',
        startTime: '',
        endTime: ''
      },
      selectedOptions: [],
      list: [],
      pagination: { // 分页
        total: 0,
        sizes: [100, 50, 20, 10]
      },
       dialogObj: {
        title: '',
        width: '360px',
        diaIndex: -1 // 出哪个弹
      },
      dialogVisible: false,
      settada: undefined,
      timeValue: []
    }
  },
  components: {
    'reward-set': () => import('./seeSet.vue'),
    'conet': () => import('./conet.vue')
  },
  mounted () {
    this.getData();
  },
   methods: {
    // 获取数据的功能
    getData() {
      if (this.timeValue && this.timeValue.length > 0) {
        this.formTest.startTime = this.timeValue[0];
        this.formTest.endTime = this.timeValue[1];
      } else {
        this.formTest.startTime = '';
        this.formTest.endTime = '';
      }
      getPartnerBonusDetailStagList(this.formTest).then(res => {
        this.pagination.total = res.total;
        this.list = res.list;
      }).catch(err => {
         this.$message.error(err);
      })
    },
    // 查询功能
    onSubmit() {
      this.formTest.start = 1;
      this.getData();
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
    // 弹出弹出框
    popSet(row) {
      this.settada = row;
      this.dialogObj.title = '长短租策略详情';
      this.dialogObj.width = '650px';
      this.dialogObj.diaIndex = 1;
      this.dialogVisible = true;
    },
    // 当弹出框关闭时
    handleClose() {
      this.dialogObj.diaIndex = -1;
      this.dialogVisible = false;
    },
    // 改变公司级联
    changeCompany(val) {
      this.formTest.sn = val[val.length - 1];
    },
    // 查看到账状态
    viewState(row) {
      const objt = {one: undefined, two: undefined, rt: undefined};
      const o = {
        ordersDetailNo: row.ordersNo
      }
      getPartnerBonusDetailList(o).then(res => {
        if (res.length > 0) {
          for (let i = 0; i < res.length; i++) {
            if (res[i].sonId) {
              objt.one = res[i]
            } else {
              objt.two = res[i]
            }
          }
        }
        objt.rt = row;
        console.log(objt.rt);
        this.orders = objt;
        this.dialogObj.title = '查看详情';
        this.dialogObj.width = '650px';
        this.dialogObj.diaIndex = 2;
        this.dialogVisible = true;
      }).catch(err => {
        this.$message.error(err);
      })
    }
  }
}
</script>