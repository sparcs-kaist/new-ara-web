import Layout from '@/views/Layout'
import Home from '@/views/Home'
import Board from '@/views/Board'
import Post from '@/views/Post'
import Settings from '@/views/Settings'
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
        path: '/post/:postId',
        name: 'post',
        component: Post,
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
