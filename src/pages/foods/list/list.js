var { foodsMethods} = require('../../../service/foods/foodsService.js');
Page({
    data: {
        isShowSelect: null,
        aiList: [ //距离优先，推荐优先，价格优先；默认全部
            { value: 1, label: '距离优先' },
            { value: 2, label: '推荐优先' },
            { value: 3, label: '价格优先' },
            { value: 4, label: '全部'}
        ],
        cookList:[], //菜系列表
    },
    onLoad: function (options) {
        var that = this;
        that.getAllGroupList();
    },
    onShow: function () {

    },
    onShareAppMessage: function () {

    },
    //获取页面高度
    getHeight:function(){
        var that = this
        // 获取系统信息
        wx.getSystemInfo({
            success: function (res) {
                console.log(res);
                // 可使用窗口宽度、高度
                console.log('height=' + res.windowHeight);
                console.log('width=' + res.windowWidth);
                // 计算主体部分高度,单位为px
            }
        })
    },
    //点击筛选条件
    switchModal(e){
        let that = this;
        let key = e.currentTarget.dataset.key;
        let isShowSelect = that.data.isShowSelect;
        isShowSelect = isShowSelect == key ? null:key;
        that.setData({ isShowSelect: isShowSelect});
    },
    //获取菜系
    getAllGroupList:function() {
        var that = this;
        foodsMethods.getAllGroupList(function(res){
            if (res && res.code==200){
                that.setData({ cookList: res.data});
            } else if(res && res.msg){
                wx.showToast({title: res.msg})
            } else {
                wx.showToast({ title:'服务异常'})
            }
        })
    }
    
})