webpackJsonp([5],{FWSe:function(t,i){},"c+AL":function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a={name:"Courselist",data:function(){return{layout:{gutter:32,span:12},rows:[]}},filters:{totalUnit:function(t){if(!t)return 0;var i=0;return t.forEach(function(t){i+=t.total_unit}),i}},methods:{getLiveList:function(){var t=this,i=(new Date).setHours(0,0,0,0);this.$czapi.getLiveList({p:1,offset:100}).then(function(s){s.code;var a=s.data;s.msg;t.rows=a.map(function(t){return t.products.live_more=t.products.live_more.map(function(t){var s=new Date(t.live_time).setHours(0,0,0,0);return i>s&&(t.status=-1),i<s&&(t.status=0),i==s&&(t.status=1),t}),t})})}},mounted:function(){this.getLiveList()}},e={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"course-list"},[s("div",{staticClass:"ant-layout"},[s("div",{staticClass:"ant-layout ant-layout-has-sider"},[s("div",{staticClass:"ant-layout ant-layout-chaozhi"},[s("div",{staticClass:"ant-layout-content"},t._l(t.rows,function(i){return s("div",{key:i.id,staticClass:"padding-15 course-item"},[s("div",{staticStyle:{"padding-left":"500px",overflow:"hidden"}},[s("div",{staticStyle:{float:"left",display:"inline","margin-left":"-500px",width:"460px"}},[s("img",{staticStyle:{width:"100%"},attrs:{src:i.products.img,alt:i.product_name}})]),t._v(" "),s("div",{staticStyle:{float:"left",display:"inline"}},[s("div",{staticStyle:{"font-size":"24px",color:"#333333"}},[t._v(t._s(i.product_name))]),t._v(" "),s("div",{staticClass:"margin-top-20"},[s("span",{staticClass:"inline-block text-right",staticStyle:{width:"100px"}},[t._v("课程介绍：")]),t._v(" "),s("span",{staticClass:"inline-block",domProps:{innerHTML:t._s(i.products.description)}})])])]),t._v(" "),i.products.live_more.length>0?s("table",{staticClass:"ui-table margin-top-20"},[t._m(0,!0),t._v(" "),t._m(1,!0),t._v(" "),s("tbody",t._l(i.products.live_more,function(i){return s("tr",{key:i.id},[s("td",[t._v(t._s(i.live_name))]),t._v(" "),s("td",[t._v(t._s(i.live_time))]),t._v(" "),s("td",[s("div",[0==i.status?s("el-button",{attrs:{disabled:""}},[s("i",{staticClass:"iconfont icon-zhibodating"}),t._v(" "),s("span",[t._v("直播还没开始")])]):t._e(),t._v(" "),1==i.status?s("a",{staticClass:"el-button el-button--warning",attrs:{target:"_blank",href:i.live_url}},[s("i",{staticClass:"iconfont icon-bofang1"}),t._v(" "),s("span",[t._v("进入直播课堂")])]):t._e(),t._v(" "),-1==i.status?s("a",{staticClass:"el-button el-button--primary",attrs:{target:"_blank",href:i.live_url}},[s("i",{staticClass:"iconfont icon-kechenghuifang"}),t._v(" "),s("span",[t._v("回访直播视频")])]):t._e()],1)])])}))]):t._e()])}))])])])])},staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("colgroup",[i("col",{attrs:{width:"300px"}}),this._v(" "),i("col",{attrs:{width:"300px"}})])},function(){var t=this.$createElement,i=this._self._c||t;return i("thead",[i("tr",[i("th",[this._v("直播课程名称")]),this._v(" "),i("th",[this._v("直播开始时间")]),this._v(" "),i("th")])])}]};var n=s("VU/8")(a,e,!1,function(t){s("FWSe")},"data-v-90dd6efa",null);i.default=n.exports}});
//# sourceMappingURL=5.88790be5ac68b508aa81.js.map