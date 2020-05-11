<template>
	<view class="recordlist-container animated fadeInUp">
		<view class="header">
			<view class="title">
				<image class="icon" src="../../static/icon/index-list.png" mode=""></image>
				<view class="text">
					今日账单
				</view>
				
			</view>
			<view class="more"  @tap="jumpToList()" >
				<image class="icon" src="../../static/icon/index-search.png" mode=""></image>
				<view class="text">
					账单查询
				</view>
				
			</view>
			
		</view>
		<view class="recordlist-content">
				<view :key="index" class="list-item" v-for="(item,index) in recordlist">
					<view class="left-content">
						<image class="category-img" src="../../static/category/breakfirst.png" mode=""></image>
					</view>
					<view class="right-content">
						<view class="info">
							<view class="text">
								<view class="category-text">
									早餐
								</view>
								<view class="other-text">
									无备注
								</view>
							</view>
						</view>
						<view class="num">
							<view class="rmb">
								-123
							</view>
							<view class="time">
								2020-5-6
							</view>
						</view>
					</view>
				</view>
	
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				recordlist:[{
					temp:1
				},{
					temp:2
				},{
					temp:2
				},{
					temp:2
				},{
					temp:2
				},]
			};
		},
		methods:{
			jumpToList(){
			
				uni.navigateTo({
				    url: '../list/list'
				});
			}
		}
	}
</script>

<style lang="scss">
.recordlist-container{
	box-sizing: border-box;
	margin-top: 60rpx;
	padding-top: 10rpx;
	
	height: auto;
	// background-image:linear-gradient(75deg,#AF4DFF,#6327F6);
	// box-shadow:15rpx 15rpx 20rpx rgba(50,50,93,.1),5rpx 15rpx 20rpx rgba(0,0,0,.1);
	.header{
		margin-bottom: 20rpx;
		display: flex;
		justify-content: space-between;
		
		.title{
			display: flex;
			align-items:center;
			.icon{
				width: 44rpx;
				height: 44rpx;
				margin-right: 6rpx;
			}
			.text{
				color:#1D1C5C;
				font-weight: bold;
				font-size: 36rpx;
			}
		}
		.more{
			box-sizing: border-box;
			padding: 10rpx 18rpx;
			background:#A343FF;
			border-radius: 18rpx;
			font-size: 28rpx;
			color: #fff;
			display: flex;
			align-items: center;
			.icon{
				width: 32rpx;
				height: 32rpx;
				margin-right: 6rpx;
			}
		}
	}
	.recordlist-content{
		box-sizing: border-box;
		padding: 30rpx 0;
		border-radius:30rpx ;
		background: #fff;
		width: 100%;
		height: auto;
		.list-item{
			// box-shadow: 0rpx 10rpx 25rpx -8rpx rgba(41,41,41,0.1);
			border-radius: 15rpx;
			box-sizing: border-box;
			padding: 20rpx 40rpx;
			// color: ;
			
			// background-image:linear-gradient(75deg,#AF4DFF,#6327F6);
			width: 100%;
			height: 140rpx;
			display: flex;
			justify-content: space-between;
			flex-wrap: nowrap;
			.left-content{
				box-sizing: border-box;
				padding: 20rpx 0;
				width: 16%;
				.category-img{
					width: 72rpx;
					height: 72rpx;
				}
			}
			.right-content{
				box-sizing: border-box;

				box-sizing: border-box;
				padding-left: 5rpx;
				border-left: 2rpx solid rgb(230,210,240);
				width: 84%;
				display: flex;
				justify-content: space-between;
				.info{
					text-align: left;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					
					.text{
						margin-left:20rpx ;
						.category-text{
							box-sizing: border-box;
							padding-bottom:10rpx;
							font-size: 32rpx;
							// font-weight: bold;
							color:#1D1C5C;
							font-weight: bold;
						}
						.other-text{
							box-sizing: border-box;
							font-size: 26rpx;
							
							color: #C0C0C0	;
						}
					}
				}
				.num{

					text-align: right;
					.rmb{
						font-size: 38rpx;
						font-weight: bold;
					}
					.time{
						font-size: 24rpx;
						color: #A9A9A9	;
					}
					
				}
			}
		}
	}
}
</style>
