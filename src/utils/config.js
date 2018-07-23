import {
    getToken
} from "./auth";

export const baseURL =
    "http://101.201.222.8:8081" ||
    "http://aci-api.chaozhiedu.com";

export const Token = function () {
    return getToken()
}
