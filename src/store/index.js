import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import { apiUrl } from '../config';


const ALL_BOARD = {
  id: 0,
  ko_name: '모아보기',
  en_name: 'all',
};


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    post: null,
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
        commit('updatePost', null);
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
          commit('updatePost', null);
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
    updateBoard({ state, commit }, boardName) {
      let board;
      if (boardName === 'all') board = ALL_BOARD;
      else board = state.boardList.filter(_board => _board.en_name === boardName)[0];
      commit('updateBoard', board);
    },
    updatePage({ commit }, page) {
      commit('updatePage', page);
    },
  },
  getters: {
    getBoardNameById(state) {
      return boardId => state.boardList.find(board => board.id === boardId).en_name;
    },
    getBoardIdByName(state) {
      return boardName => state.boardList.find(board => board.en_name === boardName).id;
    },
  },
});
