<template>
	<view class="finger-container">
		<my-bar :nav="setNav"></my-bar>
        <view class="finger-content">
			<view class="logo">
				<image src="../../static/bg/logobwhite.png" class="logo-img"></image>
			</view>
			<view class="btn">
				<view class="finger-logo" @tap="checkFingerPrint()">
					<image class="finger-img" src="../../static/icon/finger.png" mode=""></image>
				</view>
				<view class="finger-text" @tap="checkFingerPrint()">
					点按上方指纹图案解锁
				</view>
				
			</view>
			<view class="error-text">
				<button class="text" open-type="contact">
					更换手机？更换指纹？点我
				</button>
			</view>
        </view>
        
	</view>
</template>

<script>
    export default {
		props:{
			method:{
				type:String,
				default:''
			},
			open:{
				type:String,
				default:'0'
			}
		},
		onLoad() {
			if(this.method != 1)
			{
				this.text = "请解锁图案"
			}
		},
        data() {
            return {
				setNav:{
					'color':'red',  //字体颜色
					'isdisPlayNavTitle':false, //是否显示返回按钮，由于导航栏是共用的，把所有的东西封装好，
					'isShowGoal':false,
					'isShowSetting':false,
					'navTitle':'指纹锁' //导航标题
				},
            }
        },
        methods: {			
			checkFingerPrint(){
				let that = this
				uni.checkIsSupportSoterAuthentication({
				                    success(res) {
				                        console.log("本设备支持生物认证");
										uni.checkIsSoterEnrolledInDevice({
										                    checkAuthMode: 'fingerPrint',
										                    success(res) {
										                       console.log("本设备已录入指纹，支持认证");
															   uni.startSoterAuthentication({
															   	requestAuthModes: ['fingerPrint'],
															   	challenge: 'CoolRecord',
															   	authContent: '请用指纹解锁',
															   	async success(result) {
															   	   console.log("本地验证通过，即将请求后端验证")
															   	   uni.showLoading({
															   		   title: '验证中'
															   	   });
															   		const res = await that.$api.softerVerify(result.resultJSON,result.resultJSONSignature)
															   		if(res){
															   		   console.log("后端验证结果：")
															   		   console.log(res)
															   		   if(res.data == '成功')
															   			{	
															   				uni.hideLoading();
															   				uni.redirectTo({
															   				  url:'../index/index'
															   				})
															   			} else {
															   				uni.hideLoading();
															   				uni.showToast({
															   					title: '解锁失败，请重试',
															   					icon:'none',
															   					duration: 2000
															   				});
															   			}
															   		}
															   
															   	},
															   	fail(err) {
															   		uni.showToast({
															   			title: '解锁失败，请重试',
															   			icon:'none',
															   			duration: 2000
															   		});
															   	},
															   	complete(res) {
															   		console.log(res);
															   	}
															   })
										                    },
										                    fail(err) {
																console.log("本设备未录入指纹");
																uni.showModal({
																	title:'抱歉',
																	content:"您未在手机内录入指纹数据，请使用原手机使用并解锁！",
																	showCancel:false,
																})
										                    },
										                    complete(res) {
										                        console.log(res);
										                    }
										                })
				                    },
				                    fail(err) {
										console.log("本设备不支持生物认证");
										uni.showModal({
											title:'抱歉',
											content:"本设备不支持指纹认证，请使用支持指纹认证的设备使用酷记账！",
											showCancel:false,
										})
				                        // console.log(err);
				                    },
				                    complete(res) {
				                        console.log(res);
				                    }
				                })
				
				
			}
        },
		onLoad() {
			// this.checkFingerPrint()
		}
    }
</script>

<style lang="scss">
	
	.finger-container{
		background: linear-gradient(0deg, #5153F6 0%, #4A34D5 100%);
		min-height: 100vh;
		.finger-content{
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			min-height: 100vh;
			.logo{
				margin-top: 100rpx;
				display: flex;
				justify-content: center;
				width: 500rpx;
				height: 500rpx;
				.logo-img{
					width: 500rpx;
					height: 500rpx;
				}
			}
			.btn{
				animation: shanshuo 1s infinite;
				-webkit-animation: shanshuo 1s infinite;
				margin-top: 80rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.finger-logo{
					margin: 50rpx 0;
					width: 100rpx;
					height: 100rpx;
					.finger-img{
						width: 100rpx;
						height: 100rpx;
					}
				}
				.finger-text{
					margin: 50rpx;
					text-align: center;
					color: #fff;
					font-size: 36rpx;
				}
			}
			.error-text{
				margin: 20rpx 0;
				.text{
					text-align: center;
					box-sizing: border-box;
					padding: 12rpx 20rpx;
					width: 450rpx;
					font-size: 32rpx;
					color: #fff;
					line-height: 2;
					border-radius: 24rpx;
					background: #4331C1;
				}
			}
		}
	}
	
</style>
