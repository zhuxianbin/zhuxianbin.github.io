<template>
  <div>
    <el-form direction="horizontal" label-width="120px" class="margin-top-20">
      <el-form-item label="订单内容">
          <span class="ant-form-text" id="userName" name="userName" style="font-size: 18px;">支付ACI注册国际心理咨询师培训考试报名费</span>
      </el-form-item>
      <el-form-item label="订单价格" >
          <div class="inline-block" style="font-size: 28px;margin-right: 20px;">
          <span class="color-warn">{{price}}</span>元</div>
          <!-- <el-button type="default" html-type="button" @click="refreshPrice()">刷新价格</el-button> -->
      </el-form-item>
      <el-form-item label="支付方式">
        <el-radio-group v-model="payType" @change="paySingup">
            <el-radio label="wechat">微信支付</el-radio>
            <el-radio label="alipay">支付宝</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if='payType=="alipay"' label="">
          
          <el-button type="primary" @click='jumpAliPage()'>去支付宝支付</el-button>
      </el-form-item>
      <el-form-item v-else label="扫码支付" >
          <div style='width:200px;height:200px;padding:10px;border:1px solid #eee;'>
              <img :src='qrcode' style='width:100%;' />
          </div>
          <!-- <span>购买及表示您同意《<a class="link" href='http://news.chaozhiedu.com/wj/jinpailubo.docx'>这个地方还没定</a>》</span> -->
      </el-form-item>
      <!-- <el-form-item label="支持支付类型">
          <img src="/static/images/20180316111851.png">
      </el-form-item> -->
      <el-form-item label="">
          该费用是ACI国际注册心理咨询师的报考费用，超职教育为服务代收详情请点击<a>这里了解</a>
      </el-form-item>
    </el-form>
    <div v-html='alipayForm'></div>
  </div>
</template>

<script>
let timer = 0;
import QRCode from "qrcode";
export default {
  name: "paySiginUp",
  data() {
    return {
      qrcode: "",
      price: "",
      payType: "wechat",
      alipayForm: ""
    };
  },
  methods: {
    paySingup() {
      //获取支付报名费订单
      this.$czapi
        .toPaySingUp({
          channel: this.payType
        })
        .then(({ code, msg, price, form, qrtext, qrcode }) => {
          //console.log(code, msg);
          if (this.payType === "alipay") {
            this.alipayForm = form;
          } else {
            QRCode.toDataURL(qrtext, { errorCorrectionLevel: "H" }).then(
              url => {
                this.qrcode = url;
              }
            );
          }
          this.price = (price / 100).toFixed(2);
        });
    },
    getPayInfo() {
      //获取支付报名费订单
      this.$czapi.getUserSignPayinfo({}).then(({ code, status }) => {
        if (status == 1) {
          window.location.reload();
        }
      });
    },
    jumpAliPage() {
      //console.log(document.getElementById("alipaysubmit"));
      document.getElementById("alipaysubmit").target = "_blank";
      document.forms["alipaysubmit"].submit();
    }
  },
  mounted() {
    this.paySingup();
    timer = setInterval(this.getPayInfo, 6180);
  },
  destroyed() {
    console.log("destroyed");
    clearTimeout(timer);
  }
};
</script>

<style>
</style>
