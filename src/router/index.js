import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import {auth} from '@/services/auth'

import users from '@/users/users.router'

let appRoutes = [...users];

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
      meta: {title: 'STUDIO CMS'}
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {title: 'STUDIO CMS'}
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
