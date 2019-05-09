const API = require('../proto/APIV1_pb')

export const state = () => ({
  projects: [],
  projectFixedIssues: {},
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
    const response = await this.$axios.$get('projects/', {
      responseType: 'arraybuffer'
    })
    const projectListProto = API.ProjectList.deserializeBinary(response)
    const projectListObject = projectListProto.toObject(API.ProjectList)
    const projects = projectListObject.projectsList
    commit('SET_PROJECTS', projects)
  },
  async loadFixedIssues({ commit }, projectId) {
    const response = await this.$axios.$get(
      `projects/${projectId}/issues?state=closed`,
      {
        responseType: 'arraybuffer'
      }
    )
    const issueListProto = API.IssueList.deserializeBinary(response)
    const issueListObject = issueListProto.toObject(API.IssueList)
    const fixedIssues = issueListObject.issuesList
    commit('ADD_PROJECT_FIXED_ISSUES', { projectId, fixedIssues })
  },
  async loadCommits({ commit }, projectId) {
    const response = await this.$axios.$get(`projects/${projectId}/commits/`, {
      responseType: 'arraybuffer'
    })
    const commitListProto = API.CommitList.deserializeBinary(response)
    const commitListObject = commitListProto.toObject(API.CommitList)
    const commits = commitListObject.commitsList
    commit('ADD_PROJECT_COMMITS', { projectId, commits })
  },
  async loadBranches({ commit }, projectId) {
    const response = await this.$axios.$get(`projects/${projectId}/branches/`, {
      responseType: 'arraybuffer'
    })
    const branchListProto = API.BranchList.deserializeBinary(response)
    const branchListObject = branchListProto.toObject(API.BranchList)
    const branches = branchListObject.branchesList
    commit('ADD_PROJECT_BRANCHES', { projectId, branches })
  }
}
