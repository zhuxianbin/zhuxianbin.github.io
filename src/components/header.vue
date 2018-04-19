<template>

    <el-row class='cz-header' type='flex'>
        <div class="logo">
            <img src="static/images/logo-1.png" alt="logo">
        </div>
        <el-col>
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
							<el-menu-item index="2-3">
								<a href='./index.html?r=456#/male?cate=3' class="link" style='color:#fff;'>人力资源管理师</a>
							</el-menu-item>
							<el-menu-item index="2-4">
								<a href='./index.html?r=789#/male?cate=4' class="link" style='color:#fff;'>ACI国际注册营养师</a>
							</el-menu-item>
						</el-submenu>
						<el-menu-item index="3">
							<router-link to="/male" class="link">超职商城</router-link>
							<!-- <a href="/default.html#about"  target="_blank">超职商城</a> -->
						</el-menu-item>
						<el-menu-item index="4"><a href="/default.html#about" class="link" target="_blank">关于超职</a></el-menu-item>
					</el-menu>
            <!-- <ul class="ant-menu ant-menu-root ant-menu-horizontal ant-menu-dark">
                <li class="ant-menu-item ant-menu-item-selected">
                    <a href="/default.html">首页</a>
                </li>
                <li class="ant-menu-item hasSubmenu">
                    <a>课程分类
                        <i class="iconfont icon-jiantou font-size-14 margin-left-10"></i>
                    </a>
                    <div class="sub-menu-tip">
                        <em class="arrow"></em>
                        <div>
                          
                            <ul>
                                <li>
                                    <a href='./static/course_01.html'>ACI心理咨询师课程</a>
                                </li>
                                <li>
                                    <a href='./index.html?r=123#/male?cate=5'>专科/本科教育</a>
                                </li>
                                <li>
                                    <a href='./index.html?r=456#/male?cate=3'>人力资源管理师</a>
                                </li>
                                <li>
                                    <a href='./index.html?r=789#/male?cate=4'>ACI国际注册营养师</a>
                                </li>
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
                <span style='color:#333;margin-right:20px;font-size:18px;'>{{info.user.phone}}</span>
                <el-button @click="$router.push('/index')">个人中心</el-button>
                <el-button @click="doLogout">退出登录</el-button>
            </div> -->

        </el-col>
        <div style='width:250px;padding:14px;'>
            <el-button-group>
                <el-button size="small" @click="$router.push('/index')">个人中心</el-button>
                <el-button size="small" @click="doLogout">退出登录</el-button>
            </el-button-group>
        </div>
    </el-row>
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
}
</style>
