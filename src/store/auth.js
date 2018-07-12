import { fetchUser } from '@/api'

export default {
  // @TODO: namespaced: true // maybe...??
  state: {
    jwt: localStorage.jwt || '',
    userProfile: {}
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
    },
    userId ({ jwt }) { return JSON.parse(atob(jwt.split('.')[1])).user_id },
    hasFetched ({ userProfile }) { return Object.keys(userProfile).length !== 0 },
    userNickname ({ userProfile: { nickname } }) { return nickname },
    userPicture ({ userProfile: { picture } }) { return picture },
    userConfig ({ userProfile: { see_sexual: sexual, see_social: social } }) {
      return { sexual, social }
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
    },
    setUserProfile (state, userProfile) {
      state.userProfile = userProfile
    }
  },
  actions: {
    async fetchUser ({ commit, getters }, progressHandler) {
      if (!getters.hasFetched) {
        commit('setUserProfile', await fetchUser(getters.userId, progressHandler))
      }
    }
  }
}
