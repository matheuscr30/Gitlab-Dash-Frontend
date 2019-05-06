const API = require('../proto/APIV1_pb')

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
    const response = await this.$axios.$get('groups/', {
      responseType: 'arraybuffer'
    })
    const groupListProto = API.GroupList.deserializeBinary(response)
    const groupListObject = groupListProto.toObject(API.GroupList)
    const groups = groupListObject.groupsList
    commit('SET_GROUPS', groups)
  }
}
