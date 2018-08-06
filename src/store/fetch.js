const fetchStatus = {
  IDLE: 'idle',
  FETCHING: 'fetching',
  ENDING: 'ending',
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
      return status === fetchStatus.FETCHING ||
        status === fetchStatus.ENDING
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
      state.progress = 0.05
    },
    updateProgress (state, progress) {
      if (state.status === fetchStatus.FETCHING) {
        state.progress = progress
      }
    },
    preEndProgress (state) {
      state.status = fetchStatus.ENDING
      state.progress = 1
    },
    endProgress (state) {
      state.status = fetchStatus.IDLE
      state.progress = 0
    }
  },
  actions: {
    showError ({ commit }, message) {
      commit('updateError', message)
      setTimeout(() => { commit('endError') }, 2000)
    },
    startProgress ({ commit }) {
      commit('startProgress')
      setTimeout(() => { commit('updateProgress', 0.1) }, 100)
      setTimeout(() => { commit('updateProgress', 0.25) }, 200)
      setTimeout(() => { commit('updateProgress', 0.55) }, 300)
    },
    endProgress ({ commit }) {
      commit('preEndProgress')
      setTimeout(() => { commit('endProgress') }, 300)
    }
  }
}
