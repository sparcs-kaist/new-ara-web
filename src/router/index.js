import Vue from 'vue'
import Router from 'vue-router'
import auth from './auth.js'
import app from './app.js'

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
