import axios from 'axios';
import store from '../store';

const loginURL = '#/login';

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 30000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    // if (store.getters.token) {
    //   config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    
    // 接口报错处理
    if (typeof res === 'string') {
      // 处理非json数据格式报错处理，比如二进制流
      return res;
    } else if (res.code !== 200) {
      // 登录验证失败
      if (res.code === 403) {
        store.dispatch('LogOut').then(() => {
          let currentUrl = encodeURIComponent(window.location.href);
          window.location.href = `${loginURL}?returnUrl=${currentUrl}`;
        });
      } else {
        alert(res.msg);
      }

      return Promise.reject(response.data);
    } else {
      return response.data;
    }
  },
  error => {
    console.log('err' + error); // for debug
    
    return Promise.reject(error);
  }
);

export default service;