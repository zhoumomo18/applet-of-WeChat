Page({
    data: {
        isShow: true, // 是否现在预定按钮
        detailInfo: wx.getStorageSync('detailInfo')
    },
    onLoad(e){
        // 判断入口。从详情页进入有立即预定按钮，否则无按钮
        let isShow = (e.source == 'detail') ? true: false
        this.setData({
            isShow: isShow
        })
    },
    onshow(){
        let detailInfo = wx.getStorageSync('detailInfo')
        this.setData({
            detailInfo: detailInfo
        })
    }
})