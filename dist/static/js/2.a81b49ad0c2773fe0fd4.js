webpackJsonp([2],{"1Y2G":function(t,e,r){var n=r("oLzS"),i=r("Sd0T"),o=r("utyv"),a=r("uF9H"),s=r("Dsid"),u=n.getBCHDigit(7973);function f(t,e){return a.getCharCountIndicator(t,e)+4}function l(t,e){var r=0;return t.forEach(function(t){var n=f(t.mode,e);r+=n+t.getBitsLength()}),r}e.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40},e.from=function(t,r){return e.isValid(t)?parseInt(t,10):r},e.getCapacity=function(t,r,o){if(!e.isValid(t))throw new Error("Invalid QR Code version");void 0===o&&(o=a.BYTE);var s=8*(n.getSymbolTotalCodewords(t)-i.getTotalCodewordsCount(t,r));if(o===a.MIXED)return s;var u=s-f(o,t);switch(o){case a.NUMERIC:return Math.floor(u/10*3);case a.ALPHANUMERIC:return Math.floor(u/11*2);case a.KANJI:return Math.floor(u/13);case a.BYTE:default:return Math.floor(u/8)}},e.getBestVersionForData=function(t,r){var n,i=o.from(r,o.M);if(s(t)){if(t.length>1)return function(t,r){for(var n=1;n<=40;n++)if(l(t,n)<=e.getCapacity(n,r,a.MIXED))return n}(t,i);if(0===t.length)return 1;n=t[0]}else n=t;return function(t,r,n){for(var i=1;i<=40;i++)if(r<=e.getCapacity(i,n,t))return i}(n.mode,n.getLength(),i)},e.getEncodedBits=function(t){if(!e.isValid(t)||t<7)throw new Error("Invalid QR Code version");for(var r=t<<12;n.getBCHDigit(r)-u>=0;)r^=7973<<n.getBCHDigit(r)-u;return t<<12|r}},"71e1":function(t,e,r){var n=r("mwnW"),i=r("WEzc"),o=r("9ff9"),a=r("729m");function s(t,e,r,o,a){var s=[].slice.call(arguments,1),u=s.length,f="function"==typeof s[u-1];if(!f&&!n())throw new Error("Callback required as last argument");if(!f){if(u<1)throw new Error("Too few arguments provided");return 1===u?(r=e,e=o=void 0):2!==u||e.getContext||(o=r,r=e,e=void 0),new Promise(function(n,a){try{var s=i.create(r,o);n(t(s,e,o))}catch(t){a(t)}})}if(u<2)throw new Error("Too few arguments provided");2===u?(a=r,r=e,e=o=void 0):3===u&&(e.getContext&&void 0===a?(a=o,o=void 0):(a=o,o=r,r=e,e=void 0));try{var l=i.create(r,o);a(null,t(l,e,o))}catch(t){a(t)}}e.create=i.create,e.toCanvas=s.bind(null,o.render),e.toDataURL=s.bind(null,o.renderToDataURL),e.toString=s.bind(null,function(t,e,r){return a.render(t,r)})},"729m":function(t,e,r){var n=r("nwDn");function i(t,e){var r=t.a/255,n=e+'="'+t.hex+'"';return r<1?n+" "+e+'-opacity="'+r.toFixed(2).slice(1)+'"':n}function o(t,e,r){var n=t+e;return void 0!==r&&(n+=" "+r),n}e.render=function(t,e,r){var a=n.getOptions(e),s=t.modules.size,u=t.modules.data,f=s+2*a.margin,l=a.color.light.a?"<path "+i(a.color.light,"fill")+' d="M0 0h'+f+"v"+f+'H0z"/>':"",c="<path "+i(a.color.dark,"stroke")+' d="'+function(t,e,r){for(var n="",i=0,a=!1,s=0,u=0;u<t.length;u++){var f=Math.floor(u%e),l=Math.floor(u/e);f||a||(a=!0),t[u]?(s++,u>0&&f>0&&t[u-1]||(n+=a?o("M",f+r,.5+l+r):o("m",i,0),i=0,a=!1),f+1<e&&t[u+1]||(n+=o("h",s),s=0)):i++}return n}(u,s,a.margin)+'"/>',h='viewBox="0 0 '+f+" "+f+'"',d='<svg xmlns="http://www.w3.org/2000/svg" '+(a.width?'width="'+a.width+'" height="'+a.width+'" ':"")+h+">"+l+c+"</svg>";return"function"==typeof r&&r(null,d),d}},"9ff9":function(t,e,r){var n=r("nwDn");e.render=function(t,e,r){var i=r,o=e;void 0!==i||e&&e.getContext||(i=e,e=void 0),e||(o=function(){try{return document.createElement("canvas")}catch(t){throw new Error("You need to specify a canvas element")}}()),i=n.getOptions(i);var a=n.getImageWidth(t.modules.size,i),s=o.getContext("2d"),u=s.createImageData(a,a);return n.qrToImageData(u.data,t,i),function(t,e,r){t.clearRect(0,0,e.width,e.height),e.style||(e.style={}),e.height=r,e.width=r,e.style.height=r+"px",e.style.width=r+"px"}(s,o,a),s.putImageData(u,0,0),o},e.renderToDataURL=function(t,r,n){var i=n;void 0!==i||r&&r.getContext||(i=r,r=void 0),i||(i={});var o=e.render(t,r,i),a=i.type||"image/png",s=i.rendererOpts||{};return o.toDataURL(a,s.quality)}},"9jEu":function(t,e,r){var n=r("oLzS").getSymbolSize;e.getRowColCoords=function(t){if(1===t)return[];for(var e=Math.floor(t/7)+2,r=n(t),i=145===r?26:2*Math.ceil((r-13)/(2*e-2)),o=[r-7],a=1;a<e-1;a++)o[a]=o[a-1]-i;return o.push(6),o.reverse()},e.getPositions=function(t){for(var r=[],n=e.getRowColCoords(t),i=n.length,o=0;o<i;o++)for(var a=0;a<i;a++)0===o&&0===a||0===o&&a===i-1||o===i-1&&0===a||r.push([n[o],n[a]]);return r}},DEuz:function(t,e){function r(){this.buffer=[],this.length=0}r.prototype={get:function(t){var e=Math.floor(t/8);return 1==(this.buffer[e]>>>7-t%8&1)},put:function(t,e){for(var r=0;r<e;r++)this.putBit(1==(t>>>e-r-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}},t.exports=r},Dsid:function(t,e){var r={}.toString;t.exports=Array.isArray||function(t){return"[object Array]"==r.call(t)}},JEPv:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r("71e1"),i=r.n(n),o=0,a={name:"Pay",components:{layoutHeader:r("Cz8s").a},data:function(){return{payData:{},payType:"wechat",dialogSuccess:!1,dialogFail:!1,cateList:[],payResult:{},qrcode:""}},methods:{refreshPrice:function(){var t=this;this.$czapi.refreshPrice({token:this.payResult.token}).then(function(e){t.payData.price=e.data,t.$message.success("刷新价格成功"),t.getQRcode()})},getQRcode:function(){var t=this;this.$czapi.pay({product_id:this.payData.id,channel:this.payType}).then(function(e){t.payResult=e,t.getPayResult(e.token),e.qrtext&&i.a.toDataURL(e.qrtext,{errorCorrectionLevel:"H"}).then(function(e){console.log(e),t.qrcode=e})})},getPayResult:function(t){var e=this;this.$czapi.getPayResult({token:t}).then(function(r){var n=r.code;r.msg;if(200!=n)return o=setTimeout(function(){e.getPayResult(t)},5e3),!1;e.dialogSuccess=!0})},getPayInfo:function(){var t=this;this.$czapi.getPayInfo({product_id:this.payData.id,channel:this.payType}).then(function(e){t.payData=e.product,t.payData.price=e.price,t.getQRcode()})}},mounted:function(){},activated:function(){this.payResult={};var t=this.$route.query.id;t&&(window.payData={id:t}),window.payData?(this.payData=window.payData,this.getPayInfo()):this.$router.push({name:"Male"})},deactivated:function(){clearTimeout(o)}},s={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-container",[r("el-header",[r("layoutHeader")],1),t._v(" "),r("el-container",[r("el-main",[r("div",{staticClass:"male-main"},[r("div",{staticClass:"ant-layout"},[r("div",{staticClass:"ant-layout ant-layout-has-sider"},[r("div",{staticClass:"ant-layout",staticStyle:{padding:"20px 0",background:"#fff"}},[r("div",{staticStyle:{width:"1200px",margin:"0 auto",background:"#fff"}},[r("div",{staticStyle:{"margin-bottom":"10px","font-size":"16px",color:"#56509F"}},[t._v("超职商城-确认支付")]),t._v(" "),r("div",{staticClass:"margin-top-20 color-6",staticStyle:{padding:"0 20px",background:"#F6F6F6",border:"1px solid #EBEBEB","line-height":"50px"}},[t._v("\n                                    请确认您的订单信息，并按提示完成支付\n                                ")]),t._v(" "),r("el-form",{staticClass:"margin-top-20",attrs:{direction:"horizontal","label-width":"120px"}},[r("el-form-item",{attrs:{label:"订单内容"}},[r("span",{staticClass:"ant-form-text",staticStyle:{"font-size":"18px"},attrs:{id:"userName",name:"userName"}},[t._v(t._s(t.payData.name))])]),t._v(" "),r("el-form-item",{attrs:{label:"订单价格"}},[r("div",{staticClass:"inline-block",staticStyle:{"font-size":"28px","margin-right":"20px"}},[r("span",{staticClass:"color-warn"},[t._v(t._s(t.payData.price))]),t._v("元")]),t._v(" "),r("el-button",{attrs:{type:"default","html-type":"button"},on:{click:function(e){t.refreshPrice()}}},[t._v("刷新价格")])],1),t._v(" "),r("el-form-item",{attrs:{label:"支付方式"}},[r("el-radio-group",{on:{change:t.getQRcode},model:{value:t.payType,callback:function(e){t.payType=e},expression:"payType"}},[r("el-radio",{attrs:{label:"wechat"}},[t._v("微信支付")]),t._v(" "),r("el-radio",{attrs:{label:"alipay"}},[t._v("支付宝")])],1)],1),t._v(" "),r("el-form-item",{attrs:{label:"扫码支付"}},[r("div",{staticStyle:{width:"200px",height:"200px",padding:"10px",border:"1px solid #eee"}},[r("img",{staticStyle:{width:"100%"},attrs:{src:t.qrcode}})])]),t._v(" "),r("el-form-item",{attrs:{label:""}},[20==t.payData.id?r("span",[t._v("购买及表示您同意《\n                                            "),r("a",{staticClass:"link",attrs:{href:"http://news.chaozhiedu.com/wj/jinpailubo.docx"}},[t._v("【超职教育】18年＜金牌录播＞·协议")]),t._v("》")]):t._e(),t._v(" "),10==t.payData.id?r("span",[t._v("购买及表示您同意《\n                                            "),r("a",{staticClass:"link",attrs:{href:"http://news.chaozhiedu.com/wj/vipshicao.docx"}},[t._v("【超职教育】18年＜VIP保障实操班＞·协议")]),t._v("》")]):t._e(),t._v(" "),9==t.payData.id?r("span",[t._v("购买及表示您同意《\n                                            "),r("a",{staticClass:"link",attrs:{href:"http://news.chaozhiedu.com/wj/gaoxiaoquzheng.docx"}},[t._v("【超职教育】18年＜高效私教取证班＞·协议")]),t._v("》")]):t._e(),t._v(" "),8==t.payData.id?r("span",[t._v("购买及表示您同意《\n                                            "),r("a",{staticClass:"link",attrs:{href:"http://news.chaozhiedu.com/wj/lingjichutezhao.docx"}},[t._v("【超职教育】18年＜零基础特招班＞· 协议")]),t._v("》")]):t._e()]),t._v(" "),r("el-form-item",{attrs:{label:"支持支付类型"}},[r("div",{staticStyle:{width:"320px",overflow:"hidden"}},[r("img",{attrs:{src:"/static/images/20180316111851.png"}})])])],1),t._v(" "),r("div",{domProps:{innerHTML:t._s(t.payResult.form)}})],1)])])]),t._v(" "),r("el-dialog",{attrs:{title:"支付提醒",width:"800",visible:t.dialogSuccess},on:{"update:visible":function(e){t.dialogSuccess=e}}},[r("div",{staticClass:"clearfix",staticStyle:{"font-size":"16px"}},[r("div",{staticClass:"pull-left margin-left-20"},[r("i",{staticClass:"iconfont icon-chenggong",staticStyle:{"font-size":"100px",color:"#7ED321"}})]),t._v(" "),r("div",{staticClass:"pull-left margin-left-20",staticStyle:{width:"450px"}},[r("div",{staticStyle:{"font-size":"24px"}},[t._v("\n                                恭喜您，支付成功\n                            ")]),t._v(" "),r("div",{staticClass:"margin-top-20",staticStyle:{"font-size":"14px"}},[t._v("\n                                订单信息："+t._s(t.payData.name)+"\n                            ")]),t._v(" "),r("div",{staticClass:"margin-top-20",staticStyle:{"font-size":"14px",color:"#FF4000"}},[r("el-button",{attrs:{type:"primary"},on:{click:function(e){t.$router.push("/male")}}},[t._v("继续挑选课程")]),t._v(" "),r("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"default"},on:{click:function(e){t.$router.push("/courselist")}}},[t._v("进入我的课程")])],1),t._v(" "),r("div",{staticClass:"margin-top-20",staticStyle:{"font-size":"18px"}},[t._v("支付遇到问题：请联系010-51657777")])])])]),t._v(" "),r("el-dialog",{attrs:{title:"支付提醒",width:"800",visible:t.dialogFail},on:{"update:visible":function(e){t.dialogFail=e}}},[r("div",{staticClass:"clearfix",staticStyle:{"font-size":"16px"}},[r("div",{staticClass:"pull-left margin-left-20"},[r("i",{staticClass:"iconfont icon-warning",staticStyle:{"font-size":"100px",color:"#FF4000"}})]),t._v(" "),r("div",{staticClass:"pull-left margin-left-20",staticStyle:{width:"450px"}},[r("div",{staticStyle:{"font-size":"24px"}},[t._v("\n                                支付失败，请点击重新支付\n                            ")]),t._v(" "),r("div",{staticClass:"margin-top-20",staticStyle:{"font-size":"14px"}},[t._v("\n                                订单信息："+t._s(t.payData.name)+"\n                            ")]),t._v(" "),r("div",{staticClass:"margin-top-20"},[r("el-button",{attrs:{type:"error"}},[t._v("重新支付")]),t._v(" "),r("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"default"}},[t._v("返回商城")])],1),t._v(" "),r("div",{staticClass:"margin-top-20",staticStyle:{"font-size":"18px"}},[t._v("支付遇到问题：请联系010-51657777")])])])])],1)])],1)],1)},staticRenderFns:[]};var u=r("VU/8")(a,s,!1,function(t){r("vaFl")},"data-v-22454621",null);e.default=u.exports},NV47:function(t,e,r){var n=r("jF+B"),i=new n(512),o=new n(256);!function(){for(var t=1,e=0;e<255;e++)i[e]=t,o[t]=e,256&(t<<=1)&&(t^=285);for(e=255;e<512;e++)i[e]=i[e-255]}(),e.log=function(t){if(t<1)throw new Error("log("+t+")");return o[t]},e.exp=function(t){return i[t]},e.mul=function(t,e){return 0===t||0===e?0:i[o[t]+o[e]]}},"NY/E":function(t,e){var r="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+",n="(?:(?![A-Z0-9 $%*+\\-./:]|"+(r=r.replace(/u/g,"\\u"))+").)+";e.KANJI=new RegExp(r,"g"),e.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),e.BYTE=new RegExp(n,"g"),e.NUMERIC=new RegExp("[0-9]+","g"),e.ALPHANUMERIC=new RegExp("[A-Z $%*+\\-./:]+","g");var i=new RegExp("^"+r+"$"),o=new RegExp("^[0-9]+$"),a=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");e.testKanji=function(t){return i.test(t)},e.testNumeric=function(t){return o.test(t)},e.testAlphanumeric=function(t){return a.test(t)}},RO0P:function(t,e,r){var n=r("uF9H"),i=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function o(t){this.mode=n.ALPHANUMERIC,this.data=t}o.getBitsLength=function(t){return 11*Math.floor(t/2)+t%2*6},o.prototype.getLength=function(){return this.data.length},o.prototype.getBitsLength=function(){return o.getBitsLength(this.data.length)},o.prototype.write=function(t){var e;for(e=0;e+2<=this.data.length;e+=2){var r=45*i.indexOf(this.data[e]);r+=i.indexOf(this.data[e+1]),t.put(r,11)}this.data.length%2&&t.put(i.indexOf(this.data[e]),6)},t.exports=o},RY9c:function(t,e,r){var n=r("jF+B");function i(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new n(t*t),this.data.fill(0),this.reservedBit=new n(t*t),this.reservedBit.fill(0)}i.prototype.set=function(t,e,r,n){var i=t*this.size+e;this.data[i]=r,n&&(this.reservedBit[i]=!0)},i.prototype.get=function(t,e){return this.data[t*this.size+e]},i.prototype.xor=function(t,e,r){this.data[t*this.size+e]^=r},i.prototype.isReserved=function(t,e){return this.reservedBit[t*this.size+e]},t.exports=i},Sd0T:function(t,e,r){var n=r("utyv"),i=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],o=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];e.getBlocksCount=function(t,e){switch(e){case n.L:return i[4*(t-1)+0];case n.M:return i[4*(t-1)+1];case n.Q:return i[4*(t-1)+2];case n.H:return i[4*(t-1)+3];default:return}},e.getTotalCodewordsCount=function(t,e){switch(e){case n.L:return o[4*(t-1)+0];case n.M:return o[4*(t-1)+1];case n.Q:return o[4*(t-1)+2];case n.H:return o[4*(t-1)+3];default:return}}},WEzc:function(t,e,r){var n=r("jF+B"),i=r("oLzS"),o=r("utyv"),a=r("DEuz"),s=r("RY9c"),u=r("9jEu"),f=r("YamF"),l=r("ljsv"),c=r("Sd0T"),h=r("wBZN"),d=r("1Y2G"),g=r("xR/K"),p=r("uF9H"),v=r("nyx9"),y=r("Dsid");function m(t,e,r){var n,i,o=t.size,a=g.getEncodedBits(e,r);for(n=0;n<15;n++)i=1==(a>>n&1),n<6?t.set(n,8,i,!0):n<8?t.set(n+1,8,i,!0):t.set(o-15+n,8,i,!0),n<8?t.set(8,o-n-1,i,!0):n<9?t.set(8,15-n-1+1,i,!0):t.set(8,15-n-1,i,!0);t.set(o-8,8,1,!0)}function w(t,e,r){var o=new a;r.forEach(function(e){o.put(e.mode.bit,4),o.put(e.getLength(),p.getCharCountIndicator(e.mode,t)),e.write(o)});var s=8*(i.getSymbolTotalCodewords(t)-c.getTotalCodewordsCount(t,e));for(o.getLengthInBits()+4<=s&&o.put(0,4);o.getLengthInBits()%8!=0;)o.putBit(0);for(var u=(s-o.getLengthInBits())/8,f=0;f<u;f++)o.put(f%2?17:236,8);return function(t,e,r){for(var o=i.getSymbolTotalCodewords(e),a=c.getTotalCodewordsCount(e,r),s=o-a,u=c.getBlocksCount(e,r),f=u-o%u,l=Math.floor(o/u),d=Math.floor(s/u),g=d+1,p=l-d,v=new h(p),y=0,m=new Array(u),w=new Array(u),E=0,_=new n(t.buffer),b=0;b<u;b++){var R=b<f?d:g;m[b]=_.slice(y,y+R),w[b]=v.encode(m[b]),y+=R,E=Math.max(E,R)}var A,C,B=new n(o),P=0;for(A=0;A<E;A++)for(C=0;C<u;C++)A<m[C].length&&(B[P++]=m[C][A]);for(A=0;A<p;A++)for(C=0;C<u;C++)B[P++]=w[C][A];return B}(o,t,e)}function E(t,e,r,n){var o;if(y(t))o=v.fromArray(t);else{if("string"!=typeof t)throw new Error("Invalid data");var a=e;if(!a){var c=v.rawSplit(t);a=d.getBestVersionForData(c,r)}o=v.fromString(t,a||40)}var h=d.getBestVersionForData(o,r);if(!h)throw new Error("The amount of data is too big to be stored in a QR Code");if(e){if(e<h)throw new Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: "+h+".\n")}else e=h;var g=w(e,r,o),p=i.getSymbolSize(e),E=new s(p);return function(t,e){for(var r=t.size,n=f.getPositions(e),i=0;i<n.length;i++)for(var o=n[i][0],a=n[i][1],s=-1;s<=7;s++)if(!(o+s<=-1||r<=o+s))for(var u=-1;u<=7;u++)a+u<=-1||r<=a+u||(s>=0&&s<=6&&(0===u||6===u)||u>=0&&u<=6&&(0===s||6===s)||s>=2&&s<=4&&u>=2&&u<=4?t.set(o+s,a+u,!0,!0):t.set(o+s,a+u,!1,!0))}(E,e),function(t){for(var e=t.size,r=8;r<e-8;r++){var n=r%2==0;t.set(r,6,n,!0),t.set(6,r,n,!0)}}(E),function(t,e){for(var r=u.getPositions(e),n=0;n<r.length;n++)for(var i=r[n][0],o=r[n][1],a=-2;a<=2;a++)for(var s=-2;s<=2;s++)-2===a||2===a||-2===s||2===s||0===a&&0===s?t.set(i+a,o+s,!0,!0):t.set(i+a,o+s,!1,!0)}(E,e),m(E,r,0),e>=7&&function(t,e){for(var r,n,i,o=t.size,a=d.getEncodedBits(e),s=0;s<18;s++)r=Math.floor(s/3),n=s%3+o-8-3,i=1==(a>>s&1),t.set(r,n,i,!0),t.set(n,r,i,!0)}(E,e),function(t,e){for(var r=t.size,n=-1,i=r-1,o=7,a=0,s=r-1;s>0;s-=2)for(6===s&&s--;;){for(var u=0;u<2;u++)if(!t.isReserved(i,s-u)){var f=!1;a<e.length&&(f=1==(e[a]>>>o&1)),t.set(i,s-u,f),-1==--o&&(a++,o=7)}if((i+=n)<0||r<=i){i-=n,n=-n;break}}}(E,g),n||(n=l.getBestMask(E,m.bind(null,E,r))),l.applyMask(n,E),m(E,r,n),{modules:E,version:e,errorCorrectionLevel:r,maskPattern:n,segments:o}}e.create=function(t,e){if(void 0===t||""===t)throw new Error("No input text");var r,n,a=o.M;return void 0!==e&&(a=o.from(e.errorCorrectionLevel,o.M),r=d.from(e.version),n=l.from(e.maskPattern),e.toSJISFunc&&i.setToSJISFunction(e.toSJISFunc)),E(t,r,a,n)}},X0RI:function(t,e,r){var n=r("jF+B"),i=r("NV47");e.mul=function(t,e){var r=new n(t.length+e.length-1);r.fill(0);for(var o=0;o<t.length;o++)for(var a=0;a<e.length;a++)r[o+a]^=i.mul(t[o],e[a]);return r},e.mod=function(t,e){for(var r=new n(t);r.length-e.length>=0;){for(var o=r[0],a=0;a<e.length;a++)r[a]^=i.mul(e[a],o);for(var s=0;s<r.length&&0===r[s];)s++;r=r.slice(s)}return r},e.generateECPolynomial=function(t){for(var r=new n([1]),o=0;o<t;o++)r=e.mul(r,[1,i.exp(o)]);return r}},YamF:function(t,e,r){var n=r("oLzS").getSymbolSize;e.getPositions=function(t){var e=n(t);return[[0,0],[e-7,0],[0,e-7]]}},"b2+w":function(t,e,r){"use strict";var n={single_source_shortest_paths:function(t,e,r){var i={},o={};o[e]=0;var a,s,u,f,l,c,h,d=n.PriorityQueue.make();for(d.push(e,0);!d.empty();)for(u in s=(a=d.pop()).value,f=a.cost,l=t[s]||{})l.hasOwnProperty(u)&&(c=f+l[u],h=o[u],(void 0===o[u]||h>c)&&(o[u]=c,d.push(u,c),i[u]=s));if(void 0!==r&&void 0===o[r]){var g=["Could not find a path from ",e," to ",r,"."].join("");throw new Error(g)}return i},extract_shortest_path_from_predecessor_list:function(t,e){for(var r=[],n=e;n;)r.push(n),t[n],n=t[n];return r.reverse(),r},find_path:function(t,e,r){var i=n.single_source_shortest_paths(t,e,r);return n.extract_shortest_path_from_predecessor_list(i,r)},PriorityQueue:{make:function(t){var e,r=n.PriorityQueue,i={};for(e in t=t||{},r)r.hasOwnProperty(e)&&(i[e]=r[e]);return i.queue=[],i.sorter=t.sorter||r.default_sorter,i},default_sorter:function(t,e){return t.cost-e.cost},push:function(t,e){var r={value:t,cost:e};this.queue.push(r),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return 0===this.queue.length}}};t.exports=n},"jF+B":function(t,e,r){"use strict";var n=r("Dsid");o.TYPED_ARRAY_SUPPORT=function(){try{var t=new Uint8Array(1);return t.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===t.foo()}catch(t){return!1}}();var i=o.TYPED_ARRAY_SUPPORT?2147483647:1073741823;function o(t,e,r){return o.TYPED_ARRAY_SUPPORT||this instanceof o?"number"==typeof t?u(this,t):function(t,e,r,n){if("number"==typeof e)throw new TypeError('"value" argument must not be a number');if("undefined"!=typeof ArrayBuffer&&e instanceof ArrayBuffer)return function(t,e,r,n){if(r<0||e.byteLength<r)throw new RangeError("'offset' is out of bounds");if(e.byteLength<r+(n||0))throw new RangeError("'length' is out of bounds");var i;i=void 0===r&&void 0===n?new Uint8Array(e):void 0===n?new Uint8Array(e,r):new Uint8Array(e,r,n);o.TYPED_ARRAY_SUPPORT?i.__proto__=o.prototype:i=f(t,i);return i}(t,e,r,n);if("string"==typeof e)return function(t,e){var r=0|c(e),n=s(t,r),i=n.write(e);i!==r&&(n=n.slice(0,i));return n}(t,e);return function(t,e){if(o.isBuffer(e)){var r=0|a(e.length),n=s(t,r);return 0===n.length?n:(e.copy(n,0,0,r),n)}if(e){if("undefined"!=typeof ArrayBuffer&&e.buffer instanceof ArrayBuffer||"length"in e)return"number"!=typeof e.length||(i=e.length)!=i?s(t,0):f(t,e);if("Buffer"===e.type&&Array.isArray(e.data))return f(t,e.data)}var i;throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}(t,e)}(this,t,e,r):new o(t,e,r)}function a(t){if(t>=i)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+i.toString(16)+" bytes");return 0|t}function s(t,e){var r;return o.TYPED_ARRAY_SUPPORT?(r=new Uint8Array(e)).__proto__=o.prototype:(null===(r=t)&&(r=new o(e)),r.length=e),r}function u(t,e){var r=s(t,e<0?0:0|a(e));if(!o.TYPED_ARRAY_SUPPORT)for(var n=0;n<e;++n)r[n]=0;return r}function f(t,e){for(var r=e.length<0?0:0|a(e.length),n=s(t,r),i=0;i<r;i+=1)n[i]=255&e[i];return n}function l(t,e){var r;e=e||1/0;for(var n=t.length,i=null,o=[],a=0;a<n;++a){if((r=t.charCodeAt(a))>55295&&r<57344){if(!i){if(r>56319){(e-=3)>-1&&o.push(239,191,189);continue}if(a+1===n){(e-=3)>-1&&o.push(239,191,189);continue}i=r;continue}if(r<56320){(e-=3)>-1&&o.push(239,191,189),i=r;continue}r=65536+(i-55296<<10|r-56320)}else i&&(e-=3)>-1&&o.push(239,191,189);if(i=null,r<128){if((e-=1)<0)break;o.push(r)}else if(r<2048){if((e-=2)<0)break;o.push(r>>6|192,63&r|128)}else if(r<65536){if((e-=3)<0)break;o.push(r>>12|224,r>>6&63|128,63&r|128)}else{if(!(r<1114112))throw new Error("Invalid code point");if((e-=4)<0)break;o.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}}return o}function c(t){return o.isBuffer(t)?t.length:"undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(t)||t instanceof ArrayBuffer)?t.byteLength:("string"!=typeof t&&(t=""+t),0===t.length?0:l(t).length)}o.TYPED_ARRAY_SUPPORT&&(o.prototype.__proto__=Uint8Array.prototype,o.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&o[Symbol.species]===o&&Object.defineProperty(o,Symbol.species,{value:null,configurable:!0,enumerable:!1,writable:!1})),o.prototype.write=function(t,e,r){void 0===e?(r=this.length,e=0):void 0===r&&"string"==typeof e?(r=this.length,e=0):isFinite(e)&&(e|=0,isFinite(r)?r|=0:r=void 0);var n=this.length-e;if((void 0===r||r>n)&&(r=n),t.length>0&&(r<0||e<0)||e>this.length)throw new RangeError("Attempt to write outside buffer bounds");return function(t,e,r,n){return function(t,e,r,n){for(var i=0;i<n&&!(i+r>=e.length||i>=t.length);++i)e[i+r]=t[i];return i}(l(e,t.length-r),t,r,n)}(this,t,e,r)},o.prototype.slice=function(t,e){var r,n=this.length;if(t=~~t,e=void 0===e?n:~~e,t<0?(t+=n)<0&&(t=0):t>n&&(t=n),e<0?(e+=n)<0&&(e=0):e>n&&(e=n),e<t&&(e=t),o.TYPED_ARRAY_SUPPORT)(r=this.subarray(t,e)).__proto__=o.prototype;else{var i=e-t;r=new o(i,void 0);for(var a=0;a<i;++a)r[a]=this[a+t]}return r},o.prototype.copy=function(t,e,r,n){if(r||(r=0),n||0===n||(n=this.length),e>=t.length&&(e=t.length),e||(e=0),n>0&&n<r&&(n=r),n===r)return 0;if(0===t.length||0===this.length)return 0;if(e<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("sourceStart out of bounds");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-e<n-r&&(n=t.length-e+r);var i,a=n-r;if(this===t&&r<e&&e<n)for(i=a-1;i>=0;--i)t[i+e]=this[i+r];else if(a<1e3||!o.TYPED_ARRAY_SUPPORT)for(i=0;i<a;++i)t[i+e]=this[i+r];else Uint8Array.prototype.set.call(t,this.subarray(r,r+a),e);return a},o.prototype.fill=function(t,e,r){if("string"==typeof t){if("string"==typeof e?(e=0,r=this.length):"string"==typeof r&&(r=this.length),1===t.length){var n=t.charCodeAt(0);n<256&&(t=n)}}else"number"==typeof t&&(t&=255);if(e<0||this.length<e||this.length<r)throw new RangeError("Out of range index");if(r<=e)return this;var i;if(e>>>=0,r=void 0===r?this.length:r>>>0,t||(t=0),"number"==typeof t)for(i=e;i<r;++i)this[i]=t;else{var a=o.isBuffer(t)?t:new o(t),s=a.length;for(i=0;i<r-e;++i)this[i+e]=a[i%s]}return this},o.concat=function(t,e){if(!n(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return s(null,0);var r;if(void 0===e)for(e=0,r=0;r<t.length;++r)e+=t[r].length;var i=u(null,e),a=0;for(r=0;r<t.length;++r){var f=t[r];if(!o.isBuffer(f))throw new TypeError('"list" argument must be an Array of Buffers');f.copy(i,a),a+=f.length}return i},o.byteLength=c,o.prototype._isBuffer=!0,o.isBuffer=function(t){return!(null==t||!t._isBuffer)},t.exports=o},ljsv:function(t,e){e.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};var r=3,n=3,i=40,o=10;function a(t,r,n){switch(t){case e.Patterns.PATTERN000:return(r+n)%2==0;case e.Patterns.PATTERN001:return r%2==0;case e.Patterns.PATTERN010:return n%3==0;case e.Patterns.PATTERN011:return(r+n)%3==0;case e.Patterns.PATTERN100:return(Math.floor(r/2)+Math.floor(n/3))%2==0;case e.Patterns.PATTERN101:return r*n%2+r*n%3==0;case e.Patterns.PATTERN110:return(r*n%2+r*n%3)%2==0;case e.Patterns.PATTERN111:return(r*n%3+(r+n)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}}e.isValid=function(t){return t&&""!==t&&!isNaN(t)&&t>=0&&t<=7},e.from=function(t){return e.isValid(t)?parseInt(t,10):void 0},e.getPenaltyN1=function(t){for(var e=t.size,n=0,i=0,o=0,a=null,s=null,u=0;u<e;u++){i=o=0,a=s=null;for(var f=0;f<e;f++){var l=t.get(u,f);l===a?i++:(i>=5&&(n+=r+(i-5)),a=l,i=1),(l=t.get(f,u))===s?o++:(o>=5&&(n+=r+(o-5)),s=l,o=1)}i>=5&&(n+=r+(i-5)),o>=5&&(n+=r+(o-5))}return n},e.getPenaltyN2=function(t){for(var e=t.size,r=0,i=0;i<e-1;i++)for(var o=0;o<e-1;o++){var a=t.get(i,o)+t.get(i,o+1)+t.get(i+1,o)+t.get(i+1,o+1);4!==a&&0!==a||r++}return r*n},e.getPenaltyN3=function(t){for(var e=t.size,r=0,n=0,o=0,a=0;a<e;a++){n=o=0;for(var s=0;s<e;s++)n=n<<1&2047|t.get(a,s),s>=10&&(1488===n||93===n)&&r++,o=o<<1&2047|t.get(s,a),s>=10&&(1488===o||93===o)&&r++}return r*i},e.getPenaltyN4=function(t){for(var e=0,r=t.data.length,n=0;n<r;n++)e+=t.data[n];return Math.abs(Math.ceil(100*e/r/5)-10)*o},e.applyMask=function(t,e){for(var r=e.size,n=0;n<r;n++)for(var i=0;i<r;i++)e.isReserved(i,n)||e.xor(i,n,a(t,i,n))},e.getBestMask=function(t,r){for(var n=Object.keys(e.Patterns).length,i=0,o=1/0,a=0;a<n;a++){r(a),e.applyMask(a,t);var s=e.getPenaltyN1(t)+e.getPenaltyN2(t)+e.getPenaltyN3(t)+e.getPenaltyN4(t);e.applyMask(a,t),s<o&&(o=s,i=a)}return i}},mulC:function(t,e,r){"use strict";(function(e){t.exports="object"==typeof self&&self.self===self&&self||"object"==typeof e&&e.global===e&&e||this}).call(e,r("DuR2"))},mwnW:function(t,e,r){"use strict";var n=r("mulC");t.exports=function(){return"function"==typeof n.Promise&&"function"==typeof n.Promise.prototype.then}},nwDn:function(t,e){function r(t){if("string"!=typeof t)throw new Error("Color should be defined as hex string");var e=t.slice().replace("#","").split("");if(e.length<3||5===e.length||e.length>8)throw new Error("Invalid hex color: "+t);3!==e.length&&4!==e.length||(e=Array.prototype.concat.apply([],e.map(function(t){return[t,t]}))),6===e.length&&e.push("F","F");var r=parseInt(e.join(""),16);return{r:r>>24&255,g:r>>16&255,b:r>>8&255,a:255&r,hex:"#"+e.slice(0,6).join("")}}e.getOptions=function(t){t||(t={}),t.color||(t.color={});var e=void 0===t.margin||null===t.margin||t.margin<0?4:t.margin,n=t.width&&t.width>=21?t.width:void 0,i=t.scale||4;return{width:n,scale:n?4:i,margin:e,color:{dark:r(t.color.dark||"#000000ff"),light:r(t.color.light||"#ffffffff")},type:t.type,rendererOpts:t.rendererOpts||{}}},e.getScale=function(t,e){return e.width&&e.width>=t+2*e.margin?e.width/(t+2*e.margin):e.scale},e.getImageWidth=function(t,r){var n=e.getScale(t,r);return Math.floor((t+2*r.margin)*n)},e.qrToImageData=function(t,r,n){for(var i=r.modules.size,o=r.modules.data,a=e.getScale(i,n),s=Math.floor((i+2*n.margin)*a),u=n.margin*a,f=[n.color.light,n.color.dark],l=0;l<s;l++)for(var c=0;c<s;c++){var h=4*(l*s+c),d=n.color.light;if(l>=u&&c>=u&&l<s-u&&c<s-u)d=f[o[Math.floor((l-u)/a)*i+Math.floor((c-u)/a)]?1:0];t[h++]=d.r,t[h++]=d.g,t[h++]=d.b,t[h]=d.a}}},nyx9:function(t,e,r){var n=r("uF9H"),i=r("sYKs"),o=r("RO0P"),a=r("vPzN"),s=r("zYqW"),u=r("NY/E"),f=r("oLzS"),l=r("b2+w");function c(t){return unescape(encodeURIComponent(t)).length}function h(t,e,r){for(var n,i=[];null!==(n=t.exec(r));)i.push({data:n[0],index:n.index,mode:e,length:n[0].length});return i}function d(t){var e,r,i=h(u.NUMERIC,n.NUMERIC,t),o=h(u.ALPHANUMERIC,n.ALPHANUMERIC,t);return f.isKanjiModeEnabled()?(e=h(u.BYTE,n.BYTE,t),r=h(u.KANJI,n.KANJI,t)):(e=h(u.BYTE_KANJI,n.BYTE,t),r=[]),i.concat(o,e,r).sort(function(t,e){return t.index-e.index}).map(function(t){return{data:t.data,mode:t.mode,length:t.length}})}function g(t,e){switch(e){case n.NUMERIC:return i.getBitsLength(t);case n.ALPHANUMERIC:return o.getBitsLength(t);case n.KANJI:return s.getBitsLength(t);case n.BYTE:return a.getBitsLength(t)}}function p(t,e){var r,u=n.getBestModeForData(t);if((r=n.from(e,u))!==n.BYTE&&r.bit<u.bit)throw new Error('"'+t+'" cannot be encoded with mode '+n.toString(r)+".\n Suggested mode is: "+n.toString(u));switch(r!==n.KANJI||f.isKanjiModeEnabled()||(r=n.BYTE),r){case n.NUMERIC:return new i(t);case n.ALPHANUMERIC:return new o(t);case n.KANJI:return new s(t);case n.BYTE:return new a(t)}}e.fromArray=function(t){return t.reduce(function(t,e){return"string"==typeof e?t.push(p(e,null)):e.data&&t.push(p(e.data,e.mode)),t},[])},e.fromString=function(t,r){for(var i=function(t,e){for(var r={},i={start:{}},o=["start"],a=0;a<t.length;a++){for(var s=t[a],u=[],f=0;f<s.length;f++){var l=s[f],c=""+a+f;u.push(c),r[c]={node:l,lastCount:0},i[c]={};for(var h=0;h<o.length;h++){var d=o[h];r[d]&&r[d].node.mode===l.mode?(i[d][c]=g(r[d].lastCount+l.length,l.mode)-g(r[d].lastCount,l.mode),r[d].lastCount+=l.length):(r[d]&&(r[d].lastCount=l.length),i[d][c]=g(l.length,l.mode)+4+n.getCharCountIndicator(l.mode,e))}}o=u}for(h=0;h<o.length;h++)i[o[h]].end=0;return{map:i,table:r}}(function(t){for(var e=[],r=0;r<t.length;r++){var i=t[r];switch(i.mode){case n.NUMERIC:e.push([i,{data:i.data,mode:n.ALPHANUMERIC,length:i.length},{data:i.data,mode:n.BYTE,length:i.length}]);break;case n.ALPHANUMERIC:e.push([i,{data:i.data,mode:n.BYTE,length:i.length}]);break;case n.KANJI:e.push([i,{data:i.data,mode:n.BYTE,length:c(i.data)}]);break;case n.BYTE:e.push([{data:i.data,mode:n.BYTE,length:c(i.data)}])}}return e}(d(t,f.isKanjiModeEnabled())),r),o=l.find_path(i.map,"start","end"),a=[],s=1;s<o.length-1;s++)a.push(i.table[o[s]].node);return e.fromArray(function(t){return t.reduce(function(t,e){var r=t.length-1>=0?t[t.length-1]:null;return r&&r.mode===e.mode?(t[t.length-1].data+=e.data,t):(t.push(e),t)},[])}(a))},e.rawSplit=function(t){return e.fromArray(d(t,f.isKanjiModeEnabled()))}},oLzS:function(t,e){var r,n=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];e.getSymbolSize=function(t){if(!t)throw new Error('"version" cannot be null or undefined');if(t<1||t>40)throw new Error('"version" should be in range from 1 to 40');return 4*t+17},e.getSymbolTotalCodewords=function(t){return n[t]},e.getBCHDigit=function(t){for(var e=0;0!==t;)e++,t>>>=1;return e},e.setToSJISFunction=function(t){if("function"!=typeof t)throw new Error('"toSJISFunc" is not a valid function.');r=t},e.isKanjiModeEnabled=function(){return void 0!==r},e.toSJIS=function(t){return r(t)}},sYKs:function(t,e,r){var n=r("uF9H");function i(t){this.mode=n.NUMERIC,this.data=t.toString()}i.getBitsLength=function(t){return 10*Math.floor(t/3)+(t%3?t%3*3+1:0)},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(t){var e,r,n;for(e=0;e+3<=this.data.length;e+=3)r=this.data.substr(e,3),n=parseInt(r,10),t.put(n,10);var i=this.data.length-e;i>0&&(r=this.data.substr(e),n=parseInt(r,10),t.put(n,3*i+1))},t.exports=i},uF9H:function(t,e,r){var n=r("1Y2G"),i=r("NY/E");e.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},e.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},e.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},e.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},e.MIXED={bit:-1},e.getCharCountIndicator=function(t,e){if(!t.ccBits)throw new Error("Invalid mode: "+t);if(!n.isValid(e))throw new Error("Invalid version: "+e);return e>=1&&e<10?t.ccBits[0]:e<27?t.ccBits[1]:t.ccBits[2]},e.getBestModeForData=function(t){return i.testNumeric(t)?e.NUMERIC:i.testAlphanumeric(t)?e.ALPHANUMERIC:i.testKanji(t)?e.KANJI:e.BYTE},e.toString=function(t){if(t&&t.id)return t.id;throw new Error("Invalid mode")},e.isValid=function(t){return t&&t.bit&&t.ccBits},e.from=function(t,r){if(e.isValid(t))return t;try{return function(t){if("string"!=typeof t)throw new Error("Param is not a string");switch(t.toLowerCase()){case"numeric":return e.NUMERIC;case"alphanumeric":return e.ALPHANUMERIC;case"kanji":return e.KANJI;case"byte":return e.BYTE;default:throw new Error("Unknown mode: "+t)}}(t)}catch(t){return r}}},utyv:function(t,e){e.L={bit:1},e.M={bit:0},e.Q={bit:3},e.H={bit:2},e.isValid=function(t){return t&&void 0!==t.bit&&t.bit>=0&&t.bit<4},e.from=function(t,r){if(e.isValid(t))return t;try{return function(t){if("string"!=typeof t)throw new Error("Param is not a string");switch(t.toLowerCase()){case"l":case"low":return e.L;case"m":case"medium":return e.M;case"q":case"quartile":return e.Q;case"h":case"high":return e.H;default:throw new Error("Unknown EC Level: "+t)}}(t)}catch(t){return r}}},vPzN:function(t,e,r){var n=r("jF+B"),i=r("uF9H");function o(t){this.mode=i.BYTE,this.data=new n(t)}o.getBitsLength=function(t){return 8*t},o.prototype.getLength=function(){return this.data.length},o.prototype.getBitsLength=function(){return o.getBitsLength(this.data.length)},o.prototype.write=function(t){for(var e=0,r=this.data.length;e<r;e++)t.put(this.data[e],8)},t.exports=o},vaFl:function(t,e){},wBZN:function(t,e,r){var n=r("jF+B"),i=r("X0RI");function o(t){this.genPoly=void 0,this.degree=t,this.degree&&this.initialize(this.degree)}o.prototype.initialize=function(t){this.degree=t,this.genPoly=i.generateECPolynomial(this.degree)},o.prototype.encode=function(t){if(!this.genPoly)throw new Error("Encoder not initialized");var e=new n(this.degree);e.fill(0);var r=n.concat([t,e],t.length+this.degree),o=i.mod(r,this.genPoly),a=this.degree-o.length;if(a>0){var s=new n(this.degree);return s.fill(0),o.copy(s,a),s}return o},t.exports=o},"xR/K":function(t,e,r){var n=r("oLzS"),i=n.getBCHDigit(1335);e.getEncodedBits=function(t,e){for(var r=t.bit<<3|e,o=r<<10;n.getBCHDigit(o)-i>=0;)o^=1335<<n.getBCHDigit(o)-i;return 21522^(r<<10|o)}},zYqW:function(t,e,r){var n=r("uF9H"),i=r("oLzS");function o(t){this.mode=n.KANJI,this.data=t}o.getBitsLength=function(t){return 13*t},o.prototype.getLength=function(){return this.data.length},o.prototype.getBitsLength=function(){return o.getBitsLength(this.data.length)},o.prototype.write=function(t){var e;for(e=0;e<this.data.length;e++){var r=i.toSJIS(this.data[e]);if(r>=33088&&r<=40956)r-=33088;else{if(!(r>=57408&&r<=60351))throw new Error("Invalid SJIS character: "+this.data[e]+"\nMake sure your charset is UTF-8");r-=49472}r=192*(r>>>8&255)+(255&r),t.put(r,13)}},t.exports=o}});
//# sourceMappingURL=2.a81b49ad0c2773fe0fd4.js.map