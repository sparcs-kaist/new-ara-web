import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Facade from '@/views/Facade'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'facade',
      component: Facade
    },
    {
      path: '/login-handler',
      name: 'login-handler',
      beforeEnter: (to, from, next) => {
        localStorage.setItem('JWT', to.query.jwt)
        next('/')
      }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) &&
    !localStorage.getItem('JWT')) {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})

export default router
