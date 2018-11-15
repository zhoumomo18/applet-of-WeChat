let {ajax} = require('../../utils/ajax.js')
let {commonMethod} = require('../../utils/page.js')
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
            params = {
                name: that.data.name,
                pageNo: that.data.pageNo,
                pageSize: that.data.pageSize,
                callBack: (res) => {
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
    onReachBottom: function(){
        this.getScenicSpotList()
    },
    navigateToSerach() {
        wx.navigateTo({
            url: './search/search'
        })
    }
})