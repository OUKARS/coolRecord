import { getToken, setToken, removeToken,setGoal,removeGoal } from '../../utils/auth.js'


const state = {
	token:'',
	isgoal:'yes'
}

const mutations = {
  RESET_STATE: (state) => {
    state.token='',
	state.isgoal='yes'
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },

  SET_GOAL: (state, bool) => {
    state.isgoal = bool
  }
}

const actions = {
	addToken({ commit },token) {
	  return new Promise(resolve => {
	    setToken(token) 
	    commit('SET_TOKEN', token)
	    resolve()
	  })
	},
	addGoal({ commit },bool) {
	  return new Promise(resolve => {
	    setGoal(bool) 
		console.log("addgoal",bool)
	    commit('SET_GOAL', bool)
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

