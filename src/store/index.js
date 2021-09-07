import Vue from 'vue'
import Vuex from 'vuex'
import i18n from '@/i18n.js'
import {
  fetchArchivedPosts as apiFetchArchivedPosts,
  fetchBoardList,
  fetchRecentViewedPosts
} from '@/api'

import auth from './auth.js'
import dialog from './dialog.js'
import fetch from './fetch.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { auth, dialog, fetch },
  state: {
    boardList: [],
    recentPosts: [],
    archivedPosts: []
  },
  getters: {
    hasFetchedBoardList: ({ boardList }) =>
      boardList.length !== 0,
    getIdBySlug: ({ boardList }) => (slug) =>
      boardList.find(board => board.slug === slug)?.id,
    getBoardById: ({ boardList }) => id =>
      boardList.find(board => board.id === id),
    getSlugById: ({ boardList }) => (id) =>
      boardList.find(board => board.id === id)?.slug,
    // @TODO: i18n..
    getNameById: ({ boardList }) => (id, locale) => {
      const board = boardList.find(board => board.id === id)
      return board ? board[`${locale}_name`] : i18n.t('all', locale)
    }
  },
  mutations: {
    setBoardList (state, boardList) {
      state.boardList = boardList
    },

    setRecentPosts (state, posts) {
      state.recentPosts = posts
    },

    setArchivedPosts (state, posts) {
      state.archivedPosts = posts
    }
  },
  actions: {
    async fetchBoardList ({ commit, getters: { hasFetchedBoardList } }) {
      if (!hasFetchedBoardList) {
        const { results } = await fetchBoardList()
        commit('setBoardList', results)
      }
    },

    async fetchRecentPosts ({ commit }) {
      const { results } = await fetchRecentViewedPosts({ pageSize: 5 })
      commit('setRecentPosts', results)
    },

    async fetchArchivedPosts ({ commit }) {
      const { results } = await apiFetchArchivedPosts({ pageSize: 5 })
      commit('setArchivedPosts', results)
    }
  }
})
