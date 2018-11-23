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
        // this.getListData()
    },
    onShow: function(){
        this.setData({
            pageNo: 1,
            strategyList:[]
        })
        this.getListData()
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
        this.getListData()
    },
    onReachBottom: function(){
        this.getListData()
    },

    /***********************************调用接口************************************************************/
    // 获取攻略/酒店收藏列表
    getListData(){
        let that = this,
            curIndex = that.data.curIndex,
            url = (curIndex==0) ? '/strategy/getallbyuser':'/hotelcollection/getallbyuser',
            params = {
                pageNo: that.data.pageNo,
                pageSize: that.data.pageSize
            }
        userMethod.getListData(url, params, (res) => {
            if (res && res.code==200){
                if (that.data.pageNo < res.data.totalPage+1){
                    if (curIndex==0){
                        that.setData({
                            strategyList: that.data.strategyList.concat(res.data.rows),
                            pageNo: that.data.pageNo+1
                        })
                    } else if (curIndex==1){
                        that.setData({
                            hotelList: that.data.hotelList.concat(res.data.rows),
                            pageNo: that.data.pageNo+1
                        })
                    }
                }
            } else {
                wx.showLoading({
                    title: '请求失败'
                })
            }
        })
    },
})