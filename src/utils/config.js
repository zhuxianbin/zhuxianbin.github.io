import Cookie from "js-cookie";
export const serverKey = "chaozhi-server";

export const weixinAuth = "https://aci-api.chaozhiedu.com";

export const timeout = 15000;

export const servers = [{
    label: "正式环境",
    value: "https://aci-api.chaozhiedu.com"
  },
  {
    label: "测试环境",
    value: "http://101.201.222.8:8081"
  }
]

export const baseUrl = Cookie.get(serverKey) || servers[0].value;
export function setServer(value) {
  return Cookie.set(serverKey, value);
}