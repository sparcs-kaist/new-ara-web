const fetchStatus = {
  IDLE: 'idle',
  FETCHING: 'fetching',
  ERROR: 'error'
}

export default {
  namespaced: true,
  state: {
    status: fetchStatus.IDLE,
    progress: 0, // 0 <= progress <= 1
    errorMessage: ''
  },
  getters: {
    isError ({ status }) {
      return status === fetchStatus.ERROR
    },
    isFetching ({ status }) {
      return status === fetchStatus.FETCHING
    }
  },
  mutations: {
    updateError (state, message) {
      state.status = fetchStatus.ERROR
      state.errorMessage = message
    },
    endError (state) {
      state.status = fetchStatus.IDLE
      state.errorMessage = ''
    },
    startProgress (state) {
      state.status = fetchStatus.FETCHING
      state.progress = 0.01
    },
    updateProgress (state, progress) {
      state.status = fetchStatus.FETCHING
      state.progress = progress
    },
    endProgress (state) {
      state.status = fetchStatus.IDLE
      state.progress = 0
    }
  },
  actions: {
    // @TODO: showError가 끝나는 시점이 궁금한 component가 있다면 Promise로 재작성 할 수도?
    showError ({ commit }, message) {
      commit('updateError', message)
      setTimeout(() => { commit('endError') }, 2000)
    },
    endProgress ({ commit }) {
      commit('updateProgress', 1)
      setTimeout(() => { commit('endProgress') }, 300)
    }
  }
}
