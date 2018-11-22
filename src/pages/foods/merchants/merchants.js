var { foodsMethods } = require('../../../service/foods/foodsService.js');
var App = getApp();
Page({
    ID: null,
    pageNo: 1,
    pageSize: 10,
    data: {
        imgUrlPath: App.globalData.imgUrlPath,
        winHeight: null,
        isShowModal: false,
        isScoll: false,
        scrollTop: 0,
        infoObj: {},
        listCount: null,
        foodList: [],
        swiperData: [],
        currentSwiper: 0,
    },
    onLoad: function (options) {
        var that = this;
        that.getHeight();
        that.ID = options.id;
        if(!that.ID) return;
        wx.showLoading();
        that.getFoodsDetail();
        that.getFoodsDetailList();
    },
    //预览菜品
    viewDetail:function(e){
        var that = this;
        var currentSwiper = e.currentTarget.dataset.index;
        var ty = e.currentTarget.type;
        var swiperData = [];
        if(ty == 1) {
            swiperData = that.data.infoObj.specialDishesList;
        } else {
            swiperData = that.data.foodList;
        }
        that.setData({ currentSwiper: currentSwiper, swiperData: swiperData, isShowModal: true})
    },
    //关闭预览弹框
    closeModal:function(){
        var that = this;
        that.setData({ isShowModal: false})
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
    //获取商户详情
    getFoodsDetail:function(){
        var that = this;
        var params = {
            id: that.ID
        };
        if (!params.id) return;
        foodsMethods.getFoodsDetail(params, function (res) {

            wx.hideLoading();
            if (res && res.code == 200 && res.data) {
                that.setData({ infoObj: res.data})
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
    //分页获取商家菜单列表
    getFoodsDetailList:function(){
        var that = this;
        var params = {
            id: that.ID,
            pageNo: that.pageNo,
            pageSize: that.pageSize,
        };
        foodsMethods.getFoodsDetailList(params, function (res) {
            if (res && res.code == 200 && res.data) {
                var foodList = that.data.foodList;
                var listCount = res.data.totalCount;
                if (that.pageNo==1){
                    foodList = res.data.rows;
                } else {
                    foodList = foodList.concat(res.data.rows);
                }
                that.setData({ foodList: foodList, listCount: listCount })
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
    //上拉加载更多
    loadMore: function () {
        var that = this;
        var pageNo = that.pageNo;
        var pageSize = that.pageSize;
        if ((pageNo * pageSize) < that.data.listCount) {
            that.pageNo++;
            that.getFoodsDetailList();
        }
    },
    //查看相册
    previewImage:function(){
        var that = this;
        if (!that.data.infoObj || !that.data.infoObj.fileList) return;
        var fileList = that.data.infoObj.fileList;
        var urls = [];
        for (var i = 0; i < fileList.length;i++) {
            if (fileList[0].src){
                urls.push(that.data.imgUrlPath+fileList[0].src);
            }
        }
        wx.previewImage({
            urls: urls
        })
    },
    //打开地图
    openMap:function(){
        var that = this;
        var latitude = that.data.infoObj.dimension;
        var longitude = that.data.infoObj.longitude;
        var name = that.data.infoObj.name;
        var address = that.data.infoObj.address;
        if (!latitude || !longitude)return;
        wx.getLocation({
            type: 'gcj02', //返回可以用于wx.openLocation的经纬度
            success(res) {
                wx.openLocation({
                    latitude,
                    longitude,
                    scale: 18,
                    name: name,
                    address: address
                })
            },
            fail(res) {

            }
        })
    },
    onReachBottom() {
        this.loadMore();
    },
    changeCurrent(e){
        var that = this;
        that.setData({ currentSwiper: e.detail.current})
    },
    //用户点击右上角分享
    onShareAppMessage: function () {
        var that = this;
        return {
            path: '/pages/foods/merchants/merchants?id=' + that.ID 
        }
    },
})