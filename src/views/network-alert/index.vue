<template>
  <div class="app-container">
    <el-radio-group v-model="tabPosition" style="margin-bottom: 20px;">
      <el-radio-button label="0">地图</el-radio-button>
      <el-radio-button label="1" disabled>列表</el-radio-button>
    </el-radio-group>
    
    <div>
      <net-map v-if="tabPosition == 0"></net-map>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabPosition: '0'
    };
  },
  components: {
    "net-map": () => import("./map.vue")
  }
};
</script>

<style>
.map {
  min-width: 800px;
  min-height: 600px;
}
</style>


