// 计算日期的显示方式。0-24H：x小时前，24-72H：x天前，超过3天显示年与日
function timeago(dateTimeStamp){
    let result,
        dateTime = new Date(dateTimeStamp), // 传入的日期
        stampTime = dateTime.getTime(), // 传入日期的时间戳
        nowDate = new Date(), // 当前日期的时间戳
        hour = (nowDate-stampTime)/1000/60/60,
        day= hour/24
    if (hour>0 && hour<24){
        result  = parseInt(hour) + "小时前"
    } else if (hour < 72) {
        result  = parseInt(day) + "天前"
    } else {
        let curYear = dateTime.getFullYear(),
            curMonth = dateTime.getMonth() + 1 < 10 ? "0" + (dateTime.getMonth() + 1) : dateTime.getMonth() + 1,
            curDate = dateTime.getDate() < 10 ? "0" + dateTime.getDate() : dateTime.getDate()
            result = curYear + "-" + curMonth + "-" + curDate
            console.log(result)
    }
    return result
}

// 获取当前年月日
function getFormatDate(dateTimeStamp){
    let result,dateTime = new Date(dateTimeStamp), // 当前日期的时间戳
        curYear = dateTime.getFullYear(),
        curMonth = dateTime.getMonth() + 1 < 10 ? "0" + (dateTime.getMonth() + 1) : dateTime.getMonth() + 1,
        curDate = dateTime.getDate() < 10 ? "0" + dateTime.getDate() : dateTime.getDate()
        result = curYear + "-" + curMonth + "-" + curDate

    return result
}

function getNextDate(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth()+1;//获取当前月份的日期
    var d = dd.getDate();
    return y+"/"+m+"/"+d;
}

module.exports = {
    timeago,
    getFormatDate,
    getNextDate
}