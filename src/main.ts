import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import http from '@/http'
import i18n from '@/i18n'
import '@/registerServiceWorker'
// import ReactWrapper from '@/components/ReactWrapper.vue'

// Vue.component('ReactWrapper', ReactWrapper)

const VueProgressBar = require('vue-progressbar')

const options = {
  color: '#f4b9b9',
  failedColor: '#b22020',
  thickness: '5px',
  transition: {
    speed: '0.1s',
    opacity: '0.3s',
    termination: 300
  },
  autoRevert: true,
  location: 'top'
}
Vue.use(VueProgressBar, options)

Vue.prototype.$http = http

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
