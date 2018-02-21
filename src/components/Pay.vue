<template>
    <div class="index">
        <div class="ant-layout">
            <div class="ant-layout-header">
                <div class="logo">
                    <img src="static/images/logo-1.png" alt="logo">
                </div>
                <ul class="ant-menu ant-menu-root ant-menu-horizontal ant-menu-dark">
                    <li class="ant-menu-item">
                        <router-link to="/index">首页</router-link>
                    </li>
                    <li class="ant-menu-item hasSubmenu">
                        <a>课程分类 <i class="iconfont icon-jiantou font-size-14 margin-left-10"></i></a>
                        <div class="sub-menu-tip">
                            <em class="arrow"></em>
                            <div>
                                <ul>
                                    <li v-for="it in cateList"><a :href="'/api/product/list/' + it.id" target="_blank">{{it.name}}</a></li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li class="ant-menu-item ant-menu-item-selected">
                        <router-link to="/male">超职商城</router-link>
                    </li>
                    <li class="ant-menu-item">
                        <a>关于超职</a>
                    </li>
                </ul>
                <div class="header-login">
                    <v-button @click="doLogout">退出登录</v-button>
                    <!-- <a href="#/login" class="ant-btn ant-btn-background-ghost" style="font-size: 16px;">退出登录</a> -->
                </div>
            </div>
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
                                    <v-radio label="alipay">
                                        <svg class="icon inline-block" aria-hidden="true" style="font-size: 180px;margin-top: -60px;">
                                            <use xlink:href="#icon-zhifubao"></use>
                                        </svg>
                                    </v-radio>
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

                            <v-form-item :wrapper-col="{span:22,offset:2}" style="margin-top:24px">
                                <v-button type="warning" html-type="button" @click="pay">转到支付</v-button>
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
                <p>二维码这里放一个</p>
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
            <p style="font-weight: bold;">使用银行卡对公转账</p>
            <p>收款人：北京超职教育机构<br/>
                收款银行：招商银行<br/>
                收款账号：899912828111288</p>
            <p>注：转账填写相关备注，如购买多套，原价X数量，并请填写相关的报考人手机号及名字<br/>
                转账成功后，请联系客服010-51657777</p>
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
                        <v-button type="primary">继续挑选课程</v-button>
                        <v-button type="default" style="margin-left: 10px;">进入我的课程</v-button>
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
    export default {
        name: 'Index',
        data () {
            return {
                labelCol: {
                    span: 2
                },
                wrapperCol: {
                    span: 22
                },

                payData: {},

                payStyle: 'alipay',

                payState: {
                    data: {}
                },

                wechatPayDialog: false,

                yhkPayDialog: false,

                alipayPayDialog1: false,
                alipayPayDialog2: false,
                alipayPayDialog3: false,
                cateList: []
            }
        },
        methods: {
            refreshPrice(){
                var vm = this;
                vm.$czapi.refreshPrice({
                    token: vm.payState.token
                }).then(function (data) {
                    vm.payData.price = data.data;
                    vm.$message.success("刷新价格成功");
                })

                //假设已经获取了
                /*var data = {
                    "code": 200,
                    "msg": "获取成功",
                    "data": "100"
                };
                vm.payData.price = data.data;
                vm.$message.success("刷新价格成功");*/
            },

            pay(){
                var vm = this;

                if(vm.payStyle === "wechat"){
                    vm.wechatPayDialog = true
                }else if(vm.payStyle === "yhk"){
                    vm.yhkPayDialog = true
                }else if(vm.payStyle === "alipay"){
                    vm.alipayPayDialog1 = true
                    vm.alipayPayDialog2 = true
                    vm.alipayPayDialog3 = true
                }

                vm.$czapi.pay({
                    product_id: vm.payData.id,
                    channel: vm.payStyle
                }).then(function () {

                })

                /*console.log({
                    product_id: vm.payData.id,
                    channel: vm.payStyle
                })*/
            },

            wechatPayDialogCancle(){
                this.wechatPayDialog = false
            },

            yhkPayDialogCancle(){
                this.yhkPayDialog = false
            },

            alipayPayDialogCancle1(){
                this.alipayPayDialog1 = false
            },
            alipayPayDialogCancle2(){
                this.alipayPayDialog2 = false
            },
            alipayPayDialogCancle3(){
                this.alipayPayDialog3 = false
            },

            getCateList(){
                var vm = this;
                this.$czapi.getCateogry().then(function (data) {
                    console.log(data);
                    vm.cateList = data.data;
                });
            }
        },
        mounted(){
            var vm = this;
            if(window.payData){
                vm.payData = window.payData;
                vm.$czapi.getPayInfo({
                    product_id: vm.payData.id
                }).then(function () {
                    vm.payState = data;
                })

                //假设已经获取了
                /*var data = {
                    "code": 200,
                    "msg": "获取成功",
                    "token": "1802055118094866",
                    "data": {
                        "title": "银行卡对公转账使用银行卡对公转账",
                        "content": "收款人:北京超职教育机构收款银行招商银行收款账号:899912828111288注",
                        "tip": "注:转账填写相关备注,如购买多套,原价X数量,并请填写相关的报考人手机号及名字转账成功后,请联系客服010-51657777"
                    }
                }

                this.payState = data;*/
            }else{
                vm.$router.push({ name: 'Male'})
            }

            //获取分类
            this.getCateList();

            //获取分类
            this.getCateList();
        }
    }
</script>

<style scoped>

</style>
