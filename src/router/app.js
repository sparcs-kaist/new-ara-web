import Board from '@/views/Board.vue'
import User from '@/views/User.vue'
import Archive from '@/views/Archive.vue'
import Post from '@/views/Post.vue'
import Write from '@/views/Write.vue'
import Settings from '@/views/Settings.vue'
import Notifications from '@/views/Notifications.vue'
import Home from '@/views/Home.vue'
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
    path: '/settings',
    name: 'settings',
    component: Settings,
    beforeEnter: authGuard
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: Notifications,
    beforeEnter: authGuard
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: authGuard
  }
]
