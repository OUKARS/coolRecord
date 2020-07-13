<template>
	<view class="container">
		<my-bar :nav="setNav"></my-bar>
		<view class="wrapper">
			<view class="page-header">
				<view class="header-item peopleinfo" :class="{active:activeName == 'info'}"  @tap="toIndex('info')">
					统计
				</view>
				<view class="header-item line" >
					|
				</view>
				<view class="header-item graph" :class="{active:activeName == 'graph'}" @tap="toIndex('graph')">
					图表
				</view>
			</view>
			<view class="graph-container" v-if="activeName == 'graph'">
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
			<view class="info-container" v-if="activeName == 'info'">
				<view class="info-card animated fadeInUp">
					<view class="info-header">
						<text class="title">本月实时日报</text>
						<text class="tip">截止至7月10日</text>
					</view>
					<view class="overview-container">
						<view class="left">
							
							<view class="daynum-content">
								您记录了<br /><text class="overview-text">5</text>天，
							</view>
							<view class="recordnum-content">
								记录了<br /><text class="overview-text">5</text>笔账单
							</view>
							
						</view>
						<view class="right">
							<image class="summary-img" src="https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/bg/summary-bg.png?x-oss-process=style/blog_img" mode=""></image>
						</view>
					</view>
				</view>
				<view class="over-card animated fadeInUp .delay-08s">
					<view class="over-header">
						<text class="title">本月达标情况</text>
						<text class="tip">截止至7月10日</text>
					</view>
					<view class="over-container">
						<view class="right">
							<image class="summary-img" src="https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/bg/over-bg.png?x-oss-process=style/blog_img" mode=""></image>
						</view>
						<view class="left">
							
							<view class="daynum-content">
								您在实际支出上<br />超出预算天数<br /><text class="over-text">5</text>天
							</view>
							<view class="recordnum-content">
								超出预算周数<br /><text class="over-text">5</text>周
							</view>
							
						</view>
					</view>
				</view>
				<view class="max-card animated fadeInUp delay-012s">
					<view class="max-header">
						<text class="title">本月最大支出</text>
						<text class="tip">截止至7月10日</text>
					</view>
					<view class="max-container">
						<view class="max-item">
							<view class="left-content">
								<image class="category-img" :src="maxpayItem.categoryImgUrl" mode=""></image>
							</view>
							<view class="right-content">
								<view class="info">
									<view class="text">
										<view class="category-text">
											{{maxpayItem.categoryName}}
										</view>
										<view class="other-text">
											{{maxpayItem.remark}}
										</view>
									</view>
								</view>
								<view class="num">
									<view v-if="maxpayItem.type==0" class="rmb" style="color:red">
										-{{maxpayItem.money}}
									</view>
									<view v-else class="rmb">
										+{{maxpayItem.money}}
									</view>
									<view class="time">
										{{maxpayItem.date}}
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="max-header">
						<text class="title">本月最大收入</text>
					</view>
					<view class="max-container">
						<view class="max-item">
							<view class="left-content">
								<image class="category-img" :src="maxpayItem.categoryImgUrl" mode=""></image>
							</view>
							<view class="right-content">
								<view class="info">
									<view class="text">
										<view class="category-text">
											{{maxpayItem.categoryName}}
										</view>
										<view class="other-text">
											{{maxpayItem.remark}}
										</view>
									</view>
								</view>
								<view class="num">
									<view v-if="maxpayItem.type==0" class="rmb" style="color:red">
										-{{maxpayItem.money}}
									</view>
									<view v-else class="rmb">
										+{{maxpayItem.money}}
									</view>
									<view class="time">
										{{maxpayItem.date}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<tabbar currentPage="data" /> 
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
				activeName:'info',
				firstLoad:true,
				maxpayItem:{
				  "orderId": 1,
				  "categoryId": 1,
				  "categoryName":"早餐",
				  "categoryImgUrl":'https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/icon/01eat.png?x-oss-process=style/blog_img',
				  "type": 0,
				  "date": "2020-05-10",
				  "remark": "暂无备注",
				  "money":2
				},

			}
		},
		methods: {
			toIndex(indexName){
				this.activeName = indexName
				if(indexName == 'graph'){
					this.showPie("canvasPie",this.roseChartData);
					this.showLineA("canvasLineA",this.lineChartData);
				}
			},
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
					// _self.showPie("canvasPie",this.roseChartData);
				}
			},
			async fetchLineData(date){
				const res = await this.$api.fetchLineData(0,date)
				if(res.data){
					this.lineChartData = res.data
					// _self.showLineA("canvasLineA",this.lineChartData);
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
		onShow() {
		},
		onLoad() {
			let gesture = this.$store.state.app.device
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
	.wrapper{
		margin-top: 10rpx;
		.page-header{
			display: flex;
			justify-content: center;
			color: white;
			font-weight: bold;
			font-size: 36rpx;
			transition: all 1s;
			-webkit-transition: all 1s;
			.header-item{
				box-sizing: border-box;
				padding: 12rpx 20rpx;
				border-radius: 16rpx;
			}
			.line{
				margin: 0 10rpx;
			}
			.active{
				background: white;
				color: black;
			}
		}
		.graph-container{
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
							border-top-left-radius: 24rpx;
							border-bottom-left-radius: 24rpx;
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
							border-top-right-radius: 24rpx;
							border-bottom-right-radius: 24rpx;
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
		.info-container{
			box-sizing: border-box;
			padding: 30rpx 0;
			
			height: auto;
			width: 90%;
			margin: 32rpx auto;
			.info-card{
				background: #fff;
				box-shadow:15rpx 15rpx 20rpx rgba(50,50,93,.1),5rpx 15rpx 20rpx rgba(0,0,0,.1);
				box-sizing: border-box;
				border-radius: 28rpx;
				padding: 32rpx;
				height: auto;
				// min-height: 500rpx;
				.info-header{
					margin: 10rpx 0 20rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.title{
						font-size: 38rpx;
						font-weight: bold;
					}
					.tip{
						font-size: 26rpx;
						color: #808080;
					}
					
				}

				.overview-container{
					display: flex;
					justify-content: space-between;
					align-items: center;
					.left{
						width: 40%;
						color: #757575;
						.daynum-container{
							margin: 10rpx 0;
						}
						.recordnum-content{
							margin: 10rpx 0;
						}
						.overview-text{
							font-size: 56rpx;
							color: #6327F6;
							font-weight: bold;
							margin-right: 5rpx;
						}
					}
					.right{
						width: 60%;
						height: auto;
						.summary-img{
							width: 100%;
							height: 200rpx;
						}
					}
				}
			}
			.over-card{
				margin-top: 48rpx;
				background: #fff;
				box-shadow:15rpx 15rpx 20rpx rgba(50,50,93,.1),5rpx 15rpx 20rpx rgba(0,0,0,.1);
				box-sizing: border-box;
				border-radius: 28rpx;
				padding: 32rpx;
				height: auto;
				// min-height: 500rpx;
				.over-header{
					margin: 10rpx 0 20rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.title{
						font-size: 38rpx;
						font-weight: bold;
					}
					.tip{
						font-size: 26rpx;
						color: #808080;
					}
					
				}

				.over-container{
					display: flex;
					justify-content: space-between;
					align-items: center;
					.left{
						text-align: right;
						width: 50%;
						color: #757575;
						.daynum-container{
							margin: 10rpx 0;
						}
						.recordnum-content{
							margin: 10rpx 0;
						}
						.over-text{
							font-size: 56rpx;
							color: #FF4500;
							font-weight: bold;
							margin-right: 5rpx;
						}
					}
					.right{
						width: 50%;
						height: auto;
						.summary-img{
							width: 100%;
							height: 250rpx;
						}
					}
				}
			}
			.max-card{
				margin-top: 48rpx;
				background: #fff;
				box-shadow:15rpx 15rpx 20rpx rgba(50,50,93,.1),5rpx 15rpx 20rpx rgba(0,0,0,.1);
				box-sizing: border-box;
				border-radius: 28rpx;
				padding: 32rpx;
				height: auto;
				min-height: 500rpx;
				.max-header{
					margin: 10rpx 0 24rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.title{
						font-size: 38rpx;
						font-weight: bold;
					}
					.tip{
						font-size: 26rpx;
						color: #808080;
					}
					
				}
				.max-container{
					margin-bottom: 32rpx;
					.max-item{
						overflow: hidden;
						background: #fff;
						box-shadow: 0rpx 5rpx 25rpx -8rpx rgba(41,41,41,0.2);
						border-radius: 15rpx;
						box-sizing: border-box;
						padding: 20rpx 40rpx;
						width: 100%;
						height: 140rpx;
						display: flex;
						justify-content: space-between;
						flex-wrap: nowrap;
						position: relative;
						.left-content{
							box-sizing: border-box;
							padding: 20rpx 0;
							width: 16%;
							.category-img{
								width: 72rpx;
								height: 72rpx;
							}
						}
						.right-content{
							box-sizing: border-box;
						
							box-sizing: border-box;
							padding-left: 5rpx;
							border-left: 2rpx solid rgb(230,210,240);
							width: 84%;
							display: flex;
							justify-content: space-between;
							.info{
								text-align: left;
								display: flex;
								justify-content: flex-start;
								align-items: center;
								
								.text{
									
									margin-left:20rpx ;
									.category-text{
										box-sizing: border-box;
										padding-bottom:10rpx;
										font-size: 34rpx;
										// font-weight: bold;
										color:#1D1C5C;
										font-weight: bold;
									}
									.other-text{
										box-sizing: border-box;
										font-size: 26rpx;
										
										color: #C0C0C0	;
									}
								}
							}
							.num{
								margin-top: 10rpx;
								vertical-align: middle;
								text-align: right;
								.rmb{
									font-size: 42rpx;
									font-weight: bold;
									color: #13BB16;
								}
								.time{
									font-size: 24rpx;
									color: #A9A9A9	;
								}
								
							}
						}
					}
				}
			}
		}
	}
}
</style>
