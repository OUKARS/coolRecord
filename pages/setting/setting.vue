<template>
	<view class="setting-container">
		<my-bar class="setting-nav" :nav="setNav"></my-bar>
		<view class="swiper">
			<set-swiper ref="setswiper" :swiperList="swiperList" style="width:100%" fullScreen="true"></set-swiper>
		</view>
	</view>
</template>

<script>
	import setSwiper from '@/components/setting-swiper/setting-swiper.vue'
	export default {
		components:{
			setSwiper
		},
		data() {
			return {
				setNav:{
					'color':'red',  //字体颜色
					'isdisPlayNavTitle':true, //是否显示返回按钮，由于导航栏是共用的，把所有的东西封装好，
					'navTitle':'更多' //导航标题
				},
				swiperList: [{name:'export'},{name:'gesture'},{name:'bug'},{name:'about'}]
			}
		},
		onShow() {
			// this.$refs.setswiper.fetchGesture()
		},
		
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.setting-container{
		background: linear-gradient(0deg, #5153F6 0%, #4A34D5 100%);
		min-height: 100vh;
		position: relative;
		.setting-nav{
			top:0;
			left:0;
			position: absolute;
		}
	}
</style>
