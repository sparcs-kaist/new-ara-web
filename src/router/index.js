import Vue from 'vue'
import Router from 'vue-router'
import auth from './auth'
import app from './app'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    ...auth,
    ...app
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { x: 0, y: 0 }
  }
})
