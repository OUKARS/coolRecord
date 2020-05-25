var Fly=require('../common/wx.umd.min.js') //wx.js为您下载的源码文件
var fly=new Fly;
const whiteUrl='/login/auth'
var jumpflag=0
fly.config.baseURL = "https://www.codeskystar.cn/weixin"
// 配置响应拦截器
fly.interceptors.response.use(
	(response) => {
			// 如果请求报错
			if (response.data.code == 301) {
				console.log("token无效，重新登录")
				uni.redirectTo({
					url:'../onboarding/onboarding'
				})
				login() //token过期，重新登录
				
				return response.data

			}
			else if(response.data.code != 200){
				uni.showModal({
					title:'提示',
					content:response.data,
					showCancel:false
				})
			}
			else{
				//只将请求结果的data字段返回
				
				console.log("请求正常："+response.engine.responseURL)
				return response.data
			}
		},
		(err) => {
			//发生网络错误后会走到这里

			
			if(err.response.data.message=='用户未登录，请先登录'){
				if(jumpflag==0){
					console.log("跳转onborading")
					uni.redirectTo({
						url:'../onboarding/onboarding'
					})
					login() //token过期，重新登录
					jumpflag=1;
				}
				
			} else {
			uni.showModal({
				title:'咦',
				content:"网络好像出现了点问题o(╥﹏╥)o",
				showCancel:false
			})
			}
			return Promise.resolve("网络好像出现了点问题o(╥﹏╥)o")
		}
)
// 配置请求拦截器
fly.interceptors.request.use((request) => {
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
	console.log("登录成功")
	return res
}

export const checkToken = async () => {

		console.log('查询token有效接口...')
		return fly.get('/chart/token')
}

export const fetchGoalDetail = async () => {

		console.log('请求查询目标接口...')
		return fly.get('/goal/detail')
}
export const PostGoal = async (data) => {

		console.log('请求设置目标接口...')
		return fly.post('/goal/set',data)
}

export const fetchHomeChart = async () => {

		console.log('请求首页饼图接口...')
		return fly.get('/chart/home')
}

export const fetchOrderListByDate = async (date) => {

		console.log('请求账单列表接口...')
		return fly.get('/order/list',{date:date})
}

export const fetchOrderDetail = async (id) => {

		console.log('请求账单详情接口...')
		return fly.get('/order/detail',{orderId:id})
}

export const postOrder = async (data) => {

		console.log('请求提交账单接口...')
		return fly.post('/order/set',data)
}

export const fetchCategoryData = async () => {

		console.log('请求分类列表接口...')
		return fly.get('/category/detail')
}

export const exportDataExcel = async (start,end) => {

		console.log('请求导出账单接口...')
		return fly.get('/export/order',{
			startDate:start,
			endDate:end
		})
}

export const fetchRoseData = async (type,kind,date) => {

		console.log('请求玫瑰图接口...')
		return fly.get('/chart/rosecategory',{
			type:type,
			kind:kind,
			date:date
		})
}

export const fetchLineData = async (kind,date) => {

		console.log('请求线图接口...')
		return fly.get('/chart/line',{
			kind:kind,
			date:date
		})
}
export const deleteOrder = async (id) => {

		console.log('请求删除订单接口...')
		return fly.delete('/order/delete',{
			orderId:id
		})
}

