webpackJsonp([7],{JYqS:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"course-list"},[e("div",{staticClass:"ant-layout"},[e("div",{staticClass:"ant-layout ant-layout-has-sider"},[e("div",{staticClass:"ant-layout ant-layout-chaozhi"},[t.product.length<=0?e("div",{staticClass:"ant-layout-content text-center",staticStyle:{background:"#fff",padding:"100px"}},[e("img",{attrs:{src:"/static/images/null-page-draw.png"}}),t._v(" "),e("p",{staticStyle:{"font-size":"20px","margin-top":"20px"}},[t._v("您还没有购买课程,"),e("router-link",{attrs:{to:"/male"}},[t._v("去商城")])],1)]):t._e(),t._v(" "),t.product.length>0?e("div",{staticClass:"ant-layout-content"},t._l(t.product,function(i){return e("div",{key:i.id,staticClass:"padding-15 course-item"},[e("div",{staticStyle:{"padding-left":"500px",overflow:"hidden"}},[e("div",{staticStyle:{float:"left",display:"inline","margin-left":"-500px",width:"460px"}},[e("img",{staticStyle:{width:"100%"},attrs:{src:i.product_img,alt:i.product_name}})]),t._v(" "),e("div",{staticStyle:{float:"left",display:"inline"}},[e("div",{staticStyle:{"font-size":"24px",color:"#333333"}},[t._v(t._s(i.product_name))]),t._v(" "),e("div",{staticClass:"margin-top-20"},[e("span",{staticClass:"inline-block",domProps:{innerHTML:t._s(i.products.description)}})])])]),t._v(" "),e("table",{staticClass:"ui-table margin-top-20"},[t._m(0,!0),t._v(" "),t._m(1,!0),t._v(" "),e("tbody",[t._l(i.planLine,function(i){return e("tr",{key:i.id},[e("td",[t._v(t._s(i.name))]),t._v(" "),e("td",{staticClass:"text-center"},[e("el-popover",{attrs:{placement:"right",title:"",trigger:"hover",controlled:!1}},[e("div",{staticStyle:{width:"380px"}},[e("div",{staticClass:"clearfix"},[e("div",{staticClass:"pull-left",staticStyle:{width:"130px"}},[e("div",{staticStyle:{width:"130px",height:"150px",overflow:"hidden"}},[e("img",{staticStyle:{width:"130px"},attrs:{src:i.teacher_img_url}})])]),t._v(" "),e("div",{staticClass:"pull-right",staticStyle:{width:"230px","margin-left":"20px"}},[e("div",{staticStyle:{"font-size":"24px",color:"#029EFF"}},[t._v(t._s(i.teacher)+"老师")]),t._v(" "),e("div",{staticClass:"margin-top-15 font-size-14"},[t._v(t._s(i.teacher_description))])])])]),t._v(" "),e("el-button",{attrs:{slot:"reference",type:"text"},slot:"reference"},[t._v(t._s(i.teacher))])],1)],1),t._v(" "),e("td",{staticClass:"text-center"},[t._v(t._s(i.total_unit))]),t._v(" "),e("td",[e("div",t._l(i.teach_plan,function(i){return e("a",{key:i.id,staticClass:"el-button el-button--primary el-button--small",staticStyle:{"margin-bottom":"5px","margin-left":"10px",width:"100px"},attrs:{href:i.view_url,target:"_blank"}},[e("i",{staticClass:"iconfont icon-bofang1"}),t._v(" "),e("span",{domProps:{textContent:t._s(i.name)}})])}))])])}),t._v(" "),e("tr",[e("td",[t._v("合计")]),t._v(" "),e("td"),t._v(" "),e("td",[t._v(t._s(t._f("totalUnit")(i.planLine))+"课时")]),t._v(" "),e("td")])],2)])])})):t._e()])])])])},staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("colgroup",[i("col",{attrs:{width:"220px"}}),this._v(" "),i("col",{attrs:{width:"120px"}}),this._v(" "),i("col",{attrs:{width:"120px"}})])},function(){var t=this.$createElement,i=this._self._c||t;return i("thead",[i("tr",[i("th",[this._v("课程")]),this._v(" "),i("th",[this._v("讲师")]),this._v(" "),i("th",[this._v("总课时")]),this._v(" "),i("th",[this._v("视频课件学习")])])])}]};var s=e("VU/8")({name:"Courselist",data:function(){return{layout:{gutter:32,span:12},activeTabIndex:0,product:[],cateList:[]}},filters:{totalUnit:function(t){if(!t)return 0;var i=0;return t.forEach(function(t){i+=t.total_unit}),i}},methods:{showCoursePlan:function(t,i){var e=this;this.$czapi.getCoursePlan({pid:t.product_id,p:1,offset:100}).then(function(t){t.code;var a=t.data;t.msg,e.product[i].planLine=a.rows})}},mounted:function(){var t=this;this.$czapi.getCourseList().then(function(i){var e=i.data;t.product=e.map(function(t){return t.planLine=[],t}),t.product.forEach(function(i,e){t.showCoursePlan(i,e)})})}},a,!1,function(t){e("fkCr")},"data-v-7245bbe0",null);i.default=s.exports},fkCr:function(t,i){}});
//# sourceMappingURL=7.2c74ac6530b4babae440.js.map