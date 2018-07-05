export default {
  state: {
    jwt: localStorage.jwt || ''
  },
  getters: {
    isLoggedIn ({ jwt }) {
      return !!jwt
    },
    jwtPayload ({ jwt }) {
      if (jwt) {
        return JSON.parse(atob(jwt.split('.')[1]))
      } else {
        return {}
      }
    }
  },
  mutations: {
    updateJwt (state, newJwt) {
      state.jwt = newJwt
      localStorage.jwt = newJwt
    },
    deleteJwt (state) {
      state.jwt = ''
      delete localStorage.jwt
    }
  }
}
