<template>
	<view class="wish-container">
		<my-bar :nav="setNav"></my-bar>
		<view class="wrapper">
			<view class="wish-content first-container">
				<view class="wish-header">
					第一愿望
				</view>
				<view class="wish-card">
					
				</view>
			</view>
			<view class="wish-content second-container">
				<view class="wish-header">
					第二愿望
				</view>
				<view class="wish-card">
					
				</view>
			</view>
			<view class="wish-content third-container">
				<view class="wish-header">
					第三愿望
				</view>
				<view class="wish-card">
					
				</view>
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
					'navTitle':'愿望单' //导航标题
				},
			};
		}
	}
</script>

<style lang="scss">
.wish-container{
	background: linear-gradient(0deg, #5153F6 0%, #4A34D5 100%);
	box-sizing: border-box;
	padding-bottom: 80rpx;
	min-height: 100vh;
	.wrapper{
		width: 90%;
		margin: 30rpx auto 20rpx;
		.wish-content{
			.wish-header{
				color: #fff;
				font-size: 36rpx;
				text-align: center;
				margin: 40rpx 0 20rpx;
				font-weight: bold;
			}
			.wish-card{
				background: #fff;
				border-radius: 28rpx;
				height: 300rpx;
				width: 100%;
			}
		}
		
	}
}
</style>
