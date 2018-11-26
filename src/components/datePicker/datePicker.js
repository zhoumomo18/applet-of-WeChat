Component({
    properties: {
        // 这里定义了innerText属性，属性值可以在组件使用时指定
        MonthNumber: {
            type: String,
            value: 1,
        },
        selectStart: {
            type: String,
            value: 1,
        },
        selectEnd: {
            type: String,
            value: 1,
        },
    },
    data: {
        // 这里是一些组件内部数据
        activeIndex: '',
        weeksList: [
            '日',
            '一',
            '二',
            '三',
            '四',
            '五',
            '六',
        ],
        dateList: [],
        selectStart: '',
        selectEnd: '',
    },
    ready() {
        var that = this;
        var nowDate = new Date();
        var startYear = nowDate.getFullYear();
        var startMonth = nowDate.getMonth() +1;
        var startDay = nowDate.getDate();
        var MonthNumber = that.data.MonthNumber ? parseInt(that.data.MonthNumber) : 0;
        var timeArr = that.getNextMonth(startYear, startMonth, startDay, MonthNumber);
        var endYear = timeArr[0];
        var endMonth = timeArr[1];
        var endDay = timeArr[2];
        var selectStart = that.data.selectStart ? that.data.selectStart : that.getDateStr(0);
        var selectEnd = that.data.selectEnd ? that.data.selectEnd : that.getDateStr(1);
        that.setData({
            startYear: startYear,
            startMonth: startMonth,
            startDay: startDay,
            endYear: endYear,
            endMonth: endMonth,
            endDay: endDay,
            selectStart: selectStart,
            selectEnd: selectEnd,
        })
        that.computeDateList();
        that.setDaysIsSelect();
    },
    methods: {
        getDateStr(AddDayCount) {
            var dd = new Date();
            dd.setDate(dd.getDate() + AddDayCount);   //获取AddDayCount天后的日期
            var year = dd.getFullYear();
            var mon = dd.getMonth() + 1;                             //获取当前月份的日期
            var day = dd.getDate();
            return year + "-" + mon + "-" + day;
        },
        getThisMonthDays(year, month) {
            return new Date(year, month, 0).getDate();
        },
        getFirstDayOfWeek(year, month) {
            return new Date(Date.UTC(year, month - 1, 1)).getDay();
        },
        calculateDays(year, month) {
            var that = this
            var startYear = that.data.startYear;
            var startMonth = that.data.startMonth;
            var startDay = that.data.startDay;
            var startStr = that.data.startYear + '-' + that.data.startMonth + '-' + that.data.startDay;
            var startTime = new Date(startStr.replace(/\-/g, "\/"));

            var endYear = that.data.endYear;
            var endMonth = that.data.endMonth;
            var endDay = that.data.endDay;
            var endStr = that.data.endYear + '-' + that.data.endMonth + '-' + that.data.endDay;
            var endTime = new Date(endStr.replace(/\-/g, "\/"));

            let days = [];
            const thisMonthDays = this.getThisMonthDays(year, month);
            const firstDayOfWeek = this.getFirstDayOfWeek(year, month);

            var thisTime;
            var thisTimeStr;
            if (firstDayOfWeek > 0) {
                for (let i = 0; i < firstDayOfWeek; i++) {
                    days.push({ day: '' });
                }
            }

            for (let i = 1; i <= thisMonthDays; i++) {
                thisTimeStr = year + '-' + month + '-' + i;
                thisTime = new Date(thisTimeStr.replace(/\-/g, "\/"));
                if (thisTimeStr === startStr) {
                    days.push({
                        day: i,
                        disabled: false,
                        time: thisTimeStr
                    });
                }
                else if (thisTime > startTime && thisTime < endTime){
                    days.push({ 
                        day: i,
                        disabled: false,
                        time: thisTimeStr
                    });
                } else {
                    days.push({
                        day: i,
                        disabled: true,
                        time: thisTimeStr
                    });
                }
            }
            return days;
        },
        getNextMonth(year, month, day, num) {
            var that = this;
            var year = year; //获取当前日期的年份
            var month = month; //获取当前日期的月份
            var day = day; //获取当前日期的日
            var days = new Date(year, month, 0);
            days = days.getDate(); //获取当前日期中的月的天数
            var year2 = year;
            var num = num ? num : 1;
            var month2 = parseInt(month) + num;
            if (month2 > 12) {
                year2 = parseInt(year2) + 1;
                month2 = month2 - 12;
            }
            var day2 = day;
            var days2 = new Date(year2, month2, 0);
            days2 = days2.getDate();
            if (day2 > days2) {
                day2 = days2;
            }
            if (month2 < 10) {
                month2 = '0' + month2;
            }
            var endTime = [year2, month2, day2];
            return endTime;
        },
        computeDateList(){
            var that = this;
            //获取当前时间
            var nowYear = that.data.startYear;
            var nowMonth = that.data.startMonth;
            var nowDay = that.data.startDay;
           
            var MonthNumber = that.data.MonthNumber ? parseInt(that.data.MonthNumber) : 0;
            var dateList = that.data.dateList;
            for (var i = 0; i < MonthNumber+1; i++) {
                var nowDateObj = {
                    Year: nowYear,
                    Month: nowMonth,
                    days: []
                };
                nowDateObj.days = that.calculateDays(nowYear, nowMonth);
                console.log(nowDateObj)
                dateList.push(nowDateObj);
                var timeArr = that.getNextMonth(nowYear, nowMonth);
                nowYear = timeArr[0];
                nowMonth = timeArr[1];
            }
            that.setData({
                dateList: dateList,
            })
            console.log(dateList)
        },
        SelectPicker(e) {
            var that = this;
            var currentTime = e.currentTarget.dataset.time;
            var disabled = e.currentTarget.dataset.disabled;
            var day = e.currentTarget.dataset.day;
            if (!day || disabled || !currentTime) return;

            var selectStart = that.data.selectStart;
            var selectStartStr = selectStart ? new Date(selectStart.replace(/\-/g, "\/")) : '';
            var selectEnd = that.data.selectEnd;
            var selectEndStr = selectEnd ? new Date(selectEnd.replace(/\-/g, "\/")) : '';

            if (currentTime == selectStart || currentTime == selectEnd) return;
            if (selectStart && selectEnd) {
                selectStart = currentTime;
                selectEnd = '';
                that.setData({ selectStart: selectStart, selectEnd: selectEnd });
                that.setDaysIsSelect()
            } else if (selectStart && !selectEnd) {
                var currentTimeStr = new Date(currentTime.replace(/\-/g, "\/"));
                selectEnd = currentTimeStr > selectStartStr ? currentTime : '';
                selectStart = currentTimeStr > selectStartStr ? selectStart : currentTime;
                that.setData({ selectStart: selectStart, selectEnd: selectEnd });
                that.setDaysIsSelect();
                if (!selectStart || !selectEnd) return;
                var timeObj =[];
                timeObj.push(selectStart);
                timeObj.push(selectEnd);
                that.triggerEvent('datePicker', timeObj);
            } else if (!selectStart && !selectEnd) {
                selectStart = currentTime;
                that.setData({ selectStart: selectStart })
            };
        },
        setDaysIsSelect() {
            var that = this;
            var dateList = that.data.dateList;
            var selectStart = that.data.selectStart;
            selectStart = selectStart ? new Date(selectStart.replace(/\-/g, "\/")) : '';
            var selectEnd = that.data.selectEnd;
            selectEnd = selectEnd ? new Date(selectEnd.replace(/\-/g, "\/")) : '';
            
            for (var i = 0; i < dateList.length; i++) {
                var days = dateList[i].days;
                for (var j = 0; j < days.length; j++) {
                    if (days[j].day) {
                        var time = days[j].time;
                        time = new Date(time.replace(/\-/g, "\/"));
                        if ((time > selectStart || time == selectStart) && (time < selectEnd)) {
                            days[j].isSelect = true;
                        } else {
                            days[j].isSelect = false;
                        }
                    }
                }
                dateList[i].days = days;
            }
            that.setData({
                dateList: dateList
            })
        }
    }
    
})