Page({
    data:{
        weeks_ch: [ '日', '一', '二', '三', '四', '五', '六' ]
    },
    onLoad() {
		const date = new Date();
		const cur_year = date.getFullYear();
		const cur_month = date.getMonth() + 1;
		this.setData({
			cur_year,
			cur_month
        })
        this.nextMonth()
    },
    nextMonth() {
        //全部时间的月份都是按0~11基准，显示月份才+1
        let year = this.data.cur_month > 11 ? this.data.cur_year + 1 : this.data.cur_year;
        let month = this.data.cur_month > 11 ? 0 : this.data.cur_month;
        this.setData({
            next_year: year,
            next_month: (month + 1)
        })
    },
    datePicker(e) {
        
    }
})