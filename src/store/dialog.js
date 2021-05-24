export default {
  namespaced: true,

  state: {
    dialogs: []
  },

  mutations: {
    addDialog (state, dialog) {
      dialog.id = Math.random().toString(36).slice(2)
      state.dialogs.push(dialog)
    },

    removeDialog (state, payload) {
      if (typeof payload === 'string') { payload = { id: payload } }

      const index = state.dialogs.findIndex(dialog => dialog.id === payload.id)
      if (index < 0) { return }

      const dialog = state.dialogs[index]
      if (dialog.callback) {
        if (dialog.type === 'report') {
          dialog.callback({result: payload.value, selection: payload.chip_selection})
        } else {
          dialog.callback(payload.value)
        }
      }

      state.dialogs.splice(index, 1)
    }
  },

  actions: {
    createDialog ({ state, commit }, dialog) {
      commit('addDialog', dialog)

      if (dialog.timeout) {
        setTimeout(() => {
          commit('removeDialog', dialog.id)
        }, dialog.timeout)
      }
    },

    alert ({ dispatch }, payload) {
      if (typeof payload === 'string') { payload = { text: payload } }

      return new Promise(resolve => {
        if (!payload.type) { payload.type = 'info' }

        payload.callback = resolve

        dispatch('createDialog', payload)
      })
    },

    confirm ({ dispatch }, payload) {
      if (typeof payload === 'string') { payload = { text: payload } }

      return new Promise(resolve => {
        payload.type = 'confirm'
        payload.callback = resolve

        dispatch('createDialog', payload)
      })
    },

    report ({ dispatch }, payload) {
      if (typeof payload === 'string') { payload = { text: payload } }

      return new Promise(resolve => {
        payload.type = 'report'
        payload.callback = resolve

        dispatch('createDialog', payload)
      })
    },

    toast ({ dispatch }, payload) {
      if (typeof payload === 'string') { payload = { text: payload } }

      payload.timeout = 2000
      payload.toast = true

      return dispatch('alert', payload)
    }
  }
}
