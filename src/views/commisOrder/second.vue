<template>
  <div class="app-container">
    <el-form :model="formTest" :inline="true">
      <el-form-item label="结算对象">
        <el-input v-model="formTest.objectName" placeholder="结算对象名字" clearable></el-input>
      </el-form-item>

      <el-form-item label="选择公司">
        <el-cascader
            :options="aresArr"
            :props="{value: 'companySn', label: 'companyName'}"
            v-model="selectedOptions"
            filterable
            :show-all-levels="false"
            clearable
            change-on-select
            @change="changeAres">
          </el-cascader>
      </el-form-item>

      <el-form-item label="选择订单状态">
        <el-select v-model="formTest.state" placeholder="选择订单状态" clearable>
          <el-option label="订单待审核" value="0"></el-option>
          <el-option label="发票待审核" value="1"></el-option>
          <el-option label="待支付" value="2"></el-option>
          <el-option label="已完成" value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="选择时间">
        <el-date-picker
          v-model="formTest.time"
          type="month"
          align="right"
          value-format="yyyy-MM">
        </el-date-picker>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="submit">查询</el-button>
      </el-form-item>

      <el-table :data="list" border>
        <el-table-column label="佣金结算单编号" prop="commissionSettlementSerialNum" width="180"></el-table-column>
        <el-table-column label="结算对象" prop="name"></el-table-column>
        <el-table-column label="结算对象类型" prop="typeName"></el-table-column>
        <el-table-column label="所属公司" prop="companyName"></el-table-column>
        <el-table-column label="佣金金额" prop="commission"></el-table-column>
        <el-table-column label="订单数量" prop="orderNum"></el-table-column>
        <el-table-column label="订单状态" prop="state">
          <template slot-scope="scope">
            <span v-if="scope.row.state == 0">订单待审核</span>
            <span v-else-if="scope.row.state == 1">发票待审核</span>
            <span v-else-if="scope.row.state == 2">待支付</span>
            <span v-else-if="scope.row.state == 3">已完成</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="seeFun(scope.row)">查看</el-button>
            <template v-if="partner.permission.authority['HHR_COMMISSION_AUDIT'].includes('HHR_ORDER_AUDIT_COPY')">
              <el-button type="text" @click="reviewFun(scope.row)" v-if="scope.row.state == 0" style="color: #6440F2">订单审核</el-button>
            </template>
            
            <template v-if="partner.permission.authority['HHR_COMMISSION_AUDIT'].includes('HHR_INVOICE_AUDIT_COPY')">
              <el-button type="text" @click="reviewFun(scope.row)" v-if="scope.row.state == 1" style="color: #DBA54F">发票审核</el-button>
            </template>
            
            <template v-if="partner.permission.authority['HHR_COMMISSION_AUDIT'].includes('HHR_FINANCIAL_PAYMENT_COPY')">
              <el-button type="text" @click="reviewFun(scope.row)" v-if="scope.row.state == 2" style="color: #5CCD42">支付确认</el-button>
            </template>
            <template v-if="partner.permission.authority['HHR_COMMISSION_AUDIT'].includes('HHR_SETTLEMENT_EXPORT_COPY')">
              <el-button type="text" style="color: #A4A814" @click="exportData(scope.row)">导出</el-button>
            </template>
            
          </template>
        </el-table-column>
      </el-table>
    </el-form>
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
    :visible.sync="dialogVisible"
    :modal-append-to-body="true"
    :close-on-click-modal="false"
    class="bgDialog"
    :width="dialogObj.width"
    @close="dialogClose">
      <!--组建部分-->
      <comm-details v-if="dialogIndex == 0" :order-details="orderDetails"></comm-details>
      <review-info v-else-if="dialogIndex == 1" :order-details="orderDetails" @refreshFun="refreshFun" @closeFun="closeFun"></review-info>
   </el-dialog>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import FileSaver from 'file-saver'
import { getCommissionSettlementOrder, getCommissionSettlementOrderDetai } from '@/api/commisOrder.js'
import { getAreaList } from "@/api/tending";
export default {
  data() {
    return {
      formTest: {
        start: 1,
        pageSize: 10,
        objectName: "",
        sn: "",
        state: "",
        time: ""
      },
      aresArr: [],
      selectedOptions: [],
      timeValue: [],
      list: [],
      pagination: {
        total: 0,
        sizes: [100, 50, 20, 10]
      },
      dialogIndex: -1,
      dialogVisible: false,
      dialogObj: {
        title: "",
        width: "600px"
      },
      orderDetails: ""
    }
  },
  components: {
    "comm-details": () => import('./details.vue'),
    "review-info": () => import('./reviewInfo.vue')
  },
  mounted () {
    this.getAreaList();
    this.firstGetCommissionSettlementOrder();
  },
  methods: {
    // 第一次进入页面的时候的渲染
    firstGetCommissionSettlementOrder() {
      if (this.partner.permission.authority['HHR_COMMISSION_AUDIT'].includes('HHR_ORDER_AUDIT_COPY')) {
        // 当有订单审核权限的时候
        this.formTest.state = "0";
      } else if (this.partner.permission.authority['HHR_COMMISSION_AUDIT'].includes('HHR_INVOICE_AUDIT_COPY')) {
        // 当有发票审核权限的时候
        this.formTest.state = "1";
      } else if (this.partner.permission.authority['HHR_COMMISSION_AUDIT'].includes('HHR_FINANCIAL_PAYMENT_COPY')) {
        // 支付确认权限的时候
        this.formTest.state = "2";
      }
      getCommissionSettlementOrder(this.formTest).then(res => {
        this.pagination.total = res.total;
        this.list = res.list;
      })
    },
    // 获取佣金结算单的数据
    getCommissionSettlementOrder() {
      getCommissionSettlementOrder(this.formTest).then(res => {
        this.pagination.total = res.total;
        this.list = res.list;
      })
    },
    // 获取所属区域的接口
    getAreaList() {
      getAreaList().then(res => {
        this.aresArr = res
      }).catch(err => {
        console.log(err);
      })
    },
    // 选择省市区的结果
    changeAres(val) {
      this.formTest.sn = val[val.length - 1];
    },
    // 改变每页条数
    handleSizeChange(val) {
      this.formTest.pageSize = val;
      this.getCommissionSettlementOrder();
    },
    // 选择当前页数
    handleCurrentChange(val) {
      this.formTest.start = val;
      this.getCommissionSettlementOrder();
    },
    // 查看的方法
    seeFun(row) {
      this.dialogObj.title = "详情";
      this.dialogObj.width = "1000px";
      this.orderDetails = row;
      this.dialogIndex = 0;
      this.dialogVisible = true;
    },
    // 订单审核
    reviewFun(row) {
      this.dialogObj.title = "订单审核";
      this.dialogObj.width = "1000px";
      this.orderDetails = row;
      this.dialogIndex = 1;
      this.dialogVisible = true;
    },
    // 查询
    submit() {
      this.formTest.start = 1;
      this.getCommissionSettlementOrder();
    },
    // 当弹出框关闭时的情况
    dialogClose() {
      this.dialogIndex = -1;
      this.dialogVisible = false;
    },
    // 刷新当前列表
    refreshFun() {
      this.dialogIndex = -1;
      this.dialogVisible = false;
      this.getCommissionSettlementOrder()
    },
    // 监听取消
    closeFun() {
      this.dialogIndex = -1;
      this.dialogVisible = false;
    },
    // 导出功能
    exportData(row) {
      const defaultCellStyle = {font: {name: 'Verdana', sz: 11, color: 'FF00FF88'}, fill: {fgColor: {rgb: 'FFFFAA00'}}}
      const wopts = {bookType: 'xlsx', bookSST: false, type: 'binary', defaultCellStyle: defaultCellStyle, showGridLines: false}
      const wb = { SheetNames: ['Sheet1'], Sheets: {}, Props: {} }
      let data = []
      const formSerach = {
        start: 1,
        pageSize: 5000,
        id: row.id
      }
      getCommissionSettlementOrderDetai(formSerach).then(res => {
        const result = res.list;
        const objArr = []
        if (result.length > 0) {
          let num = 1;
          result.forEach(ele => {
            const obj = {
                '序号': num,
                '订单编号': ele.orderNo,
                '结算对象': ele.commissionSettlementObjectName,
                '结算对象类型': ele.commissionSettlementObjectType,
                '体验店名称': ele.experienceName,
                '所属公司': ele.experienceParentName,
                '客户姓名': ele.custemerName,
                '合伙人是否有上线': ele.hasSuperior,
                '电话号码': ele.custemerPhoneNo,
                '车型': ele.carModel,
                '车牌号': ele.carNo,
                '承租时间': this.time(ele.leaseTime),
                '租赁类型': ele.leaseType,
                '租赁产品': ele.strName,
                '租金': ele.rent,
                '佣金': ele.commission
              }
              objArr.push(obj);
              num++;
          })
        }
        data = objArr
        wb.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(data)
        // 创建二进制对象写入转换好的字节流
        const tmpDown = new Blob([this.s2ab(XLSX.write(wb, wopts))], { type: 'application/octet-stream' })
        FileSaver.saveAs(tmpDown, row.name + '-佣金结算单明细.xlsx')
      });
    }
  }
}
</script>

<style>
</style>

