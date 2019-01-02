<template>
  <div class="app-container">
    <!--会员名称-->
    <h3 class="pd-title">
      {{partner.details.name}}【邀请码：{{partner.details.invitationCode}}】
      <el-select v-model="partner.details.isEmployee" placeholder="是否为员工" @change="optionFun">
        <el-option label="员工合伙人" :value="1"></el-option>
        <el-option label="非员工合伙人" :value="0"></el-option>
      </el-select>
    </h3>
    <!--标签导航栏-->
    <el-tabs id="pd-nav" v-model="activeName" @tab-click="handleClick">
      <!-- <el-tab-pane label="用户管理" name="first">
        <member></member>
      </el-tab-pane> -->
      <el-tab-pane label="团队管理" name="second">
        <teammg></teammg>
      </el-tab-pane>
      <el-tab-pane label="金币明细" name="third">
        <income></income>
      </el-tab-pane>
      <el-tab-pane label="分享记录" name="fourth">
        <share-record></share-record>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { isEmployee } from "@/api/partnerList";
export default {
  data() {
    return {
      activeName: 'second'
    }
  },
  components: {
    'member': () => import('./member'),
    'teammg': () => import('./teammg'),
    'income': () => import('./income'),
    'share-record': () => import('./shareRecord')
  },
  beforeMount () {
    if (this.$route.query.subId) {
      this.$route.query.isEmployee = this.$route.query.isEmployee * 1
      this.changePartnerDetails(this.$route.query);
    }
  },
  methods: {
    // 注册方法
    ...mapActions(['changePartnerDetails']),
    handleClick(tab, event) {
        // console.log(tab, event);
    },
    // 选择是否为员工的方法
    optionFun() {
      console.log(this.partner.details.isEmployee);
      const obj = {
          id: this.partner.details.id,
          isEmployee: this.partner.details.isEmployee
        }
        isEmployee(obj).then(res => {
          console.log('修改成功');
          // 修改员工成功
        })
    }

  }
}
</script>

<style>
  .pd-title {
    font-size: 15px;
    margin: 0px;
    padding: 0px;
  }
  #pd-nav {
    margin-top: 15px;
  }
</style>

