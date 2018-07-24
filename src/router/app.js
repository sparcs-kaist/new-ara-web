import Layout from '@/views/Layout'
import Board from '@/views/Board'
import User from '@/views/User'
import Post from '@/views/Post'
import Write from '@/views/Write'
import Settings from '@/views/Settings'
import Home from '@/views/Home'
import { authGuard } from './auth'

export default [
  {
    path: '/:path?',
    component: Layout,
    children: [
      {
        path: '/board/:boardId?',
        name: 'board',
        component: Board,
        props: true
      },
      {
        path: '/user/:username',
        name: 'user',
        component: User,
        props: true
      },
      {
        path: '/post/:postId',
        name: 'post',
        component: Post,
        props: true
      },
      {
        path: '/write/:postId?',
        name: 'write',
        component: Write,
        props: true
      },
      {
        path: '/settings',
        name: 'settings',
        component: Settings
      },
      {
        path: '/',
        name: 'home',
        component: Home
      }
    ],
    beforeEnter: authGuard
  }
]
