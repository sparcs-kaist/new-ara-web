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
  mutations: {
    setBoardList (state, boardList) {
      state.boardList = boardList
    }
  },
  actions: {
    async fetchBoardList ({ commit }) {
      const { results } = await fetchBoardList()
      commit('setBoardList', results)
    }
  }
})
