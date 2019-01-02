<template>
  <div class="app-container">
    <baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="14">
      <bml-heatmap :data="data" :max="100" :radius="20"></bml-heatmap>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
    </baidu-map>
  </div>
</template>

<script>
import { BmlHeatmap } from "vue-baidu-map";
export default {
  data() {
    return {
      data: [
        { lng: 116.418261, lat: 39.921984, count: 50 },
        { lng: 116.423332, lat: 39.916532, count: 51 },
        { lng: 116.419787, lat: 39.930658, count: 15 }
        // ...此处添加更多的数据集
      ]
    };
  },
  components: {
    BmlHeatmap
  }
};
</script>

<style>
.map {
  min-width: 100%;
  height: 700px;
  border-radius: 10px;
  overflow: hidden;
}
.BMap_cpyCtrl {
  display: none;
}
.anchorBL {
  display: none;
}
</style>

