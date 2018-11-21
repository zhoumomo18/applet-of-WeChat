const app = getApp()
let {userMethod} = require('../../../service/userCenter/userService.js')

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
            strategyList:[]
        })
        this.getStrategyList()
    },
    //切换对应的列表
    getProductDetail: function(e){
        var curSelected = e.target.dataset.index;
        this.setData({
            curIndex: curSelected,
            pageNo: 1,
            pageSize: 10,
            strategyList:[],
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
    },

    /***********************************调用接口************************************************************/
    // 获取初始攻略收藏列表
    getStrategyList(){
        let that = this,
            pageNo = that.data.pageNo,
            params = {
                pageNo: that.data.pageNo,
                pageSize: that.data.pageSize
            }
        userMethod.getStrategyList(params, (res) => {
            if (res && res.code==200){
                if (pageNo < res.data.totalPage+1){
                    that.setData({
                        strategyList: that.data.strategyList.concat(res.data.rows),
                        pageNo: pageNo+1
                    })
                }
            } else {
                wx.showLoading({
                    title: '请求失败'
                })
            }
        })
    },
    // 获取酒店收藏
    getHotelList(){

    },
})