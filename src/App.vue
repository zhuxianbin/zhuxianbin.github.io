<template>
    <div id="app">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
// import $ from "jquery";
import { mapActions } from "vuex";
export default {
  name: "App",
  methods: {
    ...mapActions({
      getUserInfo: "USER_INFO",
      getCateList: "CATE_LIST"
    })
  },
  mounted() {
    
    this.getUserInfo();

    this.getCateList();
    // this.$czapi
    //   .getUserInfo()
    //   .then(function(data) {
    //     vm.info = data;
    //   })
    //   .fail(function(data) {
    //     vm.info = data;
    //   });
  }
};
</script>

<style>
#app .sub-menu-tip {
  width: auto;
}
</style>
