import api from "@/utils/api";

const login = "login";
const reset = "reset";
const reg = "reg";

export default {
    namespaced: true,
    state: {

    },
    actions: {
        [login](context, params) {
            return api.userLogin(params);
        },
        [reset](context, params) {
            return api.userReset(params);
        },
        [reg](context, params) {
            return api.userRegister(params);
        },
    },
    mutations: {
        [login](state, data) {

        },
    }
}
