<template>
  <el-container>
    <el-header>
      <layoutHeader :full='false'></layoutHeader>
    </el-header>
    <el-container>
      <el-main>
        <div style="margin:-20px;margin-bottom:0;">
          <img src="/static/images/Group8.png" style='width:100%;' />
        </div>
        <div class="male-main">
        
          <div class="ant-layout">
              <div class="ant-layout ant-layout-has-sider">
                
                  <div class="ant-layout" style="padding: 20px 0;background: #fff;">
                    
                      <div style="width: 1200px;margin: 0 auto;background: #fff;">
                          <div style="margin-bottom: 10px;font-size: 16px;">超职商城欢迎您</div>

                          <div style='padding:15px;border:1px solid #eee;margin-bottom:15px;'>
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
                          </div>
                          <el-row :gutter="30">
                              <el-col :span="12" v-for="it in rows" :key="it.id">
                                  <div class="padding-10 margin-bottom-15" style="border: 1px solid #E8E8E8;border-radius: 6px;">
                                      <el-row :gutter="layout.gutter">
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
                                                  <a href="javascript:;" @click="doKF" class="el-button el-button--default" style="font-size: 16px;width: 140px;margin-left: 20px;">
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
                              layout="sizes,prev,pager,next"
                              @current-change="changePage"
                              @size-change="pageSizeChange"
                              :page-size='page.offset'
                              :total="page.total">
                            </el-pagination>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
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
import { mapState } from "vuex";
import layoutHeader from "@/components/header.vue";

export default {
  name: "Index",
  components: { layoutHeader },
  data() {
    return {
      layout: {
        gutter: 20,
        span: 12
      },
      rows: [],
      page: {
        p: 1,
        total: 1,
        offset: 10
      },
      //cateList: []
      category_id: 0
    };
  },
  watch: {
    category_id(val) {
      this.loadData();
    }
  },
  computed: {
    ...mapState({
      info: state => state.userInfo,
      cateList: state => state.cateList
    })
  },
  methods: {
    showTotal(total) {
      return `全部 ${total} 条`;
    },
    pageSizeChange(size) {
      //console.log(current, size);
      this.page.offset = size;
      this.loadData();
    },
    changePage(a) {
      this.page.p = a;
      this.loadData();
    },
    loadData() {
      let params = {
        p: this.page.p,
        offset: this.page.offset
      };
      if (this.category_id) {
        params.category_id = this.category_id;
      }
      this.$czapi.getProductList(params).then(({ data }) => {
        this.page.total = data.total;
        this.rows = data.rows;
      });

      /*var data = {
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
                                          "img": "",
                                          "description": "是我校理、工、经管类本科生必修的一门重要的基础课。也是工学、经济学硕士研究生入学考试的门必考科目"
                                      }
                                  ]
                              }
                          };
                          vm.page.total = data.data.total;
                          this.info = data.data.row;*/
    },

    goPay(it) {
      this.$router.push({
        path: "./Pay",
        query: {
          id: it.id
        }
      });
    },
    doKF() {
      let kfs = $(".doyoo_link.doyoo_online");
      if (kfs.length) {
        $(kfs[0]).click();
      } else {
        this.$message.info("当前没有在线的老师,请拨打客服热线： 010-51657777");
      }
    }
  },
  mounted() {
    let { query: { cate } } = this.$route;
    this.category_id = cate || 0;
    this.loadData();
  },
  activated() {
    let doyoo = document.getElementById("doyoo_panel");
    if (doyoo) {
      doyoo.style.display = "block";
    }
  },
  deactivated() {
    let doyoo = document.getElementById("doyoo_panel");
    if (doyoo) {
      doyoo.style.display = "none";
    }
  }
};
</script>
<style lang="less" scoped>
.male-main {
  .el-tag {
    font-size: 14px;
    padding: 0 25px;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
  }
  .el-tag--warning {
    background: #f56a00;
    border-color: #f56a00;
    color: #fff;
  }
}
</style>
