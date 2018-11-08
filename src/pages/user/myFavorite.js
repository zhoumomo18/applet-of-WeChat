const app = getApp()
let {ajax} = require('../../utils/ajax.js')
Page({
    data: {
        baseUrl: app.globalData.imgUrlPath,
        pageNo: 1,
        pageSize: 10,
        favorateList:[]
    },

    onLoad: function(){
        this.getFavorateList()
    },
    // 获取初始攻略列表
    getFavorateList(){
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
                    if (res.code==200){
                        that.setData({
                            favorateList: that.data.favorateList.concat(res.data.rows),
                            pageNo: pageNo+1
                        })
                    }
                }
            }
        ajax.request(requestConfig)
    },
    onReachBottom: function(){
        this.getFavorateList()
    }

})