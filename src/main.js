// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

import '@/assets/normalize.css';
import '@/assets/style.scss';

// 注册全局过滤器
import filters from './filters';
for (let filter in Object.keys(filters)) {
  Vue.filter(filter, filters[filter]);
}

router.beforeEach((to, from, next) => {
  // 切换路由，要先关闭loading
  store.dispatch('InitUserInfo').then(() => {
    // setLang(store.state.user.lang);
    next();
  }).catch(() => {
    if (to.path === '/login') {
      next();
    } else {
      next('/login');
    }
  });
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
