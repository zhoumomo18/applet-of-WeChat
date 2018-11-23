const app = getApp()
let {scenicMethod} = require('../../../service/scenicSpots/scenicService.js')

Page({
    data: {
        imagePrefix: app.globalData.imgUrlPath,
        name: '',
        pageNo: 1,
        pageSize: 10,
        scenicSpotList: []
    },
    onLoad(){
        // this.getScenicSpotList()
    },
    onShow(){
        this.setData({
            pageNo: 1,
            scenicSpotList: []
        })
        wx.showLoading()
        this.getScenicSpotList()
    },
    onReachBottom: function(){
        this.getScenicSpotList()
    },
    navigateToSerach() {
        wx.navigateTo({
            url: '../search/search'
        })
    },

    /***********************************调用接口************************************************************/
    // 获取攻略列表
    getScenicSpotList(){
        let that = this,
            pageNo = that.data.pageNo,
            params = {
                name: that.data.name,
                pageNo: that.data.pageNo,
                pageSize: that.data.pageSize
            }
        scenicMethod.getScenicSpotList(params, (res) => {
            if (res && res.code==200){
                if (pageNo < res.data.currentPage+1){
                    that.setData({
                        scenicSpotList: that.data.scenicSpotList.concat(res.data.rows),
                        pageNo: pageNo+1
                    })
                    wx.hideLoading()
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