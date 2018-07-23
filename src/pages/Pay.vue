<template>
    <el-container>
        <el-header>
            <layoutHeader></layoutHeader>
        </el-header>
        <el-container>
            <el-main>
                <div class="male-main">
                    <div class="ant-layout">
                        <div class="ant-layout ant-layout-has-sider">
                            <div class="ant-layout" style="padding: 20px 0;background: #fff;">
                                <div style="width: 1200px;margin: 0 auto;background: #fff;">
                                    <div style="margin-bottom: 10px;font-size: 16px;color: #56509F;">超职商城-确认支付</div>
                                    <div class="margin-top-20 color-6" style="padding: 0 20px;background: #F6F6F6;border: 1px solid #EBEBEB;line-height: 50px;">
                                        请确认您的订单信息，并按提示完成支付
                                    </div>

                                    <el-form direction="horizontal" label-width="120px" class="margin-top-20">
                                        <el-form-item label="订单内容">
                                            <span class="ant-form-text" id="userName" name="userName" style="font-size: 18px;">{{payData.name}}</span>
                                        </el-form-item>
                                        <el-form-item label="订单价格" >
                                            <div class="inline-block" style="font-size: 28px;margin-right: 20px;">
                                                <span class="color-warn">{{payData.price}}</span>元</div>
                                            <el-button type="default" html-type="button" @click="refreshPrice()">刷新价格</el-button>
                                        </el-form-item>
                                        <el-form-item label="支付方式">
                                            <el-radio-group v-model="payType" @change="getQRcode">
                                                <el-radio label="wechat">微信支付</el-radio>
                                                <el-radio label="alipay">支付宝</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                        <el-form-item v-if='payType=="wechat"' label="扫码支付" >
                                            <div style='width:200px;height:200px;padding:10px;border:1px solid #eee;'>
                                                <img :src='qrcode' style='width:100%;' />
                                            </div>
                                        </el-form-item>
                                        <el-form-item v-if='payType=="alipay"' label="">
                                            <el-button type="primary" @click='jumpAliPage()'>去支付宝支付</el-button>
                                        </el-form-item>
                                        <el-form-item label="">
                                            <span v-if='payData.id==20'>购买及表示您同意《
                                                <a class="link" href='http://news.chaozhiedu.com/wj/jinpailubo.docx'>【超职教育】18年＜金牌录播＞·协议</a>》</span>
                                            <span v-if='payData.id==10'>购买及表示您同意《
                                                <a class="link" href='http://news.chaozhiedu.com/wj/vipshicao.docx'>【超职教育】18年＜VIP保障实操班＞·协议</a>》</span>
                                            <span v-if='payData.id==9'>购买及表示您同意《
                                                <a class="link" href='http://news.chaozhiedu.com/wj/gaoxiaoquzheng.docx'>【超职教育】18年＜高效私教取证班＞·协议</a>》</span>
                                            <span v-if='payData.id==8'>购买及表示您同意《
                                                <a class="link" href='http://news.chaozhiedu.com/wj/lingjichutezhao.docx'>【超职教育】18年＜零基础特招班＞· 协议</a>》</span>
                                        </el-form-item>
                                        <el-form-item label="支持支付类型">
                                            <div style='width:320px;overflow:hidden;'>
                                                <img src="/static/images/20180316111851.png">
                                            </div>
                                        </el-form-item>
                                    </el-form>
                                    <div v-html='payResult.form'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <el-dialog title="支付提醒" width="800" :show-close='false' :close-on-press-escape='false' :close-on-click-modal='false' :visible.sync="dialogSuccess">
                        <el-row>
                          <el-col :span="6">
                            <div class="text-center" style='padding-top:20px;'>
                                <i class="iconfont icon-chenggong" style="font-size: 70px;color: #7ED321;"></i>
                            </div>
                          </el-col>
                          <el-col :span="18">
                               <div style="font-size: 24px;">
                                    恭喜您，支付成功
                                </div>
                                <div class="margin-top-20" style="font-size: 14px;">
                                    订单信息：{{payData.name}}
                                </div>
                                <div class="margin-top-20" style="font-size: 14px;color: #FF4000;">
                                    <el-button @click="$router.push('/male')" type="primary">继续挑选课程</el-button>
                                    <el-button @click="$router.push('/courselist')" type="default" style="margin-left: 10px;">进入我的课程</el-button>
                                </div>
                                <div class="margin-top-20" style="font-size: 18px;">支付遇到问题：请联系010-51657777</div>
                          </el-col>
                        </el-row>
                    </el-dialog>

                    <el-dialog title="支付提醒" width="800" :visible.sync="dialogFail">
                        <el-row>
                            <el-col :span="6">
                                <div class="text-center" style='padding-top:20px;'>
                                    <i class="iconfont icon-warning" style="font-size: 70px;color: #FF4000;"></i>
                                </div>
                            </el-col>
                            <el-col :span="18">
                                <div style="font-size: 24px;">
                                    支付失败，请点击重新支付
                                </div>
                                <div class="margin-top-20" style="font-size: 14px;">
                                    订单信息：{{payData.name}}
                                </div>
                                <div class="margin-top-20">
                                    <el-button type="error" @click='dialogFail = false '>重新支付</el-button>
                                    <el-button type="default" @click="$router.push('/male')" style="margin-left: 10px;">返回商城</el-button>
                                </div>
                                <div class="margin-top-20" style="font-size: 18px;">支付遇到问题：请联系010-51657777</div>
                            </el-col>
                        </el-row>
                    </el-dialog>
                </div>
            </el-main>
        </el-container>
    </el-container>

</template>

<script>
let timer = 0;

import QRCode from "qrcode";
import layoutHeader from "@/components/header.vue";

export default {
  name: "Pay",
  components: {
    layoutHeader
  },
  data() {
    return {
      payData: {},
      payType: "wechat",
      dialogSuccess: false,
      dialogFail: false,
      cateList: [],
      payResult: {},
      qrcode: ""
    };
  },
  methods: {
    refreshPrice() {
      this.$czapi
        .refreshPrice({
          token: this.payResult.token
        })
        .then(data => {
          if (data.code != 200) {
            return this.$message.error(data.msg);
          }
          this.payData.price = data.data;
          this.$message.success("刷新价格成功");
          this.getQRcode();
        });
    },
    getQRcode() {
      this.$czapi
        .pay({
          product_id: this.payData.id,
          channel: this.payType
        })
        .then(data => {
          if (data.code == 202) {
            return this.$alert("您已经购买该商品", "温馨提示", {
              confirmButtonText: "确定",
              callback: action => {
                this.$router.back();
              }
            });
          }
          this.payResult = data;
          this.getPayResult(data.token);
          data.qrtext &&
            QRCode.toDataURL(data.qrtext, { errorCorrectionLevel: "H" }).then(
              url => {
                this.qrcode = url;
              }
            );
        });
    },
    getPayResult(token) {
      this.$czapi
        .getPayResult({
          token
        })
        .then(({ code, msg }) => {
          if (code != 200) {
            clearTimeout(timer);
            timer = setTimeout(() => {
              this.getPayResult(token);
            }, 5000);
            return false;
          }

          this.dialogSuccess = true;
        });
    },
    jumpAliPage() {
      //console.log(document.getElementById("alipaysubmit"));
      document.getElementById("alipaysubmit").target = "_blank";
      document.forms["alipaysubmit"].submit();
    },
    getPayInfo() {
      this.$czapi
        .getPayInfo({
          product_id: this.payData.id,
          channel: this.payType
        })
        .then(data => {
          this.payData = data.product;
          this.payData.price = data.price;

          this.getQRcode();
        });
    }
  },
  mounted() {
    this.payResult = {};
    let { id } = this.$route.params;
    if (id) {
      window.payData = {
        id
      };
    }
    //console.log(window.payData);
    if (window.payData) {
      this.payData = window.payData;
      this.getPayInfo();
    } else {
      this.$router.push({
        name: "Male"
      });
    }
  },
  beforeDestroy() {
    clearTimeout(timer);
  }
};
</script>

<style scoped>
</style>
