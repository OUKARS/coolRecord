<script>
	export default {
		methods:{
			checkToken(){
				var self = this
				uni.getStorage({
				    key: 'token',
				    success: async function (res) {
						const token  = res.data
						if(token === ''){
							console.log('token为空');
							self.$api.login()
							
						} else {
							console.log('token存在');
							const res =  await self.$api.checkToken()
						}
						
				        
				    },
					fail:function(e){
						console.log('token不存在')
						self.$api.login()
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
			wxlogin(){
				var self = this
				uni.login({
					provider:'weixin',
					success:function(loginRes){
						let code = loginRes.code;
						uni.request({
							url: 'http://www.codeskystar.cn:8080/weixin/login/auth',
							data: {
								code: code,
							},
							method: 'GET',
							header: {
							'content-type': 'application/json'
							},
							success: (res) => {
								//openId、或SessionKdy存储//隐藏loading
								console.log("code已经发给后端")
								const token = res.data.data
								self.$store.dispatch('user/addToken',token)
							},
							fail: (err) => {
								console.log(err)
							}
						});
					}
				})
			}
		},
		onLaunch: function() {
			console.log('App Launch')
			this.wxGetDevice()
			this.checkToken()
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
