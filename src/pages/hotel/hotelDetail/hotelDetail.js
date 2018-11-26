var { hotelMethods } = require('../../../service/hotel/hotelService.js');
var { scenicMethod } = require('../../../service/scenicSpots/scenicService.js');
var App = getApp();
Page({
    ID: null,
    isClick: false,
    data: {
        imgUrlPath: App.globalData.imgUrlPath,
        currentSwiper: 0,
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
        that.initSearchData();
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
            searchData.startDateName = that.getDayName(searchData.startDate);
        }
        if (searchData.endDate) {
            var endTime = new Date(searchData.endDate);
            searchData.endDate = endTime < nextTime ? that.getDateStr(1) : searchData.endDate;
            searchData.endDateName = that.getDayName(searchData.endDate);
        }
        if (!searchData.priceStrart) {
            searchData.priceStrart = 0;
        }
        if (!searchData.priceEnd) {
            searchData.priceEnd = 2000;
        }
        that.setData({ searchData: searchData });
        wx.setStorageSync('searchData', searchData);
        that.initTime(searchData);
    },
    getDateStr(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate() + AddDayCount);   //获取AddDayCount天后的日期
        var year = dd.getFullYear();
        var mon = dd.getMonth() + 1; //获取当前月份的日期
        var day = dd.getDate();
        return year + "-" + mon + "-" + day;
    },
    initTime(searchData){
        var that = this;
        var searchData = that.data.searchData;
        if (!searchData.startDate || !searchData.endDate) return;
        var dayNightNum = that.getNights(searchData.endDate, searchData.startDate); 
        that.setData({ dayNightNum: dayNightNum})
    },
    getDayName(d) {
        var td = new Date();
        td = new Date(td.getFullYear(), td.getMonth(), td.getDate());
        var od = new Date(d);
        od = new Date(od.getFullYear(), od.getMonth(), od.getDate());
        var xc = (od - td) / 1000 / 60 / 60 / 24;
        if (xc == 0) {
            return "今天";
        } else if (xc < 2) {
            return "明天";
        } else if (xc < 3) {
            return "后天";
        } else {
            var str = "周" + "日一二三四五六".charAt(new Date(d).getDay());
            return str;
        }
    },
    //获得两个日期之间相差的晚数
    getNights(date1, date2){
        var date1Str = date1.split("-");//将日期字符串分隔为数组,数组元素分别为年.月.日
        //根据年 . 月 . 日的值创建Date对象
        var date1Obj = new Date(date1Str[0], (date1Str[1] - 1), date1Str[2]);
        var date2Str = date2.split("-");
        var date2Obj = new Date(date2Str[0], (date2Str[1] - 1), date2Str[2]);
        var t1 = date1Obj.getTime();
        var t2 = date2Obj.getTime();
        var dateTime = 1000 * 60 * 60 * 24; //每一天的毫秒数
        var minusDays = Math.floor(((t2 - t1) / dateTime));//计算出两个日期的天数差
        var Night = Math.abs(minusDays);//取绝对值
        return Night;
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
    changeCurrent(e) {
        var that = this;
        that.setData({ currentSwiper: e.detail.current })
    },
    switchCollect(){
        var that = this;
        if (that.isClick) return;
        var hotelInfo = that.data.hotelInfo;
        var params = {
            hotelId: that.ID
        };
        if (!params.hotelId) return;
        that.isClick = true;
        hotelMethods.changeHotelCollect(params, function (res) {
            if (res && res.code == 200) {
                that.getHotelDetail();
                wx.showToast({
                    title: hotelInfo.collection ? '取消收藏成功' : '收藏成功',
                    icon: 'none',
                    duration: 2000
                });
            } else if (res && res.msg) {
                wx.showToast({
                    title: res.msg,
                    icon: 'none',
                    duration: 2000
                });
                that.isClick = false;
            } else {
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
            houseTypeList[idx].isOpen = 3;
        }
        that.setData({ houseTypeList: houseTypeList}); 
        if (houseTypeList[idx].bedTypeList && houseTypeList[idx].bedTypeList.length) return;
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
        var hotelInfo = that.data.hotelInfo;
        var effectiveTimeLimit = hotelInfo.effectiveTimeLimit;
        wx.navigateTo({
            url: '/pages/hotel/bookDate/bookDate?timeLimit=' + effectiveTimeLimit,
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
    // 查询当前用户是否填写资料
    getisNullByUserId(e){
        var that = this;
        var searchData = that.data.searchData;
        var hotelInfo = that.data.hotelInfo;
        var detailId = e.currentTarget.dataset.id;
        var houseTypeId = e.currentTarget.dataset.house;
        var houseTypeName = e.currentTarget.dataset.housename;
        var hotelId = that.ID;
        var startDate = searchData.startDate;
        var endDate = searchData.endDate;
        if (!detailId || !houseTypeId || !hotelId) return;
        var bookingHotelObj = {
            hotelId: hotelId,                  //酒店id
            hotelName: hotelInfo.name || '',   //酒店名称
            houseTypeId: houseTypeId,          //床型id
            houseTypeName: houseTypeName,      //床型名称
            detailId: detailId,                //具体选中的房间id
            startDate: startDate,              //入住时间
            endDate: endDate,                  //离店时间
            dayNightNum: that.data.dayNightNum //共几晚
        };
        scenicMethod.getisNullByUserId(function (res) {
            if (res && res.code == 200) { //返回1-已填，0-未填写
                if(res.data) {
                    wx.setStorageSync('bookingHotelObj', bookingHotelObj);
                    wx.navigateTo({
                        url: '/pages/hotel/orderContent/order',
                    })
                } else {
                    wx.showModal({
                        title: '提示',
                        content: '您的信息不完善，请填写您的个人信息资料',
                        confirmText: "去填写",
                        success: function (res) {
                            if (res.confirm) {
                                wx.navigateTo({
                                    url: '/pages/userCenter/userInfo/userInfo',
                                })
                            }
                        }
                    })
                }
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
    }
})