import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home/Home';
import Login from '@/views/Login/Login';
import PostCreate from '@/views/PostCreate/PostCreate';
import PostDetail from '@/views/PostDetail/PostDetail';
import PostList from '@/views/PostList/PostList';
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
      path: '/post/:post_id',
      name: 'PostDetail',
      component: PostDetail,
    },
    {
      path: '/post',
      name: 'PostList',
      component: PostList,
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting,
    },
  ],
});
