var { hotelMethods } = require('../../../service/hotel/hotelService.js');
Page({
    ID: null,
    data: {
        info:{},
        isSpread: false
    },
    onLoad: function (options) {
        var that = this;
        if (!options.id || options.id == 'null' || options.id == 'undefined') return;
        that.ID = options.id;
        that.getHotelDetail();
    },
    getHotelDetail() {
        var that = this;
        var params = {
            id: that.ID
        };
        if (!params.id) return;
        hotelMethods.getHotelDetail(params, function (res) {
            that.isClick = false;
            if (res && res.code == 200) {
                var info = res.data;
                that.setData({ info: info });
            } else if (res && res.msg) {
                wx.showToast({
                    title: res.msg,
                    icon: 'none',
                    duration: 2000
                })
            } else {
                wx.showToast({
                    title: '服务异常',
                    icon: 'none',
                    duration: 2000
                })
            }
        })
    },
    
    //用户点击右上角分享
    onShareAppMessage: function () {
        var that = this;
        return {
            path: '/pages/hotel/detailMsg/detailMsg?id=' + that.ID
        }
    },
    switchSpread(){
        var that = this;
        var isSpread = !that.data.isSpread;
        that.setData({ isSpread: isSpread})
    },
    gotoDetail(){
        var that = this;
        wx.navigateBack({
            url: '/pages/hotel/hotelDetail/hotelDetail?id=' + that.ID
        })
    },
    callPhone(){
        var that = this;
        var info = that.data.info;
        if (!info.telephone) return;
        wx.makePhoneCall({
            phoneNumber: '',
        })
    }
})