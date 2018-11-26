Page({
    data:{
        weeks_ch: [ '日', '一', '二', '三', '四', '五', '六' ],
        expirydate: '',
        price: 1,
        subscribeRule: 0
    },
    onLoad(options) {
        let expirydate = options.expirydate, // 价格有效期
            subscribeRule = options.subscribeRule,
            expiryEndDate = options.expiryDate
            
		this.setData({
            expirydate,
            subscribeRule,
            expiryEndDate
        })
    },
    datePicker(e) {
        // 当前选中日期不为空时返回上一页
        if (e && e.detail && e.detail!='') {
            wx.setStorageSync('selectedDate', e.detail)
            wx.navigateBack()
        }
        
        
    }
})