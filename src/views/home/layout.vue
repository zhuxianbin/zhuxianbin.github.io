<template>
	<div class="home">
		<div class="header">
			<div class="header-top">
				<div class="container">
						<div class="pull-left">
							<img class="header-top-logo" src='/static/images/v2/logo_black.png' />
						</div>
						<div class="pull-right">
							<template v-if="!userinfo">
								<router-link class="link" to="/login">登录</router-link>
								<router-link class="link" to="/login/register">注册</router-link>
							</template>
						</div>
				</div>
			</div>
			<div class="header-body">
				<div class="container">
					<el-row>
						<el-col :span="5">
							<img class="header-logo" src='/static/images/v2/logo_big.png' />
						</el-col>
						<el-col :span="16">
							<div class="search">
								<div class="search-input">
									<input type="text" @keyup.enter='doSearch' v-model='keyword' placeholder="请输入您要搜索的课程">
								</div>
								<div class="search-submit">
									<button @click='doSearch'>搜索</button>
								</div>
							</div>
						</el-col>
						<el-col :span="3">
							
						</el-col>
					</el-row>
				</div>
			</div>
			<div class="header-nav">
				<div class="container">
					<el-row>
						<el-col :span="5">
							<div class="menu" :class="{active:!!$route.meta.openMenu}">
								<div class="menu-target">全部课程</div>
								<div class="menu-body">
									<div class="menu-body-padd">
										<div v-for='item in cateList' :key="item.id">
											<div class="menu-title">{{item.name}}</div>
											<div class="menu-sub">
												<template v-for='child in item.children'>
													<a :key='child.id'>{{child.name}}</a>
												</template>
											</div>
										</div>
									</div>
								</div>
							</div>
						</el-col>
						<el-col :span="19">
							<div class="nav">
								<router-link to="/">首页</router-link>
								<router-link to="/male">选课</router-link>
								<router-link to="/teacher">名师</router-link>
								<router-link to="/">资讯</router-link>
								<router-link to="/about">超职</router-link>
							</div>
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
		<div class="main">
			<keep-alive>
				<router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</div>
		<div class="footer">
			<div class="container">
				<el-row>
					<el-col :span="16">
						<div class="links">
							<a>企业合作</a>
							<a>人才招聘</a>
							<a>联系我们</a>
							<a>讲师招募</a>
							<a>常见问题</a>
							<a>意见反馈</a>
							<a>慕课大学</a>
							<a>友情链接</a>
						</div>

						<div>Copyright © 2018 chaozhidu.com Inc. All rights reserved. </div>
						<div>京ICP证050421号 京ICP备05067669号</div>
						<div>

						</div>
					</el-col>
					<el-col :span="8" class="t-center">

					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
import "swiper/dist/css/swiper.min.css";
import "@/assets/less/home.less";
import { mapState } from "vuex";
export default {
  data() {
    return {
      userinfo: null,
      keyword: ""
    };
  },
  computed: {
    ...mapState({
      cateList: state => state.cateList
    })
  },
  methods: {
    doSearch() {
      window.location.hash = `/male?keyword=${this.keyword}`;
    }
  }
};
</script>

<style>
</style>