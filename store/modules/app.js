
const state = {
  device: 'android'
}

const mutations = {
  SET_DEVICE: (state, device) => {
    state.device = device
  }
}

const actions = {
  setDevice({ commit }, device) {
    commit('SET_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
