<template>
	<view class="container">
		<my-bar :nav="setNav"></my-bar>
		<view class="list-header">
			<view class="text">
				{{nowdate}}
			</view>
			<view class="calendar-btn">
				<image class="search-img" src="../../static/icon/search.png"></image>
				 <view class="text" @tap="open">选择日期</view>
			</view>
		</view>
		<view class="calendar-content">
		         <uni-calendar 
		             ref="calendar"
		             :insert="false"
		             @confirm="confirm"
		              />     
		</view>
		<view v-if="orderList.length==0" class="nodata-container">
				<view class="img-container">
					<image class="nodata-img" src="../../static/bg/nodata.png" mode=""></image>
				</view>
				<view class="text">
					貌似没有账单记录哦~
				</view>
		</view>
		<view v-else class="orderlist-content">
			<view :key="index" class="list-item" v-for="(item,index) in orderList" @touchstart="touchItemStart" @touchmove="touchItemMove" @touchend="touchItemEnd(item.orderId)">
				<view :class="{menuactive:selectOrderId===item.orderId}" class="menu-container" >
					<view class="edit" @tap="jumpToOrder(item.orderId)">
						编辑
					</view>
					<view class="delete" @tap="deleteOrder(item.orderId)">
						删除
					</view>
				</view>
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
	var startX = 0;
	var endX =0;
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
				orderList:[],
				selectOrderId:'',
				firstLoad:true
	        }
	
	    },
	    methods: {
			async fetchOrderListByDate(date){
				const res = await this.$api.fetchOrderListByDate(date)
				var list = res.data
				list.forEach(e=>{
					e.date = formatDate(new Date(e.date))
				})
				this.orderList = list.reverse()
				console.log(this.orderList)
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
			},
			touchItemStart(e){
				console.log(e)
				startX=e.touches[0].pageX;
			},
			touchItemMove(e){
				console.log(e)
				endX=e.touches[0].pageX;
			},
			touchItemEnd(id){
				let distance = endX-startX
				
				if(id && distance<=-50)
					this.selectOrderId = id
				else this.selectOrderId = ''
				console.log(id+' '+distance)
				
			},
			async deleteOrderRequest(id){
				const result = await this.$api.deleteOrder(id)
				if(result.data.message=='删除成功'){
					uni.showModal({
						title:'欧耶',
						content:"删除成功！",
						showCancel:false,
					})
					this.fetchOrderListByDate(this.nowdate)
				} else {
					uni.showModal({
						title:'咦',
						content:"好像失败了o(╥﹏╥)o",
						showCancel:false,
					})
				}
			},
			deleteOrder(id){
				let _self =this
				if(!id)
					return
				uni.showModal({
				    title: '删除账单',
				    content: '确定要删除该账单吗？',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户确定删除');
							_self.deleteOrderRequest(id)
				        } else if (res.cancel) {
				            console.log('用户取消删除');
				        }
				    }
				});
			},
			jumpToOrder(id){
				uni.navigateTo({
				    url: '../order/order?orderid='+id
				});
			this.selectOrderId = ''
			}
	    },
		onShow() {
			if(this.firstLoad==false)
				this.fetchOrderListByDate(this.nowdate)
			this.firstLoad=false
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
	
	.nodata-container{
		margin: 60rpx 0;
		width: 100%;
		text-align: center;
		.img-container{
			width: 120rpx;
			height: 95rpx;
			margin:10rpx auto;
			.nodata-img{
				opacity: 0.8;
				width: 120rpx;
				height: 95rpx;
			}
		}
		
		.text{
			opacity: 0.8;
			color: #A7A7F9;
		}
	}
	.orderlist-content{
		box-sizing: border-box;
		padding: 10rpx 40rpx;
		border-radius:20rpx ;
		// background: #fff;
		width: 100%;
		height: auto;
		
		.menu-container{
			top:0;
			right: 0;
			width: 320rpx;
			height: 140rpx;
			// background: pink;
			border-top-right-radius: 15rpx;
			border-bottom-right-radius: 15rpx;
			right: -100%;
			opacity: 0;
			transition: all .4s;
			position: absolute;
			vertical-align: middle;
			display: flex;
			justify-content: flex-start;
			.edit{
				width: 160rpx;
				vertical-align: middle;
				text-align: center;
				background: rgb(255,227,108);;
				color: rgb(67,73,106);
				line-height: 140rpx;
				font-weight: bold;
				font-size: 36rpx;
			}
			.delete{
				width: 160rpx;
				vertical-align: middle;
				text-align: center;
				line-height: 140rpx;
				font-size: 36rpx;
				font-weight: bold;
				color: #fff;
			}
		}
		.menuactive{
			opacity: 1;
			right: 0;
			background: red !important;
		}
		.list-item{
			overflow: hidden;
			margin-bottom: 24rpx;
			background: #fff;
			box-shadow: 0rpx 10rpx 25rpx -8rpx rgba(41,41,41,0.1);
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
</style>
