const app = getApp()
let {strategyMethod} = require('../../../service/strategy/strategyService.js')

Page({
    data: {
        baseUrl: app.globalData.imgUrlPath,
        columnList:[],
        activeIndex: 0,//当前选中索引值
        columnId: '',
        strategyList:[],
        pageNo: 1,
        pageSize: 10
    },
    onLoad: function(){
        
    },
    onShow: function(){
        this.setData({
            columnList:[],
            strategyList:[],
            pageNo: 1,
            pageSize: 10
        })
        this.getColumnList()
        this.getStrategyList()
    },
    // 获取攻略列表
    getStrategyById: function (e) {
        var that = this,
            id = e.currentTarget.id
            
        that.setData({
            activeIndex: id,
            columnId: e.currentTarget.dataset.id,
            pageNo: 1,
            pageSize: 10,
            strategyList: []
        });
        that.getStrategyList()
        //console.log(this.data.orderState);
    },
    onReachBottom: function(){
        this.getStrategyList()
    },

    /***********************************调用接口************************************************************/
    // 获取栏目列表
    getColumnList(){
        let that = this
        strategyMethod.getColumnList((res) => {
            if (res.code==200){
                that.setData({
                    columnList: res.data
                })
            }
        })
    },
    // 获取初始攻略列表
    getStrategyList(){
        let that = this,
            pageNo = that.data.pageNo,
            params = {
                columnId: that.data.columnId,
                pageNo: that.data.pageNo,
                pageSize: that.data.pageSize
            }
        strategyMethod.getStrategyList(params, (res) => {
            if (res && res.code==200){
                if (pageNo < res.data.totalPage+1) {
                    that.setData({
                        strategyList: that.data.strategyList.concat(res.data.rows),
                        pageNo: pageNo+1
                    })
                }
            } else {
                wx.showToast({
                    title: '请求失败',
                    icon: 'loading'
                })
            }
        })
    },
})