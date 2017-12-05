import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import {auth} from '@/services/auth'

import countries from '@/countries/countries.router'
import cities from '@/cities/cities.router'
import shop from '@/shop/shop.router'
import users from '@/users/users.router'
import bugs from '@/bugs/bugs.router'
import levelConfigs from '@/level-configs/level-configs.router'
import statistics from '@/statistics/statistics.router'
import patchNotes from '@/patch-notes/patch-notes.router'
import tracker from '@/tracker/tracker.router'

let appRoutes = [...countries, ...cities, ...shop, ...users, ...bugs , ...levelConfigs, ...statistics, ...patchNotes, ...tracker];

Vue.use(Router);

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: appRoutes,
      meta: {title: 'Puzzland CMS'}
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {title: 'Puzzland CMS'}
    }
  ]
});

const isLogin = auth.isAuthenticated();

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if(to.path !== '/login' && !isLogin) {
    next('/login')
  } else if (to.path === '/login' && isLogin) {
    next({
      path: '/'
    })
  } else {
    next()
  }
});

export default router
