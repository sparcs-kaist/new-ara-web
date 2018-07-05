import TheLayout from '@/components/TheLayout'
import Home from '@/views/Home'
import Board from '@/views/Board'
import Post from '@/views/Post'
import Setting from '@/views/Setting'
import { authGuard } from './auth'

export default [
  {
    path: '/:path?',
    component: TheLayout,
    children: [
      {
        path: '/board/:boardId',
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
        path: '/setting',
        name: 'setting',
        component: Setting
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
