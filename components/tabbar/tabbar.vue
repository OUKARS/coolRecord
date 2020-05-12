<template>
  <view class="tabbar-container">
  	<view class="tabbar-content home-container">
  		<image class="tabbar-icon" :class="{active:currentPage==='home'}" v-bind:src="getImgUrl('home')"></image>
		
  	</view>
	<view class="tabbar-content add-container">
		<image class="tabbar-icon" :class="{active:currentPage==='add'}" v-bind:src="getImgUrl('add')"></image>

	</view>
	<view class="tabbar-content data-container">
		<image class="tabbar-icon" :class="{active:currentPage==='data'}" v-bind:src="getImgUrl('data')"></image>

	</view>
  </view>
</template>

<script>
export default {
	props:{
		"currentPage":{
			default:'home'
		}
		},
	data(){
		return{
		}
	},
	methods:{
		getImgUrl(icon){
			
			if(icon === this.currentPage)
				return require("../../static/icon/"+icon+"-active.png");
			else return require("../../static/icon/"+icon+".png");
		}
	}
}
</script>

<style lang="scss">
.tabbar-container{
	// background: pink;
	/* background: #5153F6; */
	/* box-shadow: 0px -10rpx 25rpx -8rpx rgba(41,41,41,0.08); */
	width: 60%;
	height: 150rpx;
	position: fixed;
	bottom: 0%;
	left:20%;
	display: flex;
	align-items: center;
	justify-content: space-around;
	.tabbar-content{
		.active{
			box-shadow: 0 10rpx 24rpx rgba(50,50,93,.24), 0 0.10rpx 20rpx rgba(0,0,0,.24);
			box-sizing: border-box;
			border:6rpx solid rgb(255,227,108);;
			background: rgb(255,227,108);
			width: 95rpx;
			height: 95rpx;
		}
	}
	.tabbar-icon{
		box-shadow: 0 10rpx 24rpx rgba(50,50,93,.15), 0 0.10rpx 16rpx rgba(0,0,0,.1);
		box-sizing: border-box;
		border:6rpx solid rgb(167,167,249);
		margin-bottom: 10rpx;
		background: #fff;
		padding: 14rpx;
		border-radius: 60rpx;
		display: block;
		width: 74rpx;
		height: 74rpx;
	}
}
</style>