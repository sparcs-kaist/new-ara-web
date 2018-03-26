// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import AsyncComputed from 'vue-async-computed';

import { apiUrl } from './config';
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
    let warningMsg;
    if (err.response.status >= 400 && err.response.status < 500) {
      warningMsg = '잘못된 요청인 것 같군요. 다시 시도해주세요!';
    } else if (err.response.status >= 500 && err.response.status < 600) {
      warningMsg = '서버에 문제가 생긴 것 같습니다... 잠시만 기다려주세요!';
    }

    const warningElem = document.createElement('div');
    warningElem.classList.add('modal', 'is-warning', 'is-active');
    warningElem.innerHTML = `
      <div class="modal-content">
        <article class="message is-warning">
          <div class="message-header">
            <p>이런!</p>
            <button class="delete" aria-label="delete"></button>
          </div>
          <div class="message-body">
            ${warningMsg}
            <br />
            문제가 지속될 경우 placeholder@sparcs.org로 알려주세요 :)
          </div>
        </article>
      </div>`;

    const appElem = document.getElementById('app');
    appElem.appendChild(warningElem);
    warningElem.getElementsByClassName('delete')[0].addEventListener('click', () => {
      appElem.removeChild(warningElem);
    });

    return Promise.reject(err);
  }
  return axios.post(`${apiUrl}/refresh-jwt-token/`, { token: localStorage.getItem('token') })
    .then((resRefreshToken) => {
      /* Retry original request with new jwt token. */
      localStorage.setItem('token', resRefreshToken.data.token);
      axios(err.config)
        .then(resRetry => resRetry)
        .catch(errRetry => Promise.reject(errRetry));
    }).catch(() => {
      window.location = '/login?session_expired=true';
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
