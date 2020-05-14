<template>
	<view class="order-container">
		<my-bar :nav="setNav"></my-bar>
		<view class="order-header">
			<image class="order-bg-img" src="../../static/bg/bg-order.png"></image>
		</view>
		<view class="order-content">
			<view class="money-container">
				<view class="order-title">
					金额
				</view>
				<view class="order-input">
					<input type="digit" :value="orderData.monthCost"/>
				</view>
			</view>
			<view class="remark-container">
				<view class="order-title">
					备注
				</view>
				<view class="order-input">
					<input type="digit" :value="orderData.monthCost"/>
				</view>
			</view>
			<view class="btn-container">
				<button class="order-btn animated fadeInUp delay-016s" type="default">确认</button>
			</view>
		</view>
		<tabbar currentPage="order"/> 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				setNav:{
					'color':'red',  //字体颜色
					'isdisPlayNavTitle':false, //是否显示返回按钮，由于导航栏是共用的，把所有的东西封装好，
					'isShowGoal':true,
					'isShowSetting':true,
					'navTitle':'' //导航标题
				},
				orderData:{
					'monthCost':0,
					'monthSave':0
				}
			}
		},
		methods: {
			async fetchorderDetail(){
				const res = await this.$api.fetchorderDetail()
				this.orderData = res.data
			}
		},
		onLoad() {
			this.fetchorderDetail()
		}
	}
</script>


<style lang="scss">
.order-container{
	background: linear-gradient(0deg, #5153F6 0%, #4A34D5 100%);
	min-height: 100vh;
	.order-header{
		z-index: 1;
		margin: 0 auto;
		margin-top: 80rpx;
		width: 100%;
		height: auto;
		text-align: center;
		.order-bg-img{
			width: 500rpx;
			height: 329rpx;
			margin:0 auto;
			// width: 60%;
		}
	}
	.order-content{
		width: 90%;
		margin:0 auto;
		box-sizing: border-box;
		padding: 50rpx;
		box-shadow:15rpx 15rpx 20rpx rgba(50,50,93,.1),5rpx 15rpx 20rpx rgba(0,0,0,.1);
		margin-top: -74rpx;
		padding-top: 120rpx;
		z-index: 0;
		border-radius: 80rpx;
		background: #fff;
		height: auto;
		.order-title{
			font-size: 40rpx;
			font-weight: bold;
			color: rgb(75,60,221);
			margin-bottom:20rpx ;
		}
		.order-input{
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
			.order-btn{
				width: 60%;
				margin:30rpx auto;
				color: #fff;
				background: linear-gradient(90deg, #5373FC 0%, #39A0FF 100%);
			}
		}
	}
}
</style>
