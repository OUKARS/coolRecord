<template>
	<view class="goal-container">
		<my-bar :nav="setNav"></my-bar>
		<view class="goal-header animated fadeInDown">
			<image class="goal-bg-img" src="https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/bg/bg-goal.png"></image>
		</view>
		<view class="goal-content">
			<view class="monthcost-container">
				<view class="goal-title">
					最大支出目标
				</view>
				<view class="goal-input">
					<input type="digit"  v-model="goalData.monthCost"/>
				</view>
			</view>
			<view class="monthsave-container">
				<view class="goal-title">
					本月存款目标
				</view>
				<view class="goal-input">
					<input type="digit"  v-model="goalData.monthSave"/>
				</view>
			</view>
			<view class="btn-container">
				<button class="goal-btn" type="default" @tap="PostGoal()">确认</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				setNav:{
					'color':'red',  //字体颜色
					'isdisPlayNavTitle':true, //是否显示返回按钮，由于导航栏是共用的，把所有的东西封装好，
					'navTitle':'每月目标' //导航标题
				},
				goalData:{
					'monthCost':0,
					'monthSave':0
				}
			}
		},
		methods: {
			async fetchGoalDetail(){
				const res = await this.$api.fetchGoalDetail()
				this.goalData = res.data
			},
			async PostGoal(){
				var _self = this
				var monthCost = parseFloat(this.goalData.monthCost)
				var monthSave = parseFloat(this.goalData.monthSave)
				if(monthCost >=0 && monthSave >=0){
					const res = await this.$api.PostGoal({monthCost,monthSave})
					if(res.data.message==='设置成功'){
						_self.$store.dispatch('user/addGoal','yes')
						uni.showModal({
							title:'成功',
							content:"设置成功！",
							showCancel:false,
							success: function (res) {
								
							        if (res.confirm) {
							            uni.navigateBack({
							            	delta:1
							            })
							        } 
							    }
						})
					}
				} else {
					uni.showModal({
						title:'错误',
						content:"请正确填写内容！",
						showCancel:false
					})
				}
			}
		},
		onLoad() {
			this.fetchGoalDetail()
		}
	}
</script>


<style lang="scss">
.goal-container{
	background: linear-gradient(0deg, #5153F6 0%, #4A34D5 100%);
	min-height: 100vh;
	.goal-header{
		z-index: 1;
		
		margin: 0 auto;
		margin-top: 50rpx;
		width: 100%;
		height: auto;
		text-align: center;
		.goal-bg-img{
			width: 500rpx;
			height: 329rpx;
			margin:0 auto;
			// width: 60%;
		}
	}
	.goal-content{
		width: 86%;
		margin:0 auto;
		box-sizing: border-box;
		padding: 50rpx;
		box-shadow:15rpx 15rpx 20rpx rgba(50,50,93,.1),5rpx 15rpx 20rpx rgba(0,0,0,.1);
		margin-top: -50rpx;
		padding-top: 120rpx;
		z-index: 0;
		border-radius: 80rpx;
		background: #fff;
		height: auto;
		.goal-title{
			font-size: 36rpx;
			font-weight: bold;
			color: rgb(75,60,221);
			margin-bottom:20rpx ;
		}
		.goal-input{
			border-radius: 24rpx;
			box-sizing: border-box;
			padding: 20rpx;
			background: #F5F5F5;
			margin-bottom:20rpx ;
			// font-size: 36rpx;
			color: #6327F6;
		}
		
		
		.monthcost-container{
			margin-bottom:40rpx ;
		}
		.monthsave-container{
			margin-bottom:40rpx ;
		}
		.btn-container{
			margin:80rpx 0 0;
			.goal-btn{
				width: 50%;
				border-radius: 80rpx;
				line-height: 90rpx;
				height: 90rpx;
				margin:10rpx auto;
				color: #fff;
				background: linear-gradient(90deg, #5153F6 0%, #4A34D5 100%);
			}
		}
	}
}
</style>
