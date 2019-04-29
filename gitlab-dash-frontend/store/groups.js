export const state = () => ({
  groups: []
})

export const getters = {
  groups(state) {
    return state.groups
  }
}

export const mutations = {
  SET_GROUPS(state, groups) {
    state.groups = groups
  }
}

export const actions = {
  async loadGroups({ commit }) {
    const response = await this.$axios.$get('groups/')
    commit('SET_GROUPS', response)
  }
}
