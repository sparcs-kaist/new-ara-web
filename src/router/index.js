import Vue from 'vue'
import Router from 'vue-router'
import auth from './auth.js'
import app from './app.js'
import NotFound from '@/views/NotFound.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    ...auth,
    ...app,
    {
      path: '*',
      name: 'not-found',
      component: NotFound
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    // @TODO: 페이지 로드시 #id-hash 까지 스크롤 돼 있게..?
    if (to.hash) {
      return { selector: to.hash }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
