<template>
  <view class="sign-calendar">
    <view class="week">
      <view class="week-day" v-for="(item, index) in weekDay" :key="index">{{ item }}</view>
    </view>

    <view :class="{ hide: !monthOpen }" class="content">
      <view :style="{ top: positionTop + 'rpx' }" class="days">
        <view class="item" v-for="(item, index) in dates" :key="index">
          <view class="day" @click="selectOne(item, $event)" 
          :class="{ choose: choose == `${item.year}-${item.month + 1}-${item.date}` && item.lm, 
          nolm: !item.lm,today:isToday(item.year, item.month, item.date),isWorkDay:isWorkDay(item.year, item.month + 1, item.date),isFutureDay:isFutureDay(item.year, item.month + 1, item.date)}">
          {{ item.date }}
          </view>
          <image src="https://ftp.bmp.ovh/imgs/2020/05/03243e6f6a930925.png" mode="" class="workDay" 
          v-if="isWorkDay(item.year, item.month + 1, item.date) && !isFutureDay(item.year, item.month + 1, item.date) && item.lm && !isToday(item.year, item.month, item.date) && choose != `${item.year}-${item.month + 1}-${item.date}` && !isSigned(item.year, item.month + 1, item.date)"></image>
          <image src="https://ftp.bmp.ovh/imgs/2020/05/48e780c82230b2ef.png" mode="" class="notSigned" v-if="item.lm && isSigned(item.year, item.month + 1, item.date) && !isToday(item.year, item.month, item.date) && choose != `${item.year}-${item.month + 1}-${item.date}`"></image>
         <view class="today-text" v-if="isToday(item.year, item.month, item.date)">今日</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'dark-calendar',
  props: {
    // 第一列星期几
    weekstart: {
      type: Number,
      default: 1
    },
    // 已经签到的日期
    signeddates: {
      type: Array,
      default: function(){
          return []
      }
    },
    // 是否展开
    open: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      text: {
        year: '年',
        month: '月',
        week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        today: '今日'
      },
      y: new Date().getFullYear(), // 年
      m: new Date().getMonth(), // 月
      dates: [], // 当前月日期集合
      positionTop: 0,
      monthOpen: true,
      choose: '',
      curMonth:''
    }
  },
  created() {
    this.dates = this.monthDay(this.y, this.m)
    !this.open && this.trgWeek()
    this.curMonth = this.m+1
  },
  mounted() {
    let date = new Date()
    let y = date.getFullYear()
    let m = date.getMonth()
    let d = date.getDate()
    this.choose = `${y}-${m + 1}-${d}`

    // console.log(this.choose)
  },
  computed: {
    // 顶部星期栏目
    weekDay() {
      return this.text.week.slice(this.weekstart - 1).concat(this.text.week.slice(0, this.weekstart - 1))
    },
    height() {
      return (this.dates.length / 7) * 80 + 'rpx'
    }
  },
  methods: {
    // 获取当前月份天数
    monthDay(y, m) {
      let firstDayOfMonth = new Date(y, m, 1).getDay() // 当月第一天星期几
      let lastDateOfMonth = new Date(y, m + 1, 0).getDate() // 当月最后一天
      let lastDayOfLastMonth = new Date(y, m, 0).getDate() // 上一月的最后一天
      let dates = [] // 所有渲染日历
      let weekstart = this.weekstart == 7 ? 0 : this.weekstart // 方便进行日期计算，默认星期从0开始
      let startDay = (() => {
        // 周初有几天是上个月的
        if (firstDayOfMonth == weekstart) {
          return 0
        } else if (firstDayOfMonth > weekstart) {
          return firstDayOfMonth - weekstart
        } else {
          return 7 - weekstart + firstDayOfMonth
        }
      })()
      let endDay = 7 - ((startDay + lastDateOfMonth) % 7) // 结束还有几天是下个月的
      for (let i = 1; i <= startDay; i++) {
        dates.push({
          date: lastDayOfLastMonth - startDay + i,
          day: weekstart + i - 1 || 7,
          month: m - 1 >= 0 ? m - 1 : 12,
          year: m - 1 >= 0 ? y : y - 1
        })
      }
      for (let j = 1; j <= lastDateOfMonth; j++) {
        dates.push({
          date: j,
          day: (j % 7) + firstDayOfMonth - 1 || 7,
          month: m,
          year: y,
          lm: true
        })
      }
      for (let k = 1; k <= endDay; k++) {
        dates.push({
          date: k,
          day: (lastDateOfMonth + startDay + weekstart + k - 1) % 7 || 7,
          month: m + 1 <= 11 ? m + 1 : 0,
          year: m + 1 <= 11 ? y : y + 1
        })
      }
      // console.log(dates)
      return dates
    },
    isWorkDay(y, m, d){//是否工作日
       //  let ymd = `${y}/${m}/${d}`;
       // let formatDY = new Date(ymd.replace(/-/g, "/"));
       //  let week = formatDY.getDay();
       //  if(week==0 || week==6){
       //      return false
       //  }else{
       //    return true
       //  }
       return true
    },
    isFutureDay(y, m, d){//是否未来日期
        let ymd = `${y}/${m}/${d}`;
        let formatDY = new Date(ymd.replace(/-/g, "/"));
        let showTime = formatDY.getTime();
        let curTime = new Date().getTime();
        if(showTime>curTime){
             return true
        }else{
             return false
        }
    },
    // 已经签到处理
    isSigned(y, m, d) {
      let flag = false
      for (let i = 0; i < this.signeddates.length; i++) {
        let dy = `${y}-${m}-${d}`
        if (this.signeddates[i] == dy) {
          flag = true
          break
        }
      }
      return flag
    },
    isToday(y, m, d) {
      let date = new Date()
      return y == date.getFullYear() && m == date.getMonth() && d == date.getDate()
    },
    // 切换成周模式
    trgWeek() {
      this.monthOpen = !this.monthOpen
      if (this.monthOpen) {
        this.positionTop = 0
      } else {
        let index = -1
        this.dates.forEach((i, x) => {
          this.isToday(i.year, i.month, i.date) && (index = x)
        })
        this.positionTop = -((Math.ceil((index + 1) / 7) || 1) - 1) * 80
      }
    },
    // 点击回调
    selectOne(i, event) {
        let d = i.date;
        let m = i.month + 1;
        if(d<10){
            d = '0'+d;
        }
        if(m<10){
            m = '0' + m;
        }
      let date = `${i.year}-${m}-${d}`
      let dateFormat = `${i.year}-${i.month+1}-${i.date}`;
      let selectD = new Date(date).getTime();
      let curTime = new Date().getTime();
       let showM = i.month + 1;
       //  console.log(selectD)
       //  console.log(curTime)
       // console.log(i)
      if (selectD>curTime || !i.lm) {
        console.log('不在可选范围内')
        return false
      }else{
         this.choose = dateFormat //取消点击反馈
         this.$emit('onDayClick', dateFormat) 
      }
    },
    //改变年月
    changYearMonth(y,m){
        this.dates = this.monthDay(y,m);
        this.curMonth = Number(m)+1;
    },
    // 上个月，下个月
    turning(_action) {
      if (_action === 'next') {
        if (this.m + 1 == 12) {
          this.m = 0
          this.y = this.y + 1
        } else {
          this.m = this.m + 1
        }
      } else {
        if (this.m + 1 == 1) {
          this.m = 11
          this.y = this.y - 1
        } else {
          this.m = this.m - 1
        }
      }

      this.dates = this.monthDay(this.y, this.m)
    }
  }
}
</script>

<style lang="scss" scoped>
.sign-calendar {
  color: #bbb7b7;
  font-size: 28upx;
  text-align: center;
  background-color: #FFF;
  padding-bottom: 10upx;

  .top-bar {
    font-size: 28upx;
    height: 80upx;
    line-height: 80upx;
    border-bottom: 1upx solid rgba(255, 255, 255, 0.3);

    display: flex;

    > view {
      flex: 1;
    }
    .cur-month{
        font-weight: bold;
        font-size: 35rpx;
    }
    .change-btn{
        color: #4d84f9;
    }
  }

  .week {
     color: #999999;
    display: flex;
    align-items: center;
    height: 80upx;
    line-height: 80upx;
    border-bottom: 1upx solid rgba(255, 255, 255, 0.2);

    view {
      flex: 1;
    }
  }

  .content {
    position: relative;
    // overflow: hidden;
    transition: height 0.4s ease;

    .days {
      transition: top 0.3s;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      position: relative;

      .item {
        position: relative;
        display: block;
        height: 80upx;
        line-height: 80upx;
        width: calc(100% / 7);
        margin-bottom: 20rpx;
        color: #666666;
        font-weight: bold;

        .day {
          font-style: normal;
          display: inline-block;
          vertical-align: middle;
          width: 84rpx;
          height: 84rpx;
          overflow: hidden;
          border-radius: 4rpx;

          &.choose {
              z-index: 99;
            background-color: #2F89FC;
            color: #fff;
          }

          &.nolm {
            color: #fff;
            opacity: 0.3;
          }
        }
        .isWorkDay{
            // color: #42464A;
        }
        .isFutureDay{
            color: #BEBEBE;
        }
        // .notSigned {
        //   font-style: normal;
        //   width: 8rpx;
        //   height: 8rpx;
        //   background: #FA7268;
        //   border-radius: 10upx;
        //   position: absolute;
        //   left: 50%;
        //   bottom: 0;
        //   pointer-events: none;
        // }
        .notSigned{
            width: 20rpx;
            height: 20rpx;
            position: absolute;
            bottom: 0;
            left: 42%;
            z-index: 0;
        }
        .today{
            color: #fff;
            line-height: 60rpx;
            background-color:#facf5a;
        }
        // .workDay{
        //    font-style: normal;
        //    width: 8rpx;
        //    height: 8rpx;
        //    background: #4D7DF9;
        //    border-radius: 10upx;
        //    position: absolute;
        //    left: 50%;
        //    bottom: 0;
        //    pointer-events: none; 
        // }
        .workDay{
            width: 20rpx;
            height: 20rpx;
            position: absolute;
            bottom: 0;
            left: 42%;
            z-index: 0;
        }
        .today-text {
          position: absolute;
          left: 30%;
          bottom: 5rpx;
          color: #fff;
          font-size: 22rpx;
          line-height: 32rpx;
          font-weight: normal!important;
        }
      }
    }
  }

  .hide {
    height: 80upx !important;
  }

  .weektoggel {
    width: 80upx;
    height: 40upx;
    margin: 10upx auto 0;

    &.down {
      transform: rotate(180deg);
    }
  }
}
</style>
