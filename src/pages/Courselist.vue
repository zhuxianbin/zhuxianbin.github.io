<template>
    <div class="course-list">
        <div class="ant-layout">
            <div class="ant-layout ant-layout-has-sider">
                <div class="ant-layout ant-layout-chaozhi">
                    <div class="ant-layout-content text-center" style='background:#fff;padding:100px;' v-if='product.length<=0'>
                        <img src='/static/images/null-page-draw.png'>
                        <p style='font-size:20px;margin-top:20px;'>您还没有购买课程,<router-link to="/male">去商城</router-link></p>
                    </div>
                    <div class="ant-layout-content" v-if='product.length>0'>
                        <div v-for="it in product" :key='it.id' class="padding-15 course-item" style="">
                            <div style='padding-left:500px;overflow:hidden'>
                                <div style='float:left;display:inline;margin-left:-500px;width:460px;'>
                                    <img :src="it.products.img" :alt="it.product_name" style="width: 100%;">
                                </div>
                                <div style='float:left;display:inline;'>
                                    <div style="font-size: 24px;color: #333333;">{{it.product_name}}</div>
                                    <div class="margin-top-20">
                                        <!-- <span class="inline-block text-right" style="width: 100px;">课程介绍：</span> -->
                                        <span class="inline-block" v-html='it.products.description'></span>
                                    </div>
                                </div>
                            </div>

                            <table class="ui-table margin-top-20">
                                <colgroup>
                                    <col width="220px" />
                                    <col width="120px" />
                                    <col width="120px" />
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
                                        <td class="text-center">
                                            <el-popover placement="right" title="" trigger="hover" :controlled="false">
                                                <!-- <div>
                                                    <span class="inline-block" style="width: 28px;height: 28px;overflow:hidden;border-radius: 100%;">
                                                        <img :src='item.teacher_img_url' style='width:28px;' />
                                                    </span>
                                                    <span class="inline-block" style="cursor: pointer;"></span>
                                                </div> -->
                                                <div style='width:380px;'>
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
                                                <el-button slot="reference" type='text'>{{item.teacher}}</el-button>
                                            </el-popover>
                                        </td>
                                        <td class="text-center">{{item.total_unit}}</td>
                                        <td>
                                            <div>
                                                <a :href="teach_plan.view_url" target="_blank" class='el-button el-button--primary el-button--small' style='margin-bottom:5px;margin-left: 10px;width:100px;'
                                                    v-for='teach_plan in item.teach_plan' :key="teach_plan.id">
                                                    <i class="iconfont icon-bofang1"></i>
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
    }

    // showCourseDown(item, index) {
    //   this.$czapi
    //     .getCourseInfo({
    //       pid: item.product_id,
    //       p: 1,
    //       offset: 100
    //     })
    //     .then(({ data, code }) => {
    //       this.product[index].downList = data.rows;
    //     });
    // }
  },
  mounted() {
    //console.log(111111111111111);
    //var vm = this;
    //请求用不了，暂时直接模拟
    this.$czapi.getCourseList().then(({ data }) => {
      this.product = data.map(item => {
        item.planLine = [];
        //item.downList = [];
        return item;
      });
      //console.log(this.product);
      this.product.forEach((item, index) => {
        //this.showCourseDown(item, index);
        this.showCoursePlan(item, index);
      });
    });
  }
};
</script>

<style lang="less" scoped>
.course-list {
  background: #ececec;
}
.course-item {
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  margin-bottom: 10px;
  box-shadow: 0 0 5px 0 #ccc;
}
</style>
