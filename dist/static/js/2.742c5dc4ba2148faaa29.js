webpackJsonp([2],{"7OM2":function(t,a){},Cdx3:function(t,a,e){var i=e("sB3e"),s=e("lktj");e("uqUo")("keys",function(){return function(t){return s(i(t))}})},PdC8:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=e("fZjL"),s=e.n(i),n=e("Dd8w"),l=e.n(n),r={name:"paySiginUp",data:function(){return{qrcode:""}},mounted:function(){var t=this;console.log("mounted"),this.$czapi.paySingup({}).then(function(a){var e=a.code,i=a.msg,s=a.qrcode;console.log(e,i),t.qrcode=s})},destroyed:function(){console.log("destroyed")}},o={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("el-form",{staticClass:"margin-top-20",attrs:{direction:"horizontal","label-width":"120px"}},[e("el-form-item",{attrs:{label:"订单内容"}},[e("span",{staticClass:"ant-form-text",staticStyle:{"font-size":"18px"},attrs:{id:"userName",name:"userName"}},[t._v("支付ACI注册国际心理咨询师培训考试报名费")])]),t._v(" "),e("el-form-item",{attrs:{label:"订单价格"}},[e("div",{staticClass:"inline-block",staticStyle:{"font-size":"28px","margin-right":"20px"}},[e("span",{staticClass:"color-warn"},[t._v("800.00")]),t._v("元")])]),t._v(" "),e("el-form-item",{attrs:{label:"扫码支付"}},[e("div",{staticStyle:{width:"200px",height:"200px",padding:"10px",border:"1px solid #eee"}},[e("img",{staticStyle:{width:"100%"},attrs:{src:t.qrcode}})])]),t._v(" "),e("el-form-item",{attrs:{label:"支持支付类型"}},[e("img",{attrs:{src:"/static/images/20180316111851.png"}})]),t._v(" "),e("el-form-item",{attrs:{label:""}},[t._v("\n        该费用是ACI国际注册心理咨询师的报考费用，超职教育为服务代收详情请点击"),e("a",[t._v("这里了解")])])],1)],1)},staticRenderFns:[]};var c=e("VU/8")(r,o,!1,function(t){e("XIlq")},null,null).exports,d=e("NYxO");var _={name:"Info",components:{paySiginUp:c},data:function(){return{steps:0,param:{cn_name:"",en_name:"",sex:"",birthday:"",college:"",edu_num:"",idcard:"",email:"",contacts_phone:"",addr:"",period:"",idcard_front:"",idcard_reverse:"",edu:"",degree:"",entry_form:"",avatar:"",idcard_front_file:"",idcard_reverse_file:"",edu_file:"",degree_file:"",entry_form_file:"",avatar_file:""},sexType:[{value:"M",label:"男，M"},{value:"F",label:"女，F"}],ksType:[],fileName:"file",uploadAction:this.$czapi.uploadAction,fileList:[]}},computed:l()({},Object(d.c)({info:function(t){return t.userInfo}})),watch:{info:{handler:function(t,a){this.param=l()({},this.param,t.ext_info,t.user),this.ksType=t.period,this.status=t.status,this.steps=[0,1,2,3].indexOf(t.status)||0},immediate:!0}},methods:{disabledDate:function(t){return t&&t.valueOf()>=Date.now()},onChangeIdCardZm:function(t){"uploading"!==t.file.status&&console.log(t.file,t.fileList),"done"===t.file.status?console.log(t.file.name+" 上传成功."):"error"===t.file.status&&console.log(t.file.name+" 上传失败.")},triggerUpload:function(t){console.log(t),document.getElementById("wtFile").click()},showConfirmForm:function(){var t=this;this.$confirm("请确认您填写的资料是否正确\n一经提交不能再修改","注意",{confirmButtonText:"确认提交",cancelButtonText:"返回修改资料"}).then(function(){var a={};for(var e in t.param)if(t.param.hasOwnProperty(e)){var i=t.param[e];i&&(a[e]=i)}t.$czapi.submitUserInfo(a).then(function(a){var e=a.code,i=a.msg,n=a.data_msg,l=void 0===n?[]:n;if(200!=e){var r=s.a.call(t,l);return r.length>0?t.$notify.error({title:"提交失败",message:l[r[0]]}):t.$message.error(i),!1}t.$message({message:i,type:"success"}),t.steps++})}).catch(function(){})},doSave:function(){var t=this,a={};for(var e in this.param)if(this.param.hasOwnProperty(e)){var i=this.param[e];i&&(a[e]=i)}this.$czapi.addUserInfo(a).then(function(a){var e=a.code,i=a.msg,n=a.data_msg,l=void 0===n?[]:n;if(200!=e){var r=s.a.call(t,l);return r.length>0?t.$notify.error({title:"保存失败",message:l[r[0]]}):t.$message.error(i),!1}t.$message.success(i)})},onBeforeUpload:function(t,a){var e=this,i={Token:this.Token},s=new FormData;return s.append("file",t),fetch(this.uploadAction,{method:"POST",headers:i,body:s}).then(function(t){return t.json()}).then(function(t){200==t.code&&(e.param[a]=t.data.url,e.param[a.replace("_file","")]=t.data.id,e.$message.success("上传成功"))}),this.fileList=[],!1}}},p={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"info"},[e("div",{staticClass:"ant-layout"},[e("div",{staticClass:"ant-layout ant-layout-has-sider"},[e("div",{staticClass:"ant-layout ant-layout-chaozhi"},[e("div",{staticClass:"ant-layout-content"},[e("div",{staticClass:"color-6 font-size-16",on:{click:function(a){t.steps=t.steps?0:1}}},[t._v("报名表当前状态")]),t._v(" "),202===t.info.code?[e("div",{staticClass:"margin-top-20",staticStyle:{color:"#f00"}},[t._v("\n\t\t\t\t\t\t\t\t报名表审核失败\n\t\t\t\t\t\t\t")])]:[e("el-steps",{staticClass:"margin-top-20",attrs:{"process-status":t.steps>2?"success":"process","finish-status":"success",active:t.steps,simple:""}},[e("el-step",{attrs:{title:"缴纳报名费"}}),t._v(" "),e("el-step",{attrs:{title:"填写资料"}}),t._v(" "),e("el-step",{attrs:{title:t.steps>2?"资料审核通过":"资料审核中"}}),t._v(" "),e("el-step",{attrs:{title:"报名成功"}})],1),t._v(" "),0==t.steps?e("paySiginUp"):t._e(),t._v(" "),1===t.info.status?[e("div",{staticClass:"text-center margin-top-20",staticStyle:{"font-size":"28px"}},[t._v("ACI注册国际心理咨询师培训考试报名表")]),t._v(" "),e("div",{staticClass:"margin-top-10"},[e("table",{staticClass:"ui-table"},[e("tbody",[e("tr",[e("td",{staticStyle:{width:"300px"}},[t._v("中文姓名")]),t._v(" "),e("td",[e("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"中文姓名"},model:{value:t.param.cn_name,callback:function(a){t.$set(t.param,"cn_name",a)},expression:"param.cn_name"}})],1),t._v(" "),e("td",{staticStyle:{width:"200px"}},[t._v("英文姓名")]),t._v(" "),e("td",[e("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"英文姓名"},model:{value:t.param.en_name,callback:function(a){t.$set(t.param,"en_name",a)},expression:"param.en_name"}})],1),t._v(" "),e("td",{staticStyle:{width:"150px"},attrs:{rowspan:"4"}},[e("div",{staticClass:"text-center"},[e("img",{staticStyle:{width:"130px","max-height":"160px"},attrs:{src:t.param.avatar_file+"?token="+t.Token,alt:""}})]),t._v(" "),e("div",{staticClass:"margin-top-10 text-center"},[e("el-upload",{attrs:{name:"avatar_file",fileList:[],accept:"image/jpeg,image/jpg,image/png",action:t.uploadAction,"before-upload":function(a){t.onBeforeUpload(a,"avatar_file")}}},[e("el-button",{attrs:{icon:"el-icon-upload"}},[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t选择图片\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t")])],1)],1)])]),t._v(" "),e("tr",[e("td",[t._v("性别")]),t._v(" "),e("td",[e("el-select",{staticStyle:{width:"300px"},attrs:{placeholder:"请选择性别"},model:{value:t.param.sex,callback:function(a){t.$set(t.param,"sex",a)},expression:"param.sex"}},t._l(t.sexType,function(t){return e("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),e("td",[t._v("出生日期")]),t._v(" "),e("td",[e("el-date-picker",{staticStyle:{width:"300px"},attrs:{clearable:"","picker-options":{disabledDate:t.disabledDate},"value-format":"yyyy-MM-dd"},model:{value:t.param.birthday,callback:function(a){t.$set(t.param,"birthday",a)},expression:"param.birthday"}})],1)]),t._v(" "),e("tr",[e("td",[t._v("毕业院校")]),t._v(" "),e("td",[e("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"毕业院校"},model:{value:t.param.college,callback:function(a){t.$set(t.param,"college",a)},expression:"param.college"}})],1),t._v(" "),e("td",[t._v("学历编号")]),t._v(" "),e("td",[e("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"学历编号"},model:{value:t.param.edu_num,callback:function(a){t.$set(t.param,"edu_num",a)},expression:"param.edu_num"}})],1)]),t._v(" "),e("tr",[e("td",[t._v("身份证/护照")]),t._v(" "),e("td",[e("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"身份证/护照"},model:{value:t.param.idcard,callback:function(a){t.$set(t.param,"idcard",a)},expression:"param.idcard"}})],1),t._v(" "),e("td",[t._v("电子邮件")]),t._v(" "),e("td",[e("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"电子邮件"},model:{value:t.param.email,callback:function(a){t.$set(t.param,"email",a)},expression:"param.email"}})],1)]),t._v(" "),e("tr",[e("td",[t._v("联系电话")]),t._v(" "),e("td",[e("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"联系电话"},model:{value:t.param.contacts_phone,callback:function(a){t.$set(t.param,"contacts_phone",a)},expression:"param.contacts_phone"}})],1),t._v(" "),e("td",[t._v("居住地址")]),t._v(" "),e("td",{attrs:{colspan:"2"}},[e("el-input",{staticStyle:{width:"470px"},attrs:{placeholder:"居住地址"},model:{value:t.param.addr,callback:function(a){t.$set(t.param,"addr",a)},expression:"param.addr"}})],1)]),t._v(" "),e("tr",[e("td",[t._v("课时选择")]),t._v(" "),e("td",{staticClass:"color-6",attrs:{colspan:"4"}},[e("el-select",{staticStyle:{width:"300px"},attrs:{placeholder:"请课时选择"},model:{value:t.param.period,callback:function(a){t.$set(t.param,"period",a)},expression:"param.period"}},t._l(t.ksType,function(t){return e("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1)]),t._v(" "),e("tr",[e("td",[t._v("身份证复印件上传")]),t._v(" "),e("td",{staticClass:"color-6",attrs:{colspan:"4"}},[e("div",[e("el-upload",{staticClass:"inline-block",attrs:{accept:"image/jpeg,image/jpg,image/png",fileList:[],name:"idcard_front_file",action:t.uploadAction,"before-upload":function(a){t.onBeforeUpload(a,"idcard_front_file")}}},[e("el-button",{attrs:{icon:"el-icon-upload"}},[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t选择正面图片\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t")])],1),t._v(" "),t.param.idcard_front_file?e("a",{staticClass:"inline-block margin-left-10 link",attrs:{href:t.param.idcard_front_file+"?token="+t.Token,target:"_blank"}},[e("i",{staticClass:"el-icon-picture"}),t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t我的身份证复印件")]):t._e()],1),t._v(" "),e("div",{staticClass:"margin-top-10"},[e("el-upload",{staticClass:"inline-block",attrs:{accept:"image/jpeg,image/jpg,image/png",fileList:[],name:"idcard_reverse_file",action:t.uploadAction,"before-upload":function(a){t.onBeforeUpload(a,"idcard_reverse_file")}}},[e("el-button",{attrs:{icon:"el-icon-upload"}},[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t选择反面图片\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t")])],1),t._v(" "),t.param.idcard_reverse_file?e("a",{staticClass:"inline-block margin-left-10 link",attrs:{href:t.param.idcard_reverse_file+"?token="+t.Token,target:"_blank"}},[e("i",{staticClass:"el-icon-picture"}),t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t我的身份证复印件\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t")]):t._e()],1)])]),t._v(" "),e("tr",[e("td",[t._v("学历证书复印件上传")]),t._v(" "),e("td",{staticClass:"color-6",attrs:{colspan:"4"}},[e("div",[e("el-upload",{staticClass:"inline-block",attrs:{accept:"image/jpeg,image/jpg,image/png",fileList:[],name:"edu_file",action:t.uploadAction,"before-upload":function(a){t.onBeforeUpload(a,"edu_file")}}},[e("el-button",{attrs:{icon:"el-icon-upload"}},[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t选择图片\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t")])],1),t._v(" "),t.param.edu_file?e("a",{staticClass:"inline-block margin-left-10 link",attrs:{href:t.param.edu_file+"?token="+t.Token,target:"_blank"}},[e("i",{staticClass:"el-icon-picture"}),t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t我的学历证书复印件")]):t._e()],1)])]),t._v(" "),e("tr",[e("td",[t._v("学位证书复印件上传")]),t._v(" "),e("td",{staticClass:"color-6",attrs:{colspan:"4"}},[e("div",[e("el-upload",{staticClass:"inline-block",attrs:{accept:"image/jpeg,image/jpg,image/png",fileList:[],name:"degree_file",action:t.uploadAction,"before-upload":function(a){t.onBeforeUpload(a,"degree_file")}}},[e("el-button",{attrs:{icon:"el-icon-upload"}},[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t选择图片\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t")])],1),t._v(" "),t.param.degree_file?e("a",{staticClass:"inline-block margin-left-10 link",attrs:{href:t.param.degree_file+"?token="+t.Token,target:"_blank"}},[e("i",{staticClass:"el-icon-picture"}),t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t学位证书复印件")]):t._e()],1)])]),t._v(" "),e("tr",[e("td",[t._v("报名表上传")]),t._v(" "),e("td",{staticClass:"color-6",attrs:{colspan:"4"}},[e("div",[e("el-upload",{staticClass:"inline-block",attrs:{accept:".doc",fileList:t.fileList,name:"entry_form_file",action:t.uploadAction,"before-upload":function(a){t.onBeforeUpload(a,"entry_form_file")}}},[e("el-button",{attrs:{icon:"el-icon-upload"}},[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t选择文件\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t")])],1),t._v(" "),e("a",{staticClass:"inline-block margin-left-20 link",attrs:{download:"",href:t.info.entry_form_example_url}},[e("i",{staticClass:"el-icon-document"}),t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t点击下载：报名表>>")])],1)])]),t._v(" "),t._m(0)])])]),t._v(" "),e("div",{staticClass:"text-center margin-top-20"},[e("el-button",{attrs:{type:"primary"},on:{click:t.doSave}},[t._v("保存报名表")]),t._v(" "),e("el-button",{staticClass:"margin-left-20",attrs:{type:"warning"},on:{click:t.showConfirmForm}},[t._v("提交报名表")])],1)]:t._e(),t._v(" "),2===t.info.status?[e("div",{staticClass:"text-center margin-top-20",staticStyle:{"font-size":"28px"}},[t._v("ACI注册国际心理咨询师培训考试报名表")]),t._v(" "),e("div",{staticClass:"margin-top-10"},[e("table",{staticClass:"ui-table"},[e("tr",[e("td",[t._v("中文姓名")]),t._v(" "),e("td",{staticStyle:{width:"300px"}},[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t"+t._s(t.param.cn_name)+"\n\t\t\t\t\t\t\t\t\t\t\t")]),t._v(" "),e("td",[t._v("英文姓名")]),t._v(" "),e("td",{staticStyle:{width:"300px"}},[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t"+t._s(t.param.en_name)+"\n\t\t\t\t\t\t\t\t\t\t\t")]),t._v(" "),e("td",{staticStyle:{width:"130px"},attrs:{rowspan:"4"}},[e("div",[e("img",{staticStyle:{width:"130px","max-height":"160px"},attrs:{src:t.param.avatar_file+"?token="+t.Token,alt:""}})])])]),t._v(" "),e("tr",[e("td",[t._v("性别")]),t._v(" "),e("td",[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t"+t._s("M"==t.param.sex?"女":"男")+"\n\t\t\t\t\t\t\t\t\t\t\t")]),t._v(" "),e("td",[t._v("出生日期")]),t._v(" "),e("td",[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t"+t._s(t.param.birthday)+"\n\t\t\t\t\t\t\t\t\t\t\t")])]),t._v(" "),e("tr",[e("td",[t._v("毕业院校")]),t._v(" "),e("td",[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t"+t._s(t.param.college)+"\n\t\t\t\t\t\t\t\t\t\t\t")]),t._v(" "),e("td",[t._v("学历编号")]),t._v(" "),e("td",[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t"+t._s(t.param.edu_num)+"\n\t\t\t\t\t\t\t\t\t\t\t")])]),t._v(" "),e("tr",[e("td",[t._v("身份证/护照")]),t._v(" "),e("td",[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t"+t._s(t.param.idcard)+"\n\t\t\t\t\t\t\t\t\t\t\t")]),t._v(" "),e("td",[t._v("电子邮件")]),t._v(" "),e("td",[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t"+t._s(t.param.email)+"\n\t\t\t\t\t\t\t\t\t\t\t")])]),t._v(" "),e("tr",[e("td",[t._v("联系电话")]),t._v(" "),e("td",[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t"+t._s(t.param.contacts_phone)+"\n\t\t\t\t\t\t\t\t\t\t\t")]),t._v(" "),e("td",[t._v("居住地址")]),t._v(" "),e("td",{attrs:{colspan:"2"}},[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t"+t._s(t.param.addr)+"\n\t\t\t\t\t\t\t\t\t\t\t")])]),t._v(" "),e("tr",[e("td",[t._v("身份证复印件")]),t._v(" "),e("td",{staticClass:"color-6",attrs:{colspan:"4"}},[e("div",[t.param.idcard_front_file?e("a",{staticClass:"inline-block margin-left-10 link",attrs:{href:t.param.idcard_front_file+"?token="+t.Token,target:"_blank"}},[e("i",{staticClass:"el-icon-picture"}),t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t我的身份证复印件")]):t._e(),t._v(" "),t.param.idcard_reverse_file?e("a",{staticClass:"inline-block margin-left-20 link",attrs:{href:t.param.idcard_reverse_file+"?token="+t.Token,target:"_blank"}},[e("i",{staticClass:"el-icon-picture"}),t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t我的身份证复印件\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t")]):t._e()])])]),t._v(" "),e("tr",[e("td",[t._v("学历证书复印件")]),t._v(" "),e("td",{staticClass:"color-6",attrs:{colspan:"4"}},[e("div",[t.param.edu_file?e("a",{staticClass:"inline-block margin-left-10 link",attrs:{href:t.param.edu_file+"?token="+t.Token,target:"_blank"}},[e("i",{staticClass:"el-icon-picture"}),t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t我的学历证书复印件")]):t._e()])])]),t._v(" "),e("tr",[e("td",[t._v("学位证书复印件")]),t._v(" "),e("td",{staticClass:"color-6",attrs:{colspan:"4"}},[e("div",[t.param.degree_file?e("a",{staticClass:"inline-block margin-left-10 link",attrs:{href:t.param.degree_file+"?token="+t.Token,target:"_blank"}},[e("i",{staticClass:"el-icon-picture"}),t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t学位证书复印件")]):t._e()])])])])]),t._v(" "),t._m(1),t._v(" "),t._m(2)]:t._e(),t._v(" "),3===t.info.status?[e("div",{staticClass:"text-center margin-top-20",staticStyle:{"font-size":"28px"}},[t._v("ACI注册国际心理咨询师培训考试报名表")]),t._v(" "),e("div",{staticClass:"margin-top-10"},[e("table",{staticClass:"ui-table"},[e("tr",[e("td",[t._v("中文姓名")]),t._v(" "),e("td",{staticStyle:{width:"300px"}},[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t"+t._s(t.param.cn_name)+"\n\t\t\t\t\t\t\t\t\t\t\t")]),t._v(" "),e("td",[t._v("英文姓名")]),t._v(" "),e("td",{staticStyle:{width:"300px"}},[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t"+t._s(t.param.en_name)+"\n\t\t\t\t\t\t\t\t\t\t\t")]),t._v(" "),e("td",{staticStyle:{width:"130px"},attrs:{rowspan:"4"}},[e("div",[e("img",{staticStyle:{width:"130px","max-height":"160px"},attrs:{src:t.param.avatar_file+"?token="+t.Token,alt:""}})])])]),t._v(" "),e("tr",[e("td",[t._v("性别")]),t._v(" "),e("td",[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t"+t._s("M"==t.param.sex?"女":"男")+"\n\t\t\t\t\t\t\t\t\t\t\t")]),t._v(" "),e("td",[t._v("出生日期")]),t._v(" "),e("td",[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t"+t._s(t.param.birthday)+"\n\t\t\t\t\t\t\t\t\t\t\t")])]),t._v(" "),e("tr",[e("td",[t._v("毕业院校")]),t._v(" "),e("td",[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t"+t._s(t.param.college)+"\n\t\t\t\t\t\t\t\t\t\t\t")]),t._v(" "),e("td",[t._v("学历编号")]),t._v(" "),e("td",[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t"+t._s(t.param.edu_num)+"\n\t\t\t\t\t\t\t\t\t\t\t")])]),t._v(" "),e("tr",[e("td",[t._v("身份证/护照")]),t._v(" "),e("td",[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t"+t._s(t.param.idcard)+"\n\t\t\t\t\t\t\t\t\t\t\t")]),t._v(" "),e("td",[t._v("电子邮件")]),t._v(" "),e("td",[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t"+t._s(t.param.email)+"\n\t\t\t\t\t\t\t\t\t\t\t")])]),t._v(" "),e("tr",[e("td",[t._v("联系电话")]),t._v(" "),e("td",[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t"+t._s(t.param.contacts_phone)+"\n\t\t\t\t\t\t\t\t\t\t\t")]),t._v(" "),e("td",[t._v("居住地址")]),t._v(" "),e("td",{attrs:{colspan:"2"}},[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t"+t._s(t.param.addr)+"\n\t\t\t\t\t\t\t\t\t\t\t")])]),t._v(" "),e("tr",[e("td",[t._v("身份证复印件")]),t._v(" "),e("td",{staticClass:"color-6",attrs:{colspan:"4"}},[e("div",[t.param.idcard_front_file?e("a",{staticClass:"inline-block margin-left-10 link",attrs:{href:t.param.idcard_front_file+"?token="+t.Token,target:"_blank"}},[e("i",{staticClass:"el-icon-picture"}),t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t我的身份证复印件")]):t._e(),t._v(" "),t.param.idcard_reverse_file?e("a",{staticClass:"inline-block margin-left-20 link",attrs:{href:t.param.idcard_reverse_file+"?token="+t.Token,target:"_blank"}},[e("i",{staticClass:"el-icon-picture"}),t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t我的身份证复印件\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t")]):t._e()])])]),t._v(" "),e("tr",[e("td",[t._v("学历证书复印件")]),t._v(" "),e("td",{staticClass:"color-6",attrs:{colspan:"4"}},[e("div",[t.param.edu_file?e("a",{staticClass:"inline-block margin-left-10 link",attrs:{href:t.param.edu_file+"?token="+t.Token,target:"_blank"}},[e("i",{staticClass:"el-icon-picture"}),t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t我的学历证书复印件")]):t._e()])])]),t._v(" "),e("tr",[e("td",[t._v("学位证书复印件")]),t._v(" "),e("td",{staticClass:"color-6",attrs:{colspan:"4"}},[e("div",[t.param.degree_file?e("a",{staticClass:"inline-block margin-left-10 link",attrs:{href:t.param.degree_file+"?token="+t.Token,target:"_blank"}},[e("i",{staticClass:"el-icon-picture"}),t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t学位证书复印件")]):t._e()])])])])])]:t._e()]],2)])])])])},staticRenderFns:[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("tr",[e("td",{attrs:{colspan:"5"}},[e("p",[t._v("1、全部为必填项")]),t._v(" "),e("p",[t._v("2、上传照片要求（请严格按照照片要求）：")]),t._v(" "),e("p",{staticStyle:{"padding-left":"20px"}},[t._v("·图片格式：仅支持jpg类型")]),t._v(" "),e("p",{staticStyle:{"padding-left":"20px"}},[t._v("·建议分辨率：宽600px，高800px")]),t._v(" "),e("p",{staticStyle:{"padding-left":"20px"}},[t._v("·文件大小：小于1MB")])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"margin-top-20"},[a("p",{staticClass:"font-size-18 color-warn"},[this._v("恭喜您提交报名信息成功！")]),this._v(" "),a("p",[this._v("超职会在3～5个工作日进行审核，请及时关注网校QQ群/微信群公告！")]),this._v(" "),a("p",[this._v("审核通过即代表报名成功，网校会及时通知您")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"margin-top-20"},[a("div",{staticClass:"inline-block"},[a("div",[a("img",{attrs:{src:"",alt:""}})]),this._v(" "),a("div",{staticClass:"margin-top-10"},[this._v("QQq群二维码")])]),this._v(" "),a("div",{staticClass:"inline-block margin-left-20"},[a("div",[a("img",{attrs:{src:"",alt:""}})]),this._v(" "),a("div",{staticClass:"margin-top-10"},[this._v("微信群二维码")])])])}]};var v=e("VU/8")(_,p,!1,function(t){e("7OM2")},"data-v-6f7be620",null);a.default=v.exports},XIlq:function(t,a){},fZjL:function(t,a,e){t.exports={default:e("jFbC"),__esModule:!0}},jFbC:function(t,a,e){e("Cdx3"),t.exports=e("FeBl").Object.keys},uqUo:function(t,a,e){var i=e("kM2E"),s=e("FeBl"),n=e("S82l");t.exports=function(t,a){var e=(s.Object||{})[t]||Object[t],l={};l[t]=a(e),i(i.S+i.F*n(function(){e(1)}),"Object",l)}}});
//# sourceMappingURL=2.742c5dc4ba2148faaa29.js.map