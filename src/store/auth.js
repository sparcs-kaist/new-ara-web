import { fetchUser, updateDarkMode } from '@/api'

const setDarkMode = (darkMode) => {
  localStorage.darkMode = darkMode

  const rootClassList = document.documentElement.classList

  if (darkMode) {
    rootClassList.add('dark')
  } else {
    rootClassList.remove('dark')
  }
}

const hydrate = () => {
  setDarkMode(localStorage.darkMode === 'true')
  // @TODO: validity check 이거면 충분한가?
  const JWT_REGEX = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/
  if (JWT_REGEX.test(localStorage.jwt)) {
    return localStorage.jwt
  } else {
    delete localStorage.jwt
    return ''
  }
}

export default {
  state: {
    jwt: hydrate(),
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
    },
    isDarkModeEnabled ({ userProfile }) {
      return userProfile.extra_preferences && userProfile.extra_preferences.darkMode
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
      const darkMode = userProfile.extra_preferences && userProfile.extra_preferences.darkMode
      setDarkMode(darkMode)

      state.userProfile = userProfile
    }
  },
  actions: {
    async fetchUser ({ commit, getters: { hasFetched, userId } }) {
      if (!hasFetched) {
        commit('setUserProfile', await fetchUser(userId))
      }
    },
    async toggleDarkMode ({ commit, getters: { isDarkModeEnabled, userId } }) {
      commit('setUserProfile', await updateDarkMode(userId, !isDarkModeEnabled))
    }
  }
}
