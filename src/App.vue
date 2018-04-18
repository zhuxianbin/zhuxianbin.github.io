<template>
    <div id="app">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
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
    //console.log(this.$czapi);
    //console.log($.cookie("userToken"));
    // $("head").append('<link rel="stylesheet" href="static/css/admin.css">');

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
