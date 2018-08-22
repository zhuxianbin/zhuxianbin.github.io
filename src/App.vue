<template>
      <router-view></router-view>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "App",
  methods: {
    ...mapActions({
      // getUserInfo: "USER_INFO",
      getCateList: "CATE_LIST"
    })
  },
  
  mounted() {
    // this.getUserInfo();
    this.getCateList();
  }
};
</script>

