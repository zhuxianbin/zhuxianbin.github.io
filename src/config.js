import Cookie from "js-cookie";
export const serverKey = "group-server";
export const BASE_API = Cookie.get(serverKey) || process.env.BASE_API;
export function setServer(value) {
  return Cookie.set(serverKey, value);
}

export const servers = [{
    label: "152环境",
    value: "http://122.246.11.152:8081/sharego"
  },
  {
    label: "正式环境",
    value: "https://newapp.evcoming.com/sharego"
  },
  {
    label: "test环境",
    value: "http://testnewapp.evcoming.com/sharego"
  },
  {
    label: "预发布环境",
    value: "http://yufabu.newapp.evcoming.com/sharego"
  },
  {
    label: "dev环境",
    value: "http://devnewapp.evcoming.com/sharego"
  }
]
