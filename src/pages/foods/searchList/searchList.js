var { foodsMethods } = require('../../../service/foods/foodsService.js');
Page({
    pageNo: 1,
    pageSize: 6,
    data: {
        winHeight: null,
        name: '',
        foodsList: [], //展示的列表数据
        foodsObjCount: null, //数据总数
    },
    inputName: function (event){
        var that = this;
        var value = event.detail.value;
        that.setData({ name: value})
    },
    searchData:function(){
        var that = this;
        that.pageNo = 1;
        that.getFoodsList();
    },
    //去搜索页
    gotoSearch: function () {
        wx.navigateTo({ url: '/pages/foods/searchList/searchList', })
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
    //获取商家信息列表
    getFoodsList: function () {
        wx.showLoading();
        var that = this;
        var params = {
            pageNo: that.pageNo,
            pageSize: that.pageSize,
            name: that.data.name
        };
        foodsMethods.getFoodsList(params, function (res) {
            wx.hideLoading();
            if (res && res.code == 200 && res.data) {
                var foodsList = that.data.foodsList;
                var foodsObjCount = res.data.totalCount;
                if (that.pageNo == 1) {
                    foodsList = res.data.rows;
                } else {
                    foodsList = foodsList.concat(res.data.rows);
                }
                that.setData({ foodsList: foodsList, foodsObjCount: foodsObjCount });
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
        if ((pageNo * pageSize) < that.data.foodsObjCount) {
            that.pageNo++;
            that.getFoodsList();
        }
    },
    //用户点击右上角分享
    onShareAppMessage: function () {

    },
})