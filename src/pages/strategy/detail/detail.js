const app = getApp()
let {strategyMethod} = require('../../../service/strategy/strategyService.js')
let common = require('../../../utils/common.js')
let WxParse = require('../../../wxParse/wxParse.js');//在使用的View中引入WxParse模块

Page({
    data: {
        imagePrefix: app.globalData.imgUrlPath,
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
    // 预览图片
    previewImage: function (e) {
        let current = e.target.dataset.src,
            imgUrls = this.data.imgUrls
        wx.previewImage({
            current: current, // 当前显示图片的http链接
            urls: imgUrls, // 需要预览的图片http链接列表  
        })
    },

    /***********************************调用接口************************************************************/
    // 获取当前攻略详情
    getStrategyById: function(){
        let that = this,
            imgUrls = []
        strategyMethod.getStrategyById(that.data.currentId , (res) => {
            if (res && res.code==200){
                imgUrls.push(that.data.imagePrefix+res.data.photo)

                /* 
                * IOS系统不支持year-month-day格式。将格式转成year/month/day。
                * 否则在使用new Date(time)时会得到invalid date
                */
                let formatUpdate = res.data.updatedate.replace(/-/g, '/')                 
                res.data.actualDate = common.timeago(formatUpdate)
                
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
            } else {
                wx.showToast({
                    title: '请求失败',
                    icon: 'loading'
                })
            }
        })
    },
    // 收藏商品
    addToFavorite: function(){
        let that = this,
            isCollection = that.data.detailInfo.isCollection
        strategyMethod.addToFavorite(that.data.currentId, (res) => {
            if (res && res.code == 200) {
                that.setData({
                    'detailInfo.isCollection': (isCollection==1) ? 0:1
                })
            } else {
                wx.showToast({
                    title: '收藏失败',
                    icon: 'loading'
                })
            }
        })
    },
    // 点赞
    handlePraise: function(){
        let that = this,
            isPraise = that.data.detailInfo.isPraise,
            totalpraise = that.data.detailInfo.totalpraise
        strategyMethod.handlePraise(that.data.currentId, (res) => {
            if (res && res.code == 200) {
                that.setData({
                    isPraise: !that.data.isPraise,
                    'detailInfo.isPraise':  (isPraise==1) ? 0:1,
                    'detailInfo.totalpraise': (isPraise==1) ? totalpraise-1:totalpraise+1
                })
            } else {
                wx.showToast({
                    title: '点赞失败',
                    icon: 'loading'
                })
            }
        })
    }
})