<template>
  <div class="ant-layout-header">
    <div class="logo">
        <img src="static/images/logo-1.png" alt="logo">
    </div>
    <ul class="ant-menu ant-menu-root ant-menu-horizontal ant-menu-dark">
        <li class="ant-menu-item ant-menu-item-selected">
            <a href="/default.html">首页</a>
        </li>
        <li class="ant-menu-item hasSubmenu">
            <a>课程分类 <i class="iconfont icon-jiantou font-size-14 margin-left-10"></i></a>
            <div class="sub-menu-tip">
                <em class="arrow"></em>
                <div>
                    <ul>
                        <li v-for="it in cateList" :key='it.id'><a :href="'/default.html#m' + it.id">{{it.name}}</a></li>
                    </ul>
                </div>
            </div>
        </li>
        <li class="ant-menu-item">
            <router-link to="/male">超职商城</router-link>
        </li>
        <li class="ant-menu-item">
            <a href="/default.html#about">关于超职</a>
        </li>
    </ul>
    <div class="header-login">
        <v-button @click="$router.push('/index')" ghost>个人中心</v-button>
        <v-button @click="doLogout" ghost>退出登录</v-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Header",
  computed: {
    ...mapState({
      info: state => state.userInfo,
      cateList: state => state.cateList
    })
  }
};
</script>

<style>

</style>
