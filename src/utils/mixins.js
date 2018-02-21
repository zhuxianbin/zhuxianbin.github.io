
import cookie from '../jPlugins/jquery.cookie.min'
import $ from 'jquery'

export default {
	install(Vue) {
		Vue.mixin({
			data() {
				return {
				}
			},
			methods:{
        doLogout(){
          $.cookie("userToken","");
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

	}
}