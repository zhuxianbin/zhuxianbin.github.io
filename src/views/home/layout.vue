<template>
	<div class="home">
		<div class="header">
			<div class="header-top">
				<div class="container">
					<el-row>
						<el-col :span="12">
							超职小logo
						</el-col>
						<el-col :span="12" class="t-right">
							<template v-if="!userinfo">
								<router-link to="/login">登录</router-link>
								<router-link to="/login/register">注册</router-link>
							</template>
						</el-col>
					</el-row>
				</div>
			</div>
			<div class="header-body">
				<div class="container">
					<el-row>
						<el-col :span="5">
							大logo
						</el-col>
						<el-col :span="16">
							<div class="search">
								<div class="search-input">
									<input type="text">
								</div>
								<div class="search-submit">
									<button>搜索</button>
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
							<div class="menu active">
								<div class="menu-target">全部课程</div>
								<div class="menu-body">
									<div class="menu-body-padd">
										<div class="menu-title">职业教育</div>
										<div class="menu-sub">
											<a>心理咨询师</a>
											<a>消防工程师</a>
										</div>

										<div class="menu-title">学历教育</div>
										<div class="menu-sub">
											<a>自考本科</a>
											<a>自考专升本</a>
										</div>

										<div class="menu-title">职业教育</div>
										<div class="menu-sub">
											<a>心理咨询师</a>
											<a>营养师</a>
										</div>
									</div>
								</div>
							</div>
						</el-col>
						<el-col :span="19">
							<div class="nav">
								<router-link to="/">首页</router-link>
								<router-link to="/">选课</router-link>
								<router-link to="/">名师</router-link>
								<router-link to="/">资讯</router-link>
								<router-link to="/">超值</router-link>
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
import "@/assets/less/home.less";
export default {
  data() {
    return {
      userinfo: null
    };
  }
};
</script>

<style>
</style>