import request from '@/utils/request';
import axios from 'axios';

let urls = {
  login: {
    mock: 'static/api/login.json',
    server: '',
    method: 'post'
  }
};

// 全局loading在这里设置好

let item2Function = (item) => {
  if (process.env.MOCK_ON && item['mock']) {
    return function (params) {
      return axios.get(item['mock'], params).then(rs => rs.data);
    };
  } else if (item['server']) {
    return function (params, options = {
      showLoading: true,
      isFormData: false,
      config: {}
    }) {
      if (options.showLoading === undefined) options.showLoading = true;
      if (options.config === undefined) options.config = {};

      let dataKey = 'data';
      
      if (item['method'] && (item['method'].toLowerCase() === 'get' || item['method'].toLowerCase() === 'delete')) {
        dataKey = 'params';
      }

      let url = item['server'];

      let formDataParams;
      // post请求，参数处理成formData格式
      if (options.isFormData) {
        formDataParams = new URLSearchParams();
        for (let prop in params) {
          if (params.hasOwnProperty(prop)) {
            formDataParams.append(prop, params[prop]);
          }
        }
      }

      return request({
        url,
        [dataKey]: options.isFormData ? formDataParams : params,
        method: item['method'] ? item['method'] : 'get',
      }).then(rs => {
        if (options.showLoading !== false) console.log('loading结束');
        return rs;
      }).catch(err => {
        return err;
      });
    };
  } else {
    return function() {
      console.log('接口未定义');
    };
  }
};

let tranUrls = (urls) => {
  let apis = {};

  for (let v in urls) {
    if (urls[v].mock || urls[v].server) {
      apis[v] = item2Function(urls[v]);
    }
  }
  return apis;
};
let api = tranUrls(urls);

// if (process.env.NODE_ENV === 'production') {
//   for (let url in Object.keys(urls)) {

//   }
// } else {
//   for (let api in Object.keys(api)) {

//   }
// }

export default api;

export const apiInstall = {
  install(Vue) {
    Vue.prototype.$api = api;
  }
};