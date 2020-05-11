<template>
	<view>
		<view class="header" :style="{'height':titleBarHeight,'padding-top':statusBarHeight}">
			<text class="iconfont leftArrow header-back weight"   :style="{'border':nav.color}" v-if="nav.isdisPlayNavTitle" @click="back"></text>
			<view class="goal-container animated fadeInDown slow"  v-if="nav.isShowGoal" @tap="jumpToGoal()">
				<image class="iconimg icon-goal" :style="{'width':iconimg,'height':iconimg}" src="../../static/icon/goal.png"></image>

			</view>
			<view class="setting-container animated fadeInDown slow"  v-if="nav.isShowSetting"  @tap="jumpToSetting()">
				<image class="iconimg icon-setting" :style="{'width':iconimg,'height':iconimg}" src="../../static/icon/setting.png"></image>

			</view>
			
			<view class="header-title weight">{{nav.navTitle}}</view>
		</view>
		<view  :style="{'height':titleBarHeight,'padding-top':statusBarHeight}"></view>
	</view>
</template>
<script>
	export default {
		props:{
			"nav":{
				isShowGoal:{default:false},
				isShowSetting:{default:false},
			}
			},
		data() {
			return {
				statusBarHeight: 0, 
				titleBarHeight: 0, 
				iconimg:'44rpx',
			}
		},
		created() {
			var  that = this;
			 	uni.getSystemInfo({
			 		success: function(res) {
			 			if (res.model.indexOf('iPhone') !== -1) {
							that.titleBarHeight = 44 + 'px';
			 			} else {
			 				that.titleBarHeight = 48  + 'px';
						}
							that.statusBarHeight = res.statusBarHeight  + 'px'
					},
						
			 	})
		 },
		methods: {
			 // 回到上一页
			 back: function(){
				 uni.navigateBack({
				 	delta:1
				 })
			 },
			 jumpToGoal(){
			 
			 	uni.navigateTo({
			 	    url: '../goal/goal'
			 	});
			 },
			 jumpToSetting(){
			 
			 	uni.navigateTo({
			 	    url: '../setting/setting'
			 	});
			 }
		}
	}
</script>

<style lang="scss">
	
	.header {
        font-family:"Microsoft YaHei";
		display: flex;
        margin:0 20rpx;
		align-items: center;
		top: 0;
		position: fixed;
		width: 100%;
		z-index: 100;
		/* left:5%; */
	}
	
	.header .header-title {
        font-weight: bold;
        
		/* position: absolute;
		left: 10%; */
		font-size: 38rpx;
		/* transform: translateX(-50%); */
	}
	.header-back{
		margin-right:6rpx ;
		// position: absolute;
		/* left:15upx; */
		font-size:30upx;
		padding: 12upx;
		border-radius: 50%;
	}
	.goal-container{
		box-sizing: border-box;
		padding: 8rpx 8rpx;
		border-radius: 16px;
		color: rgba(255,255,255,0.08);
		display: flex;
		justify-content: space-around;
		margin-right: 10rpx;
		.iconimg{
			margin-right: 4rpx;
			width: 56rpx !important;
			height: 56rpx !important;
		}

	}
	.setting-container{
		box-sizing: border-box;
		padding: 8rpx 8rpx;
		border-radius: 16px;
		color: rgba(255,255,255,0.08);
		display: flex;
		justify-content: space-around;
		margin-right: 10rpx;
		.iconimg{
			margin-right: 4rpx;
			width: 56rpx !important;
			height: 56rpx !important;
		}
	}
</style>
