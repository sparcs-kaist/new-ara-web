import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    language: 'ko_KR',
    apiUrl: 'http://13.124.216.27:8000',
    auth: {
      username: 'jsh56son',
      password: 'asdfasdf1234',
    },
  },
});
