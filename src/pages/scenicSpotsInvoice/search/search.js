const app = getApp()
let {ajax} = require('../../../utils/ajax.js')
let {commonMethod} = require('../../../utils/page.js')
Page({
    data: {
        imagePrefix: app.globalData.imgUrlPath,
        isShow: false,
        name: '',
        pageNo: 1,
        pageSize: 10,
        scenicSpotList: []
    },
    onLoad(){
        
    },
    searchName(e){
        this.setData({
            name: e.detail.value
        })
        this.getKeyNameList()
    },
    // 获取关键字列表
    getKeyNameList(){
        let that = this,
            requestConfig = {
                method: 'GET',
                url: '/ScenicSpotController/select',
                data:{
                    name: that.data.name
                },
                successCallback: (res) => {
                    if (res.code && res.code==200){
                        that.setData({
                            scenicSpotList: res.data
                        })
                    }
                },
                errorCallBack: () => {
                    wx.showToast({
                        title: '请求失败',
                        icon: 'loading'
                    })
                }
            }
        ajax.request(requestConfig)
    },
    // 选择搜索列表
    chooseKeyName(e){
        this.setData({
            name: e.currentTarget.dataset.name,
            isShow: true
        })
        this.getKeyNameList()
    },
    searchList(){
        let that = this,
            pageNo = that.data.pageNo,
            params = {
                name: that.data.name,
                pageNo: that.data.pageNo,
                pageSize: that.data.pageSize,
                callBack: (res) => {
                    console.log(res)
                    if (res.code==200){
                        that.setData({
                            scenicSpotList: that.data.scenicSpotList.concat(res.data.rows),
                            pageNo: pageNo+1
                        })
                    } else {
                        wx.showToast({
                            title: '请求失败',
                            icon: 'loading'
                        })
                    }
                }
            }
            commonMethod.getScenicSpotList(params)
    },
    clearSearch(){
        this.setData({
            name: ''
        })
    },
    onReachBottom: function(){
        this.searchList()
    },
})