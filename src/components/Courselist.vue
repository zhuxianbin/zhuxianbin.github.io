<template>
    <div class="course-list">
        <div class="ant-layout">
            <div class="ant-layout-header">
                <div class="logo">
                    <img src="static/images/logo-1.png" alt="logo">
                </div>
                <ul class="ant-menu ant-menu-root ant-menu-horizontal ant-menu-dark">
                    <li class="ant-menu-item">
                        <router-link to="/index">首页</router-link>
                    </li>
                    <li class="ant-menu-item ant-menu-item-selected hasSubmenu">
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
                    <li class="ant-menu-item">
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
                <div class="ant-layout-sider" style="">
                    <div class="color-9 padding-15">我的超职管理后台</div>
                    <ul class="ant-menu ant-menu-root ant-menu-inline ant-menu-light" style="height: 100%;">
                        <li class="ant-menu-item">
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
                        <li class="ant-menu-item ant-menu-item-selected">
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
                    <div class="ant-layout-content">
                        <template v-for="it in product">
                        <div class="padding-10" style="border: 1px solid #E8E8E8;border-radius: 6px;">
                            <v-row :gutter="layout.gutter">
                                <v-col :span="layout.span">
                                    <div style="width: 100%;height: 330px;background: #f2f2f2;">
                                        <img :src="it.products.img" alt="" style="height: 330px;">
                                    </div>
                                </v-col>
                                <v-col :span="layout.span">
                                    <div style="font-size: 24px;color: #333333;">{{it.product_name}}</div>
                                    <div class="margin-top-20">
                                        <span class="inline-block text-right" style="width: 100px;">课程介绍：</span>
                                        <span class="inline-block">{{it.products.description}}</span>
                                    </div>
                                    <div class="margin-top-20">
                                        <span class="inline-block text-right" style="width: 100px;">直播课程：</span>
                                        <span class="inline-block">{{it.live_name}}</span>
                                    </div>
                                    <div class="margin-top-20">
                                        <span class="inline-block text-right" style="width: 100px;">当前课时：</span>
                                        <span class="inline-block">第{{it.products.current_course}}节</span>
                                    </div>
                                    <div class="margin-top-20">
                                        <span class="inline-block text-right" style="width: 100px;">总课时：</span>
                                        <span class="inline-block">{{it.products.total_course}}节</span>
                                    </div>
                                    <div class="margin-top-20">
                                        <span class="inline-block text-right" style="width: 100px;">直播开始时间：</span>
                                        <span class="inline-block">{{it.live_time}}</span>
                                    </div>
                                    <div class="margin-top-20 text-center">
                                        <template v-if="it.live_status == 0">
                                            <a href="javascript:;" class="ant-btn ant-btn-warning margin-left-20" disabled
                                               style="font-size: 16px;">
                                                <i class="inline-block iconfont icon-jiaoxue" style="font-size: 22px;"></i>
                                                <span class="inline-block">直播课堂还未开始</span>
                                            </a>
                                        </template>
                                        <template v-else>
                                            <a :href="it.live_url" class="ant-btn ant-btn-warning"
                                               style="font-size: 16px;">
                                                <i class="inline-block iconfont icon-jiaoxue" style="font-size: 22px;"></i>
                                                <span class="inline-block">进入直播课堂</span>
                                            </a>
                                        </template>
                                    </div>
                                    <!--<div class="margin-top-20">
                                        购买价：<span style="font-size: 28px;color: #FE6500;">{{product.price}}</span> 元
                                    </div>-->
                                </v-col>
                            </v-row>
                        </div>
                        </template>
                        <div class="admin-tab margin-top-20">
                            <ul class="clearfix">
                                <li :class="{active: activeTabIndex == 0}" @click="activeTabIndex = 0, showCoursePlan()"><a href="jkavascript:;">课程安排计划</a></li>
                                <li :class="{active: activeTabIndex == 1}" @click="activeTabIndex = 1, showCourseDown()"><a href="jkavascript:;">课程资料下载</a></li>
                            </ul>
                        </div>

                        <div v-show="activeTabIndex == 0">
                            <table class="ui-table margin-top-20">
                                <thead>
                                <tr>
                                    <th>课程</th>
                                    <th>讲师</th>
                                    <th>总课时</th>
                                    <th>视频课件学习</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <!--<tr>
                                        <td>普通心理</td>
                                        <td>
                                            <v-popover placement="right" title="" trigger="hover" :controlled="false">
                                                <div>
                                                    <span class="inline-block" style="width: 28px;height: 28px;background: #f2f2f2;border-radius: 100%;"></span>
                                                    <span class="inline-block" style="cursor: pointer;">郭聪荣</span>
                                                </div>
                                                <div slot="content">
                                                    <div class="clearfix">
                                                        <div class="pull-left" style="width: 130px;">
                                                            <div style="width: 130px;height: 150px;background: #f2f2f2;"></div>
                                                        </div>
                                                        <div class="pull-right" style="width: 230px;margin-left: 20px;">
                                                            <div style="font-size: 24px;color: #029EFF;">郭聪荣老师</div>
                                                            <div class="margin-top-15 font-size-14">心理学硕士，心理专家。</div>
                                                            <div class="margin-top-5 font-size-14">北京中医药大学心理讲师。</div>
                                                            <div class="margin-top-5 font-size-14">共青团心理辅导员培训与督导师</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </v-popover>
                                        </td>
                                        <td>6</td>
                                        <td>6</td>
                                    </tr>
                                    <tr>
                                        <td>合计</td>
                                        <td></td>
                                        <td>60课时</td>
                                        <td></td>
                                    </tr>-->
                                </tbody>
                            </table>
                        </div>
                        <div v-show="activeTabIndex == 1">
                            <table class="ui-table margin-top-20">
                                <thead>
                                    <tr>
                                        <th>课程资料名称</th>
                                        <th>下载资料</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="it in downList">
                                        <td>{{it.file_name}}</td>
                                        <td>
                                            <!--<a :href="it.file" download class="ant-btn ant-btn-success"></a>-->
                                            <a href="javascript:;" class="ant-btn ant-btn-success ant-btn-sm">
                                                <v-icon type="download"></v-icon>
                                                下载
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Courselist',
        data () {
            return {
                layout: {
                    gutter: 32,
                    span: 12,
                },

                activeTabIndex: 0,

                product: [],

                planLine: [],

                downList: [],

                cateList: []
            }
        },
        methods: {
            /*showTotal(total) {
                return `全部 ${total} 条`;
            },*/

            showCoursePlan(){
                var vm = this;
                vm.$czapi.getCoursePlan({
                    pid: 1,
                    p: 1,
                    offset: 10
                }).then(function (data) {
                    console.log(data);
                    vm.planLine = data.data.row;
                });

                /*var data = {
                    "code": 200,
                    "msg": "ok",
                    "data": {
                        "total": 1,
                        "row": [
                            {
                                "id": 1,
                                "name": "aaa",
                                "teacher": "aaaa",
                                "teacher_description": "aaa",
                                "teacher_img": 1,
                                "total_unit": 3,
                                "update_at": "2018-02-03 20:02:17",
                                "teach_plan": [
                                    {
                                        "time": "2018-02-03 20:03:08",
                                        "view_url": "baidu.com",
                                        "tid": 1,
                                        "name": "第1节课"
                                    },
                                    {
                                        "time": "2018-02-03 20:03:22",
                                        "view_url": "sohu.com",
                                        "tid": 2,
                                        "name": "第2节课"
                                    },
                                    {
                                        "time": "2018-02-03 20:03:31",
                                        "view_url": "sina.com",
                                        "tid": 3,
                                        "name": "第3节课"
                                    }
                                ]
                            }
                        ]
                    }
                }*/
            },

            showCourseDown(){
                var vm = this;
                this.$czapi.getCourseInfo({
                    pid: 0,
                    p: 1,
                    offset: 10
                }).then(function (data) {
                    console.log(data);
                    vm.downList = data.data.row;
                });

               /* var data = {
                    "code": 200,
                    "msg": "ok",
                    "data": {
                        "total": 1,
                        "row": [
                            {
                                "file_id": 1,
                                "file_name": "习近平谈治国理政",
                                "file": "http:\/\/aci.zhj\/api\/file\/1" //文件地址
                            }
                        ]
                    }
                }
                this.downList = data.data.row;*/

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
            //请求用不了，暂时直接模拟
            vm.$czapi.getCourseList().then(function (data) {
                console.log(data);
                vm.product = data.data;
            });

            /*var data = {
                "code":200,
                "msg":"ok",
                "data":[
                    {
                        "product_id":1,
                        "product_name":"产品名称",
                        "category_id":1,
                        "category_name":"分类名称",
                        "price":"100000",
                        "endtime":"2018-02-03 20:04:48",
                        "products":{
                            "id":1,
                            "num":"10000",
                            "name":"产品名称",
                            "img":"http://aci.zhj/api/file/1",
                            "description":"产品描述 ",
                            "total_course":0,
                            "current_course":0
                        }
                    }
                ]
            }

            vm.product = data.data;*/

            //取课程安排计划
            vm.showCoursePlan();

            //获取分类
            this.getCateList();
        }
    }
</script>

<style>

</style>
