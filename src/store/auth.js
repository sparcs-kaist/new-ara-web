import { fetchMe, updateDarkMode } from '@/api'

const setDarkMode = (darkMode) => {
  const rootClassList = document.documentElement.classList

  switch (darkMode) {
    case 'light':
      rootClassList.remove('dark')
      rootClassList.remove('system-dark')
      break

    case 'dark':
      rootClassList.add('dark')
      rootClassList.remove('system-dark')
      break

    case 'system-dark':
      rootClassList.add('system-dark')
      rootClassList.remove('dark')
  }
}

export default {
  state: {
    token: localStorage.token,
    userProfile: {}
  },
  getters: {
    isLoggedIn ({ token }) {
      return !!token
    },
    userId ({ userProfile: { user } }) {
      return user
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
    darkMode ({ userProfile }) {
      return userProfile.extra_preferences && userProfile.extra_preferences.darkMode
    }
  },
  mutations: {
    updateToken (state, newToken) {
      state.token = newToken
      localStorage.token = newToken
    },
    deleteToken (state) {
      state.token = ''
      delete localStorage.token
    },
    setUserProfile (state, userProfile) {
      const darkMode = userProfile.extra_preferences && userProfile.extra_preferences.darkMode
      setDarkMode(darkMode)

      state.userProfile = userProfile
    }
  },
  actions: {
    async fetchMe ({ commit, getters: { hasFetched } }) {
      if (!hasFetched) {
        commit('setUserProfile', await fetchMe())
      }
    },
    async updateDarkMode ({ commit, getters: { userId } }, newMode) {
      commit('setUserProfile', await updateDarkMode(userId, newMode))
    }
  }
}
