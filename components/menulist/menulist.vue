<template>
  <view class="menulist-container ">
	<view class="list-header">
		<view class="hello-title animated fadeInLeft delay-1s">
			<image class="icon" src="../../static/icon/index-entrance.png" mode=""></image>
			<view class="text">
				便捷入口
			</view>
	  	</view>
	</view>
  	<view class="list-content">
  		<view class="top-content">
  			<view class="list-item addrecord-container animated fadeInLeft delay-013s" @tap="jumpToAddRecord()" >
  				记一笔
  			</view>
			<view class="list-item data-container animated fadeInRight delay-013s" @tap="jumpToDataList()" >
  				统计
  			</view>
  		</view>
  	</view>
  </view>
</template>

<script>
export default {
	methods:{
		jumpToAddRecord(){

			uni.navigateTo({
			    url: '../record/record'
			});
		},
		jumpToDataList(){

			uni.navigateTo({
			    url: '../datalist/datalist'
			});
		}
	}
}
</script>

<style lang="scss">
.menulist-container{
	width: 100%;
	height: auto;
	box-sizing: border-box;
	.list-header{
		margin-bottom: 20rpx;
		.hello-title{
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
	}
	.list-content{
		width: 100%;
		color: #fff;
		margin:0 auto;
		font-weight: bold;
		.list-item {
			box-sizing: border-box;
			padding: 30rpx;
		}
		.top-content{
			box-sizing: border-box;
			// padding: 10rpx;
			margin:10rpx auto 0 ;
			width: 100%;
			height: auto;
			display: flex;
			justify-content: space-around;
			flex-wrap: nowrap;
			.addrecord-container{
				
				box-shadow:15rpx 15rpx 20rpx rgba(50,50,93,.1),5rpx 15rpx 20rpx rgba(0,0,0,.08);
				width: 60%;
				height: 210rpx;
				background: linear-gradient(60deg, #1AD6FD 0%, #1D62F0 100%);
				border-radius: 30rpx;
			}
			.data-container{
				box-shadow:15rpx 15rpx 20rpx rgba(50,50,93,.1),5rpx 15rpx 20rpx rgba(0,0,0,.08);
				width: 210rpx;
				height: 210rpx;
				background: linear-gradient(60deg, #FFC832 0%, #FD8A00 100%);
				border-radius: 30rpx;

			}
		}
	}
}
</style>