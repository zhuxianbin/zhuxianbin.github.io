webpackJsonp([11],{jT7l:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("Dd8w"),s=r.n(n),i=r("NYxO"),o=r("TIfe"),a=function(e,t,r){/^(\d{11})$/.test(t)?r():r(new Error("请确认您输入的手机号是否正确"))},l={name:"Login",data:function(){return{isLoading:!1,ruleForm:{phoneNumber:"",password:""},rules:{phoneNumber:[{required:!0,message:"请确认您输入的手机号是否正确"},{validator:a}],password:[{required:!0,minlength:6,message:"请确认您输入的密码是否正确"}]},visible:!1}},methods:s()({},Object(i.b)({getUserInfo:"USER_INFO",getCateList:"CATE_LIST"}),Object(i.b)("user",{login:"login"}),{getQcode:function(){var e=this,t=this;t.isSend||(t.isSend=!0,this.$refs.ruleForm.validateField("phoneNumber",function(r){""===r?t.$czapi.getPhoneCaptcha({phone:t.ruleForm.phoneNumber}).then(function(r){if(200!=r.code)return e.$message.error(r.msg);t.isSend=!0;var n=r.interval,s=null;t.qcodeText=n+"秒后再次获取验证码",s=setInterval(function(){--n>0?t.qcodeText=n+"秒后再次获取验证码":(t.isSend=!1,t.qcodeText="获取验证码",clearInterval(s))},1e3)}).fail(function(){t.isSend=!1}):t.isSend=!1}))},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;t.isLoading=!0,t.login({phone:t.ruleForm.phoneNumber,password:t.ruleForm.password}).then(function(e){if(200!=e.code)return t.isLoading=!1,t.$message.error(e.msg),!1;Object(o.c)(e.token),t.getUserInfo(),t.getCateList(),t.$router.push("/index")}).catch(function(){t.isLoading=!1}),setTimeout(function(){t.isLoading=!1},2e4)})}})},u={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"login"},[r("div",{staticClass:"container"},[r("div",{staticClass:"login-container",staticStyle:{"margin-top":"40px"}},[e._m(0),e._v(" "),r("div",{staticClass:"text-center",staticStyle:{margin:"20px 0","font-size":"26px"}},[e._v("\n                登录您的账号\n            ")]),e._v(" "),r("div",{staticStyle:{width:"360px",margin:"0 auto"}},[r("el-form",{ref:"ruleForm",attrs:{direction:"horizontal","label-width":"labelCol",model:e.ruleForm,rules:e.rules}},[r("el-form-item",{attrs:{label:"",prop:"phoneNumber"}},[r("el-input",{attrs:{placeholder:"注册的手机号码"},model:{value:e.ruleForm.phoneNumber,callback:function(t){e.$set(e.ruleForm,"phoneNumber",t)},expression:"ruleForm.phoneNumber"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"",prop:"password"}},[r("el-input",{attrs:{type:"password",placeholder:"请输入密码"},model:{value:e.ruleForm.password,callback:function(t){e.$set(e.ruleForm,"password",t)},expression:"ruleForm.password"}})],1),e._v(" "),r("el-form-item",[r("el-row",{attrs:{gutter:10}},[r("el-col",{attrs:{span:10}},[r("el-button",{staticStyle:{width:"100%"},attrs:{size:"medium"},on:{click:function(t){e.$router.push("./register")}}},[e._v("注 册")])],1),e._v(" "),r("el-col",{attrs:{span:14}},[r("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary",loading:e.isLoading,size:"medium"},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("登录超职")])],1)],1)],1)],1),e._v(" "),r("div",{staticClass:"text-center"},[r("el-button",{attrs:{type:"text"},on:{click:function(t){e.$router.push("./forget")}}},[e._v("如果您没有设置过密码，请点击这里设置>>")])],1),e._v(" "),r("div",{staticClass:"text-center mb-20"},[r("el-button",{attrs:{type:"text"},on:{click:function(t){e.$router.push("./forget")}}},[e._v("忘记密码，怎么办？>>")])],1)],1)]),e._v(" "),r("div",{staticClass:"text-center"},[e._v("\n            超职时代（北京）教育科技有限公司 版权所有 \n            ")])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"text-center"},[t("img",{staticStyle:{width:"300px"},attrs:{src:"static/images/logo-3.png",alt:""}})])}]},c=r("VU/8")(l,u,!1,null,null,null);t.default=c.exports}});
//# sourceMappingURL=11.47569c776063d2cf9a30.js.map