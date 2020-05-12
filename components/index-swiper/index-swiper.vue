<template>
	<view>
		 <swiper class="swiper" :indicator-dots="indicatorDots" :current="2" :interval="interval" :duration="duration">
		                        <swiper-item>
		                            <view class="qiun-charts3">
										A
		                            	
		                            </view>
		                        </swiper-item>
		                        <swiper-item>
									B
		                          
		                        </swiper-item>
		                        <swiper-item>
		                            C
									
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
				duration: 500,
				cWidth3:'',//圆弧进度图
				cHeight3:'',//圆弧进度图
				arcbarWidth:'',//圆弧进度图，进度条宽度,此设置可使各端宽度一致
				pixelRatio:1,
				chartData: {
					series: [{
						name: '正确率',
						data: 0.29,
						color: '#2fc25b'
					}]
				}
			};
		},
		onLoad() {

		},
		
	}
</script>

<style lang="scss">

</style>
