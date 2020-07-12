<template>
	<view class="swiperContent">
		<swiper  @change="change"
		@animationfinish="animationfinish"
		:indicator-dots="indicatorDots"
		:indicator-active-color="indicatorActiveColor"
		:indicator-color="indicatorColor"
		:current="current"
		:interval="interval"
		:duration="duration"
		:circular="circular"
		:vertical="vertical"
		easing-function="default"
		:previous-margin="previousMargin"
		:next-margin="nextMargin"
		:display-multiple-items="displayMultipleItems"
		:skip-hidden-item-layout="skipHiddenItemLayout"
		:style="{'height':swiperHeight+'px'}"
		:class="(swiperType && displayMultipleItems ==1 && !vertical && !fullScreen)?'cardSwiper':'' "
		class="screen-swiper"
		>
			<swiper-item class="swiper-item"  v-for="(item,index) in swiperList" :key="index" :class="(cardCur==index && displayMultipleItems ==1 && !vertical &&  !fullScreen)?'cur':''"  @tap="clickItem(index)">
				<view v-if="item.name === 'export'" class="card-container">
					<view class="header">
						导出账单
					</view>
					<view class="card">
						<view class="img-content">
							<image class="export-img" src="https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/bg/export.png"></image>
						</view>
						<view class="text">
							<view class="top">
								导出Excel
							</view>
							<view class="bottom">
								选择时间段以下载账单。
							</view>
						</view>
						<view class="date-btn"  @tap="showDatePicker()">
							<view class="date-text" >
								<view class="start">
									{{startDate}}
								</view>
								<view class="and">
									至
								</view>
								<view class="end">
									{{endDate}}
								</view>
								
							</view>
						</view>
						<view class="download-btn" @tap="downloadExcel()">
							<image class="download-img" src="../../static/bg/download.png"></image>
						</view>
					</view>
				</view>
				<view v-if="item.name === 'gesture'" class="card-container">
					<view class="header">
						手势密码
					</view>
					<view class="card">
						<view class="img-content">
							<image class="export-img" src="https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/bg/kefu.png"></image>
						</view>
						<view class="text">
							<view class="top">
								保护数据与隐私安全
							</view>
							<view class="top-text">
								访问小程序前需验证手势密码
							</view>
						</view>
						<view class="switch-bottom">
							<view class="switch-text" :class="{close:gestureStatus == '-1',open:gestureStatus !='-1'}">
								{{gestureStatus == '-1' ? '未开启':'已开启'}}
							</view>
							<view class="switch-btn" @tap="jumpToGuesture()">
								{{gestureStatus == '-1' ? '前往开启':'关闭/修改'}}
							</view>
						</view>
					</view>
				</view>
				<view v-if="item.name === 'bug'" class="card-container">
					<view class="header">
						使用反馈
					</view>
					<view class="card">
						<view class="img-content">
							<image class="export-img" src="https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/bg/kefu.png"></image>
						</view>
						<view class="text">
							<view class="top">
								小程序客服
							</view>
							<view class="bottom">
								可以在客服窗口内留言。
							</view>
						</view>
						<view class="kefu-btn">
							<button class="btn" open-type="contact">客服会话</button>
						</view>
					</view>
				</view>
				<view v-if="item.name === 'about'" class="card-container">
					<view class="header about-header">
						开发者介绍
					</view>
					<view class="card about-card">
						<view class="about-content">
							<image class="about-img" src="https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/bg/lh.png"></image>
						</view>
						<view class="text about-text">
							<view class="top">
								武科大领航工作室
							</view>
						</view>
	
					</view>
				</view>
			</swiper-item>
		</swiper>
		<w-picker
		               mode="range" 
		               startYear="2019" 
		               endYear="2029"
		               :value=rangeVal
		               :current="true"
		               fields="day"
		               @confirm="onConfirm($event,'date')"
		               @cancel="onCancel"
		               :disabled-after="false"
		               ref="rangedate" 
		           ></w-picker>
	</view>
</template>

<script>
	import {formatDate } from '../../utils/date.js'
	export default {
		name:'bw-swiper',
		created:function(){
			var that = this;
			if(this.fullScreen){
				uni.getSystemInfo({
					success:function(e){
					that.swiperHeight = e.screenHeight
				}})
			}
		},
		mounted:function(){
			if(!this.fullScreen){
				const query = uni.createSelectorQuery().in(this);
				query.select('.swiper-item').boundingClientRect(data => {
					this.swiperHeight = data.width/this.w_h;
				}).exec();
			}	
		},
		props: {
			fullScreen:{ // 是否全屏
				type:Boolean,
				default:false
			},
			swiperList:{ // 滑块视图容器数据
				type:Array,
				default:function(){
					return []
				}
			},
			swiperType:{  // false => 全屏限高轮播图 true => 卡塔式轮播图
				type:Boolean,
				default:true
			},
			w_h:{  //宽高比 推荐 w/h => 2
				type:Number,
				default:2
			},
			skipHiddenItemLayout:{ //是否跳过未显示的滑块布局，设为 true 可优化复杂情况下的滑动性能，但会丢失隐藏状态滑块的布局信息 
				type:Boolean,
				default:false
			},
			displayMultipleItems:{ //同时显示的滑块数量
				type:Number,
				default:1
			},
			nextMargin:{ // 后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值 头条小程序不支持
				type:String,
				default:'0px'
			},
			previousMargin:{//前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值头条小程序不支持
				type:String,
				default:'0px'
			},
			vertical:{ //滑动方向是否为纵向 卡牌  不支持纵向以及同时显示的2块以上滑块数量
				type:Boolean,
				default:false
			},
			circular:{ // 是否采用衔接滑动
				type:Boolean,
				default:false
			},
			duration:{ // 滑动动画时长
				type:Number,
				default:400
			},
			interval:{ // 自动切换时间间隔
				type:Number,
				default:2500
			},
			current:{ // 当前所在滑块的 index
				type:Number,
				default:0
			},
			autoplay:{ // 是否自动切换
				type:Boolean,
				default:false
			},
			indicatorColor:{ // 指示点颜色
				type:String,
				default:'#CCCCCC'
			},
			indicatorActiveColor: { // 当前选中的指示点颜色
				type: String,
				default: '#ffffff'
			},
			indicatorDots: { // 是否显示面板指示点
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				flag:true,
				cardCur:0,
				swiperHeight:300,
				rangeVal:[],
				startDate:'',
				endDate:'',
				gestureStatus:-1,
				guesture:'',
				
			}
		},
		computed:{
			
		},
		mounted() {
			var nowDate = new Date();
			nowDate = formatDate(nowDate)
			this.endDate = nowDate;
			this.startDate = nowDate
			this.rangeVal = [this.startDate,this.endDate]
			// this.fetchGesture()
		},
		methods: {
			clickItem:function(index){
				if(this.swiperList.length>0){
					this.$emit('clickItem',this.swiperList[index])
				}
			},
			change:function(e){
				this.$emit('change',e)
			},
			async fetchGesture(){
				await this.$api.gestureCheck('-1').then(res=>{
					this.gestureStatus = res.data
				})

				
			},
			jumpToGuesture(){
				if(this.gestureStatus == '-1'){
					uni.navigateTo({
						url:'../gesture/gesture?method=1&open=0'
					})
				} else {
					uni.navigateTo({
						url:'../gesture/gesture?method=1&open=1'
					})
				}
				
			},
			animationfinish:function(e){
				this.cardCur = e.detail.current;
				this.$emit('animationfinish',e)
			},
			async downloadExcel(){
				if(!this.startDate || !this.endDate)
					return 
				const res = await this.$api.exportDataExcel(this.startDate,this.endDate)
				let url = res.data
				let savedFilePath
				uni.setClipboardData({
				    data: url,
				    success: function () {
				        uni.showModal({
				            title: '哦耶',
				            content: '下载链接已复制到剪贴板，请拷贝到浏览器下载！',
							showCancel:false,
				            success: function (res) {
				                if (res.confirm) {
				        	// 		uni.downloadFile({
				        	// 		    url: url, 
				        	// 		    success: (res) => {
				        	// 				uni.saveFile({
				        	// 				      tempFilePath: res.tempFilePath,
				        	// 				      success: function (res) {
				        	// 				        savedFilePath = res.savedFilePath;
													// uni.openDocument({
													//       filePath: savedFilePath,
													//       success: function (res) {
													//         console.log('打开文档成功');
													// 	},
													// 	fail:function(err){
													// 		console.log(err)
													// 	}
													// });
				        	// 				      }
				        	// 				    });
				        					
				        	// 		    },
				        	// 			fail:(res) => {
				        	// 				uni.showModal({
				        	// 				    title: '咦',
				        	// 				    content: '没有下载成功o(╥﹏╥)o',
				        	// 					showCancel:false}); 
				        	// 			}
				        	// 		})
				                }
				            }
				        });
				    }
				});
				
			},
			showDatePicker(){

				this.$refs.rangedate.show()
			},
			onConfirm(event,type){
				wx.vibrateShort()
				console.log(event,type)
				let fdate = event.obj.fyear + '-' + event.obj.fmonth + '-' + event.obj.fday
				let tdate = event.obj.tyear + '-' + event.obj.tmonth + '-' + event.obj.tday
				this.startDate = fdate
				this.endDate = tdate
			},
			onCancel(){
			},
		}
	}
</script>

<style lang="scss">
.cardSwiper .swiper-item{
	width:86%!important; 
	overflow: initial;
}
.cardSwiper .swiper-item view{
	width: 100%;
	display: block;
	height: 100%;
	border-radius: 10upx;
	transform: scale(0.93,0.8);
	opacity: 0.7;
	transition: all 0.1s ease-in 0s;
	overflow: hidden;
	box-sizing: border-box;
	margin-left:8.1%;
}
.cardSwiper .cur  view{
	transform:  initial;
	opacity: 1;
	transition: all 0.1s ease-in 0s;
}
.swiper-item{
	height:100%;
	width:100%;
	position: relative;
	box-sizing: border-box;
	padding: 140rpx 40rpx;
	.card-container{
		box-sizing: border-box;
		padding: 0rpx 0 240rpx;
		// background: pink;
		height: 100%;
		.header{
			text-align: center;
			color: #fff;
			font-size: 48rpx;
			font-weight: bold;
			margin: 100rpx 0 18rpx;
		}
		.about-header{
			color: rgb(75,57,219);
			}
		.card{
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			position: relative;
			box-sizing: border-box;
			padding: 12rpx;
			width: auto;
			height: 100%;
			box-shadow: 0rpx 10rpx 25rpx -8rpx rgba(41,41,41,1);
			border-radius: 60rpx;
			background: #fff;
			.img-content{
				width: 580rpx;
				height: 435rpx;
				margin: 0 auto;
				.export-img{
					width: 580rpx;
					height: 435rpx;
					
				}
			}
			.text{
				// margin: 16rpx 0;
				text-align: center;
				letter-spacing: 4rpx;
				
				.top{
					letter-spacing: 8rpx;
					font-weight: bold;
					font-size: 56rpx;
					margin-bottom: 8rpx;
					.top-text{
						margin-top: 40rpx;
						}
				}
				.bottom{
					font-size: 40rpx;
				}
			}
			.switch-bottom{
				text-align: center;
				.switch-text{
					font-weight: 600;
					font-size: 48rpx;
				}
				.open{
					color: green;
				}
				.close{
					color: red;
				}
				.switch-btn{
					
					height: 100rpx;
					line-height: 100rpx;
					width: 36%;
					margin: auto;
					font-size: 34rpx;
					margin-top: 40rpx;
					border-radius: 36rpx;
					background: #6327F6;
					color: #fff;
				}
			}
			.date-btn{
				// margin-top: 36rpx;
				height: 80rpx;
				.picker-btn{
					box-sizing: border-box;
					padding: 10rpx 20rpx;
					text-align: center;
					width: 32%;
					margin: 0rpx auto;
					border-radius: 10rpx;
					background:#6327F6;
					line-height: 60rpx;
					height: 80rpx;
					color: #fff;
				}
				.date-text{
					width: 80%;
					margin: 0 auto;
					display: flex;
					justify-content: space-around;
					.start{
						border-radius: 16rpx;
						background: #F5F5F5;
						box-sizing: border-box;
						padding: 20rpx 24rpx;
						font-size: 28rpx;

					}
					.and{
						box-sizing: border-box;
						padding: 18rpx 24rpx;
						font-weight: bold;
						font-size: 32rpx;
					}
					.end{
						border-radius: 16rpx;
						background: #F5F5F5;
						box-sizing: border-box;
						padding: 20rpx 24rpx;
						font-size: 28rpx;

					}
				}
			}
			.download-btn{
				
				// position: absolute;
				// bottom: -70rpx;
				// left:50%;
				width: 180rpx;
				height: 130rpx;
				margin: 0 auto;
				// margin-left: -90rpx;
				.download-img{
					
					width: 180rpx;
					height: 130rpx;
				}
			}
		}
		.kefu-btn{
			margin: 40rpx 0;
			.btn{
				height: 100rpx;
				line-height: 100rpx;
				width: 40%;
				margin: auto;
				border-radius: 36rpx;
				background: #6327F6;
				color: #fff;
				
			}
		}
		.about-card{
			background: #000000;
			display: flex;
			flex-wrap: wrap;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.about-content{
				width: 400rpx;
				height: 400rpx;
				margin: 0 auto 30rpx;
				.about-img{
					width: 400rpx;
					height: 400rpx;
				}
			}
			
			.about-text{
				color: #fff;
			}
		}
	}
}

.swiperContent{
	width:100%;
}
</style>
