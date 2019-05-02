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
    const projects = await this.$axios.$get('projects/')
    commit('SET_PROJECTS', projects)
  },
  async loadAllFixedIssues({ state, commit }) {
    for (let i = 0; i < state.projects.length; i++) {
      const projectId = state.projects[i].id
      const fixedIssues = await this.$axios.$get(
        `projects/${projectId}/issues?state=closed`
      )
      commit('ADD_PROJECT_FIXED_ISSUES', { projectId, fixedIssues })
    }
  },
  async loadFixedIssues({ commit }, projectId) {
    const fixedIssues = await this.$axios.$get(
      `projects/${projectId}/issues?state=closed`
    )
    commit('ADD_PROJECT_FIXED_ISSUES', { projectId, fixedIssues })
  },
  async loadAllMembers({ state, commit, dispatch }) {
    for (let i = 0; i < state.projects.length; i++) {
      const projectId = state.projects[i].id
      const members = await this.$axios.$get(`projects/${projectId}/members/`)
      commit('ADD_PROJECT_MEMBERS', { projectId, members })

      for (let j = 0; j < members.length; j++) {
        dispatch(
          'users/addUserProject',
          { userId: members[j].id, project: state.projects[i] },
          { root: true }
        )
      }
    }
  },
  async loadMembers({ state, commit, dispatch }, projectId) {
    const members = await this.$axios.$get(`projects/${projectId}/members/`)
    commit('ADD_PROJECT_MEMBERS', { projectId, members })

    for (let i = 0; i < members.length; i++) {
      dispatch(
        'users/addUserProject',
        {
          userId: members[i].id,
          project: state.projects.find(project => project.id === projectId)
        },
        { root: true }
      )
    }
  },
  async loadAllCommits({ state, commit }) {
    for (let i = 0; i < state.projects.length; i++) {
      const projectId = state.projects[i].id
      const commits = await this.$axios.$get(
        `projects/${projectId}/repository/commits?all=true`
      )
      commit('ADD_PROJECT_COMMITS', { projectId, commits })
    }
  },
  async loadCommits({ commit }, projectId) {
    const commits = await this.$axios.$get(
      `projects/${projectId}/repository/commits?all=true`
    )
    commit('ADD_PROJECT_COMMITS', { projectId, commits })
  },
  async loadBranches({ commit }, projectId) {
    const branches = await this.$axios.$get(
      `projects/${projectId}/repository/branches/`
    )
    commit('ADD_PROJECT_BRANCHES', { projectId, branches })
  }
}
