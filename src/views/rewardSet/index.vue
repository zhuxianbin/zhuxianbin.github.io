<template>
  <div class="app-container">
    <!--form表单-->
    <el-form :inline="true" :model="formTest" class="demo-form-inline">
      <el-form-item label="所属公司">
        <el-cascader :options="company.arr" v-model="selectedOptions" filterable :show-all-levels="false" clearable change-on-select @change="changeCompany">
        </el-cascader>
      </el-form-item>
      <el-form-item label="业务类型">
        <el-select v-model="region" placeholder="业务类型" @change="switchType">
          <el-option label="整租" value="1"></el-option>
          <el-option label="长短租" value="2"></el-option>
          <!-- <el-option label="时租" value="3"></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item label="产品类型">
        <el-select v-model="formTest.prodType" clearable placeholder="产品类型">
          <el-option label="全部" value=""></el-option>
          <el-option label="标准产品" value="1"></el-option>
          <el-option label="促销产品" value="2"></el-option>
          <el-option label="体验产品" value="3"></el-option>
          <el-option label="免费产品" value="4"></el-option>
          <el-option label="特殊产品" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formTest.state" clearable placeholder="状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="不启用" value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!--整租表格列表-->
    <el-table v-show="region == '1'" :data="list" border>
      <el-table-column label="所属公司" width="180" prop="companySn">
        <template slot-scope="scope">
          <span>{{getCompanyName(scope.row.companySn)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="业务类型">
        <template slot-scope="scope">
          <span>整租</span>
        </template>
      </el-table-column>
      <el-table-column label="产品类型" prop="prodType">
        <template slot-scope="scope">
          <span v-if="scope.row.prodType == 1">标准产品</span>
          <span v-else-if="scope.row.prodType == 2">促销产品</span>
          <span v-else-if="scope.row.prodType == 3">体验产品</span>
          <span v-else-if="scope.row.prodType == 4">免费产品</span>
          <span v-else-if="scope.row.prodType == 5">特殊产品</span>
        </template>
      </el-table-column>
      <el-table-column label="策略名称" prop="strName">
      </el-table-column>
      <el-table-column label="策略状态" prop="state">
        <template slot-scope="scope">
          <span>{{scope.row.state == 1 ? '启用' : '未启用'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="一级返佣（奖励金）" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.firstRebateAmount ? scope.row.firstRebateAmount : 0}}元/
            {{scope.row.firstRebateStagingNum ? scope.row.firstRebateStagingNum : 1}}期
          </span>
        </template>
      </el-table-column>
      <el-table-column label="二级返佣（奖励金）" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.secondRebateAmount ? scope.row.secondRebateAmount : 0}}元/
            {{scope.row.secondRebateStagingNum ? scope.row.secondRebateStagingNum : 1}}期
          </span>
        </template>
      </el-table-column>
      <el-table-column label="体验店(非推荐)返佣(元)" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.nonPartnerRecommendedCommission ? scope.row.nonPartnerRecommendedCommission : 0}}元/{{scope.row.nonPartnerRebateStagingNum ? scope.row.nonPartnerRebateStagingNum : 1}}期</span>
        </template>
      </el-table-column>
      <el-table-column label="体验店(推荐)返佣(元)" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.partnerRecommendedCommission ? scope.row.partnerRecommendedCommission : 0}}元/{{scope.row.partnerRebateStagingNum ? scope.row.partnerRebateStagingNum : 1}}期</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" style="color: #E6A23C" @click="openDialog(scope.row)">编辑</el-button>
          <el-button type="text" @click="getRecord(scope.row)">记录</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--长短租表格列表-->
    <el-table v-show="region == '2'" :data="list" border>
      <!-- <el-table-column label="所属公司" width="180">
        <template slot-scope="scope">
          <span>{{getCompanyName(scope.row.companySn)}}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="业务类型">
        <template slot-scope="scope">
          <span>长短租</span>
        </template>
      </el-table-column>
      <el-table-column label="产品类型" prop="prodType">
        <template slot-scope="scope">
          <span v-if="scope.row.prodType == 1">标准产品</span>
          <span v-else-if="scope.row.prodType == 2">促销产品</span>
          <span v-else-if="scope.row.prodType == 3">体验产品</span>
          <span v-else-if="scope.row.prodType == 4">免费产品</span>
          <span v-else-if="scope.row.prodType == 5">特殊产品</span>
        </template>
      </el-table-column>
      <el-table-column label="策略名称" prop="showName">
      </el-table-column>
      <el-table-column label="策略状态" prop="isUsed">
        <template slot-scope="scope">
          <span>{{scope.row.isUsed == 1 ? '启用' : '未启用'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="一级返佣（奖励金）" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.firstRebateAmount ? scope.row.firstRebateAmount : 0}}元/
            {{scope.row.firstRebateStagingNum ? scope.row.firstRebateStagingNum : 1}}期
          </span>
        </template>
      </el-table-column>
      <el-table-column label="二级返佣（奖励金）" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.secondRebateAmount ? scope.row.secondRebateAmount : 0}}元/
            {{scope.row.secondRebateStagingNum ? scope.row.secondRebateStagingNum : 1}}期
          </span>
        </template>
      </el-table-column>
      <el-table-column label="体验店(非推荐)返佣(元)" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.nonPartnerRecommendedCommission ? scope.row.nonPartnerRecommendedCommission : 0}}元/{{scope.row.nonPartnerRebateStagingNum ? scope.row.nonPartnerRebateStagingNum : 1}}期</span>
        </template>
      </el-table-column>
      <el-table-column label="体验店(推荐)返佣(元)" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.partnerRecommendedCommission ? scope.row.partnerRecommendedCommission : 0}}元/{{scope.row.partnerRebateStagingNum ? scope.row.partnerRebateStagingNum : 1}}期</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" style="color: #E6A23C" @click="openDialog(scope.row)">编辑</el-button>
          <el-button type="text" @click="getRecord(scope.row)">记录</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="block" align="center">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formTest.start" :page-sizes="pagination.sizes" :page-size="formTest.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
      </el-pagination>
    </div>
    <!--弹出框-->
    <el-dialog :title="dialogObj.title" :visible.sync="dialogVisible" :width="dialogObj.width" @close="handleClose">
      <re-set v-if="dialogObj.diaIndex === 1" :set-data.sync="setData" @relClose="refeFun"></re-set>
      <re-record v-else-if="dialogObj.diaIndex === 2" :operateId="operateId"></re-record>
    </el-dialog>
  </div>
</template>

<script>
import { getStrategyBaseList, getStrategyBaseLongList } from "@/api/rewardSet";
export default {
  name: "rewardSet",
  data() {
    return {
      formTest: {
        start: 1,
        pageSize: 10,
        sn: "",
        companySn: "",
        state: "",
        prodType: ""
      },
      selectedOptions: [],
      region: "1", // 业务类型
      list: [], // 整租
      pagination: {
        // 分页
        total: 0,
        sizes: [10, 20, 50, 100]
      },
      dialogVisible: false,
      dialogObj: {
        width: "360px",
        title: "",
        diaIndex: -1 // 出哪个弹
      },
      setData: undefined,
      operateId: ""
    };
  },
  components: {
    "re-set": () => import("./set"),
    "re-record": () => import("./record")
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 获取数据的列表
    getData() {
      if (this.region === "1") {
        getStrategyBaseList(this.formTest)
          .then(res => {
            this.pagination.total = res.total;
            this.list = res.list;
          })
          .catch(err => {
            this.$message.error(err);
          });
      } else if (this.region === "2") {
        getStrategyBaseLongList(this.formTest)
          .then(res => {
            this.pagination.total = res.total;
            this.list = res.list;
          })
          .catch(err => {
            this.$message.error(err);
          });
      }
    },
    // 查询的功能
    onSubmit() {
      this.formTest.start = 1;
      this.getData();
    },
    // 切换状态的方法
    switchType() {
      this.formTest.start = 1;
      this.formTest.pageSize = 10;
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
    // 打开弹出框
    openDialog(row) {
      let titleStr = "";
      if (row.pId) {
        row.ytype = "2"; // 代表修改
      } else {
        row.ytype = "1"; // 代表新增
      }
      // orderType[0:长短租,1:整租]
      // region[1:代表整租, 2:代表长短租]
      if (this.region == "1") {
        row.orderType = "1";
        titleStr = row.strName;
        row.testId = row.idCode;
      } else {
        row.orderType = "0";
        titleStr = row.showName;
        row.testId = row.id;
      }
      this.setData = row;
      this.dialogObj.diaIndex = 1;
      this.dialogObj.title = titleStr + " 佣金设置";
      this.dialogObj.width = "650px";
      this.dialogVisible = true;
    },
    // 弹出框关闭的效果
    handleClose() {
      this.dialogObj.diaIndex = -1;
      this.dialogVisible = false;
    },
    // 关闭的效果
    refeFun() {
      this.dialogObj.diaIndex = -1;
      this.dialogVisible = false;
      this.getData();
    },
    // 改变公司级联
    changeCompany(val) {
      this.formTest.sn = val[val.length - 1];
    },
    // 点击记录
    getRecord(row) {
      this.operateId = row.pId;
      this.dialogObj.diaIndex = 2;
      this.dialogObj.title = "操作记录";
      this.dialogObj.width = "750px";
      this.dialogVisible = true;
    }
  }
};
</script>