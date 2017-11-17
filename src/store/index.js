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
    boardList: [],
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
    updateBoardList(state, boardList) {
      state.boardList = boardList;
    },
  },
  actions: {
    fetchPost({ state, commit }, payload) {
      if (!payload || !payload.postId) {
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
      axios.get(`${apiUrl}/articles/${postId}/${url.slice(0, -1)}`, {
        auth,
      }).then((res) => {
        // console.log(res);
        commit('updatePost', res.data);
        commit('updatePage', res.data.article_current_page);
        // TODO: update post, page, board
      }).catch((err) => {
        console.error(err);
        commit('updatePost', undefined);
      });
    },
    updateBoardList({ commit, state }, callback) {
      axios.get(`${apiUrl}/boards`, { auth: state.auth })
        .then((res) => {
          commit('updateBoardList', res.data.results);
          if (callback) {
            callback();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateBoard({ state, commit }, board) {
      commit('updateBoard', board);
    },
    updatePage({ state, commit }, page) {
      commit('updatePage', page);
    },
  },
});
