import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './http.js'
import i18n from './i18n'
import './registerServiceWorker'

Vue.prototype.$http = http

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
