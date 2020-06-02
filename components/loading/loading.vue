<template>
	<view class="load_more_box" >
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
	</view>
</template>

<script>
	const { windowWidth, windowHeight } = uni.getSystemInfoSync();	
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.load_more_box {
	box-shadow:15rpx 15rpx 20rpx rgba(50,50,93,.1),5rpx 15rpx 20rpx rgba(0,0,0,.1);
	box-sizing: border-box;
	border-radius: 40rpx;
	z-index: 9999;
	background: #fff;
	position: absolute;
	top:50%;
	left:50%;
	margin-top: -95rpx;
	margin-left: -125rpx;
	height:190rpx;
	width: 250rpx;
	line-height:190rpx;
	text-align:center;
}
.load_more_box span {
	width:7px;
	height:10px;
	margin:0 4px;
	display:inline-block;
	vertical-align:middle;
	background:#9b59b6;
	animation:load_more_box 1.5s  infinite ease-in-out;
}
.load_more_box span:nth-child(2) {
	animation-delay:.2s;
}
.load_more_box span:nth-child(3) {
	animation-delay:.4s;
}
.load_more_box span:nth-child(4) {
	animation-delay:.6s;
}
.load_more_box span:nth-child(5) {
	animation-delay:.8s;
}
@keyframes load_more_box {
	0% {
	height:10px;
	background:#9b59b6;
}
25% {
	height:60px;
	background:#0081ff;
}
50% {
	height:10px;
	background:#9b59b6;
}
100% {
	height:10px;
	background:#9b59b6;
}
}
</style>
