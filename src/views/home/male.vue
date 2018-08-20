<template>
  <div class="container">
        <category class="mt-20" />

        <div class="bin-panel mt-20">
          <div class='bin-panel-title'>
            <el-tabs v-model="orderby" @tab-click="changeOrderBy">
              <el-tab-pane label="最新" name="new"></el-tab-pane>
              <el-tab-pane label="最热" name="hot"></el-tab-pane>
              <el-tab-pane label="免费" name="free"></el-tab-pane>
            </el-tabs>
          </div>
          <div class='bin-panel-body'>
            <template v-for='item in rows'>
              <div class="product" :key='item.id'>
                <div class='product-media'>
                  <img :src='item.img'>
                  <span></span>
                </div>
                <div class='product-body'>
                    <div class='clearfix'>
                      <div class='pull-left'>
                          <div>{{item.name}}</div>
                          <div class=''>
                            <template v-html='item.description'></template>
                          </div>
                      </div>
                      <div class='pull-right'></div>
                    </div>
                </div>
              </div>
            </template>
          </div>
        </div>

        <div class="male-main">
        
          <div class="ant-layout">
              <div class="ant-layout ant-layout-has-sider">
                
                  <div class="ant-layout" style="padding: 20px 0;background: #fff;">
                    
                      <div style="width: 1200px;margin: 0 auto;background: #fff;">
                          <!-- <div style="margin-bottom: 10px;font-size: 16px;">超职商城欢迎您</div> -->

                          <!-- <div style='padding:15px;border:1px solid #eee;margin-bottom:15px;'>
                              课程分类:
                              <el-tag 
                                style='margin-left:5px'
                                :class='{"el-tag--warning":category_id==0}'  
                                @click.native='category_id=0'>全部</el-tag><el-tag 
                                style='margin-left:5px'
                                v-for='item in cateList' 
                                :key='item.id' 
                                :class='{"el-tag--warning":category_id==item.id}'  
                                @click.native='category_id=item.id'>{{item.name}}</el-tag>
                          </div> -->
                          <el-row :gutter="30">
                              <el-col :span="12" v-for="it in rows" :key="it.id">
                                  <div class="padding-10 margin-bottom-15" style="border: 1px solid #E8E8E8;border-radius: 6px;">
                                      <el-row :gutter="10">
                                          <el-col :span="10">
                                              <div style="width: 100%;height: 120px;line-height: 330px;text-align: center; background: #f2f2f2;">
                                                  <template v-if="it.img == ''">
                                                      <i class="iconfont icon-zanwutupian" style="font-size: 210px;color:#ccc;"></i>
                                                  </template>
                                                  <template v-else>
                                                      <img :src="it.img" style="vertical-align: top;width:100%;border-radius: 6px;">
                                                  </template>
                                              </div>
                                          </el-col>
                                          <el-col :span="14">
                                              <div style="font-size: 22px;color: #333333;height:72px;">{{it.name}}</div>

                                              <div class="margin-top-10">
                                                  <span class="inline-block text-right">活动价：</span>
                                                  <span class="inline-block">
                                                      <span style="font-size: 26px;color: #FE6500;">{{it.price}}</span> 元
                                                      <s style="font-size: 18px;margin-left: 10px;">{{it.original_price}}元</s>
                                                  </span>
                                              </div>
                                              <div class="margin-top-10 text-center">
                                                  <a href="javascript:;" class="el-button el-button--warning" @click="goPay(it)" style="font-size: 16px;width: 140px;">
                                                      立即购买
                                                  </a>
                                                  <a href="javascript:;" class="el-button el-button--default" style="font-size: 16px;width: 140px;margin-left: 20px;">
                                                      立即咨询
                                                  </a>
                                              </div>
                                          </el-col>
                                      </el-row>
                                      <div class="margin-top-20" style='padding-left:60px;height:80px;overflow:hidden'>
                                          <span class="inline-block text-right" style="vertical-align: top;margin-left:-60px;">课程介绍：</span>
                                          <span class="inline-block" style="width: 90%;" v-html="it.description"></span>
                                      </div>
                                  </div>
                              </el-col>
                          </el-row>
                          <div class="text-right">
                            <el-pagination
                              background
                              layout="total,prev,pager,next"
                              @current-change="getProductList"
                              :page-size='query.offset'
                              :total="total">
                            </el-pagination>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
  </div>
</template>
<style>
.male-main {
  display: block;
  width: 1200px;
  margin: 0 auto;
}
.ant-tag {
  font-size: 14px;
  padding: 0 16px;
  height: 24px;
  line-height: 24px;
}
</style>

<script>
// import { mapState } from "vuex";
import { getProductList } from "@/api";
import category from "./components/category";
export default {
  name: "male",
  components: { category },
  data() {
    return {
      rows: [],
      query: {
        p: 1,
        offset: 10
      },
      total: 0,
      category_id: 0,
      orderby: "new"
    };
  },
  // watch: {
  //   category_id(val) {
  //     this.loadData();
  //   }
  // },
  // computed: {
  //   ...mapState({
  //     info: state => state.userInfo,
  //     cateList: state => state.cateList
  //   })
  // },
  created() {
    let { cate } = this.$route.query;
    this.category_id = cate || 0;
    this.getProductList(1);
  },
  methods: {
    changeOrderBy(orderby) {
      console.log(orderby);
    },
    showTotal(total) {
      return `全部 ${total} 条`;
    },
    pageSizeChange(size) {
      //console.log(current, size);
      this.query.offset = size;
      this.getProductList(1);
    },
    getProductList(page) {
      this.query.p = page || this.query.p;
      let params = { ...this.query };
      if (this.category_id) {
        params.category_id = this.category_id;
      }
      getProductList(params).then(({ data }) => {

        this.rows = data.rows;
        this.totle = data.total;
      });
    },
    goPay(it) {
      this.$router.push({
        path: "./Pay",
        query: {
          id: it.id
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.product {
  position: relative;
  padding: 25px;
  padding-left: 230px;
  overflow: hidden;
  .product-media {
    margin-left: -205px;
    width: 180px;
    height: 110px;
    img {
      display: inline-block;
      line-height: 0px;
      width: 100%;
      height: auto;
    }
    span {
      display: inline-block;
      line-height: 110px;
      vertical-align: middle;
    }
  }
  .product-body{
    float:left;
    width:100%;

  }
}
</style>
