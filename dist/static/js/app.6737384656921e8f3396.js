webpackJsonp([14],{"5LaQ":function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n("7+uW"),r=n("Dd8w"),i=n.n(r),a=n("NYxO"),u={name:"App",methods:i()({},Object(a.b)({getUserInfo:"USER_INFO",getCateList:"CATE_LIST"})),mounted:function(){this.getUserInfo(),this.getCateList()}},c={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("keep-alive",[this.$route.meta.keepAlive?t("router-view"):this._e()],1),this._v(" "),this.$route.meta.keepAlive?this._e():t("router-view")],1)},staticRenderFns:[]};var s=n("VU/8")(u,c,!1,function(e){n("5LaQ")},null,null).exports,p=n("/ocq");o.default.use(p.a);var l,d,f,m=new p.a({routes:[{path:"/",name:"home",redirect:"/login"},{path:"/login",name:"Login",component:function(){return n.e(11).then(n.bind(null,"jT7l"))}},{path:"/forget",name:"forget",component:function(){return n.e(12).then(n.bind(null,"zHOx"))}},{path:"/register",name:"register",component:function(){return n.e(10).then(n.bind(null,"8zp9"))}},{path:"/page",name:"page",component:function(){return Promise.all([n.e(0),n.e(9)]).then(n.bind(null,"cpAg"))},children:[{path:"/index",name:"Index",component:function(){return n.e(5).then(n.bind(null,"eerB"))},meta:{keepAlive:!0}},{path:"/courselist",name:"Courselist",component:function(){return n.e(8).then(n.bind(null,"JYqS"))},meta:{keepAlive:!0}},{path:"/livelist",name:"livelist",component:function(){return n.e(4).then(n.bind(null,"c+AL"))},meta:{keepAlive:!0}},{path:"/filelist",name:"filelist",component:function(){return n.e(7).then(n.bind(null,"3JcY"))},meta:{keepAlive:!0}},{path:"/info",name:"Info",component:function(){return n.e(2).then(n.bind(null,"PdC8"))},meta:{keepAlive:!0}},{path:"/orders",name:"orders",component:function(){return n.e(6).then(n.bind(null,"nbMf"))},meta:{keepAlive:!0}}]},{path:"/pay/:id?",name:"Pay",component:function(){return Promise.all([n.e(0),n.e(1)]).then(n.bind(null,"JEPv"))}},{path:"/male",name:"Male",component:function(){return Promise.all([n.e(0),n.e(3)]).then(n.bind(null,"VMOD"))},meta:{keepAlive:!0}}]}),g=n("bOdI"),v=n.n(g),y=n("VsUZ"),h=n("TIfe"),b={namespaced:!0,state:{},actions:(l={},v()(l,"login",function(e,t){return y.a.userLogin(t)}),v()(l,"reset",function(e,t){return y.a.userReset(t)}),v()(l,"reg",function(e,t){return y.a.userRegister(t)}),l),mutations:v()({},"login",function(e,t){})};o.default.use(a.a);var j=new a.a.Store({modules:{user:b},state:{userInfo:{user:{},ext_info:{},period:[]},cateList:[],Token:""},actions:(d={},v()(d,"USER_INFO",function(e,t){Object(h.a)()&&y.a.getUserInfo().then(function(t){e.commit("USER_INFO",t)}).fail(function(t){e.commit("USER_INFO",t)})}),v()(d,"CATE_LIST",function(e,t){Object(h.a)()&&y.a.getCategory().then(function(t){e.commit("CATE_LIST",t)})}),d),mutations:(f={},v()(f,"USER_INFO",function(e,t){e.userInfo=i()({},t,{ext_info:{avatar_file:""}})}),v()(f,"CATE_LIST",function(e,t){var n=t.data;e.cateList=n}),f)}),x=n("VKKs"),I=n("lbHh"),w=n.n(I),U={install:function(e){e.mixin({data:function(){return{Token:Object(h.a)()}},methods:{doLogout:function(){Object(h.b)(),this.$router.go()},openNew:function(e){window.open(e)}}}),e.prototype.$storage=x.a,e.prototype.$cookie=w.a}},T=n("Y81h"),_=n.n(T),S=(n("UVIz"),n("OZHB"),n("dstz"),n("7t+N"),n("zL8q")),L=n.n(S);n("tvR6");o.default.use(L.a),o.default.config.productionTip=!1,m.beforeEach(function(e,t,n){_.a.start();var o=["/","/login","/forget","/register"];Object(h.a)()?o.indexOf(e.fullPath)>=0?n("/index"):n():o.indexOf(e.fullPath)>=0?n():n("/login")}),m.afterEach(function(){_.a.done()}),o.default.prototype.$czapi=y.a,o.default.use(U),new o.default({el:"#app",router:m,store:j,components:{App:s},template:"<App/>"})},OZHB:function(e,t,n){"use strict";(function(e){var t,o=n("mvHQ"),r=n.n(o),i=n("pFYg"),a=n.n(i);t=function(e){function t(e){return a.raw?e:encodeURIComponent(e)}function n(e){return a.raw?e:decodeURIComponent(e)}function o(t,n){var o=a.raw?t:function(e){0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return e=decodeURIComponent(e.replace(i," ")),a.json?JSON.parse(e):e}catch(e){}}(t);return e.isFunction(n)?n(o):o}var i=/\+/g,a=e.cookie=function(i,u,c){if(void 0!==u&&!e.isFunction(u)){if("number"==typeof(c=e.extend({},a.defaults,c)).expires){var s=c.expires,p=c.expires=new Date;p.setTime(+p+864e5*s)}return document.cookie=[t(i),"=",function(e){return t(a.json?r()(e):String(e))}(u),c.expires?"; expires="+c.expires.toUTCString():"",c.path?"; path="+c.path:"",c.domain?"; domain="+c.domain:"",c.secure?"; secure":""].join("")}for(var l=i?void 0:{},d=document.cookie?document.cookie.split("; "):[],f=0,m=d.length;m>f;f++){var g=d[f].split("="),v=n(g.shift()),y=g.join("=");if(i&&i===v){l=o(y,u);break}i||void 0===(y=o(y))||(l[v]=y)}return l};a.defaults={},e.removeCookie=function(t,n){return void 0!==e.cookie(t)&&(e.cookie(t,"",e.extend({},n,{expires:-1})),!e.cookie(t))}},"function"==typeof define&&n("nErl")?define(["jquery"],t):t("object"==("undefined"==typeof exports?"undefined":a()(exports))?n("7t+N"):e)}).call(t,n("7t+N"))},TIfe:function(e,t,n){"use strict";t.a=function(){return r.a.get(i)},t.c=function(e){return r.a.set(i,e)},t.b=function(){return r.a.remove(i)};var o=n("lbHh"),r=n.n(o),i="userToken"},UVIz:function(e,t){},VKKs:function(e,t,n){"use strict";var o=n("mvHQ"),r=n.n(o);t.a={get:function(e){return JSON.parse(window.localStorage[e]||"{}")},set:function(e,t){return window.localStorage[e]=r()(t)},remove:function(e){return window.localStorage.removeItem(e)}}},VsUZ:function(e,t,n){"use strict";(function(e){var o=n("Dd8w"),r=n.n(o),i=(n("7+uW"),n("VKKs"),n("bzuE")),a=n("TIfe"),u=i.b,c=i.b+"/api/file/upload",s=function(t,n,o){n=r()({},n,{token:Object(a.a)()});var i=e.Deferred();return e.ajax({url:u+t,type:o||"post",data:n,dataType:"json",success:function(e){if(e.code>=600&&e.code<700)return Object(a.b)(),void(window.location.href="./index.html#/login");i.resolve(e)}}),i.promise()};t.a={uploadAction:c,contentPath:u,getPhoneCaptcha:function(e){return s("/api/phone-captcha",e)},doLogin:function(e){return s("/api/login",e)},getUserInfo:function(e){return s("/api/user",e||{},"get")},addUserInfo:function(e){return s("/api/user",e)},submitUserInfo:function(e){return s("/api/user/submit",e)},getCourseList:function(e){return s("/api/course/list",e)},getCourseInfo:function(e){return s("/api/course/information",e)},getCoursePlan:function(e){return s("/api/course/plan",e)},fileUpload:function(e){return s("/api/file/upload",e)},getProductList:function(e){return s("/api/product/list",e)},getPayInfo:function(e){return s("/api/get-pay-info",e)},refreshPrice:function(e){return s("/api/pay/refresh-price/"+e.token,e,"get")},pay:function(e){return s("/api/pay",e)},getCategory:function(e){return s("/api/course/category",e,"get")},getPayResult:function(e){return s("/api/pay/result/"+e.token,e,"get")},paySingup:function(e){return s("/api/user/paysingup",e,"get")},getLiveList:function(e){return s("/api/userlive/list",e,"post")},getSingupPayInfo:function(e){return s("/api/user/getpayinfo",e,"get")},getUserSign:function(e){return s("/api/usersign",e,"get")},saveUserSign:function(e){return s("/api/usersign",e,"post")},submitUserSign:function(e){return s("/api/usersign/submit",e,"post")},getUserSignPayinfo:function(e){return s("/api/usersign/getpayinfo",e,"get")},toPaySingUp:function(e){return s("/api/usersign/paysingup",e,"get")},getOrderList:function(e){return s("/api/user/order-list",e,"post")},getAgreement:function(e){return s("/api/orders/agreement",e,"post")},userLogin:function(e){return s("/api/user/login",e,"post")},userReset:function(e){return s("/api/user/reset",e,"post")},userRegister:function(e){return s("/api/user/reg",e,"post")}}}).call(t,n("7t+N"))},bzuE:function(e,t,n){"use strict";n.d(t,"b",function(){return r}),n.d(t,"a",function(){return i});var o=n("TIfe"),r="http://101.201.222.8:8081",i=function(){return Object(o.a)()}},dstz:function(module,exports,__webpack_require__){(function(jQuery,$){jQuery.extend({createUploadIframe:function(e,t){var n="jUploadFrame"+e;if(window.ActiveXObject){var o=document.createElement('<iframe id="'+n+'" name="'+n+'" />');"boolean"==typeof t?o.src="javascript:false":"string"==typeof t&&(o.src=t)}else{(o=document.createElement("iframe")).id=n,o.name=n}return o.style.position="absolute",o.style.top="-1000px",o.style.left="-1000px",document.body.appendChild(o),o},createUploadForm:function(e,t,n){var o="jUploadForm"+e,r="jUploadFile"+e,i=$('<form  action="" method="POST" name="'+o+'" id="'+o+'" enctype="multipart/form-data"></form>');if(n)for(var a in n)"undefined"!==n[a].name&&null!=n[a].name&&"undefined"!==n[a].value&&null!=n[a].value?jQuery('<input type="hidden" name="'+n[a].name+'" value="'+n[a].value+'" />').appendTo(i):jQuery('<input type="hidden" name="'+a+'" value="'+n[a]+'" />').appendTo(i);var u=$("#"+t),c=$(u).clone();return $(u).attr("id",r),$(u).before(c),$(u).appendTo(i),$(i).css("position","absolute"),$(i).css("top","-1200px"),$(i).css("left","-1200px"),$(i).appendTo("body"),i},ajaxFileUpload:function(e){e=jQuery.extend({},jQuery.ajaxSettings,e);var t=(new Date).getTime(),n=jQuery.createUploadForm(t,e.fileElementId,void 0!==e.data&&e.data),o=(jQuery.createUploadIframe(t,e.secureuri),"jUploadFrame"+t),r="jUploadForm"+t;e.global&&!jQuery.active++&&jQuery.event.trigger("ajaxStart");var i=!1,a={};e.global&&jQuery.event.trigger("ajaxSend",[a,e]);var u=function(t){var r=document.getElementById(o);try{r.contentWindow?(a.responseText=r.contentWindow.document.body?r.contentWindow.document.body.innerHTML:null,a.responseXML=r.contentWindow.document.XMLDocument?r.contentWindow.document.XMLDocument:r.contentWindow.document):r.contentDocument&&(a.responseText=r.contentDocument.document.body?r.contentDocument.document.body.innerHTML:null,a.responseXML=r.contentDocument.document.XMLDocument?r.contentDocument.document.XMLDocument:r.contentDocument.document)}catch(t){jQuery.handleError(e,a,null,t)}if(a||"timeout"==t){var u;i=!0;try{if("error"!=(u="timeout"!=t?"success":"error")){var c=jQuery.uploadHttpData(a,e.dataType);e.success&&e.success(c,u),e.global&&jQuery.event.trigger("ajaxSuccess",[a,e])}else jQuery.handleError(e,a,u)}catch(t){u="error",jQuery.handleError(e,a,u,t)}e.global&&jQuery.event.trigger("ajaxComplete",[a,e]),e.global&&!--jQuery.active&&jQuery.event.trigger("ajaxStop"),e.complete&&e.complete(a,u),jQuery(r).unbind(),setTimeout(function(){try{$(r).remove(),$(n).remove()}catch(t){jQuery.handleError(e,a,null,t)}},100),a=null}};e.timeout>0&&setTimeout(function(){i||u("timeout")},e.timeout);try{n=$("#"+r);$(n).attr("action",e.url),$(n).attr("method","POST"),$(n).attr("target",o),n.encoding?n.encoding="multipart/form-data":n.enctype="multipart/form-data",$(n).submit()}catch(t){jQuery.handleError(e,a,null,t)}return window.attachEvent?document.getElementById(o).attachEvent("onload",u):document.getElementById(o).addEventListener("load",u,!1),{abort:function(){}}},uploadHttpData:function uploadHttpData(r,type){var data=!type;return data="xml"==type||data?r.responseXML:r.responseText,"script"==type&&jQuery.globalEval(data),"json"==type&&eval("data = "+$("<div>"+data+"</div>").text()),"html"==type&&jQuery("<div>").html(data).evalScripts(),data}})}).call(exports,__webpack_require__("7t+N"),__webpack_require__("7t+N"))}},["NHnr"]);
//# sourceMappingURL=app.6737384656921e8f3396.js.map