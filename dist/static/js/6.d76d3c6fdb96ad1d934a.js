webpackJsonp([6],{bYIY:function(t,e){},nbMf:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("VsUZ"),a=n("bzuE"),s={data:function(){return{rows:[],dialogs:{show:!1,data:""},status:{"-2":"订单超时","-1":"订单取消",0:"待支付",2:"支付完成"}}},methods:{getRows:function(){var t=this;o.a.getOrderList().then(function(e){e.code;var n=e.data,o=[];t.rows=n.map(function(t){return o.indexOf(t.product_id)<0?o.push(t.product_id):t.old=!0,t})})},doOption:function(t){if(t.status<=0)return this.$router.push("/pay/"+t.product_id);2==t.status&&this.getAgreement(t.id)},getAgreement:function(t){var e=this;o.a.getAgreement({order_id:t}).then(function(t){console.log(t),e.dialogs.show=!0,e.dialogs.data=t.agreement||""})},getPIAO:function(t){var e=Object(a.a)();return a.b+"/api/orders/receipt?order_id="+t.id+"&token="+e}},created:function(){this.getRows()}},r={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{padding:"15px"}},[n("el-table",{attrs:{data:t.rows,stripe:""}},[n("el-table-column",{attrs:{width:"180",prop:"order_id",label:"订单号"}}),t._v(" "),n("el-table-column",{attrs:{"min-width":"320",prop:"product_name",label:"课程名称"}}),t._v(" "),n("el-table-column",{attrs:{width:"140",prop:"price",label:"订单价格"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        ¥ "+t._s(e.row.price/100)+"\n      ")]}}])}),t._v(" "),n("el-table-column",{attrs:{width:"120",label:"支付状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(t.status[e.row.status])+"\n      ")]}}])}),t._v(" "),n("el-table-column",{attrs:{width:"180",label:"下单时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.row.starttime)+"\n      ")]}}])}),t._v(" "),n("el-table-column",{attrs:{width:"140",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("div",{staticClass:"text-center"},[2==e.row.status?n("div",[n("el-button",{attrs:{type:"primary"},on:{click:function(n){t.doOption(e.row)}}},[t._v("学员协议")]),t._v(" "),n("a",{staticClass:"el-button el-button--text",attrs:{type:"button",target:"_blank",href:t.getPIAO(e.row)}},[n("span",[t._v("电子收据")])])],1):t._e(),t._v(" "),0==e.row.status?n("el-button",{attrs:{type:"success"},on:{click:function(n){t.doOption(e.row)}}},[t._v("去支付")]):t._e(),t._v(" "),e.row.status<0&&!e.row.old?n("el-button",{attrs:{type:"warning"},on:{click:function(n){t.doOption(e.row)}}},[t._v("重新下单")]):t._e()],1)]}}])})],1),t._v(" "),n("el-dialog",{attrs:{visible:t.dialogs.show,top:"5vh",title:"学员协议"},on:{"update:visible":function(e){t.$set(t.dialogs,"show",e)}}},[n("div",{staticClass:"dialog-agreement"},[n("div",{staticClass:"dialog-agreement-content",domProps:{innerHTML:t._s(t.dialogs.data)}})])])],1)},staticRenderFns:[]};var i=n("VU/8")(s,r,!1,function(t){n("bYIY")},null,null);e.default=i.exports}});
//# sourceMappingURL=6.d76d3c6fdb96ad1d934a.js.map