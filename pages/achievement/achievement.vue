<template>
	<view class="achievement-container">
		<my-bar :nav="setNav"></my-bar>
		<view class="wrapper">
			<view class="achieve-content">
				<view class="achieve-item-raw" v-for="(raw,index) in achievementList" :key="index">
					<view class="achieve-item" v-for="item in raw" :key="item.id">
						<view class="icon" :class="(item.id ==  1?'copper-bg':(item.id == 2 ?'silver-bg':'gold-bg'))">
							<image class="icon-img" :src="item.url" mode=""></image>
						</view>
						<view class="title" >
							{{item.title}}
						</view>
						<view class="desc">
							{{item.desc}}
						</view>
						<view class="line">
							<view class="current" :class="(item.id ==  1?'copper-line':(item.id == 2 ?'silver-line':'gold-line'))">
							</view>
						</view>
						<view class="num-info">
							<view class="left">
								15
							</view>
							<view class="right">
								{{item.num}}
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
					'navTitle':'本月成就' //导航标题
				},
				achievementList:[
						[
							{
							id:1,
							title:'学习小将',
							desc:'本月学习金额超过50',
							num:30,
							url:'https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/icon/achievement/co-study.png?x-oss-process=style/blog_img'
							},
							{
								id:2,
								title:'学习能手',
								desc:'本月学习金额超过100',
								num:100,
								url:'https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/icon/achievement/silver-study.png?x-oss-process=style/blog_img'
							},
							{
								id:3,
								title:'学霸附体',
								desc:'本月学习金额超过200',
								num:200,
								url:'https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/icon/achievement/gold-study.png?x-oss-process=style/blog_img'
							},
						],
						[
							{
							id:1,
							title:'点头之交',
							desc:'本月社交金额超过50',
							num:50,
							url:'https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/icon/achievement/co-shejiao.png?x-oss-process=style/blog_img'
							},
							{
								id:2,
								title:'社交能手',
								desc:'本月社交金额超过100',
								num:100,
								url:'https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/icon/achievement/silver-shejiao.png?x-oss-process=style/blog_img'
							},
							{
								id:3,
								title:'大朋友圈',
								desc:'本月社交金额超过200',
								num:200,
								url:'https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/icon/achievement/gold-shejiao.png?x-oss-process=style/blog_img'
							},
						],
						[
							{
							id:1,
							title:'赚点零花钱',
							desc:'本月兼职金额超过100',
							num:100,
							url:'https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/icon/achievement/co-jianzhi.png?x-oss-process=style/blog_img'
							},
							{
								id:2,
								title:'勤工俭学',
								desc:'本月兼职金额超过200',
								num:200,
								url:'https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/icon/achievement/silver-jianzhi.png?x-oss-process=style/blog_img'
							},
							{
								id:3,
								title:'兼职达人',
								desc:'本月兼职金额超过400',
								num:400,
								url:'https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/icon/achievement/gold-jianzhi.png?x-oss-process=style/blog_img'
							},
						],
						[
							{
							id:1,
							title:'劳逸结合',
							desc:'本月娱乐金额超过100',
							num:100,
							url:'https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/icon/achievement/co-yule.png?x-oss-process=style/blog_img'
							},
							{
								id:2,
								title:'享受生活',
								desc:'本月娱乐金额超过200',
								num:200,
								url:'https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/icon/achievement/silver-yule.png?x-oss-process=style/blog_img'
							},
							{
								id:3,
								title:'城会玩',
								desc:'本月娱乐金额超过300',
								num:300,
								url:'https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/icon/achievement/gold-yule.png?x-oss-process=style/blog_img'
							},
						],
						[
							{
							id:1,
							title:'点滴爱心',
							desc:'本月捐赠金额超过20',
							num:20,
							url:'https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/icon/achievement/co-juanzeng.png?x-oss-process=style/blog_img'
							},
							{
								id:2,
								title:'奉献互助',
								desc:'本月捐赠金额超过50',
								num:50,
								url:'https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/icon/achievement/silver-juanzeng.png?x-oss-process=style/blog_img'
							},
							{
								id:3,
								title:'爱心大使',
								desc:'本月捐赠金额超过100',
								num:100,
								url:'https://oukarsblog.oss-cn-hangzhou.aliyuncs.com/weixin_miniapp_img/icon/achievement/gold-juanzeng.png?x-oss-process=style/blog_img'
							},
						],
					
				]
			};
		}
	}
</script>

<style lang="scss">
	.achievement-container{
		background: linear-gradient(0deg, #5153F6 0%, #4A34D5 100%);
		box-sizing: border-box;
		padding-bottom: 80rpx;
		min-height: 100vh;
		.wrapper{
			width: 94%;
			margin: 0 auto;
			
			.achieve-content{
				margin: 40rpx 0;
				.achieve-item-raw{
					display: flex;
					justify-content: space-around;
					margin: 40rpx 0;
					.achieve-item{
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: space-around;
						.icon{
							filter: grayscale(100%);
							width: 200rpx;
							height: 200rpx;
							.icon-img{
								width: 200rpx;
								height: 200rpx;
							}
						}
						// .gold-bg{
						// 	border: 10rpx solid #FFD700;
							
						// }
						// .silver-bg{
						// 	border: 10rpx solid #F5F5F5;
							
						// }
						// .copper-bg{
						// 	border: 10rpx solid #EF9F45;
							
						// }
						.title{
							// filter: grayscale(100%);
							margin: 10rpx 0;
							color: #fff;
							font-weight: bold;
						}
						.desc{
							// filter: grayscale(100%);
							width: 180rpx;
							margin: 10rpx 0;
							font-size: 24rpx;
							color: #DCDCDC;
						}
						.line{
							margin-top: 10rpx;
							width: 180rpx;
							height: 10rpx;
							border-radius: 10rpx;
							background: #C0C0C0;
							.current{
								width: 90rpx;
								height: 10rpx;
								border-radius: 10rpx;
								background: pink;
							}
							.gold-line{
								background:#FFD700 ;
							}
							.silver-line{
								background:#F5F5F5 ;
							}
							.copper-line{
								background:#EF9F45 ;
							}
						}
						.num-info{
							display: flex;
							justify-content: space-between;
							width: 180rpx;
							align-items: center;
							font-size: 22rpx;
							color: #F5F5F5;
						}
					}
					
				}
			}
		}
	}
</style>
