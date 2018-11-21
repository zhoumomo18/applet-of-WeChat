const app = getApp()
let {scenicMethod} = require('../../../service/scenicSpots/scenicService.js')
let WxParse = require('../../../wxParse/wxParse.js');//在使用的View中引入WxParse模块
let QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js')  //引入获得地址的js文件
let demo = new QQMapWX({
    key: 'MEZBZ-HBSHJ-6SXF4-FWQFK-UFP3F-HHFXT'
})

Page({
    data: {
        imagePrefix: app.globalData.imgUrlPath,
        imgUrls: [],
        curIndex: 0,
        detailInfo: ''
    },
    onLoad: function(options){
        this.setData({
            currentId: options.id
        })
        wx.showLoading()
        this.getDetailyById()
    },
    // 预览图片
    previewImage: function (e) {
        var current = e.target.dataset.src;  
        var imgUrls = this.data.imgUrls;
        //console.log(imgUrls)
        wx.previewImage({
            current: current, // 当前显示图片的http链接  
            urls: imgUrls, // 需要预览的图片http链接列表  
        })
    },
    // 切换对应的景点详情
    getProductDetail: function(e){
        var curSelected = e.target.dataset.index;

        this.setData({
            curIndex: curSelected
        });
    },
    // 打开地图
    openLocation(){
        let that = this
        demo.geocoder({
            address: that.data.detailInfo.address,
            success: function(res) {
                let latitude = res.result.location.lat,
                    longitude = res.result.location.lng,
                    address = res.result.title
                wx.openLocation({
                    latitude,
                    longitude,
                    address: address,
                    scale: 18
                })
            },
            fail: function(res) {
               wx.showToast({
                   title: res.data,
                   icon: 'loading'
               })
            }
        });
    },

    /***********************************调用接口************************************************************/
    // 获取当前景点详情
    getDetailyById: function(){
        let that = this
        scenicMethod.getDetailyById(that.data.currentId, (res) => {
            if (res && res.code==200){
                that.setData({
                    detailInfo: res.data,
                    imgUrls: res.data.imgInfo
                })
                wx.hideLoading()

                // 解析文本
                var scenicSpotIntro = res.data.remark;
                WxParse.wxParse('scenicSpotIntro', 'html', scenicSpotIntro, that, 5);
            } else {
                wx.showToast({
                    title: '数据请求失败',
                    icon: 'loading'
                })
            }
        })
    },
})