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
    fetchPost({ state, commit }, payload) {
      const auth = state.auth;
      const postId = payload.postId;
      const context = payload.context;
      let url = '?';

      const keys = Object.keys(context);
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        url += `${key}=${context[key]}&`;
      }

      axios.get(`${apiUrl}/articles/${postId}/${url}`, {
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
