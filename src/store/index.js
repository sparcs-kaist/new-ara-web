import Vue from 'vue'
import Vuex from 'vuex'
import { fetchBoardList } from '@/api'
import auth from './auth'
import fetch from './fetch'

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
    fetchBoardList ({ commit }) {
      fetchBoardList().then(({ results }) =>
        commit('setBoardList', results)
      )
    }
  }
})
