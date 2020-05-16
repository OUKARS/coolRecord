<template>
	<view class="container">
		<my-bar :nav="setNav"></my-bar>
		<view class="swiper-header">
			<image class="header-img" src="../../static/bg/bg-index.png" mode=""></image>
			<view class="daily animated fadeInLeft delay-08s" :class="{headerctive:current==0}" @tap="swipeToIndex0()">
				今日
			</view>
			<view class="weekly animated fadeInDown delay-1s" :class="{headerctive:current==1}"  @tap="swipeToIndex1()">
				本周
			</view>
			<view class="monthly animated fadeInRight delay-08s" :class="{headerctive:current==2}"  @tap="swipeToIndex2()">
				本月
			</view>
		</view>	
		<view class="arcbar-container">
			<canvas  canvas-id="canvasArcbar1" id="canvasArcbar1" class="charts-arcbar"></canvas>
		</view>
		<view class="budget-container">
			<view class="budget-text">
				{{current===0?'今日':current===1?'本周':'本月'}}预算
			</view>
			
			<view class="max-num">
				<!-- <image class="rmb-img" src="../../static/icon/rmb.png" mode=""></image> -->
				{{current===0?dailychartData.dailyBudget:current===1?weeklychartData.weeklyBudget:monthchartData.monthBudget}}
			</view>
			
			
		</view>
		<view class="content">
			<recordlist />
		</view>
		<tabbar currentPage="home"/> 
	</view>
</template>

<script>
	import newRecord from '../../components/newrecord/newrecord.vue'
	import tabbar from '../../components/tabbar/tabbar'
	import recordlist from '../../components/recordlist/recordlist'
	import uCharts from '../../common/u-charts/u-charts.js';
	var _self;

	export default {
		components:{
			newRecord,
			recordlist,
			tabbar,
			// roundChart
		},
		data() {
			return {
				title: '123',
				statusBarHeight:0,
				titleBarHeight:0,
				current:0,
				setNav:{
					'color':'red',  //字体颜色
					'isdisPlayNavTitle':false, //是否显示返回按钮，由于导航栏是共用的，把所有的东西封装好，
					'isShowGoal':true,
					'isShowSetting':true,
					'navTitle':'' //导航标题
				},
				cWidth3:'',//圆弧进度图
				cHeight3:'',//圆弧进度图
				arcbarWidth:'',//圆弧进度图，进度条宽度,此设置可使各端宽度一致
				pixelRatio:1,
				dailychartData: {
					series: [{
						max_num:123,
						name: '今日支出',
						data: .5,
						color: '#1FFED5',
						num:4213.13
					}]
				},
				weeklychartData: {
					max_num:12,
					series: [{
						name: '本周支出',
						data: .7,
						color: '#DCEA49',
						num:4
					}]
				},
				monthlychartData: {
					max_num:123,
					series: [{
						name: '本月支出',
						data: .9,
						color: 'red',
						num:4
					}]
				},
				
			}
		},
		onLoad() {
			this.fetchHomeChart()
			_self = this;
			this.cWidth3=uni.upx2px(480);//这里要与样式的宽高对应
			this.cHeight3=uni.upx2px(480);//这里要与样式的宽高对应
			this.arcbarWidth=uni.upx2px(56);
			this.showArcbar("canvasArcbar1",this.dailychartData);

		},
		created(){
		},
		onPageScroll:function(res){
			if(res.scrollTop>=50){
				this.setNav.isShowGoal=false;
				this.setNav.isShowSetting=false
			} else {
				this.setNav.isShowGoal=true;
				this.setNav.isShowSetting=true
			}
		 },
		 computed: {
		     device() {
		       return this.$store.state.app.device
		     },
			 token() {
			   return this.$store.state.user.token
			 },
		},
		methods: {
			async fetchHomeChart(){
				const res = await this.$api.fetchHomeChart()
				this.dailychartData = res.data.dailychartData
				this.weeklychartData = res.data.weeklychartData
				this.monthlychartData = res.data.monthchartData
				console.log(this.dailychartData)
				console.log(this.weeklychartData)
				console.log(this.monthlychartData)
			},
			swipeToIndex0(){
				this.showArcbar("canvasArcbar1",this.dailychartData);
				this.current = 0;

			},
			swipeToIndex1(){
				this.showArcbar("canvasArcbar1",this.weeklychartData);
				this.current = 1;
			},
			swipeToIndex2(){
				this.showArcbar("canvasArcbar1",this.monthlychartData);
				this.current = 2;
			
			},
			showArcbar(canvasId,chartData){
							var canvaArcbar=new uCharts({
								$this:_self,
								canvasId: canvasId,
								type: 'arcbar',
								customtype:'index-arcbar',
								device:this.device,
								fontSize:11,
								legend:{show:false},
								backgroundColor:'#383289',
								pixelRatio:_self.pixelRatio,
								series: chartData.series,
								animation: true,
								duration:800,
								width: _self.cWidth3*_self.pixelRatio,
								height: _self.cHeight3*_self.pixelRatio,
								dataLabel: true,
								title: {
									name: Math.round(chartData.series[0].data*100)+'%',//这里我自动计算了，您可以直接给任意字符串
									color: chartData.series[0].color,
									fontSize: 25*_self.pixelRatio
								},
								subtitle: {
									name: chartData.series[0].name,//这里您可以直接给任意字符串
									color: '#fff',
									fontSize: 15*_self.pixelRatio
								},
								extra: {
									arcbar:{
										type:'circle',//整圆类型进度条图
										width: _self.arcbarWidth*_self.pixelRatio,//圆弧的宽度
										startAngle:0.5//整圆类型只需配置起始角度即可
									}
								}
							});		
						}
		}
	}
</script>

<style lang="scss">
	.container{
		background: linear-gradient(0deg, #5153F6 0%, #4A34D5 100%);
	
		min-height: 100vh;
		.arcbar-container{
			height: auto;
			margin:0 auto;
			margin-bottom: 50rpx;
			width: 480rpx;
			height: 480rpx;
			background:transparent;
					.charts-arcbar{
						position: absolute;
						width: 480rpx;
						height: 480rpx;
						background-color: transparent;
					}
		}
		.content {
			box-sizing: border-box;
			width: 100%;
			height: auto;
			padding:10rpx 50rpx;
			margin: 0 auto;	
			
		}
		.headerctive{
			transition: all 1s;
			-webkit-transition: all 1s;
			box-shadow:15rpx 15rpx 20rpx rgba(50,50,93,.1),5rpx 15rpx 20rpx rgba(0,0,0,.1);
			background: #fff;
			color: #454356;
		}
		.swiper-header{
			transition: all 1s;
			-webkit-transition: all 1s;
			width: 80%;
			margin:60rpx auto 50rpx;
			color: #fff;
			font-weight: bold;
			position: relative;
			display: flex;
			justify-content: space-around;
			.daily{
				box-sizing: border-box;
				padding: 16rpx 32rpx;
				border-radius: 40rpx;
			}
			.weekly{
				box-sizing: border-box;
				padding: 16rpx 32rpx;
				border-radius: 40rpx;
			}
			.monthly{
				box-sizing: border-box;
				padding: 16rpx 32rpx;
				border-radius: 40rpx;
			}
			.header-img{
				top:-50rpx;
				position: absolute;
				opacity: 0.3;
			}

		}
		.budget-container{
			color: #fff;
			text-align: center;
			transition: all 1s;
			display: flex;
			justify-content: center;
			font-size: 36rpx;
			font-weight: bold;
			letter-spacing: 4rpx;
			vertical-align:middle;
			.budget-text{
				line-height: 48rpx;
				height: 48rpx;
				font-size: 32rpx;
				margin-right: 4rpx;
			}
			.max-num{
				color: #FFE36C;
				vertical-align:middle;
				font-size: 36rpx;
				.rmb-img{
					vertical-align:top;
					width: 42rpx;
					height:42rpx;
				}
				
				// height:48rpx;
				// line-height: 48rpx;
				
			}
		}
	
	}
	
	

</style>
