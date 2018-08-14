import "normalize.css/normalize.css";
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import { router } from "./router";
import store from "./store/index";
import mixins from "./utils/mixins";
import "nprogress/nprogress.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

Vue.config.productionTip = false;

Vue.use(mixins);

new Vue({
    el: "#app",
    router,
    store,
    ...App
});
