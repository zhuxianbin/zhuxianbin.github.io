<template>
    <el-container>
        <el-header><layout-header></layout-header></el-header>
        <el-container>
            <el-aside width="200px">
                <div class="color-9 padding-15">我的超职管理后台</div>
                <el-menu
                router
                :default-active="defaultActive"
                class="el-menu-vertical-demo">
                  <el-menu-item index="index">
                      <i class="iconfont icon-shouye"></i>
                      <span slot="title">我的首页</span>
                  </el-menu-item>
                  <el-menu-item index="info" v-if='info.orders'>
                      <i class="iconfont icon-baoming"></i>
                      <span slot="title">我的报考资料</span>
                  </el-menu-item>
                  <el-menu-item index="livelist">
                      <i class="iconfont icon-kecheng"></i>
                      <span slot="title">我的直播课程</span>
                  </el-menu-item>
                  <el-menu-item index="courselist">
                      <i class="iconfont icon-kecheng"></i>
                      <span slot="title">我的预习课程</span>
                  </el-menu-item>
                  <el-menu-item index="filelist">
                      <i class="iconfont icon-kecheng"></i>
                      <span slot="title">我的学习资料</span>
                  </el-menu-item>
                  <el-menu-item index="orders">
                      <i class="iconfont icon-kecheng"></i>
                      <span slot="title">我的课程订单</span>
                  </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main class="cz-main">
                <div class="cz-main-body">
                    <router-view></router-view>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import layoutHeader from "@/components/header.vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "Layout",
  components: { layoutHeader },
  data() {
    return {
      defaultActive: "index"
    };
  },
  computed: {
    ...mapState({
      info: state => state.userInfo
      //cateList: state => state.cateList
    })
  },
  watch: {
    $route(val) {
      //console.log(val);
      this.defaultActive = val.name.toLowerCase();
    }
  },
  methods: {
    ...mapActions({
      getUserInfo: "USER_INFO",
      getCateList: "CATE_LIST"
    })
  },
  created() {
    this.getUserInfo();
    this.getCateList();
  },
  activated() {
    this.defaultActive = this.$route.name.toLowerCase();
  }
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo {
  border-right: none;
  .el-menu-item {
    height: 50px;
    line-height: 50px;
    &.is-active {
      color: #fff;
      background: #222;
      border-right: 10px solid #fe6500;
    }
  }
}
.cz-main {
  background: #ececec;
  .cz-main-body {
    background: #fff;
    min-height: 570px;
  }
}
</style>
