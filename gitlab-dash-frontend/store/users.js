const API = require('../proto/APIV1_pb')

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
    const response = await this.$axios.$get('users', {
      responseType: 'arraybuffer'
    })
    const userListProto = API.UserList.deserializeBinary(response)
    const userListObject = userListProto.toObject(API.UserList)
    const users = userListObject.usersList
    commit('SET_USERS', users)
  }
}
