Page({
    data:{
        weeks_ch: [ '日', '一', '二', '三', '四', '五', '六' ],
        expirydate: '',
        price: 1
    },
    onLoad(options) {
        let expirydate = options.expirydate || 2 // 价格有效期
            
		this.setData({
			expirydate
        })
    },
    datePicker(e) {
        
    }
})