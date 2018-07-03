import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home/Home';
import Login from '@/views/Login/Login';
import Board from '@/views/Board/Board';
import PostCreate from '@/views/PostCreate/PostCreate';
import PostEdit from '@/views/PostEdit/PostEdit';
import Setting from '@/views/Setting/Setting';
import NotFound from '@/views/NotFound/NotFound';
import LoginHandler from '@/views/LoginHandler';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('JWT')) {
          next('/');
        } else {
          next();
        }
      },
    },
    {
      path: '/login-handler',
      name: 'LoginHandler',
      component: LoginHandler,
    },
    {
      path: '/post/create',
      name: 'PostCreate',
      component: PostCreate,
      meta: { requiresAuth: true },
    },
    {
      path: '/post/edit/:post_id',
      name: 'PostEdit',
      component: PostEdit,
      meta: { requiresAuth: true },
    },
    {
      path: '/posts/:board',
      name: 'PostList',
      component: Board,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: '/posts/:board/:post_id',
      name: 'PostDetail',
      component: Board,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting,
      meta: { requiresAuth: true },
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)
    && !localStorage.getItem('JWT')) {
    next({
      path: '/login',
    });
  } else {
    next();
  }
});

export default router;
