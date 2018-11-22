var { hotelMethods } = require('../../../service/hotel/hotelService.js');
var App = getApp();
Page({
    pageNo: 1,
    pageSize: 10,
    data: {
        imgUrlPath: App.globalData.imgUrlPath,
        showModal: false,
        searchData: {
            scenicSpot: null, //景点
            scenicSpotName: '凤凰', //景点名称
            startDate: null,
            endDate: null,
            hotelName: null,
            price: '',
            grade: null,  //0:不限 1:民宿/客栈，2：经济型，3：高档型，4：豪华型
        },
        priceSort: false, //价格排序
        levelList: [
            { value: 1, label: '不限' },
            { value: 2, label: '民宿/客栈' },
            { value: 3, label: '经济型' },
            { value: 4, label: '高档型' },
            { value: 5, label: '豪华型' },
        ],
        hotelList: [],
        hotelCount: 0,
        winHeight: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var searchData = wx.getStorageSync('searchData');
        that.setData({ searchData: searchData })
        that.getHeight();
        that.getHotelList();
    },
    onShareAppMessage: function () {

    },
    getHotelList(){
        var that = this;
        var params = {
            pageNo: that.pageNo,
            pageSize: that.pageSize,
            endDate: that.data.searchData.endDate,
            hotelName: that.data.searchData.hotelName,
            price: that.data.searchData.price,
            scenicSpot: that.data.searchData.scenicSpot,
            startDate: that.data.searchData.startDate,
            priceSort: that.data.priceSort ? 1 : 2,//价格排序  1 低到高  2高到低
        };
        hotelMethods.getHotelList(params, function (res) {
            if (res && res.code == 200 && res.data) {
                var hotelList = that.data.hotelList;
                var hotelCount = res.data.totalCount;
                if (that.pageNo == 1) {
                    hotelList = res.data.rows;
                } else {
                    hotelList = hotelList.concat(res.data.rows);
                }
                that.setData({ hotelList: hotelList, hotelCount: hotelCount });
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
            that.getHotelList();
        }
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
    bindinput(e) {
        var that = this;
        var hotelName = e.detail.value;
        var searchData = that.data.searchData;
        searchData.hotelName = hotelName
        that.setData({ searchData: searchData })
    },
    changeSort(){
        var that = this;
        var priceSort = !that.data.priceSort;
        that.setData({ priceSort: priceSort})
    },
    switchModal(){
        var that = this;
        var showModal = !that.data.showModal;
        that.setData({ showModal: showModal })
    },
    searchIpt(){
        var that = this;
        that.pageNo = 1;
        that.getHotelList();
    },
    selectGrade(e) {
        var that = this;
        var grade = e.currentTarget.dataset.id;
        var searchData = that.data.searchData;
        searchData.grade = grade;
        that.setData({ searchData: searchData});
        that.pageNo = 1;
        that.getHotelList();
    },
    gotoHotelDetail(e){
        var that = this;
        var id = e.currentTarget.dataset.id;
        if(!id) return;
        wx.navigateTo({
            url: '/pages/hotel/hotelDetail/hotelDetail?id='+id,
        })
    }
})