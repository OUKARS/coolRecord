<template>
	<view class="wish-container">
		<my-bar :nav="setNav"></my-bar>
		<view class="wish-header">
			<text v-if="showSaveBtn == false">设置愿望，按照上下顺序优先完成哦~</text>
			<view v-else class="save-btn" @tap="post()">
				保存修改
			</view>
		</view>
		<view class="wrapper">
			<view class="wish-content" v-for="item in wishList" :key="item.level">
				<view class="wish-card card-active">
					<view class="level">
						No.{{item.level}}
					</view>
					<view class="title">
						{{item.name}}
					</view>
					<view class="money-content">
						已存金额/目标金额:<br />
						<view class="money">
							<view class="curmoney">
								{{nowsave}}
							</view>
							<view class="line">
								/
							</view>
							
							<view class="totalmoney">
								{{item.money}}
							</view>
							
						</view>
					</view>
					<view class="line">
						<view class="current">
							
						</view>
					</view>	
				</view>
				<view class="menu">
					<view class="btn up" v-if="item.level != 1" @tap="up(item.level)">
						上移
					</view>
					<view class="btn down" v-if="item.level != wishList.length" @tap="down(item.level)">
						下移
					</view>
					<view class="btn edit" @tap="editItem(item.level)">
						编辑
					</view>
					<view class="btn delete" @tap="deleteItem(item.level)">
						删除
					</view>
				</view>
			</view>
			<view class="addwish-container" @tap="addNewWish()">
				<image src="../../static/icon/add.png" class="add-img"></image>
			</view>
		</view>
		<view class="wishdetail-container" v-if="showDetail">
			
			<view class="addwish-header">
				添加愿望
				<view class="close-btn" @tap="closeDetail()">
					<image src="../../static/icon/close.png" class="c-img"></image>
				</view>
			</view>
			<view class="wishdetail-content">
				<view class="name-container">
					<view class="name-title">
						愿望名
					</view>
					<view class="input">
						<textarea class="name-textarea" type="digit" show-confirm-bar="false" auto-height adjust-position v-model="wishData.name" />
					</view>
				</view>
				<view class="money-container">
					<view class="money-title">
						目标金额
					</view>
					<view class="input">
						<input type="digit"  v-model="wishData.money"/>
					</view>
				</view>
				<view class="btn-container">
					<button class="wish-btn" type="default" @tap="addWish()">添加愿望</button>
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
					'navTitle':'本月愿望单' //导航标题
				},
				nowsave:0,
				showDetail:false,
				showSaveBtn:false,
				wishData:{
					name:'',
					money:0
				},
				wishList:[
					{
						name:'买一把吉他买一把吉他买一把吉他买一把吉他买一把吉他买一把吉他',
						money :200,
						level:1
					},
					{
						name:'捐款200元',
						money :200,
						level:2
					},
					{
						name:'口红',
						money :200,
						level:3
					},
					{
						name:'口红',
						money :200,
						level:4
					}
				]
			};
		},
		methods:{
			up(level){ 
				this.showSaveBtn = true;
				console.log(level)
				let index = level -1
				this.wishList[index].level--;
				this.wishList[index-1].level++;
				this.wishList.sort(function(a,b){
					return a.level-b.level
				})
			},
			down(level){
				this.showSaveBtn = true;
				let index = level -1
				this.wishList[index].level++;
				this.wishList[index+1].level--;
				this.wishList.sort(function(a,b){
					return a.level-b.level
				})
				
			},
			editItem(level){
				this.showSaveBtn = true;
				let index = level -1
				this.wishData = {
					name:this.wishList[index].name,
					money:this.wishList[index].money,
					level:level
				}
			　	uni.pageScrollTo({ 　　　　　　
			　　　　　　duration: 0,//过渡时间必须为0，否则运行到手机会报错
			　　　　　　scrollTop:0 //滚动到实际距离是元素距离顶部的距离减去最外层盒子的滚动距离（如res.top - data.top）
		　　　　})
				this.showDetail =true
			},
			deleteItem(level){
				this.showSaveBtn = true;
				let index = level -1
				for(let i = index;i<this.wishList.length;i++){
					this.wishList[i].level--;
				}
				this.wishList.splice(index, 1);
			},
			closeDetail(){
				this.showDetail = false;
				
			},
			addNewWish(){
				this.wishData={
					name:'',
					money:0
				}
				uni.pageScrollTo({
					　　　　　　duration: 0,//过渡时间必须为0，否则运行到手机会报错
					　　　　　　scrollTop:0 //滚动到实际距离是元素距离顶部的距离减去最外层盒子的滚动距离（如res.top - data.top）
		　　　　})
				this.showDetail = true
			},
			addWish(){
				this.showSaveBtn = true;
				this.wishList.push(this.wishData)
				console.log(this.wishData)
			},
			post(){
				
			}
		}
	}
</script>

<style lang="scss">
.wish-container{
	background: linear-gradient(0deg, #5153F6 0%, #4A34D5 100%);
	box-sizing: border-box;
	padding-bottom: 80rpx;
	min-height: 100vh;
	position: relative;
	.wish-header{
		color: #fff;
		font-size: 36rpx;
		text-align: center;
		margin: 40rpx 0 20rpx;
		font-weight: bold;
		.save-btn{
			width: 200rpx;
			margin: 0 auto;
			border-radius: 14rpx;
			box-sizing: border-box;
			padding: 12rpx 18rpx;
			background: #4331C1;
			animation: icon-shanshuo 1.2s infinite;
			-webkit-animation: icon-shanshuo 1.2s infinite;
		}
		
	}
	.wrapper{
		width: 90%;
		margin: 30rpx auto 20rpx;
		.wish-content{
			margin: 40rpx 0;
			display: flex;
			justify-content: space-between;
			.wish-card{
				width:80%;
				box-sizing: border-box;
				padding: 40rpx;
				border-radius: 28rpx;
				height: auto;
				min-height: 300rpx;
				.level{
					font-size: 26rpx;
					color: #808080;
				}
				.title{
					margin: 10rpx 0;
					font-size: 42rpx;
					font-weight: bold;
					color: #6327F6;
				}
				.money-content{
					margin: 30rpx 0 0;
					color: #808080;
					.money{
						margin: 5rpx 0;
						font-size: 38rpx;
						display: flex;
						justify-content: flex-start;
						align-items: center;
						
						.curmoney{
							font-weight: bold;
							color: #6327F6;
						}
						.line{
							margin: 0 10rpx;
							font-size: 32rpx;
							color: #D3D3D3;
						}
						.totalmoney{
							font-weight: bold;
							color: #FFD700;
						}
					}
				}
				
			}
			.menu{
				height: 300rpx;
				width: 16%;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;
				
				.btn {
					border-radius: 6rpx;
					text-align: center;
					box-sizing: border-box;
					padding: 12rpx 24rpx;
				}
				.up{
					background: #e8f4d9;
				}
				.down{
					background: #fde6d2;
				}
				.edit{
					background: rgb(255,227,108);;
				}
				.delete{
					color: #fff;
					background: red;
				}
			}
			.card-active{
				
				background: #fff;
				border: 0rpx;
				box-shadow:15rpx 15rpx 20rpx rgba(50,50,93,.1),5rpx 15rpx 20rpx rgba(0,0,0,.1);
			}
		}
		.addwish-container{
			display: flex;
			height: 250rpx;
			justify-content: center;
			align-items: center;
			height: 280rpx;
			border: 6rpx dashed #fff;
			border-radius: 28rpx;
			.add-img{
				width: 70rpx;
				height: 70rpx;
			}
		}
		
	}
	.wishdetail-container{
		position:absolute;
		left:50%;
		top:30%;
		background: #fff;
		width: 600rpx;
		margin-left: -300rpx;
		border-radius: 30rpx;
		box-sizing: border-box;
		padding: 40rpx;
		box-shadow:5rpx 5rpx 20rpx rgba(50,50,93,.2),5rpx 15rpx 20rpx rgba(0,0,0,.2);
		.addwish-header{
			font-size: 42rpx;
			font-weight: bold;
			color: rgb(75,60,221);
			text-align: center;
			margin: 10rpx 0;
			position: relative;
			.close-btn{
				top:0;
				right: 0;
				position: absolute;
				width: 50rpx;
				height: 50rpx;
				.c-img{
					width: 50rpx;
					height: 50rpx;
				}
			}
		}
		.wishdetail-content{
			margin:0 auto;
			z-index: 0;
			border-radius: 80rpx;
			background: #fff;
			height: auto;
			.name-title{
				font-size: 36rpx;
				font-weight: bold;
				color: #808080;
				margin-bottom:20rpx ;
			}
			.name-textarea{
				width: 500rpx;
			}
			.money-title{
				font-size: 36rpx;
				font-weight: bold;
				color:#808080;
				margin-bottom:20rpx ;
			}
			.input{
				border-radius: 20rpx;
				box-sizing: border-box;
				padding: 20rpx 24rpx;
				background: #F5F5F5;
				margin-bottom:20rpx ;
		
				// font-size: 36rpx;
				color: #6327F6;
			}
			
			
			.money-container{
				margin-bottom:10rpx ;
			}
			.btn-container{
				margin:80rpx 0 0;
				.wish-btn{
					width: 50%;
					border-radius: 80rpx;
					line-height: 90rpx;
					height: 90rpx;
					margin:10rpx auto;
					color: #fff;
					background: linear-gradient(90deg, #5153F6 0%, #4A34D5 100%);
				}
			}
		}
	}
	
}
</style>
