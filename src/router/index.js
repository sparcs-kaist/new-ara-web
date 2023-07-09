import Vue from 'vue'
import Router from 'vue-router'
import auth from '@/router/auth'
import app from '@/router/app'
import NotFound from '@/views/NotFound.vue'
import Meta from 'vue-meta'

Vue.use(Router)
Vue.use(Meta)

export default new Router({
  mode: 'history',
  routes: [
    ...auth,
    ...app,
    {
      path: '*',
      name: 'error',
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
