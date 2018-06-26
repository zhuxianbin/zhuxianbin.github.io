// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import mixins from './utils/mixins'
import storage from './utils/storage'
import NProgress from "nprogress";
import "nprogress/nprogress.css";
//jquery插件
import cookie from './jPlugins/jquery.cookie.min'
import ajaxfileupload from './jPlugins/ajaxfileupload.min'
import $ from 'jquery'

import api from './utils/api'


//import css
// import 'vue-beauty/package/style/vue-beauty.min.css'

// import vueBeauty from 'vue-beauty'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);


// import './assets/less/index.less';

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    NProgress.start()
    var userToken = storage.get("userToken").token;
    var passPath = ["/", "/login", "/forget", "/register"];
    if (userToken) {
        if (passPath.indexOf(to.fullPath) >= 0) {
            next("/index")
        } else {
            next()
        }
    } else {
        if (passPath.indexOf(to.fullPath) >= 0) {
            next()
        } else {
            next("/login")
        }
        //next("/login")
    }
})

router.afterEach(() => {
    NProgress.done() // finish progress bar
})

/**
 * 把API都混入到VUE实例中，方便直接调用
 * */
Vue.prototype.$czapi = api;
Vue.use(mixins)
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
})
