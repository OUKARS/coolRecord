<template>
	<view class="container">
		<my-bar :nav="setNav"></my-bar>
		<view class="content">
			<indexSwiper />
			<homeSwiper :swiper-list="swiperList" />
			<menulist />
			<!-- <recordlist /> -->
			<tabbar /> 

		</view>
	</view>
</template>

<script>
	import homeSwiper from '../../components/homeswiper/swiper'
	import indexSwiper from '../../components/index-swiper/index-swiper.vue'
	import newRecord from '../../components/newrecord/newrecord.vue'
	import menulist from '../../components/menulist/menulist'
	import tabbar from '../../components/tabbar/tabbar'
	import recordlist from '../../components/recordlist/recordlist'
	export default {
		components:{
			indexSwiper,
			homeSwiper,
			newRecord,
			menulist,
			recordlist,
			tabbar
		},
		data() {
			return {
				title: '123',
				statusBarHeight:0,
				titleBarHeight:0,
				setNav:{
					'color':'red',  //字体颜色
					'isdisPlayNavTitle':false, //是否显示返回按钮，由于导航栏是共用的，把所有的东西封装好，
					'isShowGoal':true,
					'isShowSetting':true,
					'navTitle':'' //导航标题
				},
				swiperList: [{
                    type: 'image',
                    url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
                }, {
                    type: 'image',
                    url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
                }, {
                    type: 'image',
                    url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
                }]
			}
		},
		onLoad() {

		},
		created(){
			var  that = this;
			 	uni.getSystemInfo({
			 		success: function(res) {
			 			if (res.model.indexOf('iPhone') !== -1) {
							console.log(res)
							that.titleBarHeight = 44 + 'px';
			 			} else {
			 				that.titleBarHeight = 48  + 'px';
						}
							that.statusBarHeight = res.statusBarHeight  + 'px'
					},
						
			 	})
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.container{
		background: linear-gradient(0deg, #5153F6 0%, #4A34D5 100%);
	
		min-height: 100vh;
		.content {
			box-sizing: border-box;
			width: 100%;
			height: auto;
			padding:10rpx 50rpx;
			margin: 0 auto;
		}
	
	}
	
	

</style>
