// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import mixins from './utils/mixins'

//jquery插件
import cookie from './jPlugins/jquery.cookie.min'
import ajaxfileupload from './jPlugins/ajaxfileupload.min'
import $ from 'jquery'

import api from './utils/api'


//import css
import 'vue-beauty/package/style/vue-beauty.min.css'

import vueBeauty from 'vue-beauty'
Vue.use(vueBeauty)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    var userToken = $.cookie("userToken");
    console.log(userToken);
    //console.log(to, from, next);
    if(userToken){
        if(to.fullPath === "/" || to.fullPath === "/login"){
            next("/index")
        }else{
            next()
        }
    }else{
        if(to.fullPath === "/" || to.fullPath === "/login"){
            next()
        }else{
            next("/login")
        }
        //next("/login")
    }
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
    components: {App},
    template: '<App/>'
})
