<template>
  <div style="padding:15px">
    <div style="overflow:hidden;">
      <el-table ref="myTable" default-expand-all :data="rows" class="mb-20" stripe>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table :data="props.row.sub_orders" v-if="props.row.sub_orders">
              <el-table-column label="期数" prop="instalment_num"></el-table-column>
              <el-table-column label="金额" align="center">
                <template slot-scope="scope">
                  ¥ {{scope.row.price/100}}
                </template>
              </el-table-column>
              <el-table-column label="到期付款日" prop="due_time" align="center">
              </el-table-column>
              <el-table-column label="状态" align="center">
                <template slot-scope="scope">
                  {{["待支付","部分支付","支付成功"][scope.row.status]}}
                </template>
              </el-table-column>
              <el-table-column label="操作" align="right">
                  <template slot-scope="scope">
                    <el-button size="small" @click="doPay(scope.row)" :disabled="!scope.row.can_pay" v-if="scope.row.status==0" type="success">去支付</el-button>
                  </template>
              </el-table-column>
            </el-table>
            <div class="text-center not-split" v-else>此订单无分期</div>
          </template>
        </el-table-column>
        <el-table-column width="180" prop="order_id" label="订单号">
        </el-table-column>
        <el-table-column show-overflow-tooltip  prop="product_name" label="课程名称">
        </el-table-column>
        <el-table-column width="140" prop="price" label="订单价格">
          <template slot-scope="scope">
            ¥ {{scope.row.price/100}}
          </template>
        </el-table-column>
        <el-table-column width="120" label="支付状态">
          <template slot-scope="scope">
            {{status[scope.row.status]}}
          </template>
        </el-table-column>
        <el-table-column width="180" label="下单时间">
          <template slot-scope="scope">
            {{scope.row.starttime}}
          </template>
        </el-table-column>
        <el-table-column width="200" align="right" label="操作">
          <template slot-scope="scope">
              <div v-if="scope.row.status==2">
                <el-button size="small" @click="doOption(scope.row)" type="primary">学员协议</el-button>
                <a type="button" target="_blank" :href="getPIAO(scope.row)" class="el-button el-button--small el-button--text"><!----><!----><span>电子收据</span></a>
              </div>
              <template v-if="!scope.row.is_split">
                <el-button size="small" @click="doPay(scope.row)" v-if="scope.row.status==0" type="success">去支付</el-button>
                <el-button size="small" @click="doOption(scope.row)" v-if="scope.row.status<0&&!scope.row.old" type="warning">重新下单</el-button>
              </template>
              
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="text-right">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div> -->
    <el-dialog :visible.sync="dialogs.show" top="5vh" title="学员协议">
      <div class='dialog-agreement'>
        <div class='dialog-agreement-content' v-html="dialogs.data"></div>
      </div>
    </el-dialog>
    
  </div>
</template>

<script>
import api from "@/utils/api";
import { getToken } from "@/utils/auth";
import { baseUrl } from "@/utils/config";
export default {
  data() {
    return {
      query: {
        size: 10,
        page: 1
      },
      rows: [],
      dialogs: {
        show: false,
        data: ""
      },
      status: {
        "-2": "订单超时",
        "-1": "订单取消",
        "0": "待支付",
        "2": "支付完成"
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

        this.$nextTick(() => {
          document.querySelectorAll(".not-split").forEach(element => {
            element.parentElement.remove();
          });
        });
      });
    },
    doOption(item) {
      if (item.status <= 0) {
        return this.$router.push({
          path: "./pay",
          query: { id: item.product_id }
        });
      }
      if (item.status == 2) {
        //return this.$router.push(``);
        this.getAgreement(item.id);
      }
    },
    doPay(item) {
      return this.$router.push({
        path: "./pay",
        query: { order_id: item.order_id }
      });
    },
    getAgreement(order_id) {
      api.getAgreement({ order_id }).then(res => {
        console.log(res);
        this.dialogs.show = true;
        this.dialogs.data = res.agreement || "";
      });
    },
    getPIAO(item) {
      return `${baseUrl}/api/orders/receipt?order_id=${
        item.id
      }&token=${getToken()}`;
    }
  },
  created() {
    this.getRows();
  },
  mounted() {}
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
