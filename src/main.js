// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import AsyncComputed from 'vue-async-computed';

import App from './App';
import router from './router';
import store from './store';


Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(AsyncComputed);
axios.defaults.headers.common = {
  Authorization: `JWT ${localStorage.getItem('jwtToken')}`,
};
axios.interceptors.response.use(res => res, (err) => {
  if (err.response.status !== 401) {
    return Promise.reject(err);
  }
  return axios.post('http://13.124.216.27:8000/refresh-jwt-token/', { token: localStorage.getItem('token') })
    .then((resRefreshToken) => {
      /* Retry original request with new jwt token. */
      localStorage.setItem('token', resRefreshToken.data.token);
      axios(err.config)
        .then(resRetry => resRetry)
        .catch(errRetry => Promise.reject(errRetry));
    }).catch(() => {
      window.location = '/login';
    });
});
Vue.prototype.$axios = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
