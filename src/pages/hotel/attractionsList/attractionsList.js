var { hotelMethods } = require('../../../service/hotel/hotelService.js');
Page({
    pageNo: 1,
    pageSize: 15,
    data: {
        winHeight: 0,
        scenicList: [],
        scenicCount: 0,
        isActive: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        if(options && options.id){
            that.isActive = options.id;
        }
        wx.showLoading();
        that.getHeight();
        that.getScenicList();
    },
    getScenicList(){
        var that = this;
        var params= {
            name: that.data.name,
            pageNo: that.pageNo,
            pageSize: that.pageSize
        };
        hotelMethods.getScenicList(params, function (res) {
            if (res && res.code == 200 && res.data) {
                var scenicList = that.data.scenicList;
                var scenicCount = res.data.totalCount;
                if (that.pageNo == 1) {
                    scenicList = res.data.rows;
                } else {
                    scenicList = scenicList.concat(res.data.rows);
                }
                that.setData({ scenicList: scenicList, scenicCount: scenicCount });
                wx.hideLoading();
            } else if (res && res.msg) {
                wx.hideLoading();
                wx.showToast({
                    title: res.msg,
                    icon: 'none',
                    duration: 2000
                })
            } else {
                wx.hideLoading();
                wx.showToast({
                    title: '服务异常',
                    icon: 'none',
                    duration: 2000
                })
            }
        })
    },
    //上拉加载更多
    loadMore: function () {
        var that = this;
        var pageNo = that.pageNo;
        var pageSize = that.pageSize;
        if ((pageNo * pageSize) < that.data.foodsObjCount) {
            that.pageNo++;
            that.getScenicList();
        }
    },
    //点击选中
    selectScenic(e) {
        var that = this;
        var id = e.currentTarget.dataset.id;
        var index = e.currentTarget.dataset.index;
        if(!id) return;
        that.setData({ isActive: id});
        var searchData = wx.getStorageSync('searchData');
        searchData.scenicSpot = that.data.scenicList[index].id;
        searchData.scenicSpotName = that.data.scenicList[index].name;
        wx.setStorageSync('searchData', searchData)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    //获取页面高度
    getHeight: function () {
        var that = this
        wx.getSystemInfo({
            success: function (res) {
                that.setData({ winHeight: res.windowHeight })
            }
        })
    },
})