<template>
	<view class="order-container">
		<my-bar :nav="setNav"></my-bar>
		<view class="order-header">
			<image class="order-bg-img" src="../../static/bg/bg-order.png"></image>
		</view>
		<view class="order-content">
			<view class="type-container">
				<button class="out-btn" type="default">支出</button>
				<button class="in-btn" type="default">收入</button>
			</view>
			<view class="top-content">
				<view class="date-container">
					<view class="order-title" value="0">
						日期
					</view>
					<view class="date-content">
						<view class="date-card today">
							今天
						</view>
						<view class="date-card yesterday">
							昨天
						</view>
						<view class="date-card more">
							...
						</view>
					</view>
				</view>
				<view class="category-container">
					<view class="order-title" value="0">
						分类 
					</view>
					<view class="category-content">
						<view class="category-card today">
							晚餐
						</view>
						<view class="category-card more">
							...
						</view>
					</view>
				</view>
			</view>
			<view class="order-title" value="0">
				金额
			</view>
			<view class="order-input">
				<input type="digit" :value="orderData.monthCost"/>
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
				<button class="order-btn" type="default">确认</button>
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
			// async fetchorderDetail(){
			// 	const res = await this.$api.fetchorderDetail()
			// 	this.orderData = res.data
			// }
		},
		onLoad() {
			// this.fetchorderDetail()
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
		margin-top: 40rpx;
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
		padding-top: 90rpx;
		z-index: 0;
		border-radius: 80rpx;
		background: #fff;
		height: auto;
		.top-content{
			margin: 30rpx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.date-container{
				.date-content{
					// background: pink;
					display: flex;
					justify-content: flex-start;
					flex-wrap: nowrap;
					.date-card{
						text-align: center;
						margin:0 10rpx;
						font-size: 22rpx;
						box-sizing: border-box;
						padding: 8rpx 10rpx;
						background: #fff;
						width: 80rpx;
						background:#fff;
						color:rgb(75,60,221);
						border-radius:6rpx ;
						border: 1rpx solid rgb(75,60,221);
						
					}
				}
			}
			.category-container{
				.category-content{
					// background: pink;
					display: flex;
					justify-content: flex-start;
					flex-wrap: nowrap;
					.category-card{
						text-align: center;
						margin:0 10rpx;
						font-size: 22rpx;
						box-sizing: border-box;
						padding: 8rpx 10rpx;
						background: #fff;
						width: 80rpx;
						background:#fff;
						color:rgb(75,60,221);
						border-radius:6rpx ;
						border: 1rpx solid rgb(75,60,221);
						
					}
				}
			}
		}
		
		.order-title{
			// width: 30%;
			align-items: center;
			font-size:36rpx;
			font-weight: bold;
			color: rgb(75,60,221);
			margin-bottom:20rpx ;
		}
		.order-input{
			width: 90%;
			align-items: center;
			border-radius: 24rpx;
			box-sizing: border-box;
			font-size: 36rpx;
			padding: 16rpx 20rpx;
			background: #F5F5F5;
			font-size: 36rpx;
			color: #6327F6;
		}
		.type-container{
			display: flex;
			width: 60%;
			margin:0 auto;
			justify-content: center;
			
			.out-btn{
				box-shadow:0rpx 5rpx 8rpx rgba(41,41,41,.08);
				border:none;
				border-top-right-radius: 0;
				border-bottom-right-radius: 0;
				border-top-left-radius: 50rpx;
				border-bottom-left-radius:  50rpx;
				marin:0;
				font-size: 36rpx;
				color: #fff;
				font-weight: bold;
				width: 100%;
				background: #f6f6f6;
				color:#6327F6 ;
			}
			.in-btn{
				box-shadow:0rpx 5rpx 8rpx rgba(41,41,41,.08);
				border:none;
				border-top-left-radius: 0;
				border-bottom-left-radius: 0;
				border-top-right-radius: 50rpx;
				border-bottom-right-radius: 50rpx;
				marin:0;
				width: 100%;
				font-size: 36rpx;
				font-weight: bold;
				background: #f6f6f6;
				color:#6327F6 ;
				background: linear-gradient(90deg, #5153F6 0%, #4A34D5 100%);
				color: #fff;
			}
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
