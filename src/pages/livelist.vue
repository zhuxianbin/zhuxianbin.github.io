<template>
    <div class="course-list">
        <div class="ant-layout">
            <div class="ant-layout ant-layout-has-sider">
                <div class="ant-layout ant-layout-chaozhi">
                    <div class="ant-layout-content text-center" style='background:#fff;padding:100px;' v-if='rows.length<=0'>
                        <img src='/static/images/null-page-draw.png'>
                        <p style='font-size:20px;margin-top:20px;'>您还没有购买课程,<router-link to="/male">去商城</router-link></p>
                    </div>
                    <div class="ant-layout-content" v-if='rows.length>0'>
                        <div v-for="it in rows" :key='it.id' class="padding-15 course-item" style="">
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

                            <table v-if='it.products.length>0' class="ui-table margin-top-20">
                                        <colgroup>
                                            <col width="300px">
                                            <col width="300px">
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th>直播课程名称</th>
                                                <th>直播开始时间</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for='item in it.products.live_more' :key='item.id'>
                                                <td>{{item.live_name}}</td>
                                                <td>{{item.live_time}}</td>
                                                <td>
                                                    <el-button v-if='item.status == 0' disabled>
                                                        <i class="iconfont icon-zhibodating"></i>
                                                        <span>直播还没开始</span>
                                                    </el-button>
                                                    <a target="_blank" v-if='item.status == 1' :href="item.live_url+'?token='+Token" class="el-button el-button--warning">
                                                        <i class="iconfont icon-bofang1"></i>
                                                        <span>进入直播课堂</span>
                                                    </a>
                                                    <a target="_blank" v-if='item.status == -1' :href="item.live_url+'?token='+Token" class="el-button el-button--primary">
                                                        <i class="iconfont icon-kechenghuifang"></i>
                                                        <span>回访直播视频</span>
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
      rows: []
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
    getLiveList() {
      //let now = new Date().setHours(0, 0, 0, 0);
      this.$czapi
        .getLiveList({
          p: 1,
          offset: 100
        })
        .then(({ code, data, msg }) => {
          this.rows = data;
          console.log(data, this.rows, this.rows.length);
          //   this.rows = data.map(item => {
          //     item.products.live_more = item.products.live_more.map(live => {
          //       let liveTime = new Date(live.live_time.replace(/\-/g,'/')).setHours(0, 0, 0, 0);
          //       //console.log(now,liveTime);
          //       if (now > liveTime) {
          //         live.status = -1;
          //       }
          //       if (now < liveTime) {
          //         live.status = 0;
          //       }
          //       if (now == liveTime) {
          //         live.status = 1;
          //       }
          //       //console.log(live,now,liveTime);
          //       return live;
          //     });
          //     return item;
          //   });
          //console.log(this.rows);
        });
    }
  },
  created() {
    this.getLiveList();
    // //console.log(111111111111111);
    // //var vm = this;
    // //请求用不了，暂时直接模拟
    // this.$czapi.getCourseList().then(({ data }) => {
    //   this.product = data.map(item => {
    //     item.planLine = [];
    //     item.downList = [];
    //     return item;
    //   });
    //   console.log(this.product);
    //   this.product.forEach((item, index) => {
    //     this.showCourseDown(item, index);
    //     this.showCoursePlan(item, index);
    //   });
    // });
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
