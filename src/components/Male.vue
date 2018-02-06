<template>
    <div class="index">
        <div class="ant-layout">
            <div class="ant-layout-header">
                <div class="logo">
                    <img src="static/images/logo-1.png" alt="logo">
                </div>
                <ul class="ant-menu ant-menu-root ant-menu-horizontal ant-menu-dark">
                    <li class="ant-menu-item">
                        <a>首页</a>
                    </li>
                    <li class="ant-menu-item">
                        <a>课程分类</a>
                    </li>
                    <li class="ant-menu-item ant-menu-item-selected">
                        <a>超职商城</a>
                    </li>
                    <li class="ant-menu-item">
                        <a>关于超职</a>
                    </li>
                </ul>
                <div class="header-login">
                    <v-button ghost style="font-size: 16px;">学员登录</v-button>
                </div>
            </div>
            <div class="ant-layout ant-layout-has-sider">
                <div class="ant-layout" style="padding: 20px 0;background: #fff;">
                    <div style="width: 1200px;margin: 0 auto;background: #fff;">
                        <div style="margin-bottom: 10px;font-size: 16px;color: #56509F;">超职商城欢迎您</div>
                        <template v-for="it in info">
                            <div class="padding-10 margin-bottom-15" style="border: 1px solid #E8E8E8;border-radius: 6px;">
                                <v-row :gutter="layout.gutter">
                                    <v-col :span="layout.span">
                                        <div style="width: 100%;height: 330px;background: #f2f2f2;">
                                            <img :src="it.img" alt="" style="height: 330px;">
                                        </div>
                                    </v-col>
                                    <v-col :span="layout.span">
                                        <div style="font-size: 24px;color: #333333;">{{it.name}}</div>
                                        <div class="margin-top-20">
                                            <span class="inline-block text-right" style="width: 14%;vertical-align: top;">课程介绍：</span>
                                            <span class="inline-block" style="width: 85%;">{{it.description}}</span>
                                        </div>

                                        <div class="margin-top-20">
                                            <span class="inline-block text-right" style="width: 14%;">活动价：</span>
                                            <span class="inline-block" style="width: 85%;">
                                                <span style="font-size: 28px;color: #FE6500;">{{it.price}}</span> 元
                                                <span style="text-decoration: line-through;font-size: 20px;margin-left: 20px;">{{it.original_price}}元</span>
                                            </span>
                                        </div>

                                        <div class="margin-top-20 text-center">
                                            <a href="javascript:;" class="ant-btn ant-btn-warning"
                                               style="font-size: 16px;width: 160px;">
                                                立即购买
                                            </a>
                                            <a href="javascript:;" class="ant-btn"
                                               style="font-size: 16px;width: 160px;margin-left: 20px;">
                                                立即咨询
                                            </a>
                                        </div>
                                    </v-col>
                                </v-row>
                            </div>
                        </template>
                        <div class="text-right">
                            <v-pagination
                                show-size-changer
                                @change="changePage"
                                @sizechange="pageSizeChange"
                                :total="page.total"
                                show-quick-jumper
                                :show-total="showTotal"></v-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Index',
        data () {
            return {
                layout: {
                    gutter: 32,
                    span: 12,
                },
                info: {

                },
                page: {
                    p: 1,
                    total: 1,
                    offset: 10
                }
            }
        },
        methods: {
            showTotal(total) {
                return `全部 ${total} 条`;
            },
            pageSizeChange(current, size) {
                //console.log(current, size);
                this.page.offset = size;
                this.loadData();
            },
            changePage(a){
                this.page.p = a;
                this.loadData();
            },
            loadData(){
                var vm = this;
                console.log({
                    p: vm.page.p,
                    offset: vm.page.offset
                })
                /*this.$czapi.getProductList({
                    p: vm.page.p,
                    offset: vm.page.offset
                }).then(function (data) {
                    console.log(data)
                });*/

                var data = {
                    "code": 200,
                    "msg": "ok",
                    "data": {
                        "total": 100,
                        "row": [
                            {
                                "id": 1,
                                "name": "AC心理咨询师课程",
                                "price": "0.10",
                                "original_price": "0.01",
                                "img": "http:\/\/aci.zhj\/api\/file\/1",
                                "description": "是我校理、工、经管类本科生必修的一门重要的基础课。也是工学、经济学硕士研究生入学考试的门必考科目"
                            }
                        ]
                    }
                };
                vm.page.total = data.data.total;
                this.info = data.data.row;
            }
        },
        mounted(){
            this.loadData();
        }
    }
</script>

<style>

</style>
