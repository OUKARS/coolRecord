<template>
	<view>
		<my-bar :nav="setNav"></my-bar>
		<com-calendar ref="calendar" :signeddates="signeddates" @onDayClick="onDayClick"></com-calendar>
		list
	</view>
</template>

<script>
	import ComCalendar from '../../components/ren-calendar/ren-calendar.vue';
	export default {
	    components: {
	        ComCalendar
	    },
	    data() {
	        return {
	            signeddates:['2020-1-1']
	        }
	
	    },
	    methods: {
	        onMonthChange(){//改变月份
	            this.$refs.calendar.changYearMonth(yyyy,MM)
	        },
	        onDayClick(e) {//日点击
	            console.log(e);
	        }
	    }
	}
</script>

<style>

</style>
