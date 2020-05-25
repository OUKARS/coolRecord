<template>
	<view class="container">
		<my-bar :nav="setNav"></my-bar>
		<view class="data-header">
			<view class="text">
				{{nowdate}}
			</view>
			<view class="calendar-btn">
				<image class="search-img" src="../../static/icon/search.png"></image>
				 <view class="text" @tap="showDatePicker()">选择月份</view>
			</view>

		</view>
		
		<view class="rose-container">
			<view class="rose-card">
				<view class="rosetype-container">
					<button class="out-btn" type="default" :class="{active:selectRoseType==0}" @tap="chooseRoseType(0)">支出</button>
					<button class="in-btn" type="default" :class="{active:selectRoseType==1}" @tap="chooseRoseType(1)">收入</button>
				</view>
				<view v-if="roseChartData.length==0" class="nodata-container">
						<view class="img-container">
							<image class="nodata-img" src="../../static/bg/nodata2.png" mode=""></image>
						</view>
						<view class="text">
							本月没有数据哦~
						</view>
				</view>
				<view v-else class="rose-charts" >
					<canvas canvas-id="canvasPie" id="canvasPie" class="rose-chart" @touchstart="touchPie"></canvas>
				</view>
			</view>
		</view>
		<view class="line-container">
			<view class="line-card">
				
				<view v-if="!openpicker" class="line-charts" >
					<canvas canvas-id="canvasLineA" id="canvasLineA" class="line-chart"  @touchstart="touchLineA" @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
				</view>
			</view>
		</view>
		<tabbar currentPage="data" /> 
		<view class="calendar-content">
		         <w-picker
		                        mode="date" 
		                        startYear="2019" 
		                        endYear="2029"
		                        :value=nowdate
		                        :current="true"
		                        fields="month"
		                        @confirm="onConfirm($event,'date')"
		                        @cancel="onCancel"
		                        :disabled-after="false"
		                        ref="date" 
		                    ></w-picker>   
		</view>
	</view>
</template>

<script>
	import tabbar from '../../components/tabbar/tabbar'
	import wPicker from "../../components/w-picker/w-picker.vue";
	import uCharts from '../../common/u-charts/u-charts.js';
	var _self;
	var canvaPie=null;
	var canvaLineA=null;
	export default {
		components:{
			tabbar,
			wPicker
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
				nowdate:'',
				cWidth:'',
				cHeight:'',
				lineWidth:'',
				lineHeight:'',
				pixelRatio:1,
				selectRoseType:0,
				roseChartData:{},
				lineChartData:{},
				openpicker:false,

			}
		},
		methods: {
			onConfirm(event,type){
				wx.vibrateShort()
				this.nowdate = event.value
				let date = event.value+'-01'
				this.fetchRoseData(this.selectRoseType,date)
				this.fetchLineData(date)
				this.openpicker = false
			},
			onCancel(){
				this.openpicker = false
				_self.showLineA("canvasLineA",this.lineChartData);
			},
			showDatePicker(){
				this.openpicker = true
				this.$refs.date.show()
			},
			completeDate(value) {
			        return value < 10 ? "0"+value:value;
			},
			getNowFormatDay(nowDate){
				var char = "-";
				if(nowDate == null){
					nowDate = new Date();
				}
				var month = nowDate.getMonth() + 1;//注意月份需要+1
				var year = nowDate.getFullYear();
				var time =  year + char + this.completeDate(month) 
				return time
			},
			async fetchRoseData(type,date){
	
				const res = await this.$api.fetchRoseData(type,1,date)
				if(res.data){
					this.roseChartData = res.data
					_self.showPie("canvasPie",this.roseChartData);
				}
			},
			async fetchLineData(date){
				const res = await this.$api.fetchLineData(0,date)
				if(res.data){
					this.lineChartData = res.data
					_self.showLineA("canvasLineA",this.lineChartData);
				}
				
			},
			chooseRoseType(kind){
				this.selectRoseType = kind
				let date = this.nowdate+'-01'
				this.fetchRoseData(kind,date)
			},
			showPie(canvasId,chartData){
							canvaPie=new uCharts({
								$this:_self,
								canvasId: canvasId,
								type: 'pie',
								fontSize:12,
								legend:{show:true},
								background:'#FFFFFF',
								pixelRatio:_self.pixelRatio,
								series: chartData,
								animation: true,
								width: _self.cWidth*_self.pixelRatio,
								height: _self.cHeight*_self.pixelRatio,
								dataLabel: true,
								extra: {
										pie: {
										  labelWidth:12
										}
									},
							});
						},
			touchPie(e){
							
				canvaLineA.showToolTip(e, {
								format: function (item) {
									return item.name + ':' + item.data 
								}
							});
			},
			showLineA(canvasId,chartData){
							canvaLineA=new uCharts({
								$this:_self,
								canvasId: canvasId,
								type: 'line',
								fontSize:12,
								legend:{show:true},
								dataLabel:false,
								dataPointShape:true,
								background:'#FFFFFF',
								pixelRatio:_self.pixelRatio,
								categories: chartData.categories,
								series: chartData.series,
								animation: true,
								enableScroll: true, 
								xAxis: {
									type:'grid',
									gridColor:'#CCCCCC',
									gridType:'dash',
									dashLength:8,
									itemCount: 10,
									scrollColor:'#A7A7F9',
									scrollShow: true,
									scrollAlign: 'left',
									disableGrid:true,
								},
								yAxis: {
									gridType:'dash',
									gridColor:'#CCCCCC',
									dashLength:8,
									splitNumber:10,
									min:0,
									max:chartData.maxData,
									format:(val)=>{return val.toFixed(2)}
	
								},
								width: _self.lineWidth*_self.pixelRatio,
								height: _self.lineHeight*_self.pixelRatio,
								extra: {
									line:{
										type: 'straight'
									}
								}
							});
							
						},
			 touchLineA(e) {
			    canvaLineA.scrollStart(e);
				console.log("start")
			  },
			  moveLineA(e) {
			    canvaLineA.scroll(e);
				console.log("move")
			  },
			  touchEndLineA(e) {
				  console.log("end")
			    canvaLineA.scrollEnd(e);
			    // 下面是toolTip事件，如果滚动后不需要显示，可不填写
			    canvaLineA.showToolTip(e, {
			      format(item, category) {
			        return `${category} ${item.name}:${item.data}`
			      },
			    });
			  },
		},
		onLoad() {
			_self = this;
			_self.cWidth=uni.upx2px(660);
			_self.cHeight=uni.upx2px(500);
			_self.lineWidth=uni.upx2px(650);			_self.lineHeight=uni.upx2px(500);
			var nowDate = new Date();
			var today = this.getNowFormatDay(nowDate)
			this.nowdate = today
			today = today+'-01'
			this.fetchRoseData(0,today)
			this.fetchLineData(today)
		}
	}
</script>

<style lang="scss">
.container{
	background: linear-gradient(0deg, #5153F6 0%, #4A34D5 100%);
	box-sizing: border-box;
	padding-bottom: 80rpx;
	min-height: 100vh;
	.data-header{
		width: 90%;
		margin: 0 auto;
		box-sizing: border-box;
		padding: 20rpx 0rpx;
		display: flex;
		justify-content: space-between;
		vertical-align: middle;
		font-size: 36rpx;
		.text{
			box-sizing: border-box;
			padding: 10rpx 20rpx;
			color: #fff;
			font-weight: bold;
			vertical-align: middle;
		}
		.calendar-btn{
			font-size: 32rpx;
			border-radius: 24rpx;
			box-sizing: border-box;
			
			color: #DCDCDC;
			background: #4331C1;
			font-weight: bold;
			display: flex;
			justify-content: center;
			vertical-align: middle;
			.search-img{
				margin-top: 4rpx;
				padding: 10rpx 5rpx 10rpx 20rpx;
				vertical-align: middle;
				width: 36rpx;
				height: 36rpx;
			}
			.text{
				padding: 10rpx 20rpx 10rpx 5rpx;
				vertical-align: middle;
				margin-left: 2rpx;
			}
		}
	}
	.rose-container{
		box-sizing: border-box;
		padding: 10rpx 0 30rpx;
		
		height: auto;
		width: 90%;
		margin: 0 auto;
		.rose-card{
			background: #fff;
			box-shadow:15rpx 15rpx 20rpx rgba(50,50,93,.1),5rpx 15rpx 20rpx rgba(0,0,0,.1);
			box-sizing: border-box;
			border-radius: 28rpx;
			padding: 24rpx 0rpx 8rpx;
			height: auto;
			min-height: 500rpx;
			.nodata-container{
				margin-top: 120rpx;
				width: 100%;
				text-align: center;
				.img-container{
					width: 120rpx;
					height: 95rpx;
					margin:10rpx auto;
					.nodata-img{
						width: 120rpx;
						height: 95rpx;
					}
				}
				.text{
					color: #BABABA;
				}
			}
			.rosetype-container{
				display: flex;
				width: 34%;
				margin:8rpx auto 10rpx;
				justify-content: center;
				.out-btn{
					box-shadow:0rpx 5rpx 6rpx rgba(41,41,41,.06);
					border:none;
					border-top-right-radius: 0;
					border-bottom-right-radius: 0;
					border-top-left-radius: 32rpx;
					border-bottom-left-radius: 32rpx;
					marin:0;
					width: 100%;
					line-height: 54rpx;
					height: 54rpx;
					font-size: 22rpx;
					background: #f6f6f6;
					color:#6327F6 ;
				}
				.in-btn{
					box-shadow:0rpx 5rpx 6rpx rgba(41,41,41,.06);
					border:none;
					border-top-left-radius: 0;
					border-bottom-left-radius: 0;
					border-top-right-radius: 32rpx;
					border-bottom-right-radius: 32rpx;
					marin:0;
					width: 100%;
					line-height: 54rpx;
					height: 54rpx;
					font-size: 22rpx;
					background: #f6f6f6;
					color:#6327F6 ;
				}
				.active{
					transition: all .4s;
					background: linear-gradient(90deg, #5153F6 0%, #4A34D5 100%);
					color: #fff;
				}
			}
			.rose-charts{
				width: 660rpx; height:500rpx;background-color: #FFFFFF;
				margin:0 auto;
				.rose-chart{
					margin:0 auto;
					width: 660rpx; height:500rpx;background-color: #FFFFFF;
					}
			}
			
		}
	}
	.line-container{
		height: auto;
		width: 90%;
		box-sizing: border-box;
		padding: 0 0 10rpx;
		margin: 48rpx auto;
		.line-card{
			background: #fff;
			box-shadow:15rpx 15rpx 20rpx rgba(50,50,93,.1),5rpx 15rpx 20rpx rgba(0,0,0,.1);
			box-sizing: border-box;
			border-radius: 28rpx;
			padding: 32rpx 5rpx 4rpx;
			height: auto;
			min-height: 500rpx;
			.line-charts{
				width: 650rpx; height:500rpx;background-color: #FFFFFF;
				margin:0 auto;
				.line-chart{
					margin:0 auto;
					width: 650rpx; height:500rpx;background-color: #FFFFFF;
					}
			}
			
		}
	}
}
</style>
