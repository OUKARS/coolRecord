import fly from '../utils/request.js'

async function wxLogin() {
	return await new Promise((resolve, reject) => {
		uni.login({
			provider:'weixin',
			success:function(loginRes){
				let code = loginRes.code;
				if(code){
					resolve(code)
				}
			},
			fail:function(err){
				console.log(err)
			}
		})
	})
}

export const login = async () => {
	console.log('开始登录...')
	let code = await wxLogin();
	let res = await fly.get('/login/auth',{code: code});
	console.log(code)
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

export const importData = async () => {

		console.log('请求预设数据接口...')
		return fly.get('/pingwei/api')
}


export const gestureCheck = async (passowrd) => {

		console.log('请求预设数据接口...')
		return fly.post('/guesture/check',{
			guesture:passowrd
		})
}

export const gestureSet = async (passowrd) => {

		console.log('请求预设数据接口...')
		return fly.post('/guesture/set',{
			guesture:passowrd
		})
}
