<template>
  <div>
    <el-form direction="horizontal" label-width="120px" class="margin-top-20">
      <el-form-item label="订单内容">
          <span class="ant-form-text" id="userName" name="userName" style="font-size: 18px;">{{payData.name}}</span>
      </el-form-item>
      <el-form-item label="订单价格" >
          <div class="inline-block" style="font-size: 28px;margin-right: 20px;">
          <span class="color-warn">{{payData.price}}</span>元</div>
          <!-- <el-button type="default" html-type="button" @click="refreshPrice()">刷新价格</el-button> -->
      </el-form-item>
      <el-form-item label="扫码支付" >
          <div style='width:200px;height:200px;padding:10px;border:1px solid #eee;'>
              <img :src='payData.qrcode' style='width:100%;' />
          </div>
          <span>购买及表示您同意《<a class="link" href='http://news.chaozhiedu.com/wj/jinpailubo.docx'>这个地方还没定</a>》</span>
      </el-form-item>
      <el-form-item label="支持支付类型">
          <img src="/static/images/20180316111851.png">
      </el-form-item>
  </el-form>
  </div>
</template>

<script>
export default {
  name: "paySiginUp",
  data() {
    return {
      payData: {}
    };
  },
  mounted() {
    console.log("mounted");
  },
  destroyed() {
    console.log("destroyed");
  }
};
</script>

<style>

</style>
