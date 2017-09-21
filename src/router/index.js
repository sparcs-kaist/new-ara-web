import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home/Home';
import Login from '@/views/Login/Login';
import Board from '@/views/Board/Board';
import PostCreate from '@/views/PostCreate/PostCreate';
import Setting from '@/views/Setting/Setting';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/post/create',
      name: 'PostCreate',
      component: PostCreate,
    },
    {
      path: '/posts/:board/:page',
      name: 'Board',
      component: Board,
    },
    {
      path: '/posts/:board/:page/:post_id',
      name: 'Board',
      component: Board,
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting,
    },
  ],
});
