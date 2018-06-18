<template>
  <div style="padding:15px;">
    <el-table :data="rows" stripe>
      <el-table-column width="180" prop="order_id" label="订单号">
      </el-table-column>
      <el-table-column min-width="320" prop="product_name" label="课程名称">
      </el-table-column>
      <el-table-column width="140" prop="price" label="订单价格">
        <template slot-scope="scope">
          ¥ {{scope.row.price/100}}
        </template>
      </el-table-column>
      <el-table-column width="120" label="支付状态">

      </el-table-column>
      <el-table-column width="180" label="下单时间">
        <template slot-scope="scope">
          {{scope.row.starttime}}
        </template>
      </el-table-column>
      <el-table-column width="140" label="操作">
        <template slot-scope="scope">
          <div class='text-center'>
            <div v-if="scope.row.status==2">
              <el-button @click="doOption(scope.row)" type="primary">学员协议</el-button>
              
              <a type="button" target="_blank" :href="getPIAO(scope.row)" class="el-button el-button--text"><!----><!----><span>电子收据</span></a>
            </div>
            <el-button @click="doOption(scope.row)" v-if="scope.row.status==0" type="success">去支付</el-button>
            <el-button @click="doOption(scope.row)" v-if="scope.row.status<0&&!scope.row.old" type="warning">重新下单</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogs.show" top="5vh" title="学员协议">
      <div class='dialog-agreement'>
        <div class='dialog-agreement-content' v-html="dialogs.data"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from "@/utils/api";
import { baseURL, Token } from "@/utils/config";
export default {
  data() {
    return {
      rows: [],
      dialogs: {
        show: false,
        data: ""
      }
    };
  },
  methods: {
    getRows() {
      api.getOrderList().then(({ code, data }) => {
        let temp = [];
        this.rows = data.map(item => {
          if (temp.indexOf(item.product_id) < 0) {
            temp.push(item.product_id);
          } else {
            item.old = true;
          }
          return item;
        });
      });
    },
    doOption(item) {
      if (item.status <= 0) {
        return this.$router.push(`/pay/${item.product_id}`);
      }

      if (item.status == 2) {
        //return this.$router.push(``);
        this.getAgreement(item.id);
      }
    },
    getAgreement(order_id) {
      api.getAgreement({ order_id }).then(res => {
        console.log(res);
        this.dialogs.show = true;
        this.dialogs.data = res.agreement || "";
      });
    },
    getPIAO(item) {
      let token = Token();
      return `${baseURL}/api/orders/receipt?order_id=${item.id}&token=${token}`;
    }
  },
  created() {
    this.getRows();
  }
};
</script>

<style lang="less">
.dialog-agreement {
  height: 500px;
  overflow: auto;
  position: relative;
  .dialog-agreement-content {
    background: url("/static/images/zhang.png") no-repeat 60% bottom;
    background-size: 200px;
  }
}
</style>
