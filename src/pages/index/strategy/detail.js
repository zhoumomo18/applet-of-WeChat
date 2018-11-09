const app = getApp()
let {ajax} = require('../../../utils/ajax.js')
let WxParse = require('../../../wxParse/wxParse.js');//在使用的View中引入WxParse模块
Page({
    data: {
        baseUrl: app.globalData.imgUrlPath,
        currentId: '',
        detailInfo: {},
        imgUrls: []
    },
    onLoad: function(options){
        this.setData({
            currentId: options.id
        })
        this.getStrategyById()
    },
    // 获取当前攻略详情
    getStrategyById: function(){
        let that = this,
            imgUrls = [],
            requestConfig = {
                method: 'GET',
                url: '/strategy/getbyid/'+that.data.currentId,
                successCallback: (res) => {
                    if (res.code==200){
                        imgUrls.push(that.data.baseUrl+res.data.photo)
                        console.log("需要预览的图片列表"+imgUrls);
                        that.setData({
                            detailInfo: res.data,
                            imgUrls: imgUrls
                        })
                        wx.setNavigationBarTitle({
                            title: that.data.detailInfo.title
                        })

                        //解析文本
                        var strategyDetail = res.data.content;
                        WxParse.wxParse('strategyDetail', 'html', strategyDetail, that, 5);
                    }
                }
            }
        ajax.request(requestConfig)
    },
    // 预览图片
    previewImage: function (e) {
        let current = e.target.dataset.src,
            imgUrls = this.data.imgUrls
        wx.previewImage({
            current: current, // 当前显示图片的http链接
            urls: imgUrls, // 需要预览的图片http链接列表  
        })
    },
    // 收藏商品
    addToFavorite: function(){
        let that = this,
            isCollection = that.data.detailInfo.isCollection,
            requestConfig = {
                method: 'POST',
                url: '/strategy/saveconsumerstrategycollection?strategyId='+that.data.currentId,
                successCallback: (res) => {
                    if (res.code == 200) {
                        that.setData({
                            'detailInfo.isCollection': (isCollection==1) ? 0:1
                        })
                    }
                }
            }
        ajax.request(requestConfig)
    },
    // 点赞
    handlePraise: function(){
        let that = this,
            isPraise = that.data.detailInfo.isPraise,
            totalpraise = that.data.detailInfo.totalpraise,
            requestConfig = {
                method: 'PUT',
                url: '/strategy/savetconsumerstrategypraise?strategyId='+that.data.currentId,
                successCallback: (res) => {
                    if (res.code == 200) {
                        that.setData({
                            isPraise: !that.data.isPraise,
                            'detailInfo.isPraise':  (isPraise==1) ? 0:1,
                            'detailInfo.totalpraise': (isPraise==1) ? totalpraise-1:totalpraise+1
                        })
                    }
                }
            }
        ajax.request(requestConfig)
    }
})