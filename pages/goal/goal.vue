<template>
	<view>
		<my-bar :nav="setNav"></my-bar>
		goal
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

<style>

</style>
