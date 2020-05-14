<template>
	<view class="goal-container">
		<my-bar :nav="setNav"></my-bar>
		<view class="goal-header animated fadeInDown">
			<image class="goal-bg-img" src="../../static/bg/bg-goal.png"></image>
		</view>
		<view class="goal-content">
			<view class="monthcost-container">
				<view class="goal-title">
					最大支出
				</view>
				<view class="goal-input">
					<input type="digit" :value="goalData.monthCost"/>
				</view>
			</view>
			<view class="monthsave-container">
				<view class="goal-title">
					本月存款
				</view>
				<view class="goal-input">
					<input type="digit" :value="goalData.monthCost"/>
				</view>
			</view>
			<view class="btn-container">
				<button class="goal-btn" type="default">确认</button>
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
		width: 90%;
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
			font-size: 40rpx;
			font-weight: bold;
			color: rgb(75,60,221);
			margin-bottom:20rpx ;
		}
		.goal-input{
			border-radius: 24rpx;
			box-sizing: border-box;
			padding: 20rpx;
			background: #F5F5F5;
			font-size: 36rpx;
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
				width: 60%;
				margin:30rpx auto;
				color: #fff;
				background: linear-gradient(90deg, #5373FC 0%, #39A0FF 100%);
			}
		}
	}
}
</style>
