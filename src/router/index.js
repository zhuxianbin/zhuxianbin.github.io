import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)
import Layout from '../views/layout/Layout'
import partnerRouter from './r-partner'
import vehicleRouter from './r-vehicle'
import commission from './r-commission'
import finance from './r-finance'
import marketing from './r-marketing'
/**
* hidden: true                   如果“隐藏：true”将不会显示在侧栏中（默认为false）
* alwaysShow: true               如果设置为true，则总是显示根菜单，不管它的子路线长度是多少
*                                如果不设置总是显示，在孩子下面只有一条路
*                                它将变成嵌套模式，否则不会显示根菜单
* redirect: noredirect           如果重定向：noredirect将不会在面包屑中重新出现
* name:"router-name"             这个名字被“keep-alive”（必须设置！！！）
* meta : {
    title: "title"               在子菜单和面包屑中显示名称（推荐设置）
    icon: "svg-name"             侧边栏的图标显示,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   name: 'Dashboard',
  //   // hidden: true,
  //   children: [{
  //     path: 'dashboard',
  //     meta: { title: '首页', icon: 'home' },
  //     component: () => import('@/views/dashboard/index')
  //   }]
  // },

  // 合伙人入口
  {
    path: '/',
    component: Layout,
    redirect: '/partnerGM',
    name: 'Company',
    meta: { title: '运营管理', icon: 'home', authority: 'HHR_OPERATION_MANAGEMENT' },
    children: [
      {...partnerRouter},
      {...marketing},
      {...vehicleRouter},
      {...commission},
      {...finance}

    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: "history", //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
