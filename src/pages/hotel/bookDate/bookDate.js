// src/pages/hotel/bookDate/bookDate.js
Page({
    data: {
        searchData: {
            scenicSpot: null, //景点
            scenicSpotName: '凤凰', //景点名称
            startDate: null,
            endDate: null,
            hotelName: null,
            price: '',
            grade: null,  //0:不限 1:民宿/客栈，2：经济型，3：高档型，4：豪华型
            timeLimit: 1 //1：一个月内，2：两个月内，3：三个月内
        },
    },
    onLoad: function (options) {
        var that = this;
        var timeLimit = options.timeLimit || 1;
        var searchData = that.data.searchData;
        searchData = wx.getStorageSync('searchData') ? wx.getStorageSync('searchData') : searchData;
        if (!searchData) {
            return;
        }
        that.setData({ searchData: searchData, timeLimit: timeLimit})
    },
    datePicker(data){
        var  that = this;
        var searchData = that.data.searchData;
        if (data && data.detail && data.detail.length>1){
            searchData.startDate = data.detail[0]; 
            searchData.endDate = data.detail[1]; 
        }
        wx.setStorageSync('searchData', searchData)
    }
})