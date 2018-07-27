<template>
    <div class="cz-header">
        <el-row class='cz-header-body' :class="{full:full}" type='flex'>
            <div class="logo">
                <img src="static/images/logo-1.png" alt="logo">
            </div>
            <el-col>
                <el-row>
                  <el-col :span="12">
                    <el-menu
                        default-active="3"
                        mode="horizontal"
                        background-color="#333"
                        text-color="#fff"
                        active-text-color="#fff">
                        <el-menu-item index="1"><a href="/default.html" class="link">首页</a></el-menu-item>
                        <el-submenu index="2">
                            <template slot="title">课程分类</template>
                            <el-menu-item index="2-1">
                                <a href='./static/course_01.html' class="link" style='color:#fff;'>ACI心理咨询师课程</a>
                            </el-menu-item>
                            <el-menu-item index="2-2">
                                <a href='./index.html?r=123#/male?cate=5' class="link" style='color:#fff;'>专科/本科教育</a>
                            </el-menu-item>
                            <!-- <el-menu-item index="2-3">
                                <a href='./index.html?r=456#/male?cate=3' class="link" style='color:#fff;'>自考专科/本科教育</a>
                            </el-menu-item> -->
                            <el-menu-item index="2-4">
                                <a href='./index.html?r=789#/male?cate=4' class="link" style='color:#fff;'>ACI国际注册营养师</a>
                            </el-menu-item>
                            <el-menu-item index="2-5">
                                <a href='./index.html?r=789#/male?cate=35' class="link" style='color:#fff;'>消防工程师</a>
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item index="3">
                            <router-link to="/male" class="link">超职商城</router-link>
                            <!-- <a href="/default.html#about"  target="_blank">超职商城</a> -->
                        </el-menu-item>
                        <el-menu-item index="4"><a href="/default.html#about" class="link" target="_blank">关于超职</a></el-menu-item>
                    </el-menu>
                  </el-col>
                  <el-col :span="12">
                    <div class='text-right' style='padding:14px;'>
                        <div class="inline-block" style="margin-right:20px;">
                            <img src="/static/images/icon-tel.png" style="height:24px;vertical-align:middle">
                            <span>010-51657777</span>
                        </div>
                        <el-button-group class="inline-block">
                            <el-button size="small" @click="$router.push('/index')">个人中心</el-button>
                            <el-button size="small" @click="doLogout">退出登录</el-button>
                        </el-button-group>
                    </div>
                  </el-col>
                </el-row>
                
            </el-col>
            
        </el-row>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Header",
  props: {
    full: {
      type: Boolean,
      default() {
        return true;
      }
    }
  },
  computed: {
    ...mapState({
      info: state => state.userInfo,
      cateList: state => state.cateList
    })
  }
};
</script>

<style lang="less" scoped>
.logo {
  width: 250px;
  img {
    display: block;
    height: 40px;
    margin: 10px 30px;
  }
}
.cz-header {
  background: #333;
  color: #fff;
  margin: 0 -20px;

  .el-menu--horizontal {
    border-bottom: 0;
  }
  .cz-header-body {
    width: 1200px;
    margin: 0 auto;
  }
  .full {
    width: 100%;
  }
}
</style>
