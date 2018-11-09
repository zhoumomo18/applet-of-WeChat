const app = getApp()
let {ajax} = require('../../../utils/ajax.js')
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
        this.getColumnList()
        this.getStrategyList()
    },
    onShow: function(){
        this.getStrategyList()
    },
    // 获取栏目列表
    getColumnList(){
        let that = this,
            requestConfig = {
                method: 'GET',
                url: '/column/getall',
                successCallback: (res) => {
                    if (res.code==200){
                        console.log(res)
                        that.setData({
                            columnList: res.data
                        })
                    }
                }
            }
        ajax.request(requestConfig)
    },
    // 获取初始攻略列表
    getStrategyList(){
        let that = this,
            pageNo = that.data.pageNo,
            requestConfig = {
                method: 'GET',
                url: '/strategy/getall',
                data:{
                    columnId: that.data.columnId,
                    pageNo: that.data.pageNo,
                    pageSize: that.data.pageSize
                },
                successCallback: (res) => {
                    if (res.code==200){
                        that.setData({
                            strategyList: that.data.strategyList.concat(res.data.rows),
                            pageNo: pageNo+1
                        })
                    }
                }
            }
        ajax.request(requestConfig)
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
    }
})