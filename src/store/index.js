import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const apiUrl = 'http://13.124.216.27:8000/api';

export default new Vuex.Store({
  state: {
    // language: 'ko_KR',
    auth: {
      username: 'sparcs',
      password: 'newara@sparcs',
    },
    post: undefined,
    // {
    //   postDetail: {},
    //   postComment: [],
    // },
    apiUrl: 'http://13.124.216.27:8000/api',
    board: '',
    page: 0,
  },
  mutations: {
    updatePost(state, post) {
      state.post = post;
    },
    updateBoard(state, board) {
      state.board = board;
    },
    updatePage(state, page) {
      state.page = page;
    },
  },
  actions: {
    fetchPost({ state, commit }, payload) {
      if (!payload) {
        commit('updatePost', undefined);
        return;
      }
      const auth = state.auth;
      const postId = payload.postId;
      const context = payload.context;
      let url = '?';

      if (context) {
        const keys = Object.keys(context);
        for (let i = 0; i < keys.length; i += 1) {
          const key = keys[i];
          url += `${key}=${context[key]}&`;
        }
      }
      if (postId === undefined) {
        axios.get(`${apiUrl}/articles/${url}`, {
          auth,
        }).then(() => {
          // console.log(res);
          // commit('updatePost', res.data);
          // TODO: update page, board
        }).catch((err) => {
          console.error(err);
          commit('updatePost', undefined);
        });
      } else {
        axios.get(`${apiUrl}/articles/${postId}/${url}`, {
          auth,
        }).then((res) => {
          // console.log(res);
          commit('updatePost', res.data);
          commit('updatePage', res.data.current_article_page);
          // TODO: update post, page, board
        }).catch((err) => {
          console.error(err);
          commit('updatePost', undefined);
        });
      }
    },
    updateBoard({ state, commit }, board) {
      commit('updateBoard', board);
    },
    updatePage({ state, commit }, page) {
      commit('updatePage', page);
    },
  },
});
