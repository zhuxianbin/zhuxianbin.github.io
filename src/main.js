import Vue from 'vue'

import $ from 'jquery'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import "@/styles/index.less" // global css

import mixins from "./utils/mixins"

import App from './App'
import router from './router'
import store from './store'

// import i18n from './lang'

import * as filters from './filters'

import '@/icons' // icon
import '@/permission' // permission control

import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'U5EHmQ0jRQV57Sf7MxKZ9Db4kvIezpxy'
});

Vue.use(ElementUI, {
  size: 'small',
  // i18n: (key, value) => i18n.t(key, value)
})

Vue.use(mixins)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  // i18n,
  store,
  render: h => h(App)
})
