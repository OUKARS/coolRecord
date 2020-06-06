<template>
	<view class="gesture-container">
		<my-bar :nav="setNav"></my-bar>
        <view class="gesture-content">
            <mpvue-gesture-lock :containerWidth="600" :cycleRadius="70" @end="onEnd" :password="password"></mpvue-gesture-lock>
			<view class="uni-text">{{text}}</view>
        </view>
        
	</view>
</template>

<script>
    import mpvueGestureLock from '@/components/mpvueGestureLock';

    export default {
        components: {
            mpvueGestureLock
        },
        data() {
            return {
				setNav:{
					'color':'red',  //字体颜色
					'isdisPlayNavTitle':true, //是否显示返回按钮，由于导航栏是共用的，把所有的东西封装好，
					'isShowGoal':false,
					'isShowSetting':false,
					'navTitle':'手势' //导航标题
				},
				title : "手势图案",
                password: [],
                text: '请设定手势'
            }
        },
        methods: {
            onEnd(data) {
                if (this.password.length) {
                    if (this.password.join('') === data.join('')) {
                        this.text = '手势设定完成'
                        this.password = []
                    } else {
                        this.text = '两次手势设定不一致'
                        this.password = []
                    }
                } else {
                    this.text = '请确认手势设定'
                    this.password = data
                }
            }
        }
    }
</script>

<style lang="scss">
	.gesture-container{
		background: linear-gradient(0deg, #5153F6 0%, #4A34D5 100%);
		min-height: 100vh;
		.gesture-content{
			min-height: 100vh;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			margin-top: 50rpx;
		}
	}
    .uni-text{
		color: #fff;
		height: 300rpx;
        font-size: 42rpx;
        text-align: center;
    }
</style>
