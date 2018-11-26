var { hotelMethods } = require('../../../service/hotel/hotelService.js');
var App = getApp();
Page({
    pageNo: 1,
    pageSize: 10,
    data: {
        imgUrlPath: App.globalData.imgUrlPath,
        showModal: false,
        searchData: {
            scenicSpot: 0, //景点
            scenicSpotName: '凤凰', //景点名称
            startDate: null,
            startDateName: null,
            endDate: null,
            endDateName: null,
            hotelName: null,
            priceStrart: 0,
            priceEnd: 2000,
            grade: 0,  //0:不限 1:民宿/客栈，2：经济型，3：高档型，4：豪华型
        },
        priceSort: false, //价格排序
        levelList: [
            { value: 0, label: '不限' },
            { value: 1, label: '民宿/客栈' },
            { value: 2, label: '经济型' },
            { value: 3, label: '高档型' },
            { value: 4, label: '豪华型' },
        ],
        hotelList: [],
        hotelCount: 0,
        winHeight: 0,
    },
    onShow(){
        var that = this;
        that.initSearchData();
        that.getHeight();
    },
    initSearchData() {
        var that = this;
        var searchData = that.data.searchData;
        searchData = wx.getStorageSync('searchData') ? wx.getStorageSync('searchData') : searchData;
        if (!searchData.startDate || !searchData.endDate) {
            searchData.startDate = that.getDateStr(0);
            searchData.endDate = that.getDateStr(1);
        }
        var curDate = new Date();
        var nowTime = new Date();
        var nextTime = new Date(curDate.getTime() + 24 * 60 * 60 * 1000); //后一天
        if (searchData.startDate) {
            var startTime = new Date(searchData.startDate);
            searchData.startDate = startTime < nowTime ? that.getDateStr(0) : searchData.startDate;
        }
        if (searchData.endDate) {
            var endTime = new Date(searchData.endDate);
            searchData.endDate = endTime < nextTime ? that.getDateStr(1) : searchData.endDate;
        }
        if (!searchData.priceStrart) {
            searchData.priceStrart = 0;
        }
        if (!searchData.priceEnd) {
            searchData.priceEnd = 2000;
        }
        that.setData({ searchData: searchData});
        wx.setStorageSync('searchData', searchData);
        that.getHotelList();
    },
    onShareAppMessage: function () {

    },
    getDateStr(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate() + AddDayCount);   //获取AddDayCount天后的日期
        var year = dd.getFullYear();
        var mon = dd.getMonth() + 1; //获取当前月份的日期
        var day = dd.getDate();
        return year + "-" + mon + "-" + day;
    },
    getHotelList(){
        var that = this;
        var params = {
            pageNo: that.pageNo,
            pageSize: that.pageSize,
            grade: that.data.searchData.grade,
            endDate: that.data.searchData.endDate,
            scenicSpotId: that.data.searchData.scenicSpot,
            startDate: that.data.searchData.startDate,
            priceStrart: that.data.searchData.priceStrart,
            priceEnd: that.data.searchData.priceEnd,
            priceSort: that.data.priceSort ? 1 : 2,//价格排序  1 低到高  2高到低
        };
        if (that.data.searchData.hotelName) {
            params.hotelName = that.data.searchData.hotelName;
        }
        console.log('params=>');
        console.log(params)
        hotelMethods.getHotelList(params, function (res) {
            console.log(res)
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
        that.setData({ priceSort: priceSort});
        that.pageNo = 1;
        that.getHotelList();
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
    },
    gotoSelectDate() {
        var that = this;
        wx.navigateTo({
            url: '/pages/hotel/bookDate/bookDate?timeLimit=3',
        })
    },
    //去选景点
    gotoSelectPoint(e) {
        var that = this;
        wx.navigateTo({ url: '/pages/hotel/attractionsList/attractionsList', })
    },
    onHide() {
        var that = this;
        var searchData = that.data.searchData;
        wx.setStorageSync('searchData', searchData)
    },
})