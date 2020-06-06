<template>
	<view class="order-container">
		<my-bar v-if="!orderid" :nav="setNav"></my-bar>
		<my-bar v-else :nav="setprimaryNav"></my-bar>
		<view class="order-header">
			<image class="order-bg-img animated fadeInDown" src="https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/bg/bg-order.png"></image>
		</view>
		<view class="order-content">
			<view class="type-container">
				<button class="out-btn" type="default" :class="{active:orderData.type===0}" @tap="selectOrderType(0)">支出</button>
				<button class="in-btn" type="default" :class="{active:orderData.type===1}" @tap="selectOrderType(1)">收入</button>
			</view>
			<view class="top-content">
				<view class="date-container">
					<view class="order-title" value="0">
						<view class="text">
							日期
						</view>
						<view class="time">
							{{orderData.date}}
						</view>
					</view>
					<view class="date-content">
						<view class="date-card today" @tap="chooseToday()" :class="{active:orderData.date===nowdate}">
							今天
						</view>
						<view class="date-card yesterday" @tap="chooseYesterday()" :class="{active:orderData.date===yesterdaydate}">
							昨天
						</view>
						<view class="date-card more" @tap="showDatePicker()" :class="{active:orderData.date!=''&&orderData.date!=nowdate&&orderData.date!=yesterdaydate}">
							...
						</view>
					</view>
				</view>
				<view class="category-container">
					<view class="order-title" value="0">
						分类 
					</view>
					<view class="category-content">
						<view v-if="selectCategoryItem.categoryId!=-1" class="select-category"  @tap="openPop()">
							<image class="category-img" :src="selectCategoryItem.categoryImgUrl"></image>
							<view class="text">
								{{selectCategoryItem.categoryName}}
							</view>
							
						</view>
						<view v-else class="category-card active" @tap="openPop()">
							点我选择
						</view>
					</view>
				</view>
			</view>
			<view class="order-title" >
				金额
			</view>
			<view class="order-input">
				<input :value="orderData.money" type="digit" placeholder="0.00" :focus='setFocus' @input="moneyInput"/>
			</view>
			<view class="remark-container">
				<view class="order-title">
					备注
				</view>
				<view v-if="remarkshow" class="order-textarea">
					<textarea :value="orderData.remark" auto-height adjust-position placeholder="账单备注(选填)" @input="remarkInput"/>
				</view>
			</view>
			<view class="btn-container">
				<button class="order-btn" type="default" @tap="postOrder()">确认</button>
			</view>
		</view>
		 <w-picker
		                mode="date" 
		                startYear="2019" 
		                endYear="2029"
		                :value=nowdate
		                :current="true"
		                fields="day"
		                @confirm="onConfirm($event,'date')"
		                @cancel="onCancel"
		                :disabled-after="false"
		                ref="date" 
		            ></w-picker>
		<tabbar v-if="!orderid" currentPage="order"/> 
		<lee-popup ref="popup" type="bottom">
			<view class="category-choose-container">
				<view class="header">
					<image style="width: 36rpx;height: 35rpx;margin-right: 8rpx;" src="../../static/icon/choosecategory.png" mode=""></image>
					选择分类
				</view>
				<view class="content">
					<view v-if="orderData.type==0" class="category-item" :key="item.categoryId" v-for="item in categoryList.outdata" @tap="selectCategory(item)">
						<image class="category-img" :src="item.categoryImgUrl"></image>
						<view class="category-name">
							{{item.categoryName}}
						</view>
					</view>
					<view v-if="orderData.type==1" class="category-item" :key="item.categoryId" v-for="item in categoryList.indata" @tap="selectCategory(item)">
							<image class="category-img" :src="item.categoryImgUrl"></image>
							<view class="category-name">
								{{item.categoryName}}
							</view>
					</view>
				</view>
			</view>
			
		</lee-popup>
	</view>
</template>

<script>
	import wPicker from "../../components/w-picker/w-picker.vue";
	import LeePopup from '@/components/lee-popup/lee-popup.vue'
	import {formatDate } from '../../utils/date.js'
	export default {
		props:{
			orderid:{
				type:String,
				default:''
			}
		},
		components:{
		        wPicker,
				LeePopup 
		 },
		data() {
			return {
				setprimaryNav:{
					'isdisPlayNavTitle':true,
					'isShowGoal':false,
					'isShowSetting':false,
					'navTitle':'首页' //导航标题
				},
				setNav:{
					'color':'red',  //字体颜色
					'isdisPlayNavTitle':false, //是否显示返回按钮，由于导航栏是共用的，把所有的东西封装好，
					'isShowGoal':true,
					'isShowSetting':true,
					'navTitle':'' //导航标题
				},
				orderData:{
					'type':0,
					'date':'',
					'money':0.00,
					'remark':'无'
				},
				categoryList:[],
				nowdate:'',
				yesterdaydate:'',
				selectdate:'',
				selectType:0,
				selectCategoryItem:{
					categoryId:-1,
					categoryName:'无',
					categoryImgUrl:'无'
				},
				setFocus:false,
				remarkshow:true
			}
		},
		methods: {
			async fetchOrderDetail(){
				const res = await this.$api.fetchOrderDetail(this.orderid)
				this.selectCategoryItem.categoryId = res.data.categoryId
				this.selectCategoryItem.categoryName = res.data.categoryName
				this.selectCategoryItem.categoryImgUrl = res.data.categoryImgUrl
				this.orderData.type = res.data.type
				this.orderData.date = formatDate(new Date(res.data.date))
				this.orderData.money = res.data.money
				this.orderData.remark = res.data.remark
				console.log(this.selectCategoryItem)
				console.log(this.yesterdaydate)
			},
			async fetchCategoryData(){
				const res = await this.$api.fetchCategoryData()
				this.categoryList = res.data
			},
			selectCategory(item){
				wx.vibrateShort()
				this.remarkshow = true
				this.selectCategoryItem = item
			},
			async postOrder(){
				let _self = this
				if(this.orderid)
					this.orderData.orderId = this.orderid
				var data = this.orderData
				if(this.selectCategoryItem.categoryId!=-1)
					data.categoryId = this.selectCategoryItem.categoryId
				else {
					uni.showModal({
						title:'哦吼',
						content:"请选择分类！o(╥﹏╥)o",
						showCancel:false,
					})
					return
				}
				if(this.orderData.money<=0){
					uni.showModal({
						title:'哦吼',
						content:"金额必须大于0o(╥﹏╥)o",
						showCancel:false,
					})
					return
				}
				const res = await this.$api.postOrder(data)
				if(res.data.message="创建成功"){
					uni.showModal({
						title:'欧耶',
						content:"记录成功！(＾－＾)V",
						showCancel:false,
						success:function(res){
							
							if(_self.orderid){
								uni.navigateBack({
									delta:1
								})
							} else {
								//清除数据
								var nowDate = new Date();
								var today = formatDate(nowDate)
								
								_self.orderData={
									'type':0,
									'date':'',
									'money':0.00,
									'remark':'无'
								}
								
								_self.orderData.date = today
								_self.selectCategoryItem={
									categoryId:-1,
									categoryName:'无',
									categoryImgUrl:'无'
								}
								console.log("清除数据")
							}
						}
					})
					}
					
			},
			selectOrderType(type){
				this.orderData.type=type;
				this.selectCategoryItem={
					categoryId:-1,
					categoryName:'',
					categoryImgUrl:''
				}
			},
			showDatePicker(){
				this.remarkshow = false
				this.$refs.date.show()
			},
			chooseToday(){
				console.log("today")
				this.orderData.date = this.nowdate
			},
			chooseYesterday(){
				console.log("Yesterday")
				var myDate = new Date()
				myDate.setTime(myDate.getTime()-1*24*60*60*1000);
				var yesterday = formatDate(myDate)
				this.yesterdaydate = yesterday
				this.orderData.date = yesterday
				
			},
			onConfirm(event,type){
				wx.vibrateShort()
				this.remarkshow = true
				this.orderData.date = event.value
			},
			onCancel(){
				this.remarkshow = true
			},
			completeDate(value) {
			        return value < 10 ? "0"+value:value;
			},
			getNowFormatDay(nowDate){
				var char = "-";
				if(nowDate == null){
					nowDate = new Date();
				}
				var day = nowDate.getDate();
				var month = nowDate.getMonth() + 1;//注意月份需要+1
				var year = nowDate.getFullYear();
				var time =  year + char + this.completeDate(month) + char +this.completeDate(day);
				return time
			},
			moneyInput(e){
				this.orderData.money = e.detail.value
			},
			remarkInput(e){
				this.orderData.remark = e.detail.value
			},
			openPop(){
				this.remarkshow = false
			    this.$refs.popup.open()
			}
				
		},
		onShow() {
			// if(this.orderid){
			// 	this.fetchOrderDetail()
			// }
		},
		onLoad() {
			var nowDate = new Date();
			var today = formatDate(nowDate)
			this.nowdate = today	
			this.setFocus = true
			this.fetchCategoryData()
			if(this.orderid){
				this.fetchOrderDetail()
			} else {
				this.orderData.date = today
			}
			
			console.log("Yesterday")
			var myDate = new Date()
			myDate.setTime(myDate.getTime()-1*24*60*60*1000);
			this.yesterdaydate = formatDate(myDate)
			
		},
	}
</script>


<style lang="scss">
.order-container{
	background: linear-gradient(0deg, #5153F6 0%, #4A34D5 100%);
	min-height: 100vh;
	.order-header{
		z-index: 1;
		margin: 0 auto;
		margin-top: 20rpx;
		width: 100%;
		height: auto;
		text-align: center;
		.order-bg-img{
			width: 400rpx;
			height: 264rpx;
			margin:0 auto;
			// width: 60%;
		}
	}
	.order-content{
		width: 90%;
		margin:0 auto;
		box-sizing: border-box;
		padding: 50rpx;
		box-shadow:15rpx 15rpx 20rpx rgba(50,50,93,.1),5rpx 15rpx 20rpx rgba(0,0,0,.1);
		margin-top: -62rpx;
		padding-top: 80rpx;
		z-index: 0;
		border-radius: 80rpx;
		background: #fff;
		height: auto;
		.top-content{
			margin: 30rpx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.date-container{
				.date-content{
					// background: pink;
					display: flex;
					justify-content: flex-start;
					flex-wrap: nowrap;

					.date-card{
						text-align: center;
						margin:0 10rpx;
						font-size: 22rpx;
						box-sizing: border-box;
						padding: 8rpx 10rpx;
						background: #fff;
						width: 80rpx;
						background:#fff;
						color:rgb(75,60,221);
						border-radius:12rpx ;
						border: 1rpx solid rgb(75,60,221);	
					}
					.active{
						transition: all .4s;
						background:rgb(75,60,221) !important; 
						color: #fff !important;
					}
				}
			}
			.category-container{
				.category-content{
					vertical-align: middle;
					// background: pink;
					display: flex;
					justify-content: flex-start;
					flex-wrap: nowrap;
					.select-category{
						vertical-align: middle;
						line-height: 60rpx;
						width: 200rpx;
						display: flex;
						justify-content: flex-start;
						.category-img{
							background: transparent;
							vertical-align: middle;
							width: 60rpx;
							height: 60rpx;
						}
						.text{
							vertical-align: middle;
							margin-left: 10rpx;
							color: rgb(75,60,221);
						}
					}
					.category-card{
						text-align: center;
						margin:0 10rpx;
						font-size: 22rpx;
						box-sizing: border-box;
						padding: 8rpx 10rpx;
						background: #fff;
						width: 120rpx;
						background:rgb(75,60,221);
						color: #fff;
						border-radius:12rpx ;
						border: 1rpx solid rgb(75,60,221);
						
					}
					// .active{
					// 	box-shadow:0rpx 3rpx 5rpx rgba(41,41,41,.1);
					// 	padding: 12rpx 16rpx;
					// 	border-radius: 10rpx;
					// 	font-weight: bold;
					// 	background: #f6f6f6;
					// 	color:#6327F6 ;
					// }
				}
			}
		}
		
		.order-title{
			// width: 30%;
			align-items: center;
			font-size:36rpx;
			font-weight: bold;
			color: rgb(75,60,221);
			margin-bottom:20rpx ;
			display: flex;
			justify-content: flex-start;

			.text{

				margin-right: 18rpx;
			}
			.time{
				
				margin-top:12rpx ;
				font-weight: normal;
				font-size: 24rpx;
			}
		}
		.order-input{
			width: 100%;
			height: 82rpx;
			line-height: 82rpx;
			align-items: center;
			border-radius: 24rpx;
			box-sizing: border-box;
			font-size: 36rpx;
			padding: 20rpx 24rpx;
			background: #F5F5F5;
			font-size: 32rpx;
			color: #6327F6;
			margin-bottom:20rpx ;
		}
		.type-container{
			display: flex;
			width: 54%;
			margin:0 auto;
			justify-content: center;
			.out-btn{
				box-shadow:0rpx 5rpx 8rpx rgba(41,41,41,.08);
				border:none;
				border-top-right-radius: 0;
				border-bottom-right-radius: 0;
				border-top-left-radius: 50rpx;
				border-bottom-left-radius:  50rpx;
				marin:0;
				font-size: 36rpx;
				color: #fff;
				font-weight: bold;
				width: 100%;
				line-height: 70rpx;
				height: 70rpx;
				background: #f6f6f6;
				color:#6327F6 ;
			}
			.in-btn{
				box-shadow:0rpx 5rpx 8rpx rgba(41,41,41,.08);
				border:none;
				border-top-left-radius: 0;
				border-bottom-left-radius: 0;
				border-top-right-radius: 50rpx;
				border-bottom-right-radius: 50rpx;
				marin:0;
				width: 100%;
				line-height: 70rpx;
				height: 70rpx;
				font-size: 36rpx;
				font-weight: bold;
				background: #f6f6f6;
				color:#6327F6 ;
			}
			.active{
				transition: all .6s;
				background: linear-gradient(90deg, #5153F6 0%, #4A34D5 100%);
				color: #fff;
			}
		}
		.remark-container{
			.order-textarea{
				line-height: auto;
				align-items: center;
				border-radius: 24rpx;
				box-sizing: border-box;
				font-size: 36rpx;
				padding: 20rpx 24rpx;
				background: #F5F5F5;
				font-size: 32rpx;
				color: #6327F6;
				margin-bottom:20rpx ;
			}
			
		}
		.btn-container{
			margin:60rpx 0 0;
			.order-btn{
				width: 50%;
				border-radius: 80rpx;
				line-height: 90rpx;
				height: 90rpx;
				margin:30rpx auto 0;
				color: #fff;
				background: linear-gradient(90deg, #5153F6 0%, #4A34D5 100%);
			}
		}
	}
	.category-choose-container{
		height: auto;
		.header{
			font-size:42rpx;
			font-weight: bold;
			color: rgb(75,60,221);
			margin-bottom:20rpx ;
		}
		.content{
			box-sizing: border-box;
			padding: 10rpx 0rpx;
			border-top: 1rpx sold red;
			display: flex;
			width: 700rpx;
			margin:0 auto;
			flex-wrap: wrap;
			justify-content: flex-start;
			height: auto;
			.category-item{
				text-align: center;
				box-sizing: border-box;
				padding: 20rpx;
				width: 140rpx;
				height: 180rpx;
					.category-img{
						width: 80rpx !important;
						height: 80rpx !important;
						// box-shadow: 0rpx 10rpx 25rpx -8rpx rgba(41,41,41,0.1);
					}
					.category-name{
						margin-top: 5rpx;
						color: #696969;
					}
	
			}
		}
	}
}
</style>
