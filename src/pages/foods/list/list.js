var { foodsMethods} = require('../../../service/foods/foodsService.js');
var App = getApp();
Page({
    pageNo: 1,
    pageSize: 8,
    data: {
        imgUrlPath: App.globalData.imgUrlPath,
        winHeight: null,
        isShowSelect: null,
        cookSel: -1, //选中的菜系
        aiSel: 2, //选中的智能排序方式
        aiList: [ //距离优先，推荐优先，价格优先；默认全部
            { value: 2, label: '推荐优先' },
            { value: 1, label: '距离优先' },
            { value: 3, label: '价格优先' },
        ],
        cookList: [], //菜系列表
        foodsList: [], //展示的列表数据
        foodsObjCount: 0, //数据总数
    },
    onLoad: function (options) {
        wx.showLoading();
        var that = this;
        that.getHeight();        
        that.getAllGroupList();
        that.getFoodsList();
    },
    //去搜索页
    gotoSearch:function(){
        wx.navigateTo({url: '/pages/foods/searchList/searchList',})
    },
    //获取页面高度
    getHeight:function(){
        var that = this
        wx.getSystemInfo({
            success: function (res) {
                that.setData({ winHeight: res.windowHeight})
            }
        })
    },
    //switch筛选弹框
    switchModal(e){
        let that = this;
        let key = e.currentTarget.dataset.key;
        let isShowSelect = that.data.isShowSelect;
        isShowSelect = isShowSelect == key ? null:key;
        that.setData({ isShowSelect: isShowSelect});
    },
    //选中筛选条件
    selectOption:function(e) {
        let that = this;
        let id = e.currentTarget.dataset.id;
        let ty = e.currentTarget.dataset.type;
        if (ty==1) {
            that.setData({ cookSel: id})
        } else {
            that.setData({ aiSel: id})
        }
        that.pageNo = 1;
        that.getFoodsList();
    },
    //获取菜系
    getAllGroupList:function() {
        var that = this;
        foodsMethods.getAllGroupList(function(res){
            if (res && res.code==200){
                var arr = res.data;
                arr.unshift({
                    id: -1,
                    name: '全部'
                });
                wx.hideLoading();
                that.setData({ cookList: arr});
            } else if(res && res.msg){
                wx.hideLoading();
                wx.showToast({
                    title: res.msg, 
                    icon: 'none',
                    duration: 2000})
            } else {
                wx.hideLoading();
                wx.showToast({
                    title: '服务异常',
                    icon: 'none',
                    duration: 2000})
            }
        })
    },
    //获取商家信息列表
    getFoodsList: function() {
        var that = this;
        var params = {
            pageNo: that.pageNo,
            pageSize: that.pageSize,
            sortType: that.data.aiSel
        };
        if (that.data.cookSel && that.data.cookSel!=-1){
            params.groupId = that.data.cookSel;
        }
        foodsMethods.getFoodsList(params, function (res) {
            if (res && res.code == 200 && res.data) {
                var foodsList = that.data.foodsList;
                var foodsObjCount = res.data.totalCount;
                if(that.pageNo==1) {
                    foodsList = res.data.rows;
                } else {
                    foodsList = foodsList.concat(res.data.rows);
                }
                that.setData({ foodsList: foodsList, foodsObjCount: foodsObjCount });
                wx.hideLoading();
            } else if (res && res.msg) {
                wx.hideLoading();
                wx.showToast({ 
                    title: res.msg,
                    icon: 'none',
                    duration: 2000 })
            } else {
                wx.hideLoading();
                wx.showToast({ title: '服务异常',
                    icon: 'none',
                    duration: 2000 })
            }
        })
    },
    //上拉加载更多
    loadMore:function(){
        var that = this;
        var pageNo = that.pageNo;
        var pageSize = that.pageSize;
        if ((pageNo * pageSize) < that.data.foodsObjCount){
            that.pageNo++;
            that.getFoodsList();
        }
    },
    //用户点击右上角分享
    onShareAppMessage: function () {

    },
})