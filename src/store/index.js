import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import api from "@/utils/api";
import {
    getToken
} from "@/utils/auth";

const USER_INFO = "USER_INFO";
const CATE_LIST = "CATE_LIST";

import user from "./user";

export default new Vuex.Store({
    modules: {
        user
    },
    state: {
        userInfo: {
            user: {},
            ext_info: {},
            period: []
        },
        cateList: [],
        Token: ""
        // LAB: api.baseUrl,
    },
    actions: {
        [USER_INFO](context, data) {
            getToken() &&
                api
                .getUserInfo()
                .then(res => {
                    context.commit(USER_INFO, res);
                })
                .fail(res => {
                    context.commit(USER_INFO, res);
                });
        },
        [CATE_LIST](context, data) {
            getToken() &&
                api.getCategory().then(function (data) {
                    context.commit(CATE_LIST, data);
                });
        }
    },
    mutations: {
        [USER_INFO](state, data) {
            state.userInfo = { ...data,
                ext_info: {
                    avatar_file: ""
                }
            };
            // if (data.code == 201) {
            //     Vue.$modal.info({
            //         title: '温馨提示',
            //         content: '您的报考资料还未提交'
            //     });
            // }
        },
        [CATE_LIST](state, {
            data
        }) {
            state.cateList = data;
        }
    }
});
