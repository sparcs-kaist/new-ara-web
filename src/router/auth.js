import store from '@/store'
import Facade from '@/views/Facade.vue'

export const authGuard = async (to, from, next) => {
  if (!store.getters.isLoggedIn) {
    next('/login')
  } else {
    try {
      await Promise.all([
        store.dispatch('fetchMe'),
        store.dispatch('fetchBoardList')
      ])
      next()
    } catch (err) {
      // @TODO: 서버장애 페이지..?
    }
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
    beforeEnter: ({ query: { token } }, from, next) => {
      store.commit('updateToken', token)
      next('/')
    }
  },
  {
    path: '/logout',
    name: 'logout-handler',
    beforeEnter: (to, from, next) => {
      store.commit('deleteToken')
      next('/login')
    }
  }
]
