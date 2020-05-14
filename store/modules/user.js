import { getToken, setToken, removeToken } from '../../utils/auth.js'


const state = {
	token:'null'
}

const mutations = {
  RESET_STATE: (state) => {
    state.token=''
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
	addToken({ commit },token) {
	  return new Promise(resolve => {
	    setToken(token) // must remove  token  first
	    commit('SET_TOKEN', token)
	    resolve()
	  })
	},
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

