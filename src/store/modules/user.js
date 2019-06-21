import api from '@/api';
import Cookies from 'js-cookie';

// function getLangFromAuthorization(authorization) { 
//   let _authorization = decodeURIComponent(authorization); 
//   _authorization = _authorization.split('.')[1]; 
//   let info = atob(_authorization); 
//   info = JSON.parse(info); 
//   let sub = info.sub; 
//   let lang = sub.split(',')[1]; 
//   return lang; 
// }

const serviceLangToLocale = {
  'zh_CN_': 'zh',
  'en_US_': 'en'
};

export default {
  state: {
    userData: {},
    lang: 'zh'
  },

  getters: {
    userData: state => state.userData,
    lang: state => state.lang
  },

  actions: {
    // 登录
    Login({ commit, dispatch }, params) {
      return api.login.submit(params)
        .then(({ data }) => {
          dispatch('SetUserData', data);
        });
    },

    // 初始化用户信息，从缓存获取内容
    InitUserInfo({ commit, dispatch }) {
      const errMsg = 'login';
      return new Promise((resolve, reject) => {
        let data = JSON.parse(sessionStorage.userData) || {};
        if (Object.keys(data).length > 0) {
          dispatch('SetUserData', data);
          resolve(data);
        } else {
          reject(errMsg);
        }
      });
    },

    // 登出
    LogOut({ commit, state }) {
      commit('SET_USER', {});
      sessionStorage.clear();
      Cookies.remove('Authorization');
    },

    // 设置用户信息
    SetUserData({commit, dispatch}, data) {
      Cookies.set('Authorization', data.Authorization);
      dispatch('GetLang', data);
      commit('SET_USER', data);
    },

    // 获取语言状态
    GetLang({commit}, data) {
      let lang = data.language;
      commit('SET_LANG', serviceLangToLocale[lang]);
    }
  },

  mutations: {
    SET_USER (state, data) {
      state.userData = data;
      sessionStorage.userData = JSON.stringify(data);
    },
    SET_LANG (state, lang) {
      state.lang = lang;
    }
  }
};
