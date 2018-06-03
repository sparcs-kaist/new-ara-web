import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import { apiUrl } from '../config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    post: undefined,
    apiUrl,
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
    fetchPost({ commit }, payload) {
      if (!payload || !payload.postId) {
        commit('updatePost', undefined);
        return Promise.resolve();
      }
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
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          headers: {
            Authorization: `JWT ${localStorage.getItem('jwtToken')}`,
          },
          url: `${apiUrl}/api/articles/${postId}/${url.slice(0, -1)}`,
        }).then((res) => {
          commit('updatePost', res.data);
          commit('updatePage', res.data.article_current_page);
          resolve();
          // TODO: update post, page, board
        }).catch((err) => {
          commit('updatePost', undefined);
          reject(err);
        });
      });
    },
    async updateBoardList({ commit }) {
      return new Promise((resolve) => {
        axios({
          method: 'GET',
          headers: {
            Authorization: `JWT ${localStorage.getItem('jwtToken')}`,
          },
          url: `${apiUrl}/api/boards`,
        }).then((res) => {
          commit('updateBoardList', res.data.results);
          resolve();
        })
        .catch((err) => {
          console.log(err);
        });
      });
    },
    updateBoard({ commit }, board) {
      commit('updateBoard', board);
    },
    updatePage({ commit }, page) {
      commit('updatePage', page);
    },
  },
  getters: {
    boardNameList(state) {
      const boardNameList = [];
      state.boardList.forEach((board) => {
        boardNameList.push(board.en_name);
      });
      return boardNameList;
    },
  },
});
