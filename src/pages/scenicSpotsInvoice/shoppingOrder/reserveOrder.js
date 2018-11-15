let {ajax} = require('../../../utils/ajax.js')
Page({
    data: {
        detailInfo: wx.getStorageSync('detailInfo')
    },
    onshow(){
        let detailInfo = wx.getStorageSync('detailInfo')
        this.setData({
            detailInfo: detailInfo
        })
    }
})