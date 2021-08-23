import { fetchMe as apiFetchMe, updateTos, updateDarkMode } from '@/api'

const setDarkMode = (darkMode) => {
  localStorage.darkMode = darkMode

  const rootClassList = document.documentElement.classList

  if (darkMode) {
    rootClassList.add('dark')
  } else {
    rootClassList.remove('dark')
  }
}

export default {
  state: {
    authState: false,
    userProfile: {}
  },
  getters: {
    isLoggedIn ({ authState }) {
      return authState
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
    userEmail ({ userProfile: { sso_user_info: { email } } }) {
      return email
    },
    isDarkModeEnabled ({ userProfile }) {
      return userProfile.extra_preferences && userProfile.extra_preferences.darkMode
    }
  },
  mutations: {
    setUserProfile (state, userProfile) {
      const darkMode = userProfile.extra_preferences && userProfile.extra_preferences.darkMode
      setDarkMode(darkMode)

      state.userProfile = userProfile
    },

    setAuthState (state, authed) {
      state.authState = authed
    }
  },
  actions: {
    async fetchMe ({ commit, getters }) {
      const { hasFetched } = getters
      try {
        if (!hasFetched) {
          commit('setUserProfile', await apiFetchMe())
        }

        const { userId } = getters
        commit('setAuthState', userId !== undefined)
      } catch (err) {
        commit('setAuthState', false)
      }
    },
    async agreeTos ({ dispatch, getters: { userId } }) {
      await updateTos(userId)
      return dispatch('fetchMe')
    },
    async toggleDarkMode ({ commit, getters: { isDarkModeEnabled } }) {
      commit('setUserProfile', await updateDarkMode(!isDarkModeEnabled))
    }
  }
}
