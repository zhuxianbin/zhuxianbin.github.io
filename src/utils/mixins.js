//import cookie from '../jPlugins/jquery.cookie.min'
//import $ from 'jquery';

const $cookie = {
    //设置cookie  
    setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    //获取cookie  
    getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    },
    //清除cookie    
    clearCookie(name) {
        this.setCookie(name, "", -1);
    }
}

export default {
    install(Vue) {
        Vue.mixin({
            data() {
                return {}
            },
            methods: {
                doLogout() {
                    $cookie.clearCookie("userToken", "", -1);
                    //$.cookie("userToken", "", -1);
                    //console.log(this.$router,1111);
                    this.$router.go();
                }
            }
        });

        //Vue.prototype.$tools = prototypes;
        //Vue.prototype.$regex = regex;
        //Vue.prototype.$api = api;
        Vue.prototype.$storage = {
            get(key) {
                return JSON.parse(window.localStorage[key]);
            },
            set(key, value) {
                console.log("setStorage:", key, value);
                return window.localStorage[key] = JSON.stringify(value);
            }
        }

        Vue.prototype.$cookie = $cookie;

    }
}
