<template>
	<view>
		 <swiper class="swiper" :indicator-dots="indicatorDots" :current="2" :interval="interval" :duration="duration">
		                        <swiper-item>
		                            <view class="swiper-item uni-bg-red">A</view>
		                        </swiper-item>
		                        <swiper-item>
		                            <view class="swiper-item uni-bg-green">B</view>
		                        </swiper-item>
		                        <swiper-item>
		                            <view class="swiper-item uni-bg-blue">C</view>
		                        </swiper-item>
		                    </swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				            indicatorDots: true,
				            autoplay: true,
				            interval: 2000,
				            duration: 500
			};
		}
	}
</script>

<style lang="scss">

</style>
