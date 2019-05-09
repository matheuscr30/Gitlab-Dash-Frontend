import qs from 'qs'

export const state = () => ({
  isHydrated: false,
  isFullscreen: false,
  loadingAccessToken: false,
  accessToken: ''
})

export const getters = {
  isHydrated(state) {
    return state.isHydrated
  },
  isFullscreen(state) {
    return state.isFullscreen
  },
  loadingAccessToken(state) {
    return state.loadingAccessToken
  },
  accessToken(state) {
    return state.accessToken
  }
}

export const mutations = {
  SET_IS_HYDRATED(state, isHydrated) {
    state.isHydrated = isHydrated
  },
  SET_IS_FULLSCREEN(state, isFullscreen) {
    state.isFullscreen = isFullscreen
  },
  SET_ACCESS_TOKEN(state, accessToken) {
    state.accessToken = accessToken
  }
}

export const actions = {
  setIsHydrated({ commit }, isHydrated) {
    commit('SET_IS_HYDRATED', isHydrated)
  },
  setIsFullscreen({ commit }, isFullscreen) {
    commit('SET_IS_FULLSCREEN', isFullscreen)
  },
  async requestToken({ commit }) {
    const response = await this.$axios.$post(
      'o/token/',
      qs.stringify({
        grant_type: 'client_credentials',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
      }),
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      }
    )

    commit('SET_ACCESS_TOKEN', response.access_token)
  }
}
