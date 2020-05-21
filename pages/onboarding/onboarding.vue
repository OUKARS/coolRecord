<template>
	<view class="onboarding">
	  <view class="content" v-if="step === 1">
		<view class="cover-out">
		  <image
		src="https://6461-dandan-zdm86-1259814516.tcb.qcloud.la/onboarding-step1.png?sign=4e2d8ea34c16222d2b0054859f885db8&t=1573279740"
		class="cover"></image>
		</view>
		<view class="word">
		  <view class="title"><text class="bold">欢迎使用！</text></view>
		  <view class="description">酷记账带您轻松记录与规划收支</view>
		</view>
	  </view>
	  <view class="content" v-if="step === 2">
		<view class="cover-out">
		  <image
		src="https://6461-dandan-zdm86-1259814516.tcb.qcloud.la/onboarding-step2.png?sign=e19a6a9610d073286d09a6370face02d&t=1573280757"
		class="cover"></image>
		</view>
		<view class="word">
		  <view class="title"><text class="bold">保护用户数据，</text></view>
		  <view class="description">酷记账不获取、不使用、不保存用户私人信息</view>
		</view>
	  </view>
	  <view class="content" v-if="step === 3">
		<view class="cover-out">
		  <image
		src="https://6461-dandan-zdm86-1259814516.tcb.qcloud.la/onboarding-step3.gif?sign=442a38dc2b21158335b7e501bd2cc014&t=1573280924"
		class="cover"></image>
		</view>
		<view class="word">
		  <view class="title">简单易用。</view>
		  <view class="description">简单设置几步即可开始。</view>
		</view>
	  </view>
	  <view class="content" v-if="step === 4">
		<view class="cover-out">
		  <image
		src="https://6461-dandan-zdm86-1259814516.tcb.qcloud.la/onboarding-step4.png?sign=ad61b00244955a37e0be3651fc085b12&t=1573281400"
		class="cover"></image>
		</view>
		<view class="word">
		  <view class="title">详细数据。</view>
		  <view class="description">酷记账支持账单查询、数据统计、图表查看。</view>
		</view>
	  </view>
	  <view class="content" v-if="step === 5">
		<view class="cover-out">
		  <image
		src="https://6461-dandan-zdm86-1259814516.tcb.qcloud.la/onboarding-step5.gif?sign=82f4c43ca1ac954fe3ea42b61c97232c&t=1573281920"
		class="cover"></image>
		</view>
		<view class="word">
		  <view class="title">目标设置。</view>
		  <view class="description">设置每月支出目标与存款目标，规划人生从理财开始。</view>
		</view>
	  </view>
	  <view class="content" v-if="step === 6">
		<view class="cover-out" style="background-color: #FFF6F7;">
		  <image
		src="https://images.vrm.cn/2019/08/29/pig.png" style="width: 212rpx;height: 212rpx;"></image>
		</view>
		<view class="word">
		  <view class="title"><text class="bold">一同开启…</text></view>
		  <view class="description">开启你的记账旅程吧。</view>
		</view>
	  </view>
	  <view class="navigator navigator-left">
		<view class="dot" :class="{dotactive:step === 1}"></view>
		<view class="dot" :class="{dotactive:step === 2}"></view>
		<view class="dot" :class="{dotactive:step === 3}"></view>
		<view class="dot" :class="{dotactive:step === 4}"></view>
		<view class="dot" :class="{dotactive:step === 5}"></view>
		<view class="dot" :class="{dotactive:step === 6}"></view>
	  </view>
	  <view class="navigator navigator-right" @tap="next()">
		{{step === 6 ? '开启' : '下一页'}}
	  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				step:1
			}
		},
		methods: {
			next(){
				if (this.step === 6) {
				      uni.redirectTo({
				        url: '/pages/index/index',
				      })
				      uni.setStorageSync('isOnboarding', 'v1.0.0')
				    } else {
				      uni.vibrateShort()
				      this.step++;
				    }
			}
		}
	}
</script>

<style>
	.navigator {
	  position: absolute;
	  bottom: 0;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  height: 180rpx;
	}
	.navigator-right {
	  background: #ff5b4c;
	  right: 0;
	  width: 45%;
	  border-radius: 75rpx 0 0;
	  color: #fff;
	  border-left: 16rpx solid #ffe0dc;
	  border-top: 16rpx solid #ffe0dc;
	  font-size: 32rpx;
	}
	.navigator-left {
	  width: 50%;
	}
	.dot {
	  width: 8rpx;
	  height: 8rpx;
	  background-color: #ccc;
	  margin-right: 21rpx;
	  border-radius: 50%;
	}
	.dotactive {
	  background-color: #1c1c1c;
	}
	.cover-out {
	  height: 600rpx;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}
	.cover {
	  width: 800rpx;
	  height: 600rpx;
	}
	.word {
	  margin: 20rpx 40rpx;
	}
	.title {
	  font-size: 70rpx;
	  margin-bottom: 40rpx;
	}
	.description {
	  color: #1c1c1c;
	  font-size: 40rpx;
	}
	.bold {
	  font-weight: bold;
	}
</style>
