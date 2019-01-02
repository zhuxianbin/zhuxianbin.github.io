<template>
  <div>
    <!--订单效果-->
    <div class="conet-d1">
      <span>订单编号：{{orderData.rt.ordersDetailNo}}</span>
      <span>订单状态：{{getterState(orderData.rt)}}</span>
      <div style="clear:both"></div>
    </div>
    <!--一级返佣-->
    <div class="conet-d2" v-if="orderData.one">
      <div class="conet-d2-d1">
        <span>一级返佣：{{orderData.one.amount ? orderData.one.amount : 0 }}元/{{orderData.one.stagingNum ? orderData.one.stagingNum : 1}}期</span>
        <span>领取人：{{orderData.one.name}}</span>
        <div style="clear:both"></div>
      </div>
      <div class="conet-d2-d2">
        <div class="conet-d2-d2-t">
          <span class="s1">返佣总额：{{orderData.one.amount ? orderData.one.amount : 0}}</span>
          <span class="s2">返佣期数：{{orderData.one.stagingNum ? orderData.one.stagingNum : 0}}期</span>
          <div style="clear:both"></div>
        </div>

        <div class="conet-d2-d2-t">
          <span class="s1">已到账：{{orderData.one.arrivalAmount ? orderData.one.arrivalAmount : 0}}</span>
          <span class="s2">已返期数：{{orderData.one.arrivalNum ? orderData.one.arrivalNum : 0}}期</span>
          <div style="clear:both"></div>
        </div>

        <div class="conet-d2-d2-t">
          <span class="s1">发放状态：<i :style="oneState.style">{{oneState.str}}</i></span>
          <span class="s2"></span>
          <div style="clear:both"></div>
        </div>
      </div>
    </div>

    <!--二级返佣-->
    <div class="conet-d2" v-if="orderData.two">
      <div class="conet-d2-d1">
        <span>二级返佣：{{orderData.two.amount ? orderData.two.amount : 0 }}元/{{orderData.two.stagingNum ? orderData.two.stagingNum : 1}}期</span>
        <span>领取人：{{orderData.two.name}}</span>
        <div style="clear:both"></div>
      </div>
      <div class="conet-d2-d2">
        <div class="conet-d2-d2-t">
          <span class="s1">返佣总额：{{orderData.two.amount ? orderData.two.amount : 0}}</span>
          <span class="s2">返佣期数：{{orderData.two.stagingNum ? orderData.two.stagingNum : 0}}期</span>
          <div style="clear:both"></div>
        </div>

        <div class="conet-d2-d2-t">
          <span class="s1">已到账：{{orderData.two.arrivalAmount ? orderData.two.arrivalAmount : 0}}</span>
          <span class="s2">已返期数：{{orderData.two.arrivalNum ? orderData.two.arrivalNum : 0}}期</span>
          <div style="clear:both"></div>
        </div>

        <div class="conet-d2-d2-t">
          <span class="s1">发放状态：<i :style="twoState.style">{{twoState.str}}</i></span>
          <span class="s2"></span>
          <div style="clear:both"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['orderData'],
  data() {
    return {

    }
  },
  computed: {
    oneState() {
      // 先判断订单状态
      let logType = '';
      if (this.orderData.rt.isRunning == '1') {
        logType = '0'; // 进行中
      } else if (this.orderData.rt.isTimeout == '1' && this.orderData.rt.isOver == '1') {
        logType = '1'; // 该订单已超时
      } else if (this.orderData.rt.isPaid == '1' && this.orderData.rt.isOver == '1') {
        logType = '2'; // 已结束
      } else if (this.orderData.rt.isOver == '1') {
        logType = '2'; // 已结束
      } else {
        logType = '3'; // 未开始
      }
      // 判断其他
      let ob = {};
      /**
       * status {0: 开启, 1: 代表取消}
       */
      if (this.orderData.one.status == 1) {
        ob = {style: 'color:#DC4E41', str: '发放中止'}
      } else {
        if (this.orderData.one.arrivalAmount * 1 == this.orderData.one.amount) {
           ob = {style: 'color:#007ACC', str: '发放完毕'}
        } else if (this.orderData.one.arrivalAmount * 1 == 0) {
           ob = {style: 'color:#F39A0E', str: '尚未发放'}
        } else if (this.orderData.one.arrivalAmount < this.orderData.one.amount) {
          if (logType == '0' || logType == '1' || logType == '3') {
            ob = {style: 'color:#18A05E', str: '发放中'}
          } else {
            ob = {style: 'color:#DC4E41', str: '发放中止'}
          }
        }
      }
      return ob;
    },
   twoState() {
      // 先判断订单状态
      let logType = '';
      if (this.orderData.rt.isRunning == '1') {
        logType = '0'; // 进行中
      } else if (this.orderData.rt.isTimeout == '1' && this.orderData.rt.isOver == '1') {
        logType = '1'; // 该订单已超时
      } else if (this.orderData.rt.isPaid == '1' && this.orderData.rt.isOver == '1') {
        logType = '2'; // 已结束
      } else if (this.orderData.rt.isOver == '1') {
        logType = '2'; // 已结束
      } else {
        logType = '3'; // 未开始
      }
      // 判断其他
      let ob = {};
      /**
       * status {0: 开启, 1: 代表取消}
       */
      if (this.orderData.two.status == 1) {
        ob = {style: 'color:#DC4E41', str: '发放中止'}
      } else {
        if (this.orderData.two.arrivalAmount * 1 == this.orderData.two.amount) {
          ob = {style: 'color:#007ACC', str: '发放完毕'}
        } else if (this.orderData.two.arrivalAmount * 1 == 0) {
          ob = {style: 'color:#F39A0E', str: '尚未发放'}
        } else if (this.orderData.two.arrivalAmount < this.orderData.two.amount) {
        if (logType == '0' || logType == '1' || logType == '3') {
            ob = {style: 'color:#18A05E', str: '发放中'}
          } else {
            ob = {style: 'color:#DC4E41', str: '发放中止'}
          }
        }
      }
      return ob;
   }
  },
  methods: {
    // 处理订单状态的方法
    getterState(row) {
      if (row.isRunning == '1') {
        return '进行中'
      } else if (row.isTimeout == '1' && row.isOver == '1') {
        return '该订单已超时'
      } else if (row.isPaid == '1' && row.isOver == '1') {
        return '已结束'
      } else if (row.isOver == '1') {
        return '已结束'
      } else {
        return '未开始'
      }
    }
  }
}
</script>

<style>
  .conet-d1{
    font-size: 14px;
  }
  .conet-d1 :nth-child(1) {
    float: left;
  }
  .conet-d1 :nth-child(2) {
    float: right;
  }
  .conet-d2 {
    padding-top: 13px;
  }
  .conet-d2-d1 {
    font-size: 14px;
  }
  .conet-d2-d1 :nth-child(1){
    float: left;
    display: inline-block;
    margin-left: 30px;
    width: 260px;
  }
  .conet-d2-d1 :nth-child(2){
    float: left;
    display: inline-block;
    width: 160px;
  }
  .conet-d2-d2 {
    margin-top: 10px;
    background: #F2F2F2;
    padding-bottom: 10px;
  }
  .conet-d2-d2-t {
    font-size: 13px;
  }
  .conet-d2-d2-t .s1 {
    float: left;
    display: inline-block;
    margin-left: 30px;
    margin-top: 10px;
    width: 256px;

  }
  .conet-d2-d2-t .s2 {
    float: left;
    display: inline-block;
    width: 100px;
    margin-top: 10px;
  }
</style>

