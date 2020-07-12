import { getToken, setToken, removeToken,setGoal,removeGoal } from '../../utils/auth.js'


const state = {
	token:'',
	isgoal:'yes',
	gestureStatus:-1,
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
  },
  SET_GESTURESTATUS: (state, bool) => {
    state.gestureStatus = bool
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
	    commit('SET_GOAL', bool)
	    resolve()
	  })
	},
	addGestureStatus({ commit },bool) {
	  return new Promise(resolve => {
	    
	    commit('SET_GESTURESTATUS', bool)
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

