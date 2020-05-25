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
		easing-function="easeInOutCubic"
		:previous-margin="previousMargin"
		:next-margin="nextMargin"
		:display-multiple-items="displayMultipleItems"
		:skip-hidden-item-layout="skipHiddenItemLayout"
		:style="{'height':swiperHeight+'px'}"
		:class="(swiperType && displayMultipleItems ==1 && !vertical && !fullScreen)?'cardSwiper':'' "
		class="screen-swiper"
		>
			<swiper-item class="swiper-item"  v-for="(item,index) in swiperList" :key="index" :class="(cardCur==index && displayMultipleItems ==1 && !vertical &&  !fullScreen)?'cur':''"  @tap="clickItem(index)">
				<view v-if="index==0" class="card boardone">
					<view class="img-content">
						<image class="onboard-img" src="https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/bg/borading01.png" mode=""></image>
					</view>
					<view class="detail">
						<view class="header">
							欢迎使用
						</view>
						<view class="name">
							酷记账
						</view>
						<view class="text">
							<view class="top">
								请左滑页面
							</view>
							<view class="bottom">
								我会带你设置一些目标信息
							</view>

						</view>
					</view>
					<view class="goal-btn">
					<!-- 	<view class="btn" >
							左滑下一步
						</view> -->
						<view class="btn wechat-btn" @tap="jumpToWeChatAdmin()">
							小程序大赛评委入口
						</view>
					</view>
				</view>
				<view v-if="index==1"class="card">
					<view class="img2-content">
						<image class="onboard-img" src="https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/bg/boarding02.png" mode=""></image>
					</view>
					<view class="goal-container">
						<view class="goal-header">
							目标设置
						</view>
						<view class="goal-content">
							<view class="input-content">
								<view class="monthcost-container">
									<view class="goal-title">
										每月最大支出
									</view>
									<view class="goal-input">
										<input type="digit" placeholder="需大于0哦~" @input="outInput"/>
									</view>
								</view>
								<view class="monthsave-container">
									<view class="goal-title">
										每月预计存款
									</view>
									<view class="goal-input">
										<input type="digit"  placeholder="先存它一个亿~" @input="inInput"/>
									</view>
								</view>
							</view>
						</view>
						<view class="btn-container">
							<button class="goal-btn" type="default" @tap="PostGoal()">进入酷记账</button>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
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
				default:true
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
				swiperList:[{name:1},{name:2}],
				goalData:{
					'monthCost':0,
					'monthSave':0
				}
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
		},
		methods: {
			jumpToWeChatAdmin(){
				uni.showModal({
					title:'注意',
					content:"以评委身份进入，酷记账会自动预设目标，并录入一批预设数据，以全面展现小程序功能，是否确定？",
					success: function (res) {
					        if (res.confirm) {
					           uni.redirectTo({
					               url: '../index/index'
					           });
					        } 
					    }
				})
			},
			clickItem:function(index){
				if(this.swiperList.length>0){
					this.$emit('clickItem',this.swiperList[index])
				}
			},
			change:function(e){
				console.log(e)
				this.$emit('change',e)
			},
			animationfinish:function(e){
				this.cardCur = e.detail.current;
				this.$emit('animationfinish',e)
			},
			async PostGoal(){
				wx.vibrateShort()
				var _self = this
				var monthCost = parseFloat(this.goalData.monthCost)
				var monthSave = parseFloat(this.goalData.monthSave)
				if(monthCost >0 && monthSave >0){
					const res = await this.$api.PostGoal({monthCost,monthSave})
					if(res.data.message==='设置成功'){
						_self.$store.dispatch('user/addGoal','yes')
						
						uni.redirectTo({
						    url: '../index/index'
						});
					}
				} else {
					uni.showModal({
						title:'错误',
						content:"请正确填写数字内容哦！",
						showCancel:false
					})
				}
			},
			outInput(e){
				this.goalData.monthCost = e.detail.value
			},
			inInput(e){
				this.goalData.monthSave = e.detail.value
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
}

.swiperContent{
	position: relative;
	background: linear-gradient(0deg, #5153F6 0%, #4A34D5 100%);
	min-height: 100vh;
	width:100%;
	
	.card{
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		box-sizing: border-box;
		padding: 140rpx 30rpx;
		.img-content{
			width: 600rpx;
			height: 600rpx;
			margin: 0 auto;
			.onboard-img{
				width: 600rpx;
				height: 600rpx;
			}
			
		}
		.img2-content{
			width: 550rpx;
			height: 550rpx;
			margin: 0 auto;
			.onboard-img{
				width: 550rpx;
				height: 550rpx;
			}
			
		}
		.detail{
			margin-top: 20rpx;
			text-align: center;
			color: #fff;
			.header{
				font-size: 44rpx;
			}
			.name{
				font-size: 76rpx;
				font-weight: bold;
				color: rgb(255,227,108);
			}
			.text{
				margin: 40rpx 0;
				font-size: 38rpx;
				.top{
					color: rgb(255,227,108);
					font-size: 42rpx;
				}
				.bottom{
					
				}
				}
		}
		.goal-btn{
			margin: 10rpx 0;
			text-align: center;
			
			font-weight: bold;
			.btn{
				box-sizing: border-box;
				padding: 10rpx 20rpx;
				width: 38%;
				margin: 10rpx auto;
				// background: #fff;
				height: 100rpx;
				font-size: 42rpx;
				color: #fff;
				border-radius: 24rpx;
				line-height: 80rpx;
			}
			.wechat-btn{
				width: 60%;
				font-size: 36rpx;
				margin: 10rpx auto;
				background: #09bb07;
				color: #fff;
			
			}
		}
		.goal-container{
			display: flex;
			flex-direction: column;
			text-align: center;
			justify-content: space-around;
			}
			.goal-header{
				text-align: center;
				color: #fff;
				font-size: 46rpx;
				font-weight: bold;
				margin: 0 auto 20rpx;
			}
			.btn-container{
				.goal-btn{
					box-shadow: 0rpx 4rpx 25rpx -10rpx rgba(41,41,41,1);
					position: absolute;
					left:50%;
					bottom: 42rpx;
					width: 50%;
					border-radius: 80rpx;
					height: 100rpx;
					margin:30rpx auto 10rpx;
					margin-left: -25%;
					// color: #fff;
					font-size: 40rpx;
					// border: 6rpx solid rgb(255,227,108);
					// background: linear-gradient(90deg, #5153F6 0%, #4A34D5 100%);
					background: rgb(255,227,108);
				}
			}
		.goal-content{
			width: 94%;
			margin:0 auto 20rpx;
			box-sizing: border-box;
			padding: 28rpx 50rpx 20rpx;
			text-align: left;
			box-shadow:15rpx 15rpx 20rpx rgba(50,50,93,.1),5rpx 15rpx 20rpx rgba(0,0,0,.1);
			z-index: 0;
			border-radius: 80rpx;
			background: #fff;
			height: auto;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			min-height: 420rpx;
			.goal-title{
				font-size: 40rpx;
				font-weight: bold;
				color: rgb(75,60,221);
				margin-bottom:20rpx ;
			}
			.goal-input{
				border-radius: 24rpx;
				box-sizing: border-box;
				padding: 20rpx 18rpx;
				background: #F5F5F5;
				margin-bottom:20rpx ;
				// font-size: 36rpx;
				color: #6327F6;
			}

			
		}
	}
}
</style>
