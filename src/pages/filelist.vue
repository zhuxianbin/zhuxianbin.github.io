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
                                    <col width='500px' />
                                </colgroup>
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
                                            <a :href="item.file" target='_blank' class="el-button el-button--success el-button--small">
                                                <i class="el-icon-download"></i><span>下载</span>
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

      // cateList: []
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
    // showCoursePlan(item, index) {
    //   this.$czapi
    //     .getCoursePlan({
    //       pid: item.product_id,
    //       p: 1,
    //       offset: 100
    //     })
    //     .then(({ code, data, msg }) => {
    //       this.product[index].planLine = data.rows;
    //     });
    // },

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
  mounted() {
    //console.log(111111111111111);
    //var vm = this;
    //请求用不了，暂时直接模拟
    this.$czapi.getCourseList().then(({ data }) => {
      this.product = data.map(item => {
        // item.planLine = [];
        item.downList = [];
        return item;
      });
      //console.log(this.product);
      this.product.forEach((item, index) => {
        this.showCourseDown(item, index);
        //this.showCoursePlan(item, index);
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
