<template>
	<view class="order-container">
		<my-bar :nav="setNav"></my-bar>
		<view class="order-header">
			<image class="order-bg-img" src="../../static/bg/bg-order.png"></image>
		</view>
		<view class="order-content">
			<view class="type-container">
				<button class="out-btn" type="default">支出</button>
				<button class="in-btn" type="default">收入</button>
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
						<view class="category-card today">
							晚餐
						</view>
						<view class="category-card more">
							...
						</view>
					</view>
				</view>
			</view>
			<view class="order-title" value="0">
				金额
			</view>
			<view class="order-input">
				<input type="digit" :value="orderData.money"/>
			</view>
			<view class="remark-container">
				<view class="order-title">
					备注
				</view>
				<view class="order-input">
					<input type="text" :value="orderData.remark"/>
				</view>
			</view>
			<view class="btn-container">
				<button class="order-btn" type="default">确认</button>
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
		<tabbar currentPage="order"/> 
	</view>
</template>

<script>
	import wPicker from "../../components/w-picker/w-picker.vue";
	export default {
		components:{
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
				orderData:{
					'type':0,
					'date':'',
					'money':0,
					'remark':''
				},
				nowdate:'',
				yesterdaydate:'',
				selectdate:''
			}
		},
		methods: {
			showDatePicker(){
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
				var yesterday = this.getNowFormatDay(myDate)
				this.yesterdaydate = yesterday
				this.orderData.date = yesterday
				
			},
			onConfirm(event,type){
				wx.vibrateShort()
				this.orderData.date = event.value
			},
			onCancel(){},
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
			}
				
		},
		onLoad() {
			var nowDate = new Date();
			var today = this.getNowFormatDay(nowDate)
			this.nowdate = today
			this.orderData.date = today
		},
		onReady() {
		}
	}
</script>


<style lang="scss">
.order-container{
	background: linear-gradient(0deg, #5153F6 0%, #4A34D5 100%);
	min-height: 100vh;
	.order-header{
		z-index: 1;
		margin: 0 auto;
		margin-top: 40rpx;
		width: 100%;
		height: auto;
		text-align: center;
		.order-bg-img{
			width: 500rpx;
			height: 329rpx;
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
		margin-top: -74rpx;
		padding-top: 90rpx;
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
					// background: pink;
					display: flex;
					justify-content: flex-start;
					flex-wrap: nowrap;
					.category-card{
						text-align: center;
						margin:0 10rpx;
						font-size: 22rpx;
						box-sizing: border-box;
						padding: 8rpx 10rpx;
						background: #fff;
						width: 80rpx;
						background:#fff;
						color:rgb(75,60,221);
						border-radius:6rpx ;
						border: 1rpx solid rgb(75,60,221);
						
					}
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
			align-items: center;
			border-radius: 24rpx;
			box-sizing: border-box;
			font-size: 36rpx;
			padding: 20rpx 24rpx;
			background: #F5F5F5;
			font-size: 36rpx;
			color: #6327F6;
		}
		.type-container{
			display: flex;
			width: 60%;
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
				font-size: 36rpx;
				font-weight: bold;
				background: #f6f6f6;
				color:#6327F6 ;
				background: linear-gradient(90deg, #5153F6 0%, #4A34D5 100%);
				color: #fff;
			}
		}
		
		.btn-container{
			margin:80rpx 0 0;
			.order-btn{
				width: 60%;
				margin:30rpx auto;
				color: #fff;
				background: linear-gradient(90deg, #5373FC 0%, #39A0FF 100%);
			}
		}
	}
}
</style>
