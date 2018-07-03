//import cookie from '../jPlugins/jquery.cookie.min'
//import $ from 'jquery';
import storage from "./storage";
import cookie from "js-cookie";
import {
    setToken,
    getToken,
    removeToken
} from './auth'
export default {
    install(Vue) {
        Vue.mixin({
            data() {

                return {
                    Token: getToken()
                }
            },
            methods: {
                doLogout() {
                    removeToken()
                    this.$router.go();
                },
                openNew(link) {
                    // var e = document.createElement("a");
                    // document.body.appendChild(e);
                    // e.href = link;
                    // e.target = "_new";
                    // e.click();
                    // document.body.removeChild(e);
                    window.open(link);
                }
            }
        });

        //Vue.prototype.$tools = prototypes;
        //Vue.prototype.$regex = regex;
        //Vue.prototype.$api = api;
        Vue.prototype.$storage = storage

        Vue.prototype.$cookie = cookie;

    }
}
