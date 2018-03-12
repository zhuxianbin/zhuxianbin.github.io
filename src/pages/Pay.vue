<template>
    <div class="index">
        <div class="ant-layout">
            <div class="ant-layout ant-layout-has-sider">
                <div class="ant-layout" style="padding: 20px 0;background: #fff;">
                    <div style="width: 1200px;margin: 0 auto;background: #fff;">
                        <div style="margin-bottom: 10px;font-size: 16px;color: #56509F;">超职商城-确认支付</div>
                        <div class="margin-top-20 color-6" style="padding: 0 20px;background: #F6F6F6;border: 1px solid #EBEBEB;line-height: 50px;">
                            请确认您的订单信息，并按提示完成支付
                        </div>

                        <v-form direction="horizontal" class="margin-top-20">
                            <v-form-item label="订单内容" :label-col="labelCol" :wrapper-col="wrapperCol">
                                <span class="ant-form-text" id="userName" name="userName" style="font-size: 18px;">{{payData.name}}</span>
                            </v-form-item>
                            <v-form-item label="订单价格" :label-col="labelCol" :wrapper-col="wrapperCol">
                                <div class="inline-block" style="font-size: 28px;margin-right: 20px;"><span class="color-warn">{{payData.price}}</span>元</div>
                                <v-button type="default" html-type="button" @click="refreshPrice()">刷新价格</v-button>
                            </v-form-item>
                            <v-form-item label="支付方式" :label-col="labelCol" :wrapper-col="wrapperCol">
                                <v-radio-group v-model="payStyle" style="margin-top: 17px;">
                                    <!-- <v-radio label="alipay">
                                        <svg class="icon inline-block" aria-hidden="true" style="font-size: 180px;margin-top: -60px;">
                                            <use xlink:href="#icon-zhifubao"></use>
                                        </svg>
                                    </v-radio> -->
                                    <v-radio label="wechat">
                                        <svg class="icon inline-block" aria-hidden="true" style="font-size: 180px;margin-top: -60px;">
                                            <use xlink:href="#icon-weixinzhifu"></use>
                                        </svg>
                                    </v-radio>
                                    <v-radio label="yhk">
                                        <svg class="icon inline-block" aria-hidden="true" style="font-size: 80px;margin-bottom: 40px;">
                                            <use xlink:href="#icon-weibiaoti-"></use>
                                        </svg>
                                        <span class="inline-block" style="vertical-align: top;margin-top: 11px;font-size: 24px;">银行账户</span>
                                    </v-radio>
                                </v-radio-group>
                            </v-form-item>
                            <v-form-item :wrapper-col="{span:22,offset:2}">
                                <span v-if='payData.id==10'>购买及表示您同意《<a href='../static/docs/【超职教育】18年＜VIP保障实操班＞·协议.docx'>【超职教育】18年＜VIP保障实操班＞·协议</a>》</span>
                                <span v-if='payData.id==9'>购买及表示您同意《<a href='../static/docs/【超职教育】18年＜高效私教取证班＞·协议.docx'>【超职教育】18年＜高效私教取证班＞·协议</a>》</span>
                                <span v-if='payData.id==8'>购买及表示您同意《<a href='../static/docs/【超职教育】18年＜零基础特招班＞· 协议.docx'>【超职教育】18年＜零基础特招班＞· 协议</a>》</span>
                            </v-form-item>
                            <v-form-item :wrapper-col="{span:22,offset:2}" style="margin-top:24px">
                                <a v-if='payStyle=="alipay"&&payState.token' style='padding:0 50px;' class='ant-btn ant-btn-warning ant-btn-lg' target='_blank' :href='"http://aci-api.chaozhiedu.com/api/pay/alipay/"+payState.token'>去支付</a>
                                <a v-if="payStyle!='alipay'" style='padding:0 50px;' class='ant-btn ant-btn-warning ant-btn-lg' @click="pay">去支付</a>
                            </v-form-item>
                        </v-form>
                    </div>
                </div>
            </div>
        </div>

        <v-modal
            title="微信支付"
            :width="800"
            :visible="wechatPayDialog"
            @cancel="wechatPayDialogCancle"
            wrap-class-name="vertical-center-modal">
            <div class="text-center" style="font-size: 16px;">
                <p>购买{{payData.name}}<br/>
                    支付{{payData.price}} 元</p>
                <p><img :src='payResult.qrcode' style='width:200px;height:200px;' /></p>
                <p>
                    <svg class="icon inline-block" aria-hidden="true" style="font-size: 60px;margin-top: -20px;">
                        <use xlink:href="#icon-weixinzhifu"></use>
                    </svg>
                </p>
                <p style="font-size: 18px;">支付遇到问题：请联系010-51657777</p>
            </div>
            <div slot="footer">
                <v-button key="cancel" type="ghost" size="large" @click="wechatPayDialogCancle">关闭</v-button>
            </div>
        </v-modal>

        <v-modal
        title="银行卡对公转账"
        :width="800"
        :visible="yhkPayDialog"
        @cancel="yhkPayDialogCancle"
        wrap-class-name="vertical-center-modal">
        <div style="font-size: 16px;">
            <p style="font-weight: bold;">{{payState.data.title}}</p>
            <pre v-html='payState.data.content'></pre>
            <p style='color:orange;font-size:12px;'>{{payState.data.tip}}</p>
        </div>
        <div slot="footer">
            <v-button key="cancel" type="ghost" size="large" @click="yhkPayDialogCancle">关闭</v-button>
        </div>
    </v-modal>

        <v-modal
            title="支付提醒"
            :width="800"
            :visible="alipayPayDialog1"
            @cancel="alipayPayDialogCancle1"
            wrap-class-name="vertical-center-modal">
            <div class="clearfix" style="font-size: 16px;">
                <div class="pull-left margin-left-20">
                    <i class="iconfont icon-warning" style="font-size: 100px;color: #FF4000;"></i>
                </div>
                <div class="pull-left margin-left-20" style="width: 450px;">
                    <div style="font-size: 24px;">
                        请您在新打开的平台支付页面进行支付，<br/>
                        支付完成前请不要关闭该窗口
                    </div>
                    <div class="margin-top-20" style="font-size: 14px;color: #FF4000;">
                        在订单支付完成前请不要关闭此窗口，否则会影响购买。
                    </div>
                    <div class="margin-top-20">
                        <v-button type="primary">已完成支付</v-button>
                        <v-button type="default" style="margin-left: 10px;">未完成支付</v-button>
                    </div>
                    <div class="margin-top-20" style="font-size: 18px;">支付遇到问题：请联系010-51657777</div>
                </div>
                <!-- <div v-html="payResult.form"></div> -->
            </div>
            <div slot="footer">
                <v-button key="cancel" type="ghost" size="large" @click="alipayPayDialogCancle1">关闭</v-button>
            </div>
        </v-modal>

        <v-modal
            title="支付提醒"
            :width="800"
            :visible="alipayPayDialog2"
            @cancel="alipayPayDialogCancle2"
            wrap-class-name="vertical-center-modal">
            <div class="clearfix" style="font-size: 16px;">
                <div class="pull-left margin-left-20">
                    <i class="iconfont icon-chenggong" style="font-size: 100px;color: #7ED321;"></i>
                </div>
                <div class="pull-left margin-left-20" style="width: 450px;">
                    <div style="font-size: 24px;">
                        恭喜您，支付成功
                    </div>
                    <div class="margin-top-20" style="font-size: 14px;">
                        订单信息：{{payData.name}}
                    </div>
                    <div class="margin-top-20" style="font-size: 14px;color: #FF4000;">
                        <v-button @click="$router.push('/male')" type="primary">继续挑选课程</v-button>
                        <v-button @click="$router.push('/courselist')" type="default" style="margin-left: 10px;">进入我的课程</v-button>
                    </div>
                    <div class="margin-top-20" style="font-size: 18px;">支付遇到问题：请联系010-51657777</div>
                </div>
            </div>
            <div slot="footer">
                <v-button key="cancel" type="ghost" size="large" @click="alipayPayDialogCancle2">关闭</v-button>
            </div>
        </v-modal>

        <v-modal
            title="支付提醒"
            :width="800"
            :visible="alipayPayDialog3"
            @cancel="alipayPayDialogCancle3"
            wrap-class-name="vertical-center-modal">
            <div class="clearfix" style="font-size: 16px;">
                <div class="pull-left margin-left-20">
                    <i class="iconfont icon-warning" style="font-size: 100px;color: #FF4000;"></i>
                </div>
                <div class="pull-left margin-left-20" style="width: 450px;">
                    <div style="font-size: 24px;">
                        支付失败，请点击重新支付
                    </div>
                    <div class="margin-top-20" style="font-size: 14px;">
                        订单信息：{{payData.name}}
                    </div>
                    <div class="margin-top-20">
                        <v-button type="error">重新支付</v-button>
                        <v-button type="default" style="margin-left: 10px;">返回商城</v-button>
                    </div>
                    <div class="margin-top-20" style="font-size: 18px;">支付遇到问题：请联系010-51657777</div>
                </div>
            </div>
            <div slot="footer">
                <v-button key="cancel" type="ghost" size="large" @click="alipayPayDialogCancle3">关闭</v-button>
            </div>
        </v-modal>
    </div>
</template>

<script>
let timer = 0;

export default {
  name: "Index",
  data() {
    return {
      labelCol: {
        span: 2
      },
      wrapperCol: {
        span: 22
      },

      payData: {},

      payStyle: "alipay",

      payState: {
        data: {}
      },

      wechatPayDialog: false,

      yhkPayDialog: false,

      alipayPayDialog1: false,
      alipayPayDialog2: false,
      alipayPayDialog3: false,
      cateList: [],
      payResult: {}
    };
  },
  methods: {
    refreshPrice() {
      //console.log(this.payState);
      this.$czapi
        .refreshPrice({
          token: this.payState.token
        })
        .then(data => {
          this.payData.price = data.data;
          this.$message.success("刷新价格成功");
        });

      //假设已经获取了
      /*var data = {
                    "code": 200,
                    "msg": "获取成功",
                    "data": "100"
                };
                vm.payData.price = data.data;
                vm.$message.success("刷新价格成功");*/
    },

    pay() {
      var vm = this;
      if (vm.payStyle === "yhk") {
        vm.yhkPayDialog = true;
        return false;
      }
      this.$czapi
        .pay({
          product_id: this.payData.id,
          channel: this.payStyle
        })
        .then(data => {
          if (data.code !== 200) {
            this.$modal.error({
              title: "温馨提示",
              content: data.msg
            });
            return false;
          }

          if (vm.payStyle === "wechat") {
            vm.wechatPayDialog = true;
          }

          this.payResult = data;
          //console.log(data, "pay");
          //this.$nextTick(() => {
          //   if (this.payStyle === "alipay") {
          //     this.alipayPayDialog1 = true;
          //     // vm.alipayPayDialog2 = true;
          //     // vm.alipayPayDialog3 = true;
          //     this.openNew(
          //       `http://aci-api.chaozhiedu.com/api/pay/alipay/${
          //         this.payState.token
          //       }`
          //     );
          //     // let form = $(data.form)[0];
          //     // $("body").append(form);
          //     // form.submit();
          //     // $(form).remove();
          //     //document.forms["alipaysubmit"].submit();
          //   }
          //});
        });

      /*console.log({
                    product_id: vm.payData.id,
                    channel: vm.payStyle
                })*/
    },

    wechatPayDialogCancle() {
      this.wechatPayDialog = false;
    },

    yhkPayDialogCancle() {
      this.yhkPayDialog = false;
    },

    alipayPayDialogCancle1() {
      this.alipayPayDialog1 = false;
    },
    alipayPayDialogCancle2() {
      this.alipayPayDialog2 = false;
    },
    alipayPayDialogCancle3() {
      this.alipayPayDialog3 = false;
    },
    getPayResult(token) {
      this.$czapi.getPayResult({ token }).then(({ code, msg }) => {
        if (code != 200) {
          timer = setTimeout(() => {
            this.getPayResult(token);
          }, 3000);
          return false;
        }

        this.alipayPayDialog2 = true;
        //this.alipayPayDialog1 = false;
        this.wechatPayDialog = false;
      });
    }
  },
  mounted() {},
  activated() {
      console.log(window.payData);
    if (window.payData) {
      this.payData = window.payData;
      this.$czapi
        .getPayInfo({
          product_id: this.payData.id
        })
        .then(data => {
          this.payState = data;
          this.payData.price = data.price;
          this.getPayResult(data.token);
        });
    } else {
      this.$router.push({ name: "Male" });
    }
  },
  deactivated() {
    clearTimeout(timer);
  }
};
</script>

<style scoped>

</style>
