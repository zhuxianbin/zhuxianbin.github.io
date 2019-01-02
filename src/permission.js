import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken, setToken } from '@/utils/auth' // 验权

// 获取url参数
function GetRequest(obj, name) {
  const arrObj = Object.keys(obj);
   for (let i = 0; i < arrObj.length; i++) {
     if (arrObj[i] === name) {
       return obj[name];
     }
   }
  return null;
}

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start();
  // 判断是否有cookie
  if (to.query) {
    const token = GetRequest(to.query, 'CS_ADMIN_TOKEN');
    if (token) {
      setToken(token);
      next();
      NProgress.done();
    } else {
      // 是否获取cookie
      if (getToken()) {
        next();
        NProgress.done();
      } else {
        // window.location.href = 'http://yufabu.newapp.evcoming.com/sharego/common/logout.action';
        // window.location.href = 'http://testnewapp.evcoming.com/sharego/common/login.action';
        // window.location.href = 'http://wuqinewapp2.evcoming.com/sharego/common/login.action';
        window.location.href = 'http://newapp.evcoming.com/sharego/common/index.action';
      }
    }
  } else {
    // 是否获取cookie
    if (getToken()) {
      next();
      NProgress.done();
    } else {
      // window.location.href = 'http://yufabu.newapp.evcoming.com/sharego/common/logout.action';
      // window.location.href = 'http://testnewapp.evcoming.com/sharego/common/login.action';
      // window.location.href = 'http://wuqinewapp2.evcoming.com/sharego/common/login.action';
      window.location.href = 'http://newapp.evcoming.com/sharego/common/index.action';
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
