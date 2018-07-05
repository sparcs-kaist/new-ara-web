import store from '@/store'
import Facade from '@/views/Facade'

export const authGuard = (to, from, next) => {
  if (!store.getters.isLoggedIn) {
    next('/login')
  } else {
    next()
  }
}

export default [
  {
    path: '/login',
    name: 'facade',
    component: Facade,
    beforeEnter: (to, from, next) => {
      if (store.getters.isLoggedIn) {
        next('/')
      } else {
        next()
      }
    }
  },
  {
    path: '/login-handler',
    name: 'login-handler',
    beforeEnter: ({ query: { jwt } }, from, next) => {
      store.commit('updateJwt', jwt)
      next('/')
    }
  },
  {
    path: '/logout',
    name: 'logout-handler',
    beforeEnter: (to, from, next) => {
      store.commit('deleteJwt')
      next('/login')
    }
  }
]
