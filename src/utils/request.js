import axios from 'axios';
import {
  Message
} from 'element-ui';
import querystring from 'querystring';
import {
  getToken,
  getXToken
} from '@/utils/auth';
import {
  loadavg
} from 'os';

// import { BASE_API } from "@/config"
// 创建axios实例

const ss = new Map();

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 50000, // 请求超时时间,
  // headers: {'Content-Type': 'application/x-www-form-urlencoded', 'crossDomain': true},
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  // withCredentials: true
})

// request拦截器
service.interceptors.request.use(config => {
  // config.headers['Content-Type'] =  // 解决options
  // config.headers['Content-Type'] = 'application/json'
  const uri = process.env.VUE_APP_BASE_API + config.url; // 注入某一个地址
  if (ss.has(uri)) {
    return 'error'
  } else {
    ss.set(uri, 1);
  }

  if (getXToken()) {
    config.headers['X_Token'] = getXToken();
  }

  if (config.method === 'post') {
    if (!config.noToken) {
      config.data = { ...config.data,
        token: getToken()
      }
    }
    // 解决传参
    config.data = querystring.stringify(config.data)
    // config.data = querystring.stringify(JSON.parse(JSON.stringify(config.data)))
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    // ss.delete(response.config.url)
    ss.delete(response.config.url) // 删除某一地址
    const res = response.data;
    if (res.code !== 1) {
      Message({
        message: res.resultMsg || res.msg,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    } else {
      return response.data.data
    }
  },
  error => {
    ss.clear(); // 清除map
    if (error.message === 'Network Error') {
      Message({
        message: '网络连接错误，请重试',
        type: 'error',
        duration: 5 * 1000
      })
    } else if (error.message.indexOf('timeout') >= 0) {
      Message({
        message: '连接超时，请重试',
        type: 'error',
        duration: 5 * 1000
      })
    } else if (error.message === "Cannot create property 'headers' on string 'error'") {
      Message({
        message: "正在加载中，不要急哦",
        type: 'warning',
        duration: 5 * 1000
      })
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service