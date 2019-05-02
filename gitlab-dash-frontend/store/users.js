export const state = () => ({
  users: [],
  userProjects: {}
})

export const getters = {
  users(state) {
    return state.users
  },
  userProjects(state) {
    return state.userProjects
  }
}

export const mutations = {
  SET_USERS(state, users) {
    state.users = users
  },
  ADD_USER_PROJECT(state, { userId, project }) {
    const userProjects = { ...state.userProjects }

    if (
      userProjects.hasOwnProperty(userId) &&
      !userProjects[userId].find(projectAux => projectAux.id === project.id)
    ) {
      userProjects[userId].push(project)
    } else userProjects[userId] = [project]

    state.userProjects = userProjects
  }
}

export const actions = {
  async loadUsers({ commit }) {
    const users = await this.$axios.$get('users?active=true')
    commit('SET_USERS', users)
  },
  addUserProject({ commit }, { userId, project }) {
    commit('ADD_USER_PROJECT', { userId, project })
  }
}
