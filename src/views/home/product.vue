<template>
  <div>
    <div class='sub-banner mb-20'>
      <div class='container'>
        <div class='product'>
          <div></div>
          <el-row :gutter="25">
            <el-col :span='8'>
              <img class='img-r' :src='detail.img'>
            </el-col>
            <el-col :span='16'>
              <div class='product-title'>{{detail.name}}</div>
                <div class='product-subtitle'>
                    {{detail.sub_name}}
                </div>
                <div class='product-price'>
                  <span>价格</span>
                  <span class='t-22 t-orange'>￥ {{detail.price}}</span>
                  <s class='t-gray inline-block ml-10'>￥ {{detail.original_price}}</s>
                </div>
                <div class='product-tags'>
                  <el-tag v-for='(tag) in detail.tags' :type='setTagStyle()' size="small" :key='tag'>{{tag}}</el-tag>
                </div>
              <div>
                <el-button type="danger" @click='goPay()'>立即购买</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class='container'>
      <el-row :gutter="20">
        <el-col :span='19'>
          <el-tabs class='detail'>
            <el-tab-pane label="课程详情">
              <div class='detail-body' v-html='detail.description'></div>
            </el-tab-pane>
            <el-tab-pane label="课程大纲">
              <div class='detail-body' v-html='detail.syllabus'></div>
            </el-tab-pane>
            <el-tab-pane label='课程评价'>
              <div class='detail-body'></div>
            </el-tab-pane>
            <el-tab-pane label='师资'>
              <div class='detail-body'></div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span='5'>
          <div class='panel'>
            <div class='panel-title'>公告</div>
            <div class='panel-body'>
              <p>
                行政自考本科，211学校现在可以报名啦~10月10日截止。
              </p>
            </div>
          </div>
          <div class='panel'>
            <div class='panel-title'>最新学员</div>
            <div class='panel-body'>
              <div>
                <img>
                <img>
                <img>
                <img>
                <img>
                <img>
                <img>
                <img>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getProductInfo } from "@/api";
export default {
  data() {
    return {
      youshi: [
        "金牌名师助阵",
        "一站式报考服务",
        "名师私教直播",
        "教室题库赠送",
        "高含金量题库",
        "社群免费答疑"
      ],

      productId: "",
      detail: {}
    };
  },
  methods: {
    goPay() {
      this.$router.push({
        name: "pay",
        query: {
          id:this.productId
        }
      });
    },
    getProductInfo() {
      getProductInfo({ id: this.productId }).then(({ data }) => {
        const [detail] = [data].map(item => {
          item.tags = item.tags ? item.tags.split(",") : [];
          return item;
        });
        this.detail = detail;
        console.log(this.detail);
      });
    },
    setTagStyle() {
      const tagStyles = ["success", "success", "info", "warning", "danger"];
      var num = Math.floor(Math.random() * tagStyles.length + 1);
      return tagStyles[num];
    }
  },
  created() {
    const { id } = this.$route.params;
    this.productId = id;
    this.getProductInfo();
  }
};
</script>

<style lang="less" scoped>
.sub-banner {
  padding: 40px 0 50px;
  background: url("/static/images/v2/bg_samll.jpg") no-repeat center;
}

.product {
  padding: 20px;
  background: #fff;
  border-radius: 3px;
  line-height: 30px;

  .product-price {
    font-size: 12px;
    color: #bbb;
    margin-bottom: 10px;
  }
  .product-title {
    font-size: 18px;
    font-weight: bold;
  }
  .product-subtitle {
    color: #666;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .product-tags {
    margin-bottom: 20px;
    .el-tag {
      margin-right: 5px;
    }
  }
}

.panel {
  display: block;
  margin: 0 auto;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0 5px 12px 0 rgba(217, 226, 233, 0.5);
  margin-bottom: 20px;

  .panel-title {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #eee;
    padding: 0 10px;
  }
  .panel-body {
    padding: 10px;
    img {
      width: 30px;
      height: 30px;
      border-radius: 30px;
      display: inline-block;
      line-height: 0;
      margin: 3px;
    }
  }
}
</style>
<style lang="less">
.detail {
  background: #fff;
  border-radius: 3px;
  padding: 0 10px;

  .detail-body {
    padding: 10px;
    min-height: 600px;
    img {
      display: block;
      max-width: 100%;
      height: auto;
    }
  }
  .el-tabs__nav-wrap {
    padding-left: 20px;
  }
}
</style>


