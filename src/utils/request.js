import axios from "axios"
import NProgress from "nprogress";
NProgress.configure({
  showSpinner: false
})
import {
  getToken,
  removeToken
} from "./auth"
import {
  baseUrl,
  timeout
} from "./config"
import {
  Message
} from "element-ui"

const timeouterror = `timeout of ${timeout}ms exceeded`;
const errors = {
  [timeouterror]: "请求超时了."
}

// create an axios instance
const service = axios.create({
  baseURL: baseUrl, // api的base_url
  timeout: timeout,
  // withCredentials:true
  // headers: {
  //   "Content-Type": "application/x-www-form-urlencoded"
  // }
});
// service.caches = {};

function filterObject(object) {
  const newObject = {};
  for (const key in object) {

    const element = object[key];

    if (typeof element === "string") {
      if (element) {
        newObject[key] = element;
      }
      continue;
    }

    if (typeof element === "number") {
      newObject[key] = element;
      continue;
    }

    newObject[key] = element;

  }
  return newObject;
}

// request interceptor
service.interceptors.request.use(config => {
  // console.log("异步请求:", config);
  NProgress.start();
  if (config.method === "get") {
    config.params = filterObject({
      ...config.params,
      token: getToken()
    });
  }
  if (config.method === "post") {
    config.data = filterObject({
      ...config.data,
      token: getToken()
    });
  }
  return config
}, error => {
  NProgress.done();
  // Do something with request error
  // console.log(error) // for debug
  Message.error(errors[error.message] || error.message)
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  ({
    data,
    config
  }) => {
    NProgress.done();
    if (data.code >= 200 && data.code < 300) {
      return data;
    }
    if (data.code >= 600 && data.code < 700) {
      removeToken()
      window.location.hash = `/login`;
    } else if (data.code != 200) {
      Message.error(data.msg)
    }
    return Promise.reject(data);
  },
  error => {
    // console.log("err" + error,123) // for debug
    Message.error(errors[error.message] || error.message)
    return Promise.reject(error)
  })

export default service