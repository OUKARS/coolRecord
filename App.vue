<script>
	export default {
		methods:{
			checkToken(){
				var self = this
				uni.getStorage({
				    key: 'token',
				    success: async function (res) {
						const token  = res.data
						if(token == ''){
							console.log('token为空');
							const result = await self.$api.login()
							if(result.data.token.length>0) {
								self.$store.dispatch('user/addToken',result.data.token)
								self.checkGoal()
							}
						} else {
							console.log('token存在');
							// self.$store.dispatch('user/addToken',token)
							const result =  await self.$api.checkToken()
							if(result.data.message == 'token有效'){
								console.log("addtoken")
								self.$store.dispatch('user/addToken',token)
								self.checkGoal()
							} else {
								const result = await self.$api.login()
								if(result.data.token.length>0) {
									self.$store.dispatch('user/addToken',result.data.token)
									self.checkGoal()
								}
							}
							
						}
						
				        
				    },
					fail:async function(e){
						console.log('token不存在')
						const result = await self.$api.login()
						if(result.data.token.length>0) {
							self.$store.dispatch('user/addToken',result.data.token)
							self.checkGoal()
						}
					}
				});
			},
			wxGetDevice(){
				var self = this
				uni.getSystemInfo({
					success(res) {
						self.$store.dispatch('app/setDevice',res.platform)
					}
				})
			},
			checkGoal(){
				let that = this
				console.log("开始检查goal")
				uni.getStorage({
				    key: 'isgoal',
				    success: function (res) {
						console.log('goal',res)
						if(res.data === 'yes')
						{
							console.log('目标已经设置')
							that.checkGesture()
						} else {   
							console.log("success jump to onboarding")
							uni.redirectTo({
							  url: '../onboarding/onboarding',
							})
							console.log(res)
						}
				    },
					fail:function(e){
						if(e.errMsg){
							console.log('goal未设置')
							uni.redirectTo({
							  url: '../onboarding/onboarding',
							})
						}
						
					}
				});
			},
			async checkGesture(){
				// const res = await this.$api.gestureSet('856')
				await this.$api.gestureCheck('-1').then((res)=>{
					if(res.data != '-1') { //手势密码已经开启
						uni.navigateTo({
						  url:'../gesture/gesture?method=0'
						})
					}
					this.$store.dispatch('user/addGestureStatus',res.data.data)
				})
			}
			
			
		},
		onLaunch: function() {
			console.log('App Launch')
			this.checkToken()	
			this.wxGetDevice()
			// this.checkGesture()
			console.log('用户设备：'+this.$store.state.app.device)
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	
@import url('./common/animate.css');
/* @font-face {
  font-family: "SourceHanSans-Normal";
  src: url("./static/font/SourceHanSans-Normal.svg") format("svg");
} */
page {
  box-sizing:border-box;
	font-family:Microsoft YaHei;
}

@font-face {
  font-family: 'iconfont';  /* project id 1321685 */
  src: url('//at.alicdn.com/t/font_1321685_491t5ab58us.eot');
  src: url('//at.alicdn.com/t/font_1321685_491t5ab58us.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1321685_491t5ab58us.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1321685_491t5ab58us.woff') format('woff'),
  url('//at.alicdn.com/t/font_1321685_491t5ab58us.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1321685_491t5ab58us.svg#iconfont') format('svg');
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.leftArrow:before {
  content: "\e60c";
}
.weight{
	font-weight: bold;
}
</style>
