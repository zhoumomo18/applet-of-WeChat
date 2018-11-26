Component({
    properties: {
        // 这里定义了innerText属性，属性值可以在组件使用时指定
        expirydate: {
            type: String,
            value: ''
        },
        // 有效期结束时间
        expiryEndDate: {
            type: String,
            value: ''
        },
        subscribeRule: {
            type: Number,
            value: 0
        },
        price: {
            type: Number,
            value: 0
        }
    },
    data: {
      // 这里是一些组件内部数据
      activeIndex: ''
    },
    ready() {
        let that = this,
            arrDate = [],
            cur_days,
            date = new Date(),
            curDate = date.getDate(),
            curMonth = date.getMonth()+1,
            expirydate = parseInt(that.data.expirydate), // 价格有效期
            cur_year = date.getFullYear(),
            cur_month = date.getMonth()
        
            this.setData({
                curDate,
                curMonth
            })

            expirydate = (curDate>1) ? expirydate+1 : expirydate
        console.log(expirydate)
        for (let i=0; i < expirydate; i++){
            //全部时间的月份都是按0~11基准，显示月份才+1
            cur_year = cur_month > 11 ? cur_year + 1 : cur_year;
            cur_month = cur_month > 11 ?  1: cur_month + 1;
            cur_days = that.calculateDays(cur_year,cur_month)
            arrDate.push({'curYear':cur_year, 'curMonth':cur_month, 'curDays': cur_days})
        }
        for(let item of arrDate){
            for (let subItem of item.curDays){
                if (subItem.day!=''){
                    let curTime = item.curYear+ '/' + item.curMonth + '/'+ subItem.day,
                    differTime = new Date(curTime) - new Date()
                    subItem.price = (differTime > 0) ? that.data.price:''
                } else {
                    subItem.price = ''
                }
            }
            
        }
       
		this.setData({
            arrDate
        })
        // console.log(this.data.arrDate)
    },
    methods: {
        getThisMonthDays(year, month) {
            return new Date(year, month, 0).getDate();
        },
        getFirstDayOfWeek(year, month) {
            return new Date(Date.UTC(year, month - 1, 1)).getDay();
        },
        calculateDays(year, month) {
            let days = [],
                that = this
            const thisMonthDays = this.getThisMonthDays(year, month);
            const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
            
            if (firstDayOfWeek > 0){
                for (let i = 0; i < firstDayOfWeek; i++) {
                    days.push({day:'', isClicked: false});
                }
            }
            // console.log(that.data.curMonth)
            // console.log(that.data.curDay)
            for (let i = 1; i <= thisMonthDays; i++) {
                days.push({day: i, isClicked: false});
            }
            
            return days
        },
        datePicker(e) {
            let that = this,selectedDate,
                arrDate = that.data.arrDate,
                pindex = e.currentTarget.dataset.pindex,
                idx = e.currentTarget.dataset.index

            arrDate.map((item) => {
                item.curDays.map((subitem) => {
                    if (arrDate[pindex].curDays[idx].day=='' || arrDate[pindex].curDays[idx].price=='') {
                        return false
                    } else {
                        subitem.isClicked = false
                        arrDate[pindex].curDays[idx].isClicked = true
                        selectedDate = arrDate[pindex].curYear+'/'+arrDate[pindex].curMonth+'/'+arrDate[pindex].curDays[idx].day
                    }
                })
            })
            
            that.setData({
                arrDate
            })
            that.triggerEvent('datePicker', selectedDate)
        }
    }
})