webpackJsonp([1],{P7ry:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("Dd8w"),i=r.n(n),s=r("NYxO"),o=function(e,t,r){/^(1[3-8]\d{9})$/.test(t)?r():r(new Error("请确认您输入的手机号是否正确"))},a=function(e,t,r){/^\d{4}$/.test(t)?r():r(new Error("请确认您输入的验证码是否正确"))},l={name:"Login",data:function(){return{isLoading:!1,labelCol:{span:6},wrapperCol:{span:24},ruleForm:{phoneNumber:"",qcode:"",isTy:!0},rules:{phoneNumber:[{required:!0,message:"请确认您输入的手机号是否正确"},{validator:o}],qcode:[{required:!0,message:"请确认您输入的验证码是否正确"},{validator:a}]},visible:!1,qcodeText:"获取验证码",isSend:!1}},methods:i()({},Object(s.b)({getUserInfo:"USER_INFO",getCateList:"CATE_LIST"}),{handleOk:function(){this.visible=!1,this.ruleForm.isTy=!0},handleCancel:function(){this.visible=!1},getQcode:function(){var e=this,t=this;t.isSend||(t.isSend=!0,this.$refs.ruleForm.validateField("phoneNumber",function(r){""===r?t.$czapi.getPhoneCaptcha({phone:t.ruleForm.phoneNumber}).then(function(r){if(200!=r.code)return e.$message.error(r.msg);t.isSend=!0;var n=r.interval,i=null;t.qcodeText=n+"秒后再次获取验证码",i=setInterval(function(){--n>0?t.qcodeText=n+"秒后再次获取验证码":(t.isSend=!1,t.qcodeText="获取验证码",clearInterval(i))},1e3)}).fail(function(){t.isSend=!1}):t.isSend=!1}))},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;t.isLoading=!0,t.$czapi.doLogin({phone:t.ruleForm.phoneNumber,captcha:t.ruleForm.qcode}).then(function(e){if(200!=e.code)return t.isLoading=!1,t.$message.error(e.msg),!1;t.$storage.set("userToken",e),t.getUserInfo(),t.getCateList(),t.$router.back()}).catch(function(){t.isLoading=!1}),setTimeout(function(){t.isLoading=!1},2e4)})}}),mounted:function(){}},c={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"login"},[r("div",{staticClass:"container"},[r("div",{staticClass:"login-container",staticStyle:{"margin-top":"40px"}},[e._m(0),e._v(" "),r("div",{staticClass:"text-center",staticStyle:{margin:"20px 0","font-size":"26px"}},[e._v("\n                登陆您的账号\n            ")]),e._v(" "),r("div",{staticStyle:{width:"360px",margin:"0 auto"}},[r("el-form",{ref:"ruleForm",attrs:{direction:"horizontal","label-width":"labelCol",model:e.ruleForm,rules:e.rules}},[r("el-form-item",{attrs:{label:"",prop:"phoneNumber"}},[r("el-input",{attrs:{placeholder:"注册的手机号码"},model:{value:e.ruleForm.phoneNumber,callback:function(t){e.$set(e.ruleForm,"phoneNumber",t)},expression:"ruleForm.phoneNumber"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"",prop:"qcode"}},[r("div",{staticClass:"inline-block text-center",staticStyle:{width:"55%"}},[r("el-input",{attrs:{placeholder:"短信验证码"},model:{value:e.ruleForm.qcode,callback:function(t){e.$set(e.ruleForm,"qcode",t)},expression:"ruleForm.qcode"}})],1),e._v(" "),r("div",{staticClass:"inline-block text-center",staticStyle:{width:"43%"}},[r("a",{staticClass:"link",attrs:{href:"javascript:;"},on:{click:e.getQcode}},[e._v(e._s(e.qcodeText))])])]),e._v(" "),r("el-form-item",[r("el-button",{staticStyle:{display:"block",width:"100%","font-size":"22px"},attrs:{type:"primary",loading:e.isLoading,disabled:!e.ruleForm.isTy},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("登录超职")])],1),e._v(" "),r("el-form-item",[r("el-checkbox",{model:{value:e.ruleForm.isTy,callback:function(t){e.$set(e.ruleForm,"isTy",t)},expression:"ruleForm.isTy"}},[e._v("登录即表示您同意《"),r("a",{staticClass:"link",attrs:{href:"javascript:;"},on:{click:function(t){t.preventDefault(),e.visible=!0}}},[e._v("超职用户协议")]),e._v("》")])],1),e._v(" "),r("el-form-item",[r("div",{staticClass:"text-center"},[r("a",{attrs:{href:"/default.html"}},[r("i",{staticClass:"iconfont icon-return"}),e._v(" "),r("span",{staticStyle:{"margin-left":"5px"}},[e._v("返回")])])])])],1)],1),e._v(" "),r("el-dialog",{attrs:{title:"查看用户协议",visible:e.visible,width:"800"},on:{"update:visible":function(t){e.visible=t}}},[r("div",{staticStyle:{height:"430px",overflow:"auto"}},[e._v("1、超职教育服务条款的确认和接纳"),r("br"),e._v("\n                    　　超职教育的各项网络服务的所有权、运作权归超职教育。超职教育提供的服务将完全按照其发布的章程、服务条款和操作规则严格执行。您必须完全同意所有服务条款并完成注册（报名）程序。"),r("br"),e._v("\n                    2、服务简介"),r("br"),e._v("\n                    　　基于超职教育所提供的网络服务的重要性，学员应同意："),r("br"),e._v("\n                    　　（1）提供详尽、准确的个人资料。"),r("br"),e._v("\n                    　　（2）不断更新注册（报名）资料,符合及时、详尽、准确的要求。超职教育不公开学员的姓名、地址、电子邮箱和笔名，除以下情况外："),r("br"),e._v("\n                    　　1)学员授权超职教育透露这些信息。"),r("br"),e._v("\n                    　　2)相应的法律及程序要求超职教育提供学员的个人资料。如果学员提供的资料包含有不正确的信息，超职教育保留结束学员使用网络服务资格的权利。"),r("br"),e._v("\n                    3、服务条款的修改和服务修订"),r("br"),e._v("\n                    　　超职教育有权在必要时修改服务条款，超职教育服务条款一旦发生变动，将会在重要页面上提示修改内容。如果学员继续享用网络服务，则视为接受服务条款的变动。"),r("br"),e._v("\n                    4、学员的账号，密码和安全性"),r("br"),e._v("\n                    　　学员一旦注册（报名）成功，成为超职教育的合法学员，将得到一个密码和学员代码，学员将对学员代码、密码安全及学员代码的使用负全部责任；"),r("br"),e._v("\n                    　　同时，每个学员的学习代码仅限学员个人私自使用，学员以任何方式与任何第三方共享学习代码或公开学习课程（包括但不限于向任何第三方透露学习课程、与他人共享学习代码、将自己的学习代码提供给第三方使用、将学习课程公开播放或以任何方式供多人同时使用）都是严格禁止的；"),r("br"),e._v("\n                    　　上述情况一旦发生，我司将立即停止违规代码的学习权限，同时我司会进一步追究违规人员的法律责任，包含不限于追偿损失、司法追责等。"),r("br"),e._v("\n                    　　超职教育不对学员所发布信息的删除或储存失败负责。超职教育有判定学员的行为是否符合超职教育服务条款的要求和精神的保留权利，如果学员违背了服务条款的规定，超职教育有中断对其提供网络服务的权利。"),r("br"),e._v("\n                    6、学员管理"),r("br"),e._v("\n                    　　严禁发表、散布、传播任何反动、色情及违反国家安全、扰乱社会秩序等有害信息，学员需对自己在网上的行为承担法律责任。学员若在超职教育上散布和传播反动、色情或其他违反国家法律的信息，超职教育的系统记录将作为学员违反法律的证据。"),r("br"),e._v("\n\n\n                    7、开始/结束服务"),r("br"),e._v("\n                    　　学员付费经公司确认后，开通相应的服务权限（服务权限是指学员享受所购买服务的资格）。具体服务内容开通的时间和进度以网站的最新公告或课件更新记录为准。"),r("br"),e._v("\n                    　　(1)停止使用超职教育的网络服务。"),r("br"),e._v("\n                    　　(2)通告超职教育停止对该学员的服务。"),r("br"),e._v("\n                    　　结束学员服务后，学员使用网络服务的权利马上中止。"),r("br"),e._v("\n                    8、学员咨询"),r("br"),e._v("\n                    　　在如下时间里您可拨打网校的客服咨询电话："),r("br"),e._v("\n                    　　咨询服务电话："),r("br"),e._v("\n                    　　咨询时间："),r("br"),e._v("\n                    9、网络服务内容的所有权"),r("br"),e._v("\n                    　　超职教育定义的网络服务内容包括：文字、软件、声音、图片、录像、图表、邮件及广告中的全部内容，超职教育拥有以上内容的完全版权，严禁任何个人或单位在未经超职教育许可的情况下对这些内容进行翻版、复制、转载、篡改等一切用于商业活动的行为；超职教育的学员/会员账号只为本网校的个人注册用户本人所专有，严禁一个账号多人使用，如若发现上述情况，超职教育将有权停止其账号使用，并没收其非法所得，并根据情节的严重程度对其实行相应罚款或诉诸法律。"),r("br"),e._v("\n                    10、免责条款"),r("br"),e._v("\n                    　　当本网站以链接形式推荐其他网站内容时，由于本站并不控制相关网站和资源，因此访问者需理解并同意，本站并不对这些网站或资源的可用性负责，且不保证从这些网站获取的任何内容、产品、服务或其他材料的真实性、合法性，对于任何因使用或信赖从此类网站或资源上获取的内容、产品、服务或其他材料而造成（或声称造成）的任何直接或间接损失，本站均不承担任何责任。"),r("br"),e._v("\n                    　　由于用户将个人密码告知他人或与他人共享注册帐户，由此导致的任何个人资料泄露，本网站不负任何责任。"),r("br"),e._v("\n                    　　任何由于黑客攻击、计算机病毒侵入或发作、因政府管制而造成的暂时性关闭等影响网络正常经营的不可抗力而造成的个人资料泄露、丢失、被盗用或被窜改等，本网站均得免责。"),r("br"),e._v("\n                    　　本网站如因系统维护或升级而需暂停服务时，将事先公告。若因线路及非本公司控制范围外的硬件故障或其它不可抗力而导致暂停服务，于暂停服务期间造成的一切不便与损失，本网站不负任何责任。"),r("br"),e._v("\n                    　　本网站使用者因为违反本声明的规定而触犯中华人民共和国法律的，一切后果自己负责，本网站不承担任何责任。"),r("br"),e._v("\n                    　　本声明未涉及的问题参见国家有关法律法规，当本声明与国家法律法规冲突时，以国家法律法规为准。"),r("br")])])],1),e._v(" "),r("div",{staticClass:"text-center"},[e._v("\n            超职时代（北京）教育科技有限公司 版权所有 \n            ")])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"text-center"},[t("img",{staticStyle:{width:"300px"},attrs:{src:"static/images/logo-3.png",alt:""}})])}]};var v=r("VU/8")(l,c,!1,function(e){r("cUZF")},"data-v-d9f86254",null);t.default=v.exports},cUZF:function(e,t){}});
//# sourceMappingURL=1.034318360188adc640e6.js.map