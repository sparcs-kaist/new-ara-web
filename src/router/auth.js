import store from '@/store'
import Facade from '@/views/Facade.vue'

export const authGuard = async (to, from, next) => {
  if (!store.getters.isLoggedIn) {
    next('/login')
  } else {
    await Promise.all([
      store.dispatch('fetchUser'),
      store.dispatch('fetchBoardList')
    ])
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
