const app = getApp()
let {scenicMethod} = require('../../../service/scenicSpots/scenicService.js')

Page({
    data: {
        imagePrefix: app.globalData.imgUrlPath,
        isShow: false,
        name: '',
        pageNo: 1,
        pageSize: 10,
        scenicSpotList: [],
        searchList: []
    },
    // 输入搜索词
    searchName(e){
        this.setData({
            name: e.detail.value
        })
        this.getKeyNameList()
    },
    // 选择搜索列表
    chooseKeyName(e){
        this.setData({
            name: e.currentTarget.dataset.name,
            isShow: true
        })
        this.getSearchList()
    },
    // 清除搜索关键词
    clearSearch(){
        this.setData({
            name: '',
            scenicSpotList: []
        })
    },
    onReachBottom: function(){
        this.getSearchList()
    },

    /***********************************调用接口************************************************************/
    // 获取关键字列表
    getKeyNameList(){
        let that = this,
            param = {
                name: that.data.name
            }
        scenicMethod.getKeyNameList(param, (res) => {
            if (res && res.code==200){
                that.setData({
                    searchList: res.data
                })
            } else {
                wx.showToast({
                    title: '请求失败',
                    icon: 'loading'
                })
            }
        })
    },
    getSearchList(){
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
                    title: '数据请求失败',
                    icon: 'loading'
                })
            }
        })
    },

})