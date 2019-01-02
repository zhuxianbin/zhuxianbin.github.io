<template>
  <div>
    <el-form :model="InExchange" :inline="true" label-width="120px">
      <el-form-item label="选择公司">
        <el-cascader
          :options="company.arr"
          v-model="selectedOptions1"
          filterable
          :show-all-levels="false"
          clearable
          change-on-select
          @change="changeCompany1">
        </el-cascader>
      </el-form-item>
      <el-form-item label="选择类别">
        <el-select v-model="InExchange.type" placeholder="选择类别" clearable>
          <el-option label="满减" value="mj"></el-option>
          <el-option label="折扣" value="zk"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="优惠券是否启用">
        <el-select v-model="InExchange.isEnable" placeholder="优惠券是否启用" clearable>
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关键词">
        <el-input v-model="InExchange.keyName" placeholder="关键词" clearable ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitEx">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="xlsx-box">
      <el-button type="success" @click="insertCoupon">提交</el-button>
    </div>
    <el-table 
    ref="multipleTable"
    :data="InExchangeList"
    border
    style="margin-top: 20px"
    tooltip-effect="dark"
     @selection-change="handleSelectionChange">
       <el-table-column
        type="selection"
        :selectable="SeleFun"
        width="55">
       </el-table-column>
       <el-table-column label="优惠券名称" prop="name">
         <template slot-scope="scope">
          <span class="portsn" style="color: #558FF2;cursor: pointer;" @click="openDialogch(scope.row)">{{scope.row.name}}</span>
        </template>
       </el-table-column>
       <el-table-column label="类别" prop="type">
       </el-table-column>
       <el-table-column label="面值" prop="">
         <template slot-scope="scope">
           <span v-if="scope.row.type == '满减'">满{{scope.row.fullAmount}}减{{scope.row.minusAmount}}</span>
           <span v-else-if="scope.row.type == '折扣'">{{scope.row.discount*10}}折，-{{scope.row.discountLimit}}</span>
         </template>
       </el-table-column>
       <el-table-column label="所属公司">
         <template slot-scope="scope">
           <span>{{getCompanyName(scope.row.companySn)}}</span>
         </template>
       </el-table-column>
       <el-table-column label="有效期" width="240">
         <template slot-scope="scope">
           <span v-if="!scope.row.validStartTime"></span>
           <span v-else>{{scope.row.validStartTime|timeStr}} {{scope.row.useStartTime}} 至 {{scope.row.validEndTime|timeStr}} {{scope.row.useEndTime}}</span>
         </template>
       </el-table-column>
       <el-table-column label="是否启用" prop="isEnable">
         <template slot-scope="scope">
           <span v-if="scope.row.isEnable == 1">是</span>
           <span v-else>否</span>
         </template>
       </el-table-column>
       <el-table-column label="消耗金币">
         <template slot-scope="scope">
           <el-input v-model="scope.row.bonusConsumeAmount" placeholder="请输入金额" onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')" @blur="getTags(scope.row)"></el-input>
         </template>
       </el-table-column>
    </el-table>
    <!--分页-->
    <div class="block" align="center">
      <el-pagination
        @size-change="handleSizeChangeE"
        @current-change="handleCurrentChangeE"
        :current-page="InExchange.start"
        :page-sizes="paginationE.sizes"
        :page-size="InExchange.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paginationE.total">
      </el-pagination>
    </div>
    <!--弹出框-->
    <el-dialog 
      :title="dialogObjch.title" 
      :width="dialogObjch.width"
      :visible.sync="dialogVisiblech"
      :modal="false"
      @close="dialogClosech" >
      <coupon-desc v-if="dialogIndexch == 0" :relate-id="rIdch"></coupon-desc>
    </el-dialog>
  </div>
</template>

<script>
import { getFiveCoupons, batchInsertBonusExchangeSetting } from '@/api/exchangeM1'
export default {
  data() {
    return {
      InExchange: {
        start: 1,
        pageSize: 10,
        companySn: '',
        type: '',
        isEnable: '',
        keyName: ''

      },
      InExchangeList: [],
      multipleSelection: [],
      paginationE: {
        total: 0,
        sizes: [100, 50, 20, 10]
      },
      selectedOptions1: [],
      dialogObjch: {
        title: '',
        width: '500px'
      },
      dialogVisiblech: false,
      dialogIndexch: -1,
      rIdch: ''
    }
  },
  components: {
    "coupon-desc": () => import("./couponDesc")
  },
  mounted () {
    this.getFiveCoupons()
  },
  methods: {
    // 获取五期系统的优惠券
    getFiveCoupons() {
      getFiveCoupons(this.InExchange).then(res => {
        this.paginationE.total = res.total
        this.InExchangeList = res.list
        if (res.list.length > 0) {
          this.InExchangeList.forEach(ele => {
            ele.bonusConsumeAmount = ''
          })
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 选择总条数
    handleSizeChangeE(val) {
      this.InExchange.pageSize = val
      this.getFiveCoupons()
    },
    // 选择当前页
    handleCurrentChangeE(val) {
      this.InExchange.start = val
      this.getFiveCoupons()
    },
    // 获取选择的行
    getTags(row) {
      if (row.bonusConsumeAmount == 0 || row.bonusConsumeAmount == '') {
        this.$refs.multipleTable.toggleRowSelection(row, false);
      } else {
        if (row.isEnable == 1) {
          this.$refs.multipleTable.toggleRowSelection(row, true);
        } else {
          this.$refs.multipleTable.toggleRowSelection(row, false);
        }
      }
    },
    // 提交的功能
    insertCoupon() {
      const dataArr = []
      for (let i = 0; i < this.multipleSelection.length; i++) {
        if (this.multipleSelection[i].bonusConsumeAmount == '' || this.multipleSelection[i].bonusConsumeAmount == 0) {
          this.$message({
            message: '提交的消耗金额必须是大于0',
            type: 'warning'
          });
          return false
        } else {
          const obj = {
            relateId: this.multipleSelection[i].id,
            bonusConsumeAmount: this.multipleSelection[i].bonusConsumeAmount,
            name: this.multipleSelection[i].name
          }
          dataArr.push(obj)
        }
      }
      if (dataArr.length <= 0) {
        this.$message({
            message: '提交的数据不能为空',
            type: 'warning'
        });
        return false
      }
      batchInsertBonusExchangeSetting({bonusExchangeSettingListVO: JSON.stringify(dataArr)}).then(res => {
        this.$emit("refreshList")
      })
    },
    // 选择公司后的效果
    changeCompany1(val) {
      this.InExchange.companySn = val[val.length - 1];
    },
    // 点击查询的功能
    submitEx() {
      this.InExchange.start = 1
      this.getFiveCoupons()
    },
    // 判断哪些可以选择
    SeleFun(row, index) {
      if (row.isEnable == 1) {
        return true
      } else {
        return false
      }
    },
    //
    openDialogch(row) {
       this.rIdch = row.id
       this.dialogIndexch = 0
       this.dialogObjch.title = '优惠券详情'
       this.dialogObjch.width = '440px'
       this.dialogVisiblech = true
    },
    // 关闭弹出框
    dialogClosech() {
      this.dialogVisiblech = false
      this.dialogIndexch = -1
    }
  }
}
</script>

<style>
</style>

