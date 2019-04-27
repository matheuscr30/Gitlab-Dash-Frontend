export const state = () => ({
  users: []
})

export const getters = {
  users(state) {
    return state.users
  }
}

export const mutations = {
  SET_USERS(state, users) {
    state.users = users
  }
}

export const actions = {
  async loadUsers({ commit }) {
    const response = await this.$axios.$get('users/')
    commit('SET_USERS', response)
  },
  setUsers({ commit }, users) {
    commit('SET_USERS', users)
  }
}
