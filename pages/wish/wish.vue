<template>
	<view class="wish-container">
		<my-bar :nav="setNav"></my-bar>
		<view class="wish-header">
			第一愿望
		</view>
		<view class="wrapper">
			<view class="wish-content first-container">
				
				<view class="wish-card card-active">
					<view class="title">
						买一个吉他
					</view>
					<view class="money">
						<text>143/200</text>（已存金额/目标金额）
					</view>
					<view class="line">
						<view class="current">
							
						</view>
					</view>
				</view>
			</view>
			<view class="wish-content second-container">

				<view class="wish-card">
					
				</view>
			</view>
			<view class="wish-content third-container">

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
					'navTitle':'本月愿望单' //导航标题
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
	.wish-header{
		color: #fff;
		font-size: 36rpx;
		text-align: center;
		margin: 40rpx 0 20rpx;
		font-weight: bold;
		
	}
	.wrapper{
		width: 90%;
		margin: 30rpx auto 20rpx;
		.wish-content{
			margin: 40rpx 0;
			.wish-card{
				box-sizing: border-box;
				padding: 40rpx;
				border: 6rpx dashed #fff;
				// background: #fff;
				border-radius: 28rpx;
				height: 300rpx;
				width: 100%;
				.title{
					margin: 10rpx 0;
					font-size: 42rpx;
					font-weight: bold;
				}
			}
			.card-active{
				
				background: #fff;
				border: 0rpx;
				box-shadow:15rpx 15rpx 20rpx rgba(50,50,93,.1),5rpx 15rpx 20rpx rgba(0,0,0,.1);
			}
		}
		
	}
}
</style>
