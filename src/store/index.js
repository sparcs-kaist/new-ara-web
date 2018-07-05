import Vue from 'vue'
import Vuex from 'vuex'
import { fetchBoardList } from '@/api'
import auth from './auth'

Vue.use(Vuex)

export const apiStatus = {
  API_NORMAL: 'normal',
  API_ERROR: 'error'
}

export default new Vuex.Store({
  modules: { auth },
  state: {
    status: apiStatus.API_NORMAL,
    boardList: []
  },
  getters: {
    isApiError ({ status }) {
      return status === apiStatus.API_ERROR
    }
  },
  mutations: {
    updateStatus (state, newStatus) {
      state.status = newStatus
    },
    setBoardList (state, boardList) {
      state.boardList = boardList
    }
  },
  actions: {
    error ({ commit }) {
      commit('updateStatus', apiStatus.API_ERROR)
      return setTimeout(
        () => commit('updateStatus', apiStatus.API_NORMAL),
        2000
      )
    },
    fetchBoardList ({ commit, dispatch }) {
      fetchBoardList().then(({ results }) =>
        commit('setBoardList', results)
      ).catch(() =>
        dispatch('error')
      )
    }
  }
})
