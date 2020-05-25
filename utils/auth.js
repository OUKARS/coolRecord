
const TokenName='token'
const GoalName='isgoal'
export function setToken(token) {
  return uni.setStorageSync({
	 key:TokenName,
	data:token
  	
  })
}

export function removeToken() {
  return uni.removeStorageSync({
  	key:TokenName
  })
}

export function setGoal(yes) {
  return uni.setStorage({
	 key:GoalName,
	data:yes
  	
  })
}

export function removeGoal() {
  return uni.removeStorageSync({
  	key:GoalName
  })
}
