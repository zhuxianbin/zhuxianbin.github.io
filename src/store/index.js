import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import api from '../utils/api';

const USER_INFO = "USER_INFO";
const CATE_LIST = "CATE_LIST";

export default new Vuex.Store({
    state: {
        userInfo: {
          user: {},
          ext_info: {},
          period: []
        },
        cateList: [],
        TOKEN: '',
        // LAB: api.baseUrl,
    },
    actions: {
        [USER_INFO](context, data) {
            api.getUserInfo().then((data) => {
                context.commit(USER_INFO, data);
            }).fail((data) => {
                context.commit(USER_INFO, data);
            })
        },
        [CATE_LIST](context, data) {
            api.getCateogry().then(function (data) {
                context.commit(CATE_LIST, data);
            });
        },
    },
    mutations: {
        [USER_INFO](state, data) {
            state.userInfo = data;
        },
        [CATE_LIST](state, {
            data
        }) {
            state.cateList = data;
        },
    },
});
