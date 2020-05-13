<template>
	<view class="goal-container">
		<my-bar :nav="setNav"></my-bar>
		<view class="goal-header">
			<image class="goal-bg-img" src="../../static/bg/bg-goal.png"></image>
		</view>
		<view class="goal-content">
			goal
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
					'navTitle':'目标' //导航标题
				},
			}
		},
		methods: {
			
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
		box-shadow:15rpx 15rpx 20rpx rgba(50,50,93,.1),5rpx 15rpx 20rpx rgba(0,0,0,.1);
		margin-top: -45rpx;
		z-index: 0;
		box-sizing: border-box;
		border-radius: 80rpx;

		background: #fff;
		padding: 30rpx;
		height: 800rpx;
	}
}
</style>
