import store from '@/store'
import { logout } from '@/api'

import Facade from '@/views/Facade.vue'
import Terms from '@/views/Terms.vue'

import { acquireFCMToken, releaseFCMToken } from '@/firebase'

export const authGuard = async (to, from, next) => {
  await store.dispatch('fetchMe')

  if (!store.getters.isLoggedIn) {
    const urlRef = (to.path && to.path !== '/') ? `?next=${location.protocol}//${location.host}${to.fullPath}` : `?next=${location.protocol}//${location.host}/`
    next(`/login${urlRef}`)
  } else {
    try {
      await store.dispatch('fetchBoardList')
      acquireFCMToken()
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
      next()
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
        releaseFCMToken()
        next()
      }
    }
  },
  {
    path: '/login-handler',
    name: 'login-handler',
    beforeEnter: (to, from, next) => {
      store.commit('setAuthState', true)
      var host = location.protocol + '//' + location.host
      next(to.query.link.substr(host.length))
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
