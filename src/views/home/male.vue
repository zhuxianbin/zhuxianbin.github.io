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
            <div class='bin-panel-more'>
              <el-pagination
                  class='mt-10'
                  layout="prev,slot,next"
                  @current-change="getProductList"
                  :page-size='query.offset'
                  :total="total">
                  <span class='t-center'><b class='t-orange'>{{query.p}}</b>/{{totalPage}}页</span>
                </el-pagination>
            </div>
          </div>
          <div class='bin-panel-body'>
            <template v-for='item in rows'>
              <div class="product" :key='item.id'>
                <div class='product-media'>
                  <img :src='item.img'>
                </div>
                <div class='product-body'>
                    <div class='clearfix'>
                      <div class='pull-left'>
                          <a class='product-title'>{{item.name}}</a>
                          <div class='product-subtitle'>
                              副标题
                          </div>
                          <div class='product-price'>
                            <span class='t-18 t-orange'>￥ {{item.price}}</span>
                            <s class='t-gray inline-block ml-10'>￥ {{item.original_price}}</s>
                          </div>
                          <div class='product-tags'>

                          </div>
                      </div>
                      <div class='pull-right'>
                        <div class="mt-30">
                          <el-button plain type='warning' size="small">查看详情</el-button>
                        </div>
                        <div class='mt-10'>
                          <el-button type='success' size="small">立即购买</el-button>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="t-center mt-20">
          <el-pagination
            layout="total,prev,pager,next"
            @current-change="getProductList"
            :page-size='query.offset'
            :total="total">
          </el-pagination>
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
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.query.offset);
    }
  },
  created() {
    let { cate } = this.$route.query;
    this.category_id = cate || 0;
    this.getProductList(1);
  },
  methods: {
    changeOrderBy(orderby) {
      console.log(orderby);
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
        this.total = data.total;
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
  border-bottom: 1px solid #e6e6e6;

  transition: all 0.3s;
  &:hover {
    background: #fefefe;
    .product-media {
      // transform: scale(1.05);
      transform: translateX(5px)
    }
  }

  .product-media {
    float: left;
    margin-left: -205px;
    width: 180px;
    height: 120px;
    overflow: hidden;
    transition: all 0.3s;
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
  .product-body {
    float: left;
    width: 100%;
    line-height: 26px;
  }

  .product-title {
    display: block;
    font-size: 14px;
    font-weight: bold;
    color: #666;
    &:hover {
      color: #f80;
    }
  }

  .product-subtitle {
    font-size: 14px;
    color: #666;
  }

  .product-price {
    padding: 5px 0;
  }

  .product-tags {
    .product-tag {
      display: inline-block;
      line-height: 24px;
      height: 24px;
      padding: 0 20px;
      background: #f2f2f2;
    }
  }
}
</style>
