// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

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

const requireComponent = require.context(
  // 其组件目录的相对路径
  './components/base',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /Base[A-Z]\w+\.(vue|js)$/
);

console.log(requireComponent);
requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName);

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  );

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  );
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
