<template>
  <div>
    <el-form :model="formTest" :inline="true" label-width="120px">
      <el-form-item label="选择公司">
        <el-cascader
          :options="company.arr"
          v-model="selectedOptions"
          filterable
          :show-all-levels="false"
          clearable
          change-on-select
          @change="changeCompany">
        </el-cascader>
      </el-form-item>
      <el-form-item label="优惠券类型">
        <el-select v-model="formTest.couponsType" placeholder="优惠券类型" clearable>
          <el-option label="满减" value="mj"></el-option>
          <el-option label="折扣" value="zk"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="优惠券是否启用">
        <el-select v-model="formTest.couponsIsEnable" placeholder="优惠券是否启用" clearable>
          <el-option label="否" value="0"></el-option>
          <el-option label="是" value="1"></el-option>
        </el-select>
      </el-form-item>
       <!-- <el-form-item label="兑换类型">
        <el-select v-model="formTest.type" placeholder="兑换类型" clearable>
          <el-option label="优惠券" value="1"></el-option>
          <el-option label="余额" value="2"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="兑换是否启用">
        <el-select v-model="formTest.exchangeIsEnable" placeholder="兑换是否启用" clearable>
          <el-option label="否" value="0"></el-option>
          <el-option label="是" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关键词">
        <el-input v-model="formTest.keyName" placeholder="关键词" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">查询</el-button>
      </el-form-item>  
    </el-form>
    <!--导入导出功能-->
    <div class="xlsx-box">
      <el-button type="success" @click="openDialog(1)">导入兑换</el-button>
    </div>
    <!--表格数据-->
    <el-table :data="list" border style="margin-top: 20px">
      <el-table-column label="优惠券名称" width="150" prop="name">
        <template slot-scope="scope">
          <span class="portsn" style="color: #558FF2;cursor: pointer;" @click="openDialog1(scope.row)">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" prop="couponsType">
        <template slot-scope="scope">
          <span v-if="scope.row.couponsType == 'mj'">满减</span>
          <span v-else-if="scope.row.couponsType == 'zk'">折扣</span>
        </template>
      </el-table-column>
      <el-table-column label="面值" width="200">
        <template slot-scope="scope">
          <span v-if="scope.row.couponsType == 'mj'">满{{scope.row.fullAmount}}减{{scope.row.minusAmount}}</span>
          <span v-else-if="scope.row.couponsType == 'zk'">{{scope.row.discount*10}}折，最高抵扣{{scope.row.discountLimit}}元</span>
        </template>
      </el-table-column>
      <el-table-column label="有效期" width="240">
        <template slot-scope="scope">
          <span v-if="!scope.row.validStartTime"></span>
          <span v-else>{{scope.row.validStartTime|timeStr}} {{scope.row.useStartTime}} 至 {{scope.row.validEndTime|timeStr}} {{scope.row.useEndTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属公司" width="150" prop="company">
      </el-table-column>
      <el-table-column label="优惠券是否启用" width="110">
        <template slot-scope="scope">
          <span v-if="scope.row.couponsIsEnabled==1">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column label="兑换是否启用" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.isEnabled == 1">是</span>
          <span v-else-if="scope.row.isEnabled == 0">否</span>
        </template>
      </el-table-column>
      <el-table-column label="消耗金币" width="200">
        <template slot-scope="scope">
          <div style="width: 200px;">
            <el-input placeholder="" v-model="scope.row.bonusConsumeAmount" style="width: 130px;" :disabled="scope.row.noUse"></el-input>
            <i class="el-icon-edit" style="font-size: 16px;color: black;cursor: pointer;" v-show="scope.row.noUse" @click="editRow(scope.row)"></i>
            <i class="el-icon-success" style="font-size: 16px;color: green;cursor: pointer;" v-show="!scope.row.noUse" @click="affirmRow(scope.row)"></i>
          </div>
          <!-- <i class="el-icon-success" style="font-size: 16px;color: green"></i> -->
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="loseFun(scope.row)" v-if="scope.row.isEnabled == 1">停用</el-button>
          <el-button type="success" @click="startFun(scope.row)" v-else>启用</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
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
      :width="dialogObj.width"
      :visible.sync="dialogVisible" 
      :close-on-click-modal="false"
      @close="dialogClose">
      <coupon-desc v-if="dialogIndex == 0" :relate-id="rId"></coupon-desc>
      <in-exchange v-else-if="dialogIndex == 1" v-on:refreshList="refreshList"></in-exchange>
    </el-dialog>
  </div>
</template>

<script>
import { getBonusExchangeSetting, updateBonusExchangeSetting } from '@/api/exchangeM1'
export default {
  data () {
    return {
       formTest: {
        start: 1,
        pageSize: 10,
        company: '',
        type: '1',
        couponsType: '',
        couponsIsEnable: '',
        exchangeIsEnable: '',
        keyName: ''
      },
      selectedOptions: [],
      pagination: {
        total: 0,
        sizes: [100, 50, 20, 10]
      },
      list: [],
      dialogObj: {
        title: '',
        width: '500px'
      },
      dialogVisible: false,
      dialogIndex: -1,
      rId: ''
    }
  },
  components: {
    "coupon-desc": () => import("./couponDesc"),
    "in-exchange": () => import("./inExchange")
  },
  mounted () {
    this.getBonusExchangeSetting()
  },
  methods: {
    // 打开弹出框
    openDialog(n) {
      switch (n) {
        case 1:
          this.dialogIndex = 1
          this.dialogObj.title = '导入兑换'
          this.dialogObj.width = '1100px'
          this.dialogVisible = true
          break;
        default:
          break;
      }
    },
     openDialog1(row) {
       this.rId = row.relateId
       this.dialogIndex = 0
       this.dialogObj.title = '优惠券详情'
       this.dialogObj.width = '440px'
       this.dialogVisible = true
     },
    // 关闭弹出框
    dialogClose() {
      this.dialogVisible = false
      this.dialogIndex = -1
    },
    // 获取首页到的查询接口
    getBonusExchangeSetting() {
      getBonusExchangeSetting(this.formTest).then(res => {
        this.pagination.total = res.total
        this.list = res.list
        if (res.list.length > 0) {
          this.list.forEach(ele => {
            ele.noUse = true
          })
        }
        console.log(res);
      })
    },
    // 点击多少条
    handleSizeChange(val) {
      this.formTest.pageSize = val
      this.getBonusExchangeSetting()
    },
    // 点击当前页
    handleCurrentChange(val) {
      this.formTest.start = val
      this.getBonusExchangeSetting()
    },
    // 改变公司级联
    changeCompany(val) {
      this.formTest.company = val[val.length - 1];
    },
    // 点击查询按钮
    submit() {
      this.formTest.start = 1
      this.getBonusExchangeSetting()
    },
    // 点击编辑的效果
    editRow(row) {
      const n = this.list.findIndex(ele => {
        return ele.id === row.id
      })
      row.noUse = false
      this.$set(this.list, n, row)
    },
    // 点击确认修改按钮
    affirmRow(row) {
      const obj = {
        id: row.id,
        bonusConsumeAmount: row.bonusConsumeAmount,
        isEnabled: row.isEnabled
      }
      updateBonusExchangeSetting(obj).then(res => {
        const n = this.list.findIndex(ele => {
          return ele.id === row.id
        })
        row.noUse = true
        this.$set(this.list, n, row)
      })
    },
    // 点击停用的功能
    loseFun(row) {
      const obj = {
        id: row.id,
        bonusConsumeAmount: row.bonusConsumeAmount,
        isEnabled: 0
      }
      updateBonusExchangeSetting(obj).then(res => {
        const n = this.list.findIndex(ele => {
          return ele.id === row.id
        })
        row.isEnabled = 0
        this.$set(this.list, n, row)
      })
    },
    // 点击启用的功能
    startFun(row) {
      const obj = {
        id: row.id,
        bonusConsumeAmount: row.bonusConsumeAmount,
        isEnabled: 1
      }
      updateBonusExchangeSetting(obj).then(res => {
        const n = this.list.findIndex(ele => {
          return ele.id === row.id
        })
        row.isEnabled = 1
        this.$set(this.list, n, row)
      })
    },
    // 刷新当前页面
    refreshList() {
      this.dialogVisible = false
      this.dialogIndex = -1
      this.formTest.start = 1
      this.getBonusExchangeSetting()
    }
  }
}
</script>

<style>
.portsn {
    color: #7589AF; 
    cursor: pointer;
  }
</style>

