import Board from '@/views/Board.vue'
import User from '@/views/User.vue'
import Archive from '@/views/Archive.vue'
import Post from '@/views/Post.vue'
import Write from '@/views/Write.vue'
import Notifications from '@/views/Notifications.vue'
import MyInfo from '@/views/MyInfo.vue'
import Home from '@/views/Home.vue'
import NotFound from '@/views/NotFound.vue'
import RenewalLandingPage from '@/views/RenewalLandingPage.vue'
import Makers from '@/views/Makers.vue'
import { authGuard } from './auth.js'

export default [
  {
    path: '/board/:boardSlug?',
    name: 'board',
    component: Board,
    beforeEnter: authGuard
  },
  {
    path: '/user/:username',
    name: 'user',
    component: User,
    beforeEnter: authGuard
  },
  {
    path: '/archive',
    name: 'archive',
    component: Archive,
    beforeEnter: authGuard
  },
  {
    path: '/post/:postId',
    name: 'post',
    component: Post,
    props: true,
    beforeEnter: authGuard
  },
  {
    path: '/write/:postId?',
    name: 'write',
    component: Write,
    props: true,
    beforeEnter: authGuard
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: Notifications,
    beforeEnter: authGuard
  },
  {
    path: '/myinfo',
    name: 'my-info',
    component: MyInfo,
    beforeEnter: authGuard
  },
  {
    path: '/404',
    name: 'not-found',
    component: NotFound
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: authGuard
  },
  {
    path: '/landing',
    name: 'landing',
    component: RenewalLandingPage
  },
  {
    path: '/makers',
    name: 'makers',
    component: Makers,
    beforeEnter: authGuard
  }
]
