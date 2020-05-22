<template>
	<view class="container">
		<my-bar :nav="setNav"></my-bar>
		<view class="list-header">
			<view class="text">
				{{nowdate}}
			</view>
			<view class="calendar-btn">
				 <view @tap="open">选择日期</view>
			</view>
		</view>
		<view class="calendar-content">
		         <uni-calendar 
		             ref="calendar"
		             :insert="false"
		             @confirm="confirm"
		              />     
		    </view>
	<view class="orderlist-content">
			<view :key="index" class="list-item" v-for="(item,index) in orderlist">
				<view class="left-content">
					<image class="category-img" :src="item.categoryImgUrl" mode=""></image>
				</view>
				<view class="right-content">
					<view class="info">
						<view class="text">
							<view class="category-text">
								{{item.categoryName}}
							</view>
							<view class="other-text">
								{{item.remark}}
							</view>
						</view>
					</view>
					<view class="num">
						<view v-if="item.type==0" class="rmb" style="color:red">
							-{{item.money}}
						</view>
						<view v-else class="rmb">
							+{{item.money}}
						</view>
						<view class="time">
							{{item.date}}
						</view>
					</view>
				</view>
			</view>
		
	</view>
	</view>
</template>

<script>
	import uniCalendar from '../../components/uni-calendar/uni-calendar.vue'
	import {formatDate } from '../../utils/date.js'
	export default {
	    components: {
	        uniCalendar
	    },
	    data() {
	        return {
				setNav:{
					'color':'red',  //字体颜色
					'isdisPlayNavTitle':true, //是否显示返回按钮，由于导航栏是共用的，把所有的东西封装好，
					'isShowGoal':false,
					'isShowSetting':false,
					'navTitle':'账单列表' //导航标题
				},
	            nowdate:'',
				orderlist:[]
	        }
	
	    },
	    methods: {
			async fetchOrderListByDate(date){
				const res = await this.$api.fetchOrderListByDate(date)
				var list = res.data
				list.forEach(e=>{
					e.date = formatDate(new Date(e.date))
				})
				this.orderlist = list
			},
			open(){
			    this.$refs.calendar.open();
			},
			confirm(e) {
				console.log(e);
				this.nowdate = e.fulldate;
				this.fetchOrderListByDate(this.nowdate)
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
			}
	    },
		onLoad() {
			var nowDate = new Date();
			var today = this.getNowFormatDay(nowDate)
			this.nowdate = today
			this.fetchOrderListByDate(this.nowdate)
		}
	}
</script>

<style lang="scss">
.container{
	background: linear-gradient(0deg, #5153F6 0%, #4A34D5 100%);
	min-height: 100vh;
	.list-header{
		box-sizing: border-box;
		padding: 20rpx 40rpx;
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
			padding: 10rpx 20rpx;
			color: #DCDCDC;
			background: #4331C1;
			font-weight: bold;
		}
	}
	.orderlist-content{
		box-sizing: border-box;
		padding: 10rpx 40rpx;
		border-radius:20rpx ;
		// background: #fff;
		width: 100%;
		height: auto;
		.list-item{
			margin-bottom: 24rpx;
			background: #fff;
			box-shadow: 0rpx 10rpx 25rpx -8rpx rgba(41,41,41,0.1);
			border-radius: 15rpx;
			box-sizing: border-box;
			padding: 20rpx 40rpx;
			// color: ;
			
			// background-image:linear-gradient(75deg,#AF4DFF,#6327F6);
			width: 100%;
			height: 140rpx;
			display: flex;
			justify-content: space-between;
			flex-wrap: nowrap;
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
</style>
