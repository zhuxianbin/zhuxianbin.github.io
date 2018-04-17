<template>
    <el-container>
        <el-header><layout-header></layout-header></el-header>
        <el-container>
            <el-aside width="200px">
                <div class="color-9 padding-15">我的超职管理后台</div>
                <el-menu
                router
                default-active="index"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose">
                <el-menu-item index="index">
                    <i class="iconfont icon-shouye"></i>
                    <span slot="title">我的首页</span>
                </el-menu-item>
                <el-menu-item index="info">
                    <i class="iconfont icon-baoming"></i>
                    <span slot="title">我的报考资料</span>
                </el-menu-item>
                <el-menu-item index="courselist">
                    <i class="iconfont icon-kecheng"></i>
                    <span slot="title">我购买的课程</span>
                </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main class="cz-main">
                <div class="cz-main-body">
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import layoutHeader from "@/components/header.vue";

export default {
  name: "Layout",
  components: { layoutHeader }
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
      background: #56509f;
      border-right: 10px solid #fe6500;
    }
  }
}
.cz-main {
  background: #ececec;
  .cz-main-body{
      background: #fff;
      min-height: 570px;
  }
}
</style>
