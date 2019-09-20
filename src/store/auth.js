import { fetchMe, fetchUser, updateDarkMode } from '@/api'

const setDarkMode = (darkMode) => {
  localStorage.darkMode = darkMode

  const rootClassList = document.documentElement.classList

  if (darkMode) {
    rootClassList.add('dark')
  } else {
    rootClassList.remove('dark')
  }
}

// const hydrate = () => {
//   setDarkMode(localStorage.darkMode === 'true')
//   return localStorage.token
// }

export default {
  state: {
    token: localStorage.token,
    userProfile: {},
    userId: localStorage.userId
  },
  getters: {
    isLoggedIn ({ token }) {
      return !!token
    },
    userId ({ userId }) {
      return userId
    },
    hasFetched ({ userProfile }) {
      return Object.keys(userProfile).length !== 0
    },
    userNickname ({ userProfile: { nickname } }) {
      return nickname
    },
    userPicture ({ userProfile: { picture } }) {
      return picture
    },
    userConfig ({ userProfile: { see_sexual: sexual, see_social: social } }) {
      return { sexual, social }
    },
    isDarkModeEnabled ({ userProfile }) {
      return userProfile.extra_preferences && userProfile.extra_preferences.darkMode
    }
  },
  mutations: {
    updateToken (state, [ newToken, newUserId ]) {
      state.token = newToken
      state.userId = newUserId
      localStorage.token = newToken
      localStorage.userId = newUserId
    },
    deleteToken (state) {
      state.token = ''
      state.userId = 0
      delete localStorage.token
      delete localStorage.userId
    },
    setUserProfile (state, userProfile) {
      const darkMode = userProfile.extra_preferences && userProfile.extra_preferences.darkMode
      setDarkMode(darkMode)

      state.userProfile = userProfile
    }
  },
  actions: {
    async fetchMe ({ commit, getters: { userId, hasFetched } }) {
      if (!hasFetched) {
        commit('setUserProfile', await fetchUser(userId))
      }
    },
    async toggleDarkMode ({ commit, getters: { isDarkModeEnabled } }) {
      commit('setUserProfile', await updateDarkMode(!isDarkModeEnabled))
    }
  }
}
