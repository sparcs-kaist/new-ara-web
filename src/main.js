import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import axios from './axios';

Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
