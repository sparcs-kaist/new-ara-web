import Vue from 'vue'
import Vuex from 'vuex'
import i18n from '@/i18n'
import Meta from 'vue-meta'
import {
  fetchArchivedPosts as apiFetchArchivedPosts,
  fetchBoardGroups,
  fetchBoardList,
  fetchRecentViewedPosts
} from '@/api'

import auth from '@/store/auth'
import dialog from '@/store/dialog'
import fetch from '@/store/fetch'

Vue.use(Vuex)
Vue.use(Meta)

export default new Vuex.Store({
  modules: { auth, dialog, fetch },
  state: {
    boardList: [],
    boardGroups: [],
    recentPosts: [],
    archivedPosts: [],
    PWAPrompt: null
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
    },
    getBannerDescriptionById: ({ boardList }) => (id, locale) => {
      const board = boardList.find(board => board.id === id)
      const bannerDesc = board ? board[`${locale}_banner_description`] : ''
      return (bannerDesc === null) ? '' : bannerDesc
    },
    getBannerImageById: ({ boardList }) => id => {
      const board = boardList.find(board => board.id === id)
      return board ? board.banner_image : ''
    },
    PWAPrompt: ({ PWAPrompt }) => {
      return PWAPrompt
    }
  },
  mutations: {
    setBoardList (state, boardList) {
      state.boardList = boardList
    },

    setBoardGroups (state, boardGroups) {
      state.boardGroups = boardGroups.map(el => ({ ...el, clicked: false }))
    },

    setRecentPosts (state, posts) {
      state.recentPosts = posts
    },

    setArchivedPosts (state, posts) {
      state.archivedPosts = posts
    },

    setPWAPrompt (state, newPrompt) {
      state.PWAPrompt = newPrompt
    }
  },
  actions: {
    async fetchBoardList ({ commit, getters: { hasFetchedBoardList } }) {
      if (!hasFetchedBoardList) {
        const boardList = await fetchBoardList()
        commit('setBoardList', boardList)

        const boardGroups = await fetchBoardGroups()
        commit('setBoardGroups', boardGroups)
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
