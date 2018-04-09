<template>
    <div class="course-list">
        <div class="ant-layout">
            <div class="ant-layout ant-layout-has-sider">
                <div class="ant-layout-sider" style="">
                    <div class="color-9 padding-15">我的超职管理后台</div>
                    <ul class="ant-menu ant-menu-root ant-menu-inline ant-menu-light" style="height: 100%;">
                        <li class="ant-menu-item">
                            <div class="ant-menu-submenu-title">
                                <router-link to="/index">
                                    <i class="iconfont icon-shouye"></i>
                                    <span class="margin-left-5">我的首页</span>
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
                        <div v-for="it in product" :key='it.id' class="padding-10" style="border: 1px solid #E8E8E8;border-radius: 6px;margin-bottom:10px;box-shadow:0 0 5px 0 #ccc;">
                            <div style='padding-left:500px;overflow:hidden'>
                                <div style='float:left;display:inline;margin-left:-500px;width:460px;'>
                                    <img :src="it.products.img" :alt="it.product_name" style="width: 100%;">
                                </div>
                                <div style='float:left;display:inline;'>
                                    <div style="font-size: 24px;color: #333333;">{{it.product_name}}</div>
                                    <div class="margin-top-20">
                                        <span class="inline-block text-right" style="width: 100px;">课程介绍：</span>
                                        <span class="inline-block" v-html='it.products.description'></span>
                                    </div>
                                    <div class="margin-top-20">
                                        <span class="inline-block text-right" style="width: 100px;">直播课程：</span>
                                        <span class="inline-block">{{it.products.live_name}}</span>
                                    </div>
                                    <div class="margin-top-20">
                                        <span class="inline-block text-right" style="width: 100px;">当前课时：</span>
                                        <span class="inline-block">第{{it.products.current_course}}节</span>
                                    </div>
                                    <!-- <div class="margin-top-20">
                                        <span class="inline-block text-right" style="width: 100px;">总课时：</span>
                                        <span class="inline-block">{{it.products.total_course}}节</span>
                                    </div> -->
                                    <div class="margin-top-20">
                                        <span class="inline-block text-right" style="width: 100px;">直播开始时间：</span>
                                        <span class="inline-block">{{it.products.live_time}}</span>
                                    </div>
                                    <div class="margin-top-20 text-center">
                                        <!-- <template v-if="it.products.live_status == 0">
                                            <a href="javascript:;" class="ant-btn ant-btn-warning margin-left-20" disabled style="font-size: 16px;">
                                                <i class="inline-block iconfont icon-jiaoxue" style="font-size: 22px;"></i>
                                                <span class="inline-block">直播课堂还未开始</span>
                                            </a>
                                        </template>
                                        <template v-else> -->
                                            <a :href="it.products.live_url" target="_blank" class="ant-btn ant-btn-warning" style="font-size: 16px;">
                                                <i class="inline-block iconfont icon-jiaoxue" style="font-size: 22px;"></i>
                                                <span class="inline-block">进入直播课堂</span>
                                            </a>
                                        <!-- </template> -->
                                    </div>
                                    <!--<div class="margin-top-20">
                                        购买价：<span style="font-size: 28px;color: #FE6500;">{{product.price}}</span> 元
                                    </div>-->
                                </div>
                            </div>

                            <div class="admin-tab margin-top-20">
                                <ul class="clearfix">
                                    <li :class="{active: activeTabIndex == 0}" @click="activeTabIndex = 0">
                                        <a href="javascript:;">课程安排计划</a>
                                    </li>
                                    <li :class="{active: activeTabIndex == 1}" @click="activeTabIndex = 1">
                                        <a href="javascript:;">课程资料下载</a>
                                    </li>
                                </ul>
                            </div>

                            <div v-show="activeTabIndex == 0">
                                <table class="ui-table margin-top-20">
                                    <colgroup>
                                        <col width="200px">
                                        <col width="100px">
                                        <col width="100px">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>课程</th>
                                            <th>讲师</th>
                                            <th>总课时</th>
                                            <th>视频课件学习</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for='item in it.planLine' :key='item.id'>
                                            <td>{{item.name}}</td>
                                            <td>
                                                <v-popover placement="right" title="" trigger="hover" :controlled="false">
                                                    <div>
                                                        <span class="inline-block" style="width: 28px;height: 28px;overflow:hidden;border-radius: 100%;">
                                                            <img :src='item.teacher_img_url' style='width:28px;' />
                                                        </span>
                                                        <span class="inline-block" style="cursor: pointer;">{{item.teacher}}</span>
                                                    </div>
                                                    <div slot="content">
                                                        <div class="clearfix">
                                                            <div class="pull-left" style="width: 130px;">
                                                                <div style="width: 130px;height: 150px;overflow:hidden">
																																	<img :src='item.teacher_img_url' style='width:130px;' />
																																</div>
                                                            </div>
                                                            <div class="pull-right" style="width: 230px;margin-left: 20px;">
                                                                <div style="font-size: 24px;color: #029EFF;">{{item.teacher}}老师</div>
                                                                <div class="margin-top-15 font-size-14">{{item.teacher_description}}</div>
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                </v-popover>
                                            </td>
                                            <td>{{item.total_unit}}</td>
                                            <td>
                                                <div>
                                                    <a :href="teach_plan.view_url" target="_blank" class='ant-btn ant-btn-primary ant-btn-sm' style='margin-right:5px;margin-bottom:5px;width:100px;' v-for='teach_plan in item.teach_plan' :key="teach_plan.id">
                                                            <i class="anticon anticon-play-circle-o"></i>
                                                            <span v-text='teach_plan.name'></span>
                                                    </a>		

                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>合计</td>
                                            <td></td>
                                            <td>{{it.planLine|totalUnit}}课时</td>
                                            <td></td>
                                        </tr>
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
                                        <tr v-for="item in it.downList" :key='item.id'>
                                            <td>{{item.file_name}}</td>
                                            <td>
                                                <!--<a :href="it.file" download class="ant-btn ant-btn-success"></a>-->
                                                <a :href="item.file" target='_blank' class="ant-btn ant-btn-success ant-btn-sm">
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
    </div>
</template>

<script>
export default {
  name: "Courselist",
  data() {
    return {
      layout: {
        gutter: 32,
        span: 12
      },

      activeTabIndex: 0,

      product: [],

      // planLine: [],

      // downList: [],

      cateList: []
    };
  },
  filters: {
    totalUnit(arr) {
      if (!arr) return 0;
      let ret = 0;
      arr.forEach(item => {
        ret += item.total_unit;
      });
      return ret;
    }
  },
  methods: {
    showCoursePlan(item, index) {
      this.$czapi
        .getCoursePlan({
          pid: item.product_id,
          p: 1,
          offset: 100
        })
        .then(({ code, data, msg }) => {
          this.product[index].planLine = data.rows;
        });
    },

    showCourseDown(item, index) {
      this.$czapi
        .getCourseInfo({
          pid: item.product_id,
          p: 1,
          offset: 100
        })
        .then(({ data, code }) => {
          this.product[index].downList = data.rows;
        });
    }
  },
  activated() {
    //var vm = this;
    //请求用不了，暂时直接模拟
    this.$czapi.getCourseList().then(({ data }) => {
      this.product = data.map(item => {
        item.planLine = [];
        item.downList = [];
        return item;
      });
      console.log(this.product);
      this.product.forEach((item, index) => {
        this.showCourseDown(item, index);
        this.showCoursePlan(item, index);
      });
    });
  }
};
</script>

<style>

</style>
