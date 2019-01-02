<template>
  <div>
    <!--标题1-->
    <div class="base-title">
      <span class="s1">基本信息</span>
      <span class="s2"></span>
      <div style="clear:both"></div>
    </div>
    <!---->
    <el-form :model="formDetails" label-width="120px">
      <el-row>
        <el-col :span="10">
          <el-form-item label="结算对象：">
            <el-input v-model="formDetails.experienceName" disabled placeholder="结算对象"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="法人姓名：">
            <el-input v-model="formDetails.legalPerson" disabled placeholder="法人姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="法人电话：">
            <el-input v-model="formDetails.legalPersonTelephone" disabled placeholder="法人电话"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="开户行：">
            <el-input v-model="formDetails.accountOpenBank" disabled placeholder="开户行"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="对公账号：">
            <el-input v-model="formDetails.publicAccount" disabled placeholder="对公账号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="佣金金额：">
            <el-input v-model="formDetails.commission" disabled placeholder="佣金金额"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="订单数量：">
            <el-col :span="15">
              <el-input v-model="formDetails.orderNum" disabled placeholder="订单数量"></el-input>
            </el-col>
            <el-col :span="4" :offset="1">
              <el-button @click="clickDetails">查看详情</el-button>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--标题1-->
    <div class="base-title">
      <span class="s1">审核信息</span>
      <span class="s2"></span>
      <div style="clear:both"></div>
    </div>
    <!---->
    <template v-if="auditFlowList.length > 0">
      <div class="comm-details" v-for="item in auditFlowList" :key="item.id">

        <el-form :model="item" label-width="120px">
          <el-row>
            <el-col :span="10">
              <el-form-item :label="item.flowName + '：'">
                <el-input v-if="item.auditStatus == 1" value="审核通过" disabled placeholder="订单审核"></el-input>
                <el-input v-else value="退回" disabled placeholder="订单审核"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="操作人：">
                <el-input v-model="item.operatorName" disabled placeholder="操作人"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="10">
              <el-form-item label="备注：">
                <el-input v-model="item.auditContent" disabled placeholder="备注"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="操作时间：">
                <el-input :value="item.auditTime|time" disabled placeholder="操作时间"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </template>
    <!--尾部添加-->
     <div class="comm-details" v-if="orderDetails.state != 3">

        <el-form :model="lastForm" label-width="120px">
          <el-row>
            <el-col :span="10">
              <el-form-item :label="lastForm.flowName + '：'">
                <el-input disabled value="待审核"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="操作人：">
                <el-input v-model="lastForm.name" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="10">
              <el-form-item label="备注：">
                <el-input v-model="lastForm.remark" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="操作时间：">
                <el-input v-model="lastForm.opreatime" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

    <!--弹出框-->
    <el-dialog :title="dialogObjch.title" :width="dialogObjch.width" :visible.sync="dialogVisiblech" :modal="false" @close="dialogClosech">
      <details-list v-if="dialogObjch.index == 0" :order-details="od"></details-list>
    </el-dialog>
  </div>
</template>

<script>
import { selectAuditFlowInfo } from "@/api/commisOrder.js";
export default {
  props: ["orderDetails"],
  data() {
    return {
      formDetails: {
        experienceName: "",
        legalPerson: "",
        legalPersonTelephone: "",
        accountOpenBank: "",
        publicAccount: "",
        commission: "",
        orderNum: ""
      },
      lastForm: {
        flowName: "",
        name: "操作人",
        remark: "备注",
        opreatime: "操作时间"
      },
      auditFlowList: [],
      dialogObjch: {
        index: -1,
        title: "",
        width: ""
      },
      od: "",

      dialogVisiblech: false
    };
  },
  components: {
    detailsList: () => import("./detailsList")
  },
  mounted() {
    switch (this.orderDetails.state) {
      case 0:
        this.lastForm.flowName = "订单待审核";
        break;
      case 1:
        this.lastForm.flowName = "发票待审核";
        break;
      case 2:
        this.lastForm.flowName = "待支付";
        break;
      default:
        this.lastForm.flowName = "";
        break;
    }
    this.selectAuditFlowInfo();
  },
  methods: {
    clickDetails() {
      this.dialogObjch.title = "佣金结算单明细";
      this.dialogObjch.width = "900px";
      this.dialogObjch.index = 0;
      this.od = this.orderDetails;
      this.dialogVisiblech = true;
    },
    dialogClosech() {
       this.dialogObjch.index = -1;
       this.dialogVisiblech = false;
    },
    // 获取查看的效果
    selectAuditFlowInfo() {
      selectAuditFlowInfo({ id: this.orderDetails.id }).then(res => {
        this.formDetails = { ...res.experienceStore };
        this.formDetails.orderNum = res.orderNum;
        this.formDetails.commission = res.commission;
        this.auditFlowList = res.auditFlowList;
      });
    }
  }
};
</script>

<style>
.comm-details {
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 7px;
  padding-top: 20px;
}
</style>

