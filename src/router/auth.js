import store from '@/store'
import { logout } from '@/api'

import Facade from '@/views/Facade.vue'
import Terms from '@/views/Terms.vue'

export const authGuard = async (to, from, next) => {
  await store.dispatch('fetchMe')

  if (!store.getters.isLoggedIn) {
    next('/login')
  } else {
    try {
      await store.dispatch('fetchBoardList')
      next()
    } catch (err) {
      if (err.apierr) {
        await store.dispatch('dialog/toast', {
          type: 'error',
          text: err.apierr
        })
      } else {
        // @TODO: 서버장애 페이지..?
      }
    }
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
    beforeEnter: (to, from, next) => {
      store.commit('setAuthState', true)
      next('/')
    }
  },
  {
    path: '/logout',
    name: 'logout-handler',
    beforeEnter: async (to, from, next) => {
      if (!store.getters.userId) {
        await store.dispatch('fetchMe')
      }

      if (store.getters.isLoggedIn) {
        try {
          await logout(store.getters.userId)
        } catch (err) {}
        store.commit('setAuthState', false)
      }

      next('/login')
    }
  },
  {
    path: '/tos',
    name: 'terms',
    component: Terms,
    beforeEnter: async (to, from, next) => {
      await store.dispatch('fetchMe')
      if (!store.getters.isLoggedIn) {
        next('/login')
      } else {
        next()
      }
    }
  }
]
