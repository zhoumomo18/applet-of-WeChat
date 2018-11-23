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
        that.getHouseType();
    },
    onShow: function () {
        var that = this;
        var searchData = wx.getStorageSync('searchData');
        if (!searchData) {
            return;
        }
        that.setData({ searchData: searchData });
        that.countNight();
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
    openCollapse(e){
        var that = this;
        var id = e.currentTarget.dataset.id;
        var idx = e.currentTarget.dataset.idx;
        var isOpen;
        var houseTypeList = that.data.houseTypeList;
        if (!houseTypeList[idx].isOpen) {
            isOpen = 3;
        }
        var printPrice = "houseTypeList[" + idx + "].isOpen";
        that.setData({ printPrice: isOpen});
        that.getHouseDetailList(id, idx)
    },
    closeCollapse(e){
        var that = this;
        var idx = e.currentTarget.dataset.idx;
        var houseTypeList = that.data.houseTypeList;
        if (houseTypeList[idx].isOpen) {
            houseTypeList[idx].isOpen = 0;
        }
        that.setData({ houseTypeList: houseTypeList });
    },
    switchMore(e){
        var that = this;
        var houseTypeList = that.data.houseTypeList;
        var ty = e.currentTarget.dataset.type;
        var idx = e.currentTarget.dataset.idx;
        var printPrice = "houseTypeList[" + idx + "].isOpen";
        if (ty == 'open'){
            var isOpen = houseTypeList[idx].bedTypeList.length;
            houseTypeList[idx].isOpen = isOpen
            that.setData({ houseTypeList: houseTypeList});
        } else {
            houseTypeList[idx].isOpen = 3;
            that.setData({ houseTypeList: houseTypeList });
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
    },
    gotoSelectDate() {
        var that = this;
        wx.navigateTo({
            url: '/pages/hotel/bookDate/bookDate',
        })
    },
    //查看相册
    previewImage: function () {
        var that = this;
        if (!that.data.hotelInfo || !that.data.hotelInfo.hotelFileList) return;
        var hotelFileList = that.data.hotelInfo.hotelFileList;
        var urls = [];
        for (var i = 0; i < hotelFileList.length; i++) {
            if (hotelFileList[0].src) {
                urls.push(that.data.imgUrlPath + hotelFileList[0].src);
            }
        }
        wx.previewImage({
            urls: urls
        })
    },
})