let {ajax} = require('../../utils/ajax.js')
Page({
    data: {
        name: '',
        pageNo: 1,
        pageSize: 10,
        scenicSpotList: []
    },
    onLoad(){
        this.getScenicSpotList()
    },
    // 获取初始攻略列表
    getScenicSpotList(){
        let that = this,
            pageNo = that.data.pageNo,
            requestConfig = {
                method: 'GET',
                url: '/ScenicSpotController/getall',
                data:{
                    name: that.data.name,
                    pageNo: that.data.pageNo,
                    pageSize: that.data.pageSize
                },
                successCallback: (res) => {
                    if (res.code==200){
                        that.setData({
                            scenicSpotList: that.data.scenicSpotList.concat(res.data.rows),
                            pageNo: pageNo+1
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
    onReachBottom: function(){
        this.getScenicSpotList()
    },
    navigateToSerach() {
        wx.navigateTo({
            url: './search/search'
        })
    }
})