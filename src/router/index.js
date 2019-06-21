import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/components/Layout';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index',
      meta: {
        name: '首页',
      }
    },
   
    {
      path: '/login',
      component: () => import('@/pages/loginPage')
    },
    {
      path: '/index',
      component: () => Layout,
      children: [
        {
          path: '/index',
          component: () => import('@/pages/index.vue'),
          meta: {
            name: '首页',
          }
        }
      ]
    },
  ]
});
