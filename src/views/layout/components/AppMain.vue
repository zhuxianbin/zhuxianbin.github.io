<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <!-- <router-view :key="key"></router-view> -->
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import { getCompanyRelationListAndSn, getAllAreasInfo } from '@/api/partnerList';
export default {
  name: 'AppMain',
  created () {
    this.getCompanys();
    this.getAreas();
  },
  methods: {
    // 注册方法
    ...mapActions(['addCompanys', 'addCompanyComp', 'addAreasInfo']),
     /**
     * 获取所属公司
     */
    getCompanys() {
      getCompanyRelationListAndSn().then(res => {
        this.addCompanys(res) // 给所属公司赋值
        this.addCompanyComp(res.list) // 给公司赋值
      }).catch((err) => {
        this.$message.error(err);
      })
    },
     /**
     * 获取城市的接口
     */
    getAreas() {
      getAllAreasInfo({level: 2}).then(res => {
        this.addAreasInfo(res)
      }).catch((err) => {
        this.$message.error(err);
      })
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100% - 84px);
  position: relative;
}
</style>
