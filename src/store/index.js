import Vue from 'vue'
import Vuex from 'vuex'
import { fetchBoardList } from '@/api'
import auth from './auth.js'
import fetch from './fetch.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { auth, fetch },
  state: {
    boardList: []
  },
  getters: {
    hasFetchedBoardList: ({ boardList }) =>
      boardList.length !== 0,
    getIdBySlug: ({ boardList }) => (slug) =>
      boardList.find(board => board.slug === slug).id,
    getSlugById: ({ boardList }) => (id) =>
      boardList.find(board => board.id === id).slug,
    // @TODO: i18n..
    getNameById: ({ boardList }) => (id) =>
      boardList.find(board => board.id === id).ko_name
  },
  mutations: {
    setBoardList (state, boardList) {
      state.boardList = boardList
    }
  },
  actions: {
    async fetchBoardList ({ commit, getters: { hasFetchedBoardList } }) {
      if (!hasFetchedBoardList) {
        const { results } = await fetchBoardList()
        commit('setBoardList', results)
      }
    }
  }
})
