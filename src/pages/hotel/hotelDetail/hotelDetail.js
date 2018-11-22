var { hotelMethods } = require('../../../service/hotel/hotelService.js');
var App = getApp();
Page({
    ID: null,
    isClick: false,
    data: {
        imgUrlPath: App.globalData.imgUrlPath,
        currentSwiper: 0,
        searchData:{},
        hotelInfo: {},
        houseTypeList:[],
        isAllHouseType: 3,
        dayNightNum: 0

    },
    onLoad: function (options) {
        var that = this;
        if (!options.id || options.id == 'null' || options.id == 'undefined') return;
        that.ID = options.id;
        that.getHotelDetail();
        var searchData = wx.getStorageSync('searchData');
        if (!searchData) {
            return;
        }
        that.setData({ searchData: searchData });
        that.countNight();
        that.getHeight();
        that.getHotelList();
        that.getHouseType();
    },
    onShow: function () {

    },
    countNight(){
        var that = this;
        var searchData = that.data.searchData;
        if (!searchData.startDate || !searchData.endDate) return;
        var startDate = new Date(searchData.startDate);
        var endDate = new Date(searchData.endDate);
        var dayNightNum = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);/*不用考虑闰年否*/
        that.setData({ dayNightNum: dayNightNum})
    },
    //用户点击右上角分享
    onShareAppMessage: function () {
        var that = this;
        return {
            path: '/pages/hotel/hotelDetail/hotelDetail?id=' + that.ID
        }
    },
    getHotelDetail(){
        var that = this;
        var params ={
            id: that.ID
        };
        if (!params.id) return;
        hotelMethods.getHotelDetail(params, function (res) {
            that.isClick = false;
            if (res && res.code == 200) {
                var hotelInfo = res.data;
                that.setData({ hotelInfo: hotelInfo});
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
    changeCurrent(e) {
        var that = this;
        that.setData({ currentSwiper: e.detail.current })
    },
    switchCollect(){
        var that = this;
        if (that.isClick) return;
        that.isClick = true;
        var params = {
            hotelId: that.ID
        };
        if (!params.hotelId) return;
        hotelMethods.changeHotelCollect(params, function (res) {
            if (res && res.code == 200) {
                that.getHotelDetail();
                wx.hideLoading();
            } else if (res && res.msg) {
                wx.hideLoading();
                wx.showToast({
                    title: res.msg,
                    icon: 'none',
                    duration: 2000
                });
                that.isClick = false;
            } else {
                wx.hideLoading();
                wx.showToast({
                    title: '服务异常',
                    icon: 'none',
                    duration: 2000
                })
                that.isClick = false;
            }
        })
    },
    getHouseType(){
        var that = this;
        var params = {
            id : that.ID
        };
        if (!params.id) return;
        hotelMethods.getHouseType(params, function (res) {
            if (res && res.code == 200) {
                var houseTypeList = res.data;
                that.setData({ houseTypeList: houseTypeList})
            } else if (res && res.msg) {
                wx.showToast({
                    title: res.msg,
                    icon: 'none',
                    duration: 2000
                });
            } else {
                wx.showToast({
                    title: '服务异常',
                    icon: 'none',
                    duration: 2000
                })
            }
        })
    },
    switchHeight(e){
        var that = this;
        var ty = e.currentTarget.dataset.type;
        var isAllHouseType = that.data.isAllHouseType;
        var length = that.data.houseTypeList.length;
        if(ty=='open') {
            that.setData({ isAllHouseType: length})
        } else {
            that.setData({ isAllHouseType: 3 })
        }
    },
    openCollapse(){
        var that = this;
        var id = e.currentTarget.dataset.id;
        var index = e.currentTarget.dataset.idx;
        that.getHouseDetailList(id, index)
    },
    closeCollapse(e){
        var that = this;
        var idx = e.currentTarget.dataset.idx;
        var printPrice = "houseTypeList[" + idx + "].isOpen";
        var isOpen = 0;
        that.setData({ printPrice: isOpen });
    },
    switchMore(e){
        var that = this;
        var houseTypeList = that.data.houseTypeList;
        var ty = e.currentTarget.dataset.type;
        var idx = e.currentTarget.dataset.idx;
        var printPrice = "houseTypeList[" + idx + "].isOpen";
        if (ty == 'open'){
            var isOpen = houseTypeList[idx].bedTypeList.length;
            that.setData({ printPrice: isOpen});
        } else {
            var isOpen = 0;
            that.setData({ printPrice: isOpen });
        }
    },
    getHouseDetailList(id, index){
        var that = this;
        var params = {
            houseTypeId: id
        };
        if (!params.houseTypeId)return;
        hotelMethods.getHouseDetailList(params, function (res) {
            if (res && res.code == 200) {
                var houseTypeList = that.data.houseTypeList;
                var isOpen = 3;
                var bedTypeList = res.data;
                houseTypeList[index].isOpen = isOpen;
                houseTypeList[index].bedTypeList = bedTypeList;
                that.setData({ houseTypeList: houseTypeList })
            } else if (res && res.msg) {
                wx.showToast({
                    title: res.msg,
                    icon: 'none',
                    duration: 2000
                });
            } else {
                wx.showToast({
                    title: '服务异常',
                    icon: 'none',
                    duration: 2000
                })
            }
        })
    },
    gotoDetailMsg(){
        var that = this;
        wx.navigateTo({
            url: '/pages/hotel/detailMsg/detailMsg?id='+that.ID,
        })
    }
})