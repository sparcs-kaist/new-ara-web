import Vue from 'vue'
import Router from 'vue-router'
import auth from '@/router/auth'
import app from '@/router/app'
import NotFound from '@/views/NotFound.vue'
import Meta from 'vue-meta'
import store from '@/store'

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

router.beforeEach((to, from, next) => {
  const userAgreed = store.state.auth?.userProfile?.agree_terms_of_service_at;

  // 약관에 동의하지 않은 경우 약관 페이지로 리다이렉트
  if (!userAgreed && to.path !== '/terms') {
    next('/terms');
  } else {
    next();
  }
});

export default router;
