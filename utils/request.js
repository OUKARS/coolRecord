var Fly=require('../common/wx.umd.min.js') //wx.js为您下载的源码文件
var fly=new Fly;

const whiteUrl='/login/auth'

fly.config.baseURL = "http://www.codeskystar.cn/weixin"
// 配置响应拦截器
fly.interceptors.response.use(
	(response) => {
			// 如果请求报错
			if (response.data.code != 200) {
				uni.showModal({
					title:'提示',
					content:response.data,
					showCancel:false
				})
			}else{
				//只将请求结果的data字段返回
				return response.data
			}
		},
		(err) => {
			//发生网络错误后会走到这里
			uni.showModal({
				title:'咦',
				content:"网络好像出现了点问题o(╥﹏╥)o",
				showCancel:false
			})
			return Promise.resolve("网络好像出现了点问题o(╥﹏╥)o")
		}
)
// 配置请求拦截器
fly.interceptors.request.use((request) => {
	console.log(request)
	if(request.url != whiteUrl)
		request.headers["Authorization"] = 'Bearer '+uni.getStorageSync('token');
		
	request.headers["content-type"]="application/json"
	return request;
})

async function wxLogin() {
	return await new Promise((resolve, reject) => {
		uni.login({
			provider:'weixin',
			success:function(loginRes){
				let code = loginRes.code;
				if(code){
					resolve(code)
				}
			}
		})
	})
}

export const login = async () => {
	console.log('开始登录...')
	let code = await wxLogin();
	let res = await fly.get('/login/auth',{code: code});
	uni.setStorageSync('token',res.data.token)
	
}

export const fetchGoalDetail = async () => {

		console.log('请求查询目标接口...')
		return fly.get('/goal/detail')
}
