<template>
	<view class="animated bounceIn">
		<view class="swiper-header">
			<view class="title">
					<image class="icon" src="../../static/icon/index-card.png" mode=""></image>
				<view class="text">
					账单概况
				</view>
			</view>
			
		</view>
		<view class="swiperPanel" @touchstart="startMove" @touchend="endMove">
			<view class="swiperItem" v-for="(item, index) in swiperList" :key="index" :style="{transform: itemStyle[index].transform, zIndex: itemStyle[index].zIndex, opacity: itemStyle[index].opacity,transition:itemStyle[index].transition,filter:itemStyle[index].filter}">
				<view class="children" :style="{backgroundImage:'linear-gradient(75deg,'+colorList[index].from+' 0,'+colorList[index].to+')'}">
					<view class="num-content">
						<view class="pay-content">
							<view class="pay-title">
								今日支出(元)
							</view>
							<view class="pay-num">
								146.00
							</view>
						</view>
						<view class="income-content">
							<view class="income-title">
								今日收入(元)
							</view>
							<view class="income-num">
								23.00
							</view>
						</view>
					</view>
					
					<view class="progress-content">
						<view class="progress-text">
							<view class="out-text">
								<view class="title">
									净支出(元)
								</view>
								<view class="num">
									16.00
								</view>
							</view>
							<view class="total-text">
								<view class="title">
									今日限额(元)
								</view>
								<view class="num">
									30.00
								</view>
							</view>
							
						</view>
						<view class="line-container">
							<view class="line">
	<!-- 							<view class="point">
									
								</view> -->
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			swiperList: {
				type: Array,
				default: function () {
				        return []
				    }
			}
		},
		data() {
			return {
				slideNote: {
					x: 0,
					y: 0
				},
				screenWidth: 0,
				itemStyle: [],
				colorList:[
					{
						from:'#FADA64',
						to:'#FF9600'
					},{
						from:'#AF4DFF',
						to:'#6327F6'
					},{
						from:'#50C832',
						to:'#0f9d58'
					}]

			};
		},
		created() {
			var macInfo = uni.getSystemInfoSync();
			this.screenWidth = macInfo.screenWidth;
			// 计算swiper样式
			this.swiperList.forEach((item, index) => {
				this.itemStyle.push(this.getStyle(index))
			})
		},
		methods: {
			getStyle(e) {
				// var right = this.swiperList.length - e
				console.log(e)
				if(e==0){
					return {
						transform: 'scale(.8) translate(0%,0%)',
						zIndex: 9998,
						opacity:1,
						transition:'all .'+3+'s;',
						filter: 'brightness(.8)'

					}
				} else if(e==1){
					return {
						transform: 'scale(1) translate(0%,14%)',
						zIndex: 9999,
						opacity:1,
						transition:'all .'+6+'s;',
						filter: 'brightness(1)'

					}
				}else {
					return {
						transform: 'scale(.8) translate(0%,35%)',
						zIndex: 9998,
						opacity:1,
						transition:'all .'+9+'s;',
						filter: 'brightness(.8)'

					}
				}
			},
			startMove(e) {
				this.slideNote.x = e.changedTouches[0] ? e.changedTouches[0].pageX : 0;
				this.slideNote.y = e.changedTouches[0] ? e.changedTouches[0].pageY : 0;
			},
			endMove(e) {
				
				var newList = JSON.parse(JSON.stringify(this.itemStyle))
				if ((e.changedTouches[0].pageY - this.slideNote.y) < 0) {
					// 向上滑动
					var last = [newList.pop()]
					newList = last.concat(newList)
				} else {
					// 向下滑动
					newList.push(newList[0])
					newList.splice(0, 1)
				}
				this.itemStyle = newList
				console.log("endmove")
			}

		}
	}
</script>

<style lang="scss">
	.swiper-header{
		.title{
			display: flex;
			align-items:center;
			.icon{
				width: 44rpx;
				height: 44rpx;
				margin-right: 6rpx;
			}
			.text{
				color:#1D1C5C;
				font-weight: bold;
				font-size: 36rpx;
			}
		}
	}
	.swiperPanel {
		box-sizing: border-box;
		margin: 20rpx 0;
		padding-bottom: 20rpx;
		height:480rpx;
		width: 100%;
		overflow-x:hidden;
		// overflow: hidden;
		position: relative;
		.swiperItem {
			height: auto;
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			.children {
				box-sizing: border-box;
				position: relative;
				padding:30rpx;
				border-radius: 50rpx;
				height: 360rpx;
				width: 640rpx;
				margin: 2rpx auto;
				background: #fff;
				box-shadow:15rpx 15rpx 20rpx rgba(50,50,93,.1),5rpx 15rpx 20rpx rgba(0,0,0,.1);
				letter-spacing: 2rpx;
				.icon-rmb{
					width:60rpx;
					height: 60rpx;
				}
				.num-content{
					display: flex;
					justify-content: space-between;
					.pay-content{
						margin:10rpx 0;
						.pay-title{
					
							margin-bottom: 5rpx;
							font-size: 1rem;
							color: #fff;
						}
						.pay-num{
							font-size: 1.8rem;
							color: #fff;
							font-weight: bold;
						}
					}
					.income-content{
						text-align: right;
						margin:10rpx 0;
						.income-title{
					
							margin-bottom: 5rpx;
							font-size: 1rem;
							color: #fff;
						}
						.income-num{
							font-size: 1.8rem;
							color: #fff;
							font-weight: bold;
						}
					}
				}
				.progress-content{
					position: absolute;
					bottom: 40rpx;
					width: 580rpx;

					// margin-top: 40rpx;
					height: auto;
					.progress-text{
						display: flex;
						justify-content: space-between;
						.out-text{
							color: #fff;
							text-align: left;
							.title{
								font-size: .5rem;
							}
							.num{
								font-size: .9rem;
								font-weight: bold;
							}
						}
						.total-text{
							color: #fff;
							text-align: right;
							.title{
								font-size: .5rem;
							}
							.num{
								font-size: .9rem;
								font-weight: bold;
							}
						}
					}
					.line-container{
						
						margin-top: 10rpx;
						width: 100%;
						height: 18rpx;
						background: #F8F8F8;
						border-radius: 14rpx;
						.line{
							width: 40%;
							position: relative;
							height: 100%;
							background: #FDDB65;
							border-radius: 18rpx;
							// .point{
							// 	position: absolute;
							// 	width: 30rpx;
							// 	height: 30rpx;
							// 	border-radius: 15rpx;
							// 	top:-8rpx;
							// 	background: #fff;
							// 	left:100%;
							// 	margin-left: -15rpx;
								
							// }
						}
					}
					
				}
			}
		}
	}

</style>
