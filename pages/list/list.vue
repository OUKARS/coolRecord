<template>
	<view class="container" >
		<my-bar :nav="setNav"></my-bar>
		
		<view class="list-header">
			<view class="text" @tap="showDatePicker()">
				<view class="date">
					{{nowMonth}}
				</view>
				<view class="fold-icon">
					<image src="../../static/icon/fold.png" class="fold-img"></image>
				</view>
			</view>
			<view class="btn-container">
				<view class="category-btn">
					<image v-if="selectCategoryItem == ''" class="search-img" src="../../static/icon/search.png"></image>
					<image v-if="selectCategoryItem != ''" class="categoryitem-img" :src="selectCategoryItem.categoryImgUrl"></image>
					 <view class="text" @tap="openPop()">
					 {{selectCategoryItem == ''?'选择分类':selectCategoryItem.categoryName}}</view>
					 <view v-if="selectCategoryItem != ''" class="clear-btn" @tap="clearSelectItem()">
					 	<image src="../../static/icon/clear.png" class="clear-img"></image>
					 </view>
				</view>
			</view>
			
		</view>
		<view v-if="orderList.length==0" class="nodata-container">
				<view class="img-container">
					<image class="nodata-img" src="../../static/bg/nodata.png" mode=""></image>
				</view>
				<view class="text">
					貌似没有账单记录哦~
				</view>
		</view>
	<view  v-else class="listdata-container">
		<load-refresh
		  ref="loadRefresh"
		  :isRefresh="true"
		  :refreshTime="800"
		  :heightReduce="10"
		  :pageNo="currPage"
		  :totalPageNo="totalPage" 
		  @loadMore="loadMore" 
		  @refresh="refresh">
		  <view slot="content-list">
			<view class="orderlist-content">
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
		</load-refresh>
		</view>	
		<lee-popup ref="popup" type="bottom">
			<view class="category-choose-container">
				<view class="close" @tap="closePop()" v-if="popshow == true">
					<image class="close-img" src="../../static/icon/close.png"></image>
				</view>
				<view class="header">
					<view class="title">
						<image style="width: 36rpx;height: 35rpx;margin-right: 8rpx;" src="../../static/icon/choosecategory.png" mode=""></image>
						选择分类
					</view>
					<view class="type">
						<text class="type-btn" :class="{'active':selectType == 0}" @tap="changeSelectType(1)">支出</text>
						<text class="type-btn" :class="{'active':selectType == 1}"  @tap="changeSelectType(0)">收入</text>
						 
					</view>
					
				</view>
				<view class="content">
					<view v-if="selectType==0" class="category-item" :key="item.categoryId" v-for="item in categoryList.outdata" @tap="selectCategory(item)">
						<image class="category-img" :src="item.categoryImgUrl"></image>
						<view class="category-name">
							{{item.categoryName}}
						</view>
					</view>
					<view v-if="selectType==1" class="category-item" :key="item.categoryId" v-for="item in categoryList.indata" @tap="selectCategory(item)">
							<image class="category-img" :src="item.categoryImgUrl"></image>
							<view class="category-name">
								{{item.categoryName}}
							</view>
					</view>
				</view>
			</view>
			
		</lee-popup>
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
	import loadRefresh from '@/components/load-refresh/load-refresh.vue'
	import LeePopup from '@/components/lee-popup/lee-popup.vue'
	import {formatDate } from '../../utils/date.js'
	var startX = 0;
	var endX =0;
	export default {
	    components: {
			LeePopup,
			loadRefresh
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
				nowMonth:'',
	            nowdate:'',
				orderList:[],
				categoryList:{},
				currPage:1,//当前页码
				totalPage: 1,// 总页数
				selectCategoryItem:'',
				selectType:0,
				selectCategoryId:'',
				selectOrderId:'',
				popshow:false,
				openpicker:false,
				firstLoad:true
	        }
	    },
	    methods: {
			loadMore() {
				console.log('loadMore')
				// let data = {"orderId":"1594614713297175617","categoryId":6,"categoryName":"学习","categoryImgUrl":"https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/icon/06xuexi.png","type":0,"date":"2020-07-13 00:00:00","remark":"练习册1111","money":4.00}
				// this.orderList.push(data)
				// 请求新数据完成后调用 组件内loadOver()方法
				// 注意更新当前页码 currPage
				this.currPage++;
				this.fetchOrderList(this.nowdate,this.currPage)
				this.$refs.loadRefresh.loadOver()
			},
			refresh() {
				this.fetchOrderList(this.nowdate,1,this.selectCategoryId,true)
				// console.log(res)
			},
			async fetchOrderList(nowdate,page,categoryid='',refresh = false){
				this.firstLoad=false
					uni.showLoading({
					    title: '加载中...'
					});
				const res = await this.$api.fetchOrderList(nowdate,page,categoryid)
				if(res.data.message!='无账单'){
					this.totalPage = res.data.totalPage
					var list = res.data.data
					list.forEach(e=>{
						e.date = e.date.replace(/-/g, '/')
						e.date = formatDate(new Date(e.date))
					})
					this.orderList = list
					uni.hideLoading();
					console.log(this.orderList)
				}
				
			},
			async fetchCategoryData(){
				const res = await this.$api.fetchCategoryData()
				this.categoryList = res.data
			},
			openPop(){
				this.popshow = true
			    this.$refs.popup.open()
			},
			closePop(){
				
				this.$refs.popup.close()
				this.popshow = false
			},
			selectCategory(item){
				wx.vibrateShort()
				this.selectCategoryItem = item
				this.selectCategoryId = item.categoryId
				this.$refs.popup.close()
				this.fetchOrderList(this.nowdate,1,this.selectCategoryId)
			},
			clearSelectItem(){
				this.selectCategoryItem = ''
				this.selectCategoryId = ''
			},
			changeSelectType(type){
				this.selectType = !type
			},
			completeDate(value) {
			        return value < 10 ? "0"+value:value;
			},
			showDatePicker(){
				this.openpicker = true
				this.$refs.date.show()
			},
			onConfirm(event,type){
				wx.vibrateShort()
				this.nowMonth = event.value
				this.nowdate = event.value+'-01'
				this.fetchOrderList(this.nowdate,1,this.selectCategoryId)
				this.openpicker = false
			},
			onCancel(){
				this.openpicker = false
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
					this.fetchOrderList(this.nowdate,1)
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
		onLoad() {
			var nowDate = new Date();
			var today = this.getNowFormatDay(nowDate)
			this.nowMonth =nowDate.getFullYear()+'-'+ this.completeDate(nowDate.getMonth()+1)
			this.nowdate = today
			console.log(this.nowdate)
			this.fetchCategoryData()
			this.fetchOrderList(this.nowdate,1)
		}
	}
</script>

<style lang="scss">
.container{
	background: linear-gradient(0deg, #5153F6 0%, #4A34D5 100%);
	min-height: 100vh;

	.list-header{
		box-sizing: border-box;
		padding: 20rpx 20rpx;
		display: flex;
		justify-content: space-between;
		vertical-align: middle;
		font-size: 36rpx;
		.text{
			background: #4331C1;
			border-radius: 24rpx;
			box-sizing: border-box;
			padding: 10rpx 20rpx;
			color: #fff;
			font-weight: bold;
			vertical-align: middle;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.date{
				
			}
			.fold-icon{
				margin-left: 8rpx;
				width: 40rpx;
				height: 40rpx;
				.fold-img{
					width: 36rpx;
					height: 36rpx;
				}
			}
		}
		.btn-container{
			display: flex;
			justify-content: flex-end;
			.category-btn{
				font-size: 32rpx;
				border-radius: 24rpx;
				box-sizing: border-box;
				padding: 6rpx 12rpx;
				color: #DCDCDC;
				background: #4331C1;
				font-weight: bold;
				display: flex;
				justify-content: center;
				align-items: center;
				vertical-align: middle;
				.search-img{
					margin-top: 4rpx;
					padding: 10rpx 5rpx 10rpx 20rpx;
					vertical-align: middle;
					width: 36rpx;
					height: 36rpx;
				}
				.categoryitem-img{
					margin: 0 0 0 2rpx;
					width: 42rpx;
					height: 42rpx;
				}
				.text{
					padding: 10rpx 20rpx 10rpx 5rpx;
					vertical-align: middle;
					margin-left: 2rpx;
				}
				.clear-btn{
					color: white;
					margin-right: 4rpx;
					width: 36rpx;
					height: 36rpx;
					.clear-img{
						width: 36rpx;
						height: 36rpx;
					}
				}
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
	.listdata-container{
		width: 100%;
		height: 100%;
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
	.category-choose-container{
		height: auto;
		position: relative;
		.close{
			text-align: center;
			line-height: 72rpx;
			top:-120rpx;
			left: 50%;
			margin-left: -36rpx;
			color: #fff;
			font-size: 56rpx;
			position: absolute;
			width: 72rpx;
			height: 72rpx;
			.close-img{
				width: 72rpx;
				height: 72rpx;
			}
		}
		.header{
			
			margin-bottom:20rpx ;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: rgb(75,60,221);
			.title{
				font-size:42rpx;
				font-weight: bold;
				
			}
			.type{
				.type-btn{
					margin: 0 10rpx;
					box-sizing: border-box;
					padding: 6rpx 12rpx;
					border: 5rpx;
				}
				.active{
					background:  rgb(75,60,221);
					color: white;
				}
			}
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
