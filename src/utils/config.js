import storage from "./storage";

export const baseURL =
  "http://101.201.222.8:8081" ||
  "http://aci-api.chaozhiedu.com";

export const Token = function () {
  let { token } = storage.get("userToken");
  return token;
}