<template>
    <div class="index">
        <div class="ant-layout">
            <div class="ant-layout-header">
                <div class="logo">
                    <img src="static/images/logo-1.png" alt="logo">
                </div>
                <ul class="ant-menu ant-menu-root ant-menu-horizontal ant-menu-dark">
                    <li class="ant-menu-item ant-menu-item-selected">
                        <router-link to="/index">首页</router-link>
                    </li>
                    <li class="ant-menu-item hasSubmenu">
                        <a>课程分类 <i class="iconfont icon-jiantou font-size-14 margin-left-10"></i></a>
                        <div class="sub-menu-tip">
                            <em class="arrow"></em>
                            <div>
                                <ul>
                                    <li v-for="it in cateList" :key='it.id'><a :href="'/api/product/list/' + it.id" target="_blank">{{it.name}}</a></li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li class="ant-menu-item">
                        <router-link to="/male">超职商城</router-link>
                    </li>
                    <li class="ant-menu-item">
                        <a>关于超职</a>
                    </li>
                </ul>
                <div class="header-login">
                    <v-button @click="doLogout">退出登录</v-button>
                    <!-- <router-link to="/login" class="ant-btn ant-btn-background-ghost" style="font-size: 16px;"></router-link> -->
                </div>
            </div>
            <div class="ant-layout ant-layout-has-sider">
                <div class="ant-layout-sider" style="">
                    <div class="color-9 padding-15">我的超职管理后台</div>
                    <ul class="ant-menu ant-menu-root ant-menu-inline ant-menu-light" style="height: 100%;">
                        <li class="ant-menu-item ant-menu-item-selected">
                            <div class="ant-menu-submenu-title">
                                <router-link to="/index">
                                    <i class="iconfont icon-shouye"></i>
                                    <span class="margin-left-5">后台首页</span>
                                </router-link>
                            </div>
                        </li>
                        <li class="ant-menu-item">
                            <div class="ant-menu-submenu-title">
                                <router-link to="/info">
                                    <i class="iconfont icon-baoming"></i>
                                    <span class="margin-left-5">我的报考资料</span>
                                </router-link>
                            </div>
                        </li>
                        <li class="ant-menu-item">
                            <div class="ant-menu-submenu-title">
                                <router-link to="/courselist">
                                    <i class="iconfont icon-kecheng"></i>
                                    <span class="margin-left-5">我购买的课程</span>
                                </router-link>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="ant-layout ant-layout-chaozhi">
                    <div class="ant-layout-content" style="padding: 0;">
                        <div class="color-6" style="padding: 25px 25px 0 25px;">
                            <div class="inline-block">
                                <template v-if="info.code !== 200">
                                    <svg class="icon inline-block" aria-hidden="true" style="font-size: 86px;">
                                        <use xlink:href="#icon-touxiang1"></use>
                                    </svg>
                                </template>
                                <template v-if="info.code === 200">
                                    <img :src="info.ext_info.avatar_file"
                                         alt="" style="width: 80px;height: 80px;border-radius: 100%;">
                                </template>
                            </div>
                            <div class="inline-block margin-left-10">
                                <div>学员账号：{{info.user.phone}}</div>
                                <div class="margin-top-15">欢迎您来到超职ACI课程培训中心</div>
                            </div>
                        </div>
                        <hr>
                        <div class="color-6" style="padding: 0 25px 25px 25px;">
                            <p>亲爱的学员：</p>
                            <p style="margin-left: 28px;">您还未参考网校的ACI注册国际心理咨询师课程培训，请先缴费学习课程，再进行报名。</p>
                            <p style="margin-left: 28px;">职业培训教育网为您提供ACI注册国际心理咨询师培训考试一站式服务。</p>
                            <p class="margin-top-20" style="margin-left: 28px;">
                                <v-button @click='$router.push("/male")' type="ghost" size="large" style="font-size: 18px;">点击购买课程>></v-button>
                            </p>
                        </div>
                        <hr>
                        <div class="color-6" style="padding: 0 25px 25px 25px;">
                            <p>亲爱的学员：</p>
                            <p style="margin-left: 28px;">您已参考网校的ACI注册国际心理咨询师课程培训，可以进行报名。</p>
                            <p style="margin-left: 28px;">职业培训教育网为您提供ACI注册国际心理咨询师培训考试一站式服务。</p>
                            <p class="margin-top-20" style="margin-left: 28px;">
                                <v-button @click='$router.push("/info")' type="ghost" size="large" style="font-size: 18px;">点击报考资料>></v-button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Index",
  data() {
    return {
    //   info: {
    //     user: {},
    //     ext_info: {},
    //     period: []
    //   },
      //cateList: []
    };
  },
  computed: {
    ...mapState({
      info: state => state.userInfo,
      cateList: state => state.cateList
    })
  },
//   methods: {
//     getCateList() {
//       var vm = this;
//       this.$czapi.getCateogry().then(function(data) {
//         console.log(data);
//         vm.cateList = data.data;
//       });
//     }
//   },
  mounted() {
    var vm = this;
    // vm.$czapi.getUserInfo().then(function(data) {
    //   console.log(data);
    //   vm.info = data;
    // });

    /*var data = {
                "code": 201, //201 等待完善信息 202 审核未通过 203 审核中 200 审核通过
                "msg": "等待完善信息",
                "user": {
                    "phone": "18243188033"//学员账号
                },
                "ext_info": {//用户之前保存的数据 服务端保存一周 格式同 user仅在用户未填写信息时显示
                    "cn_name": "",//中文名
                    "en_name": "",//英文名
                    "sex": "F",//姓别 F 女 M 男
                    "birthday": "2017-01-01", //出生日期
                    "college": "大学", //毕业学校
                    "edu_num": "10000000", //学历编号
                    "idcard": "",//身份证,护照
                    "email": "",
                    "contacts_phone": "",//联系电话
                    "addr": "人民大街",//居住地址
                    "period": "1",//选择的课时ID
                    "idcard_front": "1", //身份证 正面资源ID
                    "idcard_reverse": "1", //身份证 反面资源ID
                    "edu": "1", //学历复印件资源ID
                    "degree": "1",//学位资源ID
                    "entry_form": "1",//报名表资源ID
                    "avatar": "1",//一寸照ID 下面为回显图片和资源的地址
                    "idcard_front_file": "http:\/\/aci.zhj\/api\/file\/1",
                    "idcard_reverse_file": "http:\/\/aci.zhj\/api\/file\/1",
                    "edu_file": "http:\/\/aci.zhj\/api\/file\/1",
                    "degree_file": "http:\/\/aci.zhj\/api\/file\/1",
                    "entry_form_file": "http:\/\/aci.zhj\/api\/file\/1",
                    "avatar_file": "http:\/\/aci.zhj\/api\/file\/1"
                },
                //课时
                "period": [
                    {
                        "id": 1,
                        "name": "上午7点"
                    }
                ],
                //报表名示例
                "entry_form_example_url": "http:\/\/aci.zhj\/api\/file\/1"
            }

            this.info = data;*/

    //获取分类
    //this.getCateList();
  }
};
</script>

<style>

</style>
