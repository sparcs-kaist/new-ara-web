import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home/Home';
import Login from '@/views/Login/Login';
import Board from '@/views/Board/Board';
import PostCreate from '@/views/PostCreate/PostCreate';
import PostEdit from '@/views/PostEdit/PostEdit';
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
      path: '/post/edit/:post_id',
      name: 'PostEdit',
      component: PostEdit,
    },
    {
      path: '/posts/:board/:page',
      name: 'PostList',
      component: Board,
      props: true,
    },
    {
      path: '/posts/:board/:page/:post_id',
      name: 'PostDetail',
      component: Board,
      props: true,
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting,
    },
  ],
});
