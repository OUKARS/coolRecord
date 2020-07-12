<template>
	<view class="container">
		<my-bar :nav="setNav"></my-bar>
		<view class="swiper-header">
			<image class="header-img" src="https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/bg/bg-index.png" mode=""></image>
			<view class="daily header animated fadeInLeft delay-08s" :class="{headerctive:current==0}" @tap="swipeToIndex0()">
				今日
				<view v-if="current==0" class="percentage" :style="{color:dailychartData.series[0].color}">
					{{Math.round(dailychartData.series[0].data*100)+'%'}}
				</view>
				
			</view>
			<view class="weekly header animated fadeInDown delay-1s" :class="{headerctive:current==1}"  @tap="swipeToIndex1()">
				本周
				<view v-if="current==1" class="percentage" :style="{color:weeklychartData.series[0].color}">
					{{Math.round(weeklychartData.series[0].data*100)+'%'}}
				</view>
			</view>
			<view class="monthly header animated fadeInRight delay-08s" :class="{headerctive:current==2}"  @tap="swipeToIndex2()">
				本月
				<view v-if="current==2" class="percentage" :style="{color:monthlychartData.series[0].color}">
					{{Math.round(monthlychartData.series[0].data*100)+'%'}}
				</view>
			</view>
		</view>	
		<view class="arcbar-container">
			<canvas  canvas-id="canvasArcbar1" id="canvasArcbar1" class="charts-arcbar"></canvas>
		</view>
		<view class="info-container">
			<view class="income">
				{{current===0?'今日':current===1?'本周':'本月'}}收入
				<view v-if="current==0" class="num">
					￥{{dailychartData.income}}
				</view>
				<view v-else-if="current==1" class="num">
					￥{{weeklychartData.income}}
				</view>
				<view v-else class="num">
					￥{{monthlychartData.income}}
				</view>
				
			</view>
			<view class="deposit">
				{{current===0?'今日':current===1?'本周':'本月'}}存款
				<view v-if="current==0" class="num">
					￥{{dailychartData.deposit}}
				</view>
				<view v-else-if="current==1" class="num">
					￥{{weeklychartData.deposit}}
				</view>
				<view v-else class="num">
					￥{{monthlychartData.deposit}}
				</view>
			</view>
		</view>
		<view class="budget-container">
			<view class="budget-text">
				{{current===0?'今日':current===1?'本周':'本月'}}支出预算
			</view>	
			<view class="max-num">
				<!-- <image class="rmb-img" src="../../static/icon/rmb.png" mode=""></image> -->
				￥{{current===0?dailychartData.dailyBudget:(current===1?weeklychartData.weeklyBudget:monthlychartData.monthBudget)}}
			</view>
		</view>
		<view class="content">
			<recordlist @updateInfo="updateInfo" ref="indexlist"/>
		</view>
		<tabbar currentPage="home"/> 
		<!-- <onloading v-if="isloading"/> -->
	</view>
</template>

<script>
	import newRecord from '../../components/newrecord/newrecord.vue'
	import tabbar from '../../components/tabbar/tabbar'
	import recordlist from '../../components/recordlist/recordlist'
	import uCharts from '../../common/u-charts/u-charts.js';
	import onloading from '../../components/loading/loading.vue'
	import {formatDate } from '../../utils/date.js'
	var _self;
	import {
	        mapActions,
	        mapState,
	    } from 'vuex'
	export default {
		components:{
			newRecord,
			recordlist,
			tabbar,
			onloading
			// roundChart
		},
		computed: mapState(['token']),  
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
				firstLoad:true,
				isloading:false,
				dailychartData: {
					income:0,
					dailyBudget:0,
					deposit:0,
					series: [{
						name: '今日支出',
						data: 0,
						color: '#1FFED5',
						num:0
					}]
				},
				weeklychartData: {
					income:0,
					weeklyBudget:0,
					deposit:0,
					series: [{
						name: '本周支出',
						data: 0,
						color: '#DCEA49',
						num:0
					}]
				},
				monthlychartData: {
					income:0,
					monthBudget:0,
					deposit:0,
					series: [{
						name: '本月支出',
						data: 0,
						color: 'red',
						num:0
					}]
				},
				
			}
		},
		onShow() {
			let token = this.token
			console.log("onshow",token)
			if(!this.firstLoad)
				this.fetchHomeChart()
			this.$refs.indexlist.refresh()
			
		},

		onBackPress(e){
			
		},
		onLoad() {
			
			_self = this;
			this.fetchHomeChart()
			this.cWidth3=uni.upx2px(480);//这里要与样式的宽高对应
			this.cHeight3=uni.upx2px(480);//这里要与样式的宽高对应
			this.arcbarWidth=uni.upx2px(56);
			
			
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
			updateInfo(){
				this.fetchHomeChart()
			},
			async fetchHomeChart(){
				this.isloading = true
				const res = await this.$api.fetchHomeChart()
				if(res.data){
					this.firstLoad=false
					if(res.data.dailychartData){
						this.dailychartData = res.data.dailychartData;
						this.dailychartData.series[0].name='今日支出'
						if(this.dailychartData.series[0].data<=0.1){this.dailychartData.series[0].color='#87CEFA'}
						else if(this.dailychartData.series[0].data<=0.5){this.dailychartData.series[0].color='#1FFED5'}
						else if(this.dailychartData.series[0].data<=0.8){this.dailychartData.series[0].color='#DCEA49'}
						else this.dailychartData.series[0].color='red'
					}
						
					if(res.data.weeklychartData){
						this.weeklychartData = res.data.weeklychartData;
						if(this.weeklychartData.series[0].data<=0.1){this.weeklychartData.series[0].color='#87CEFA'}
						else if(this.weeklychartData.series[0].data<=0.5){this.weeklychartData.series[0].color='#1FFED5'}
						else if(this.weeklychartData.series[0].data<=0.8){this.weeklychartData.series[0].color='#DCEA49'}
						else this.weeklychartData.series[0].color='red'
					}
					
					if(res.data.monthchartData){
						this.monthlychartData = res.data.monthchartData
						if(this.monthlychartData.series[0].data<=0.1){this.monthlychartData.series[0].color='#87CEFA'}
						else if(this.monthlychartData.series[0].data<=0.5){this.monthlychartData.series[0].color='#1FFED5'}
						else if(this.monthlychartData.series[0].data<=0.8){this.monthlychartData.series[0].color='#DCEA49'}
						else this.monthlychartData.series[0].color='red'
					}
					this.current =0;
					this.showArcbar("canvasArcbar1",this.dailychartData);
				}
				this.isloading = false
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
		position: relative;
		background: linear-gradient(0deg, #5153F6 0%, #4A34D5 100%);
		width: 100%;
		overflow:hidden;
		min-height: 100vh;
		.info-container{
			width: 80%;
			margin: 0 auto 24rpx;
			display: flex;
			font-weight: bold;
			font-size: 36rpx;
			justify-content: space-around;
			flex-wrap: wrap;
			color: #fff;
			.num{
				color:#FFE36C;
			}
			.income{
				display: flex;
				justify-content: flex-start;
			}
			.deposit{
				display: flex;
				justify-content: flex-start;
			}
		}
		.notice-container{

			text-align: center;
		}
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
		
		.swiper-header{
			transition: all 1s;
			-webkit-transition: all 1s;
			width: 80%;
			margin:60rpx auto 50rpx;
			height: 120rpx;
			color: #fff;
			font-weight: bold;
			position: relative;
			display: flex;
			justify-content: space-around;
			text-align: center;
			.header{
				height: 80rpx;
			}
			.percentage{
				margin-top: 8rpx;
				font-size: 25rpx;
			}
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
				top:-40rpx;
				position: absolute;
				opacity: 0.32;
			}

		}
		.headerctive{
			height: 120rpx !important;
			transition: all 1s;
			-webkit-transition: all 1s;
			box-shadow:15rpx 15rpx 20rpx rgba(50,50,93,.1),5rpx 15rpx 20rpx rgba(0,0,0,.1);
			background: #fff;
			color: #454356;
		}
		.budget-container{
			color: #fff;
			text-align: center;
			transition: all 1s;
			display: flex;
			justify-content: center;
			font-size: 32rpx;
			font-weight: bold;
			letter-spacing: 4rpx;
			vertical-align:middle;
			.budget-text{
				vertical-align:middle;
				line-height: 48rpx;
				height: 48rpx;
				font-size: 32rpx;
				margin-right: 4rpx;
			}
			.max-num{
				color: #FFE36C;
				vertical-align:middle;
				font-size: 32rpx;

				
				// height:48rpx;
				// line-height: 48rpx;
				
			}
		}
	
	}
	
	

</style>
