<template>
	<view>
		<my-bar :nav="setNav"></my-bar>
		<view class="record-container">
			record
		</view>
	</view>
</template>

<script>
	import bar from '../../components/bar/bar';
	export default {
		components:{

		},
		data() {
			return {
				setNav:{
					'color':'red',  //字体颜色
					'isdisPlayNavTitle':true, //是否显示返回按钮，由于导航栏是共用的，把所有的东西封装好，
					// 然后有些页面不需要的东西通过条件控制进行显示与隐藏
					'navTitle':'添加账单' //导航标题
				}
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
