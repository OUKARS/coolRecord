<template>
	<view class="gesture-container">
		<my-bar :nav="method == 1? setNav:setNav2"></my-bar>
        <view class="gesture-content">
            <mpvue-gesture-lock :containerWidth="600" :cycleRadius="70" @end="onEnd" :password="password"></mpvue-gesture-lock>
			<view v-if="open == '1' && method ==1" class="close-btn" @tap="closeGesture()">
				关闭手势密码
			</view>
			<view class="bottom-text">
				<view class="uni-text">{{text}}</view>
					<button  v-if="method != 1" class="forget-text" open-type="contact">忘记密码？点击联系人工处理</button>

			</view>
			
			
        </view>
        
	</view>
</template>

<script>
    import mpvueGestureLock from '@/components/mpvueGestureLock';

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
        components: {
            mpvueGestureLock
        },
		onLoad() {
			if(this.method != 1)
			{
				this.text = "请解锁图案"
			}
		},
        data() {
            return {
				setNav2:{
					'color':'red',  //字体颜色
					'isdisPlayNavTitle':false, //是否显示返回按钮，由于导航栏是共用的，把所有的东西封装好，
					'isShowGoal':false,
					'isShowSetting':false,
					'navTitle':'手势解锁' //导航标题
				},
				setNav:{
					'color':'red',  //字体颜色
					'isdisPlayNavTitle':true, //是否显示返回按钮，由于导航栏是共用的，把所有的东西封装好，
					'isShowGoal':false,
					'isShowSetting':false,
					'navTitle':'手势设置' //导航标题
				},
				title : "手势图案",
                password: [],
                text: '请设定手势'
            }
        },
        methods: {
			async closeGesture(){
				await this.$api.gestureSet('-1').then(res=>{
					if(res.data == '成功'){
						uni.navigateBack({
							delta:1
						})
					} else {
						uni.showModal({
							title:'错误',
							content:"关闭未成功",
							showCancel:false
						})
					}
				});
				
			},
            async onEnd(data) {
				if(this.method == 1){
					if (this.password.length) {
						if (this.password.join('') === data.join('')) {
							
							const res = await this.$api.gestureSet(this.password.join(''))
							if(res.data == '成功'){
								this.text = '手势设定完成'
								uni.showModal({
									title:'欧耶',
									content:"设置手势密码成功！重启小程序生效！",
									showCancel:false,
									success:function(res){
										uni.navigateBack({
											delta:1
										})
									}
								})
							} else {
								this.text = '手势设定遇到问题'
							}
							console.log(res)
							console.log(this.password.join(''))
							this.password = []
						} else {
							this.text = '两次手势设定不一致'
							this.password = []
						}
					} else {
						this.text = '请确认手势设定'
						this.password = data
					}
				} else {
					const res = await this.$api.gestureCheck(data.join(''))
					if(res.data == '1'){
						this.text = '解锁成功'
						uni.navigateBack({
							delta:1
						})
						console.log("密码正确")
					} else {
						uni.showModal({
							title:'错误',
							content:"密码验证错误",
							showCancel:false,
						})
						this.text = '请重新输入密码'
					}
				}
            }
        }
    }
</script>

<style lang="scss">
	
	.gesture-container{
		background: linear-gradient(0deg, #5153F6 0%, #4A34D5 100%);
		min-height: 100vh;
		.gesture-content{
			margin-top: -50rpx;
			min-height: 90vh;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
		}
	}
	.close-btn{
		text-align: center;
		background: rgb(255,227,108);
		border-radius: 20rpx;
		margin: 0 auto;
		width: 40%;
		height: 90rpx;
		line-height: 90rpx;
		font-weight: bold;
		}
    .uni-text{
		color: #fff;
		height: 60rpx;
        font-size: 48rpx;
        text-align: center;
    }
	.forget-text{
			
			height: 72rpx;
			line-height: 72rpx;
			width: 75%;
			margin: auto;
			margin-top: 50rpx;
			border-radius: 24rpx;
			background: #6327F6;
			color: #fff;

	}
</style>
