webpackJsonp([8],{K2oo:function(t,e){},cpAg:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("Dd8w"),n=i.n(s),a=i("Cz8s"),o=i("NYxO"),l={name:"Layout",components:{layoutHeader:a.a},data:function(){return{defaultActive:"index"}},computed:n()({},Object(o.c)({info:function(t){return t.userInfo}})),watch:{$route:function(t){this.defaultActive=t.name.toLowerCase()}},methods:n()({},Object(o.b)({getUserInfo:"USER_INFO",getCateList:"CATE_LIST"})),created:function(){this.getUserInfo(),this.getCateList()},activated:function(){this.defaultActive=this.$route.name.toLowerCase()}},c={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-container",[i("el-header",[i("layout-header")],1),t._v(" "),i("el-container",[i("el-aside",{attrs:{width:"200px"}},[i("div",{staticClass:"color-9 padding-15"},[t._v("我的超职管理后台")]),t._v(" "),i("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{router:"","default-active":t.defaultActive}},[i("el-menu-item",{attrs:{index:"index"}},[i("i",{staticClass:"iconfont icon-shouye"}),t._v(" "),i("span",{attrs:{slot:"title"},slot:"title"},[t._v("我的首页")])]),t._v(" "),t.info.orders?i("el-menu-item",{attrs:{index:"info"}},[i("i",{staticClass:"iconfont icon-baoming"}),t._v(" "),i("span",{attrs:{slot:"title"},slot:"title"},[t._v("我的报考资料")])]):t._e(),t._v(" "),i("el-menu-item",{attrs:{index:"livelist"}},[i("i",{staticClass:"iconfont icon-kecheng"}),t._v(" "),i("span",{attrs:{slot:"title"},slot:"title"},[t._v("我的直播课程")])]),t._v(" "),i("el-menu-item",{attrs:{index:"courselist"}},[i("i",{staticClass:"iconfont icon-kecheng"}),t._v(" "),i("span",{attrs:{slot:"title"},slot:"title"},[t._v("我的预习课程")])]),t._v(" "),i("el-menu-item",{attrs:{index:"filelist"}},[i("i",{staticClass:"iconfont icon-kecheng"}),t._v(" "),i("span",{attrs:{slot:"title"},slot:"title"},[t._v("我的学习资料")])]),t._v(" "),i("el-menu-item",{attrs:{index:"orders"}},[i("i",{staticClass:"iconfont icon-kecheng"}),t._v(" "),i("span",{attrs:{slot:"title"},slot:"title"},[t._v("我的课程订单")])])],1)],1),t._v(" "),i("el-main",{staticClass:"cz-main"},[i("div",{staticClass:"cz-main-body"},[i("router-view")],1)])],1)],1)},staticRenderFns:[]};var r=i("VU/8")(l,c,!1,function(t){i("K2oo")},"data-v-42cf4879",null);e.default=r.exports}});
//# sourceMappingURL=8.f5d892397d74520c4670.js.map