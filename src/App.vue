<template>
  <div id="app" v-if="showApp">
    <router-view></router-view>
  </div>
</template>

<script>
import { getToken, setXToken } from '@/utils/auth'
import { mapActions } from 'vuex';
import { customLogin } from '@/api/partnerList';
import axios from 'axios'; // 测试用
import querystring from 'querystring';
export default {
  name: 'App',
  data() {
    return {
      showApp: false
    }
  },
  beforeMount () {
    // this.testCustomLogin();
    this.getCustomLogin();
  },
  methods: {
    // 注册方法
    ...mapActions(['changePartnerPermission']),
    /**
     * 测试axios
     */
    testCustomLogin() {
      setXToken("");
      axios({
        method: 'post',
        url: 'http://test.evcoming.com:9001/partner-admin-api//authority/customLogin',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: {
          token: getToken()
        },
        transformRequest: [function (data) {
           return querystring.stringify(data);
        }]
      }).then(response => {
        const data = response.data;
        if (data.code === 1) {
          const powers = data.data;
          const X_Token = data.data.X_Token;
          this.changePartnerPermission(powers);
          setXToken(X_Token);
          this.showApp = true;
        }
      });
    },
    /**
     * 获取合伙人权限
     */
    getCustomLogin() {
      setXToken("");
       customLogin({token: getToken()}).then(res => {
         this.changePartnerPermission(res);
         setXToken(res.X_Token);
         this.showApp = true;
       })
    }
  }
}
</script>

<style>

</style>
