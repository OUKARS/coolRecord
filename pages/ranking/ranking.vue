<template>
	<view class="ranking-container">
		<my-bar :nav="setNav"></my-bar>
		<view class="wrapper">
			<view class="ranking-header">
				<view class="header-item peopleinfo" :class="{active:activeName == 'out'}"  @tap="toIndex('out')">
					支出
				</view>
				<view class="header-item line" >
					|
				</view>
				<view class="header-item graph" :class="{active:activeName == 'in'}" @tap="toIndex('in')">
					收入
				</view>
			</view>
			<view v-if="orderList.length==0" class="nodata-container">
				<view class="img-container">
					<image class="nodata-img" src="../../static/bg/nodata.png" mode=""></image>
				</view>
				
				<view class="text">
					今天没有账单记录哦~
				</view>
			</view>
			<view v-else class="recordlist-content">
				<view class="ranking-card" :key="item.orderId" v-for="(item,index) in orderList">
					<view class="left-ranknum" :class="(index ==0 ?'first':(index == 1 ? 'second':(index == 2 ? 'third':'')))">
						{{index+1}}
					</view>
					<view  class="list-item" >
						<view class="left-content">
							<image class="category-img" :src="item.categoryImgUrl" mode=""></image>
						</view>
						<view class="right-content">
							<view class="medal-icon">
								<image v-if="index == 0" class="medal-img" src="../../static/icon/jinpai.png"></image>
								<image v-if="index == 1" class="medal-img" src="../../static/icon/yinpai.png"></image>
								<image v-if="index == 2" class="medal-img" src="../../static/icon/tongpai.png"></image>
							</view>
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
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				setNav:{
					'color':'red',  //字体颜色
					'isdisPlayNavTitle':true, //是否显示返回按钮，由于导航栏是共用的，把所有的东西封装好，
					'navTitle':'账单排行' //导航标题
				},
				activeName:'out',
				orderList:[{
				  "orderId": 1,
				  "categoryId": 1,
				  "categoryName":"早餐",
				  "categoryImgUrl":'https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/icon/01eat.png?x-oss-process=style/blog_img',
				  "type": 0,
				  "date": "2020-05-10",
				  "remark": "暂无备注",
				  "money":2
				},{
				  "orderId": 1,
				  "categoryId": 1,
				  "categoryName":"早餐",
				  "categoryImgUrl":'https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/icon/01eat.png?x-oss-process=style/blog_img',
				  "type": 0,
				  "date": "2020-05-10",
				  "remark": "暂无备注",
				  "money":2
				},{
				  "orderId": 1,
				  "categoryId": 1,
				  "categoryName":"早餐",
				  "categoryImgUrl":'https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/icon/01eat.png?x-oss-process=style/blog_img',
				  "type": 0,
				  "date": "2020-05-10",
				  "remark": "暂无备注",
				  "money":2
				},{
				  "orderId": 1,
				  "categoryId": 1,
				  "categoryName":"早餐",
				  "categoryImgUrl":'https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/icon/01eat.png?x-oss-process=style/blog_img',
				  "type": 0,
				  "date": "2020-05-10",
				  "remark": "暂无备注",
				  "money":2
				},{
				  "orderId": 1,
				  "categoryId": 1,
				  "categoryName":"早餐",
				  "categoryImgUrl":'https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/icon/01eat.png?x-oss-process=style/blog_img',
				  "type": 0,
				  "date": "2020-05-10",
				  "remark": "暂无备注",
				  "money":2
				},{
				  "orderId": 1,
				  "categoryId": 1,
				  "categoryName":"早餐",
				  "categoryImgUrl":'https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/icon/01eat.png?x-oss-process=style/blog_img',
				  "type": 0,
				  "date": "2020-05-10",
				  "remark": "暂无备注",
				  "money":2
				},{
				  "orderId": 1,
				  "categoryId": 1,
				  "categoryName":"早餐",
				  "categoryImgUrl":'https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/icon/01eat.png?x-oss-process=style/blog_img',
				  "type": 0,
				  "date": "2020-05-10",
				  "remark": "暂无备注",
				  "money":2
				},{
				  "orderId": 1,
				  "categoryId": 1,
				  "categoryName":"早餐",
				  "categoryImgUrl":'https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/icon/01eat.png?x-oss-process=style/blog_img',
				  "type": 0,
				  "date": "2020-05-10",
				  "remark": "暂无备注",
				  "money":2
				},{
				  "orderId": 1,
				  "categoryId": 1,
				  "categoryName":"早餐",
				  "categoryImgUrl":'https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/icon/01eat.png?x-oss-process=style/blog_img',
				  "type": 0,
				  "date": "2020-05-10",
				  "remark": "暂无备注",
				  "money":2
				},],
				outList:[],
				inList:[]
			};
		},
		methods:{
			toIndex(indexName){
				this.activeName = indexName
			},
		}
	}
</script>

<style lang="scss">
	.ranking-container{
		background: linear-gradient(0deg, #5153F6 0%, #4A34D5 100%);
		box-sizing: border-box;
		padding-bottom: 80rpx;
		min-height: 100vh;
		.wrapper{
			margin-top: 10rpx;
			.ranking-header{
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
			.recordlist-content{
				margin-top: 30rpx;
				box-sizing: border-box;
				padding: 10rpx 40rpx;
				border-radius:20rpx ;
				// background: #fff;
				width: 100%;
				height: auto;
				.ranking-card{
					display: flex;
					justify-content: space-between;
					align-items: center;
					.left-ranknum{
						font-weight: bold;
						color: #DCDCDC;
						font-size: 56rpx;
						width: 12%;
						
					}
					.first{
						color: #FFD700;
					}
					.second{
						color: #F5F5F5;
					}
					.third{
						color:#EF9F45 ;
					}
					.list-item{
						position: relative;
						margin-bottom: 24rpx;
						background: #fff;
						box-shadow: 0rpx 10rpx 25rpx -8rpx rgba(41,41,41,0.5);
						border-radius: 15rpx;
						box-sizing: border-box;
						padding: 20rpx 40rpx;
						// color: ;
						
						// background-image:linear-gradient(75deg,#AF4DFF,#6327F6);
						width: 88%;
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
							
							padding-left: 5rpx;
							border-left: 2rpx solid rgb(230,210,240);
							width: 84%;
							display: flex;
							justify-content: space-between;
							.medal-icon{
								position: absolute;
								top:-20rpx;
								left: -40rpx;
								.medal-img{
									width: 100rpx;
									height: 100rpx;
								}
							}
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
</style>
