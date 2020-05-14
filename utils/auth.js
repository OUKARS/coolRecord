
const TokenName='token'

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
