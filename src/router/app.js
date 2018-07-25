import Board from '@/views/Board'
import User from '@/views/User'
import Post from '@/views/Post'
import Write from '@/views/Write'
import Settings from '@/views/Settings'
import Home from '@/views/Home'
import { authGuard } from './auth'

export default [
  {
    path: '/board/:boardId?',
    name: 'board',
    component: Board,
    props: true,
    beforeEnter: authGuard
  },
  {
    path: '/user/:username',
    name: 'user',
    component: User,
    props: true,
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
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: authGuard
  }
]
