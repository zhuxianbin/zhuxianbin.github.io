webpackJsonp([8],{"3JcY":function(t,i,a){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s={render:function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{staticClass:"course-list"},[a("div",{staticClass:"ant-layout"},[a("div",{staticClass:"ant-layout ant-layout-has-sider"},[a("div",{staticClass:"ant-layout ant-layout-chaozhi"},[a("div",{staticClass:"ant-layout-content"},t._l(t.product,function(i){return a("div",{key:i.id,staticClass:"padding-15 course-item"},[a("div",{staticStyle:{"padding-left":"500px",overflow:"hidden"}},[a("div",{staticStyle:{float:"left",display:"inline","margin-left":"-500px",width:"460px"}},[a("img",{staticStyle:{width:"100%"},attrs:{src:i.products.img,alt:i.product_name}})]),t._v(" "),a("div",{staticStyle:{float:"left",display:"inline"}},[a("div",{staticStyle:{"font-size":"24px",color:"#333333"}},[t._v(t._s(i.product_name))]),t._v(" "),a("div",{staticClass:"margin-top-20"},[a("span",{staticClass:"inline-block text-right",staticStyle:{width:"100px"}},[t._v("课程介绍：")]),t._v(" "),a("span",{staticClass:"inline-block",domProps:{innerHTML:t._s(i.products.description)}})])])]),t._v(" "),a("table",{staticClass:"ui-table margin-top-20"},[t._m(0,!0),t._v(" "),t._m(1,!0),t._v(" "),a("tbody",t._l(i.downList,function(i){return a("tr",{key:i.id},[a("td",[t._v(t._s(i.file_name))]),t._v(" "),a("td",[a("a",{staticClass:"el-button el-button--success el-button--small",attrs:{href:i.file,target:"_blank"}},[a("i",{staticClass:"el-icon-download"}),a("span",[t._v("下载")])])])])}))])])}))])])])])},staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("colgroup",[i("col",{attrs:{width:"500px"}})])},function(){var t=this.$createElement,i=this._self._c||t;return i("thead",[i("tr",[i("th",[this._v("课程资料名称")]),this._v(" "),i("th",[this._v("下载资料")])])])}]};var n=a("VU/8")({name:"Courselist",data:function(){return{layout:{gutter:32,span:12},activeTabIndex:0,product:[]}},filters:{totalUnit:function(t){if(!t)return 0;var i=0;return t.forEach(function(t){i+=t.total_unit}),i}},methods:{showCourseDown:function(t,i){var a=this;this.$czapi.getCourseInfo({pid:t.product_id,p:1,offset:100}).then(function(t){var s=t.data;t.code,a.product[i].downList=s.rows})}},mounted:function(){var t=this;this.$czapi.getCourseList().then(function(i){var a=i.data;t.product=a.map(function(t){return t.downList=[],t}),t.product.forEach(function(i,a){t.showCourseDown(i,a)})})}},s,!1,function(t){a("K5Wm")},"data-v-1117e10e",null);i.default=n.exports},K5Wm:function(t,i){}});
//# sourceMappingURL=8.b2ddd0238fac5e15c0b5.js.map