export const state = () => ({
  projects: []
})

export const getters = {
  projects(state) {
    return state.projects
  }
}

export const mutations = {
  SET_PROJECTS(state, projects) {
    state.projects = projects
  }
}

export const actions = {
  async loadProjects({ commit }) {
    const response = await this.$axios.$get('projects/')
    console.log(response)
    commit('SET_PROJECTS', response)
  },
  setProjects({ commit }, projects) {
    commit('SET_PROJECTS', projects)
  }
}
