import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const apiUrl = 'http://13.124.216.27:8000/api';

export default new Vuex.Store({
  state: {
    // language: 'ko_KR',
    auth: {
      username: 'jsh56son',
      password: 'asdfasdf1234',
    },
    post: {
      // postDetail: {},
      // postComment: [],
    },
  },
  mutations: {
    updatePost(state, post) {
      state.post = post;
    },
  },
  actions: {
    fetchPost({ state, commit }, postId) {
      const auth = state.auth;
      axios.get(`${apiUrl}/articles/${postId}/`, {
        auth,
      }).then((res) => {
        console.log(res);
        commit('updatePost', res.data);
      }).catch((err) => {
        console.error(err);
        commit('updatePost', undefined);
      });
    },
  },
});
