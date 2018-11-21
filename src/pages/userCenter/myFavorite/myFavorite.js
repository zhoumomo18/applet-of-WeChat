const app = getApp()
let {ajax} = require('../../../utils/ajax.js')
Page({
    data: {
        imagePrefix: app.globalData.imgUrlPath,
        pageNo: 1,
        pageSize: 10,
        strategyList:[],
        hotelList:[],
        curIndex: 0
    },
    onLoad: function(){
        // this.getStrategyList()
    },
    onShow: function(){
        this.setData({
            pageNo: 1,
            favorateList:[]
        })
        this.getStrategyList()
    },
    // 获取初始攻略收藏列表
    getStrategyList(){
        let that = this,
            pageNo = that.data.pageNo,
            requestConfig = {
                method: 'GET',
                url: '/strategy/getallbyuser',
                data:{
                    pageNo: that.data.pageNo,
                    pageSize: that.data.pageSize
                },
                successCallback: (res) => {
                    if (res.code && res.code==200){
                        if (pageNo < res.data.totalPage+1){
                            that.setData({
                                strategyList: that.data.strategyList.concat(res.data.rows),
                                pageNo: pageNo+1
                            })
                            console.log(that.data.strategyList)
                        }
                    } else {
                        wx.showLoading({
                            title: '请求失败'
                        })
                    }
                },
                errorCallback:() => {
                    wx.showLoading({
                        title: '请求失败'
                      })
                }
            }
        ajax.request(requestConfig)
    },
    // 获取酒店收藏
    getHotelList(){
        let that = this,
            pageNo = that.data.pageNo,
            requestConfig = {
                method: 'GET',
                url: '/hotelcollection/getallbyuser',
                data:{
                    pageNo: that.data.pageNo,
                    pageSize: that.data.pageSize
                },
                successCallback: (res) => {
                    if (res.code && res.code==200){
                        if (pageNo < res.data.totalPage+1){
                            that.setData({
                                hotelList: that.data.hotelList.concat(res.data.rows),
                                pageNo: pageNo+1
                            })
                            console.log(that.data.hotelList)
                        }
                    } else {
                        wx.showLoading({
                            title: '请求失败'
                        })
                    }
                },
                errorCallback:() => {
                    wx.showLoading({
                        title: '请求失败'
                    })
                }
            }
        ajax.request(requestConfig)
    },
    //切换对应的列表
    getProductDetail: function(e){
        var curSelected = e.target.dataset.index;
        this.setData({
            curIndex: curSelected,
            pageNo: 1,
            pageSize: 10,
            favorateList:[],
            hotelList:[]
        })
        if (curSelected==0){
            this.getStrategyList()
        } else if (curSelected==1){
            this.getHotelList()
        }
    },
    onReachBottom: function(){
        this.getStrategyList()
    }

})