<template>
  <div>
    <el-form direction="horizontal" label-width="120px" class="margin-top-20">
      <el-form-item label="订单内容">
          <span class="ant-form-text" id="userName" name="userName" style="font-size: 18px;">支付ACI注册国际心理咨询师培训考试报名费</span>
      </el-form-item>
      <el-form-item label="订单价格" >
          <div class="inline-block" style="font-size: 28px;margin-right: 20px;">
          <span class="color-warn">800.00</span>元</div>
          <!-- <el-button type="default" html-type="button" @click="refreshPrice()">刷新价格</el-button> -->
      </el-form-item>
      <el-form-item label="扫码支付" >
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
  </div>
</template>

<script>
let timer = 0;
export default {
  name: "paySiginUp",
  data() {
    return {
      qrcode: ""
    };
  },
  methods: {
    paySingup() {
      //获取支付报名费订单
      this.$czapi.toPaySingUp({}).then(({ code, msg, qrcode }) => {
        console.log(code, msg);
        this.qrcode = qrcode;
      });
    },
    getPayInfo() {
      //获取支付报名费订单
      this.$czapi.getUserSignPayinfo({}).then(({ code, status }) => {
        if (status == 1) {
          window.location.reload();
        }
      });
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
