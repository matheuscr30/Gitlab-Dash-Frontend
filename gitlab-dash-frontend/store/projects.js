export const state = () => ({
  projects: [],
  projectFixedIssues: {},
  projectMembers: {},
  projectCommits: {},
  projectBranches: {}
})

export const getters = {
  projects(state) {
    return state.projects
  },
  projectFixedIssues(state) {
    return state.projectFixedIssues
  },
  projectMembers(state) {
    return state.projectMembers
  },
  projectCommits(state) {
    return state.projectCommits
  },
  projectBranches(state) {
    return state.projectBranches
  }
}

export const mutations = {
  SET_PROJECTS(state, projects) {
    state.projects = projects
  },
  ADD_PROJECT_FIXED_ISSUES(state, { projectId, fixedIssues }) {
    const projectFixedIssues = { ...state.projectFixedIssues }
    projectFixedIssues[projectId] = fixedIssues
    state.projectFixedIssues = projectFixedIssues
  },
  ADD_PROJECT_MEMBERS(state, { projectId, members }) {
    const projectMembers = { ...state.projectMembers }
    projectMembers[projectId] = members
    state.projectMembers = projectMembers
  },
  ADD_PROJECT_COMMITS(state, { projectId, commits }) {
    const projectCommits = { ...state.projectCommits }
    projectCommits[projectId] = commits
    state.projectCommits = projectCommits
  },
  ADD_PROJECT_BRANCHES(state, { projectId, branches }) {
    const projectBranches = { ...state.projectBranches }
    projectBranches[projectId] = branches
    state.projectBranches = projectBranches
  }
}

export const actions = {
  async loadProjects({ commit }) {
    const response = await this.$axios.$get('projects/')
    commit('SET_PROJECTS', response)
  },
  async loadFixedIssues({ commit }, projectId) {
    const response = await this.$axios.$get(
      `projects/${projectId}/issues?state=closed`
    )
    commit('ADD_PROJECT_FIXED_ISSUES', { projectId, fixedIssues: response })
  },
  async loadMembers({ commit }, projectId) {
    const response = await this.$axios.$get(`projects/${projectId}/members/`)
    commit('ADD_PROJECT_MEMBERS', { projectId, members: response })
  },
  async loadCommits({ commit }, projectId) {
    const response = await this.$axios.$get(
      `projects/${projectId}/repository/commits?all=true`
    )
    commit('ADD_PROJECT_COMMITS', { projectId, commits: response })
  },
  async loadBranches({ commit }, projectId) {
    const response = await this.$axios.$get(
      `projects/${projectId}/repository/branches/`
    )
    commit('ADD_PROJECT_BRANCHES', { projectId, branches: response })
  }
}
