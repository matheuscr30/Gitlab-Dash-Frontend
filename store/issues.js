const API = require('../proto/APIV1_pb')

export const state = () => ({
  issues: []
})

export const getters = {
  issues(state) {
    return state.issues
  }
}

export const mutations = {
  SET_ISSUES(state, issues) {
    state.issues = issues
  }
}

export const actions = {
  async loadIssues({ commit }) {
    const response = await this.$axios.$get('issues?state=closed', {
      responseType: 'arraybuffer'
    })
    const issueListProto = API.IssueList.deserializeBinary(response)
    const issueListObject = issueListProto.toObject(API.IssueList)
    const issues = issueListObject.issuesList
    commit('SET_ISSUES', issues)
  }
}
