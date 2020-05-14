<template>
	<view class="container">
		<my-bar :nav="setNav"></my-bar>
		<view class="data-content">
			data
		</view>
		
		<tabbar currentPage="data" /> 
	</view>
</template>

<script>
	import tabbar from '../../components/tabbar/tabbar'
	export default {
		components:{
			tabbar,
		},
		data() {
			return {
				setNav:{
					'color':'red',  //字体颜色
					'isdisPlayNavTitle':false, //是否显示返回按钮，由于导航栏是共用的，把所有的东西封装好，
					'isShowGoal':true,
					'isShowSetting':true,
					'navTitle':'' //导航标题
				},
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.container{
	background: linear-gradient(0deg, #5153F6 0%, #4A34D5 100%);
	min-height: 100vh;
	.data-content{
		height: 2000rpx;
	}
}
</style>
