<template>
    <el-container>
        <el-header>
            <layoutHeader></layoutHeader>
        </el-header>
        <el-container>
            <el-main>
                <div class="male-main" v-if="!!payData">
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
                                            <span class="ant-form-text" style="font-size: 18px;">{{payData.product_name}}</span>
                                        </el-form-item>
                                        <el-form-item label="订单价格" >
                                            <div class="inline-block" style="font-size: 28px;margin-right: 20px;">
                                                <span class="color-warn">{{(payData.price/100).toFixed(2)}}</span>元</div>
                                            <el-button type="default" html-type="button" @click="refreshPrice()">刷新价格</el-button>
                                        </el-form-item>
                                        <el-form-item label="支付方式">
                                            <el-radio-group v-model="payType" @change="getOrderPay">
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
                                        <el-form-item label="" v-if="payData.agreement">
                                            <span>购买及表示您同意《
                                                <a class="link" @click="dolookAgreement" href='javascript:;'>{{payData.product_name}}·协议</a>》</span>
                                            <!-- <span v-if='payData.id==20'>购买及表示您同意《
                                                <a class="link" href='http://news.chaozhiedu.com/wj/jinpailubo.docx'>【超职教育】18年＜金牌录播＞·协议</a>》</span>
                                            <span v-if='payData.id==10'>购买及表示您同意《
                                                <a class="link" href='http://news.chaozhiedu.com/wj/vipshicao.docx'>【超职教育】18年＜VIP保障实操班＞·协议</a>》</span>
                                            <span v-if='payData.id==9'>购买及表示您同意《
                                                <a class="link" href='http://news.chaozhiedu.com/wj/gaoxiaoquzheng.docx'>【超职教育】18年＜高效私教取证班＞·协议</a>》</span>
                                            <span v-if='payData.id==8'>购买及表示您同意《
                                                <a class="link" href='http://news.chaozhiedu.com/wj/lingjichutezhao.docx'>【超职教育】18年＜零基础特招班＞· 协议</a>》</span> -->
                                        </el-form-item>
                                        <el-form-item label="支持支付类型">
                                            <div style='width:320px;overflow:hidden;'>
                                                <img src="/static/images/20180316111851.png">
                                            </div>
                                        </el-form-item>
                                    </el-form>
                                    <div v-html='alipay'></div>
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
                    <el-dialog title="协议说明" top="20px" width="800px" :visible.sync="dialog.show">
                        <div v-html="payData.agreement"></div>
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
import { orderPay, getOrder } from "@/utils/api";
export default {
  name: "Pay",
  components: {
    layoutHeader
  },
  data() {
    return {
      payData: null,
      payType: "wechat",
      dialogSuccess: false,
      dialogFail: false,
      cateList: [],
      //   payResult: {},
      qrcode: "",
      order_id: "",
      product_id: "",
      alipay: "",
      dialog: {
        show: false,
        data: ""
      }
    };
  },
  methods: {
    refreshPrice() {
      this.getOrderPay();
      this.$message.success("刷新价格成功");
    },
    changePayType() {},
    getPayResult(token) {
      this.$czapi
        .getPayResult({
          token: this.order_id
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
    getOrderPay() {
      this.order_id &&
        orderPay({ order_id: this.order_id, channel: this.payType }).then(
          data => {
            this.payData = data.order_info;
            this.alipay = data.form;
            data.qrtext &&
              QRCode.toDataURL(data.qrtext, { errorCorrectionLevel: "H" }).then(
                url => {
                  this.qrcode = url;
                }
              );
          }
        );
    },
    getOrderByProductId() {
      this.product_id &&
        getOrder({ product_id: this.product_id }).then(res => {
          if (res.code == 202) {
            return this.$alert("您已经购买过该课程,请勿重复购买", "温馨提示", {
              confirmButtonText: "确定",
              callback: action => {
                this.$router.push({
                  path: "./Male"
                });
              }
            });
          }
          if (res.code == 210) {
            return this.$alert(
              "您的订单已经被分期，请到【个人中心】的【我的课程订单】中进行付款。",
              "温馨提示",
              {
                confirmButtonText: "确定",
                callback: action => {
                  this.$router.push({
                    path: "./orders"
                  });
                }
              }
            );
          }
          this.order_id = res.order_id;
          this.getOrderPay();
        });
    },
    dolookAgreement() {
      this.dialog = {
        show: true,
        data: this.payData.agreement
      };
    }
  },
  created() {
    let { id, order_id } = this.$route.query;
    if (id) {
      this.product_id = id;
      return this.getOrderByProductId();
    }
    if (order_id) {
      this.order_id = order_id;
      return this.getOrderPay();
    }

    this.$router.push({
      path: "./Male"
    });
  },
  beforeDestroy() {
    clearTimeout(timer);
  }
};
</script>

<style scoped>
</style>
