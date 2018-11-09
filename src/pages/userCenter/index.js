const app = getApp()
let {ajax} = require('../../utils/ajax.js')
Page({
    data: {
        canUseEdit: true,
        showMadal: false,
        userInfo: wx.getStorageSync('userinfo')
    },
    onLoad: function(){
        this.getUserInfo()
    },
    onShow: function(){
        // 在data里直接读取，有时候取不到值
        this.setData({
            userInfo: wx.getStorageSync('userinfo')
        })
    },
    // 获取用户信息详情
    getUserInfo(){
        let that = this,
            userInfo = that.data.userInfo,
            requestConfig = {
                method: 'GET',
                url: '/constumer/getbyopenid',
                publicUrlType: 2,
                successCallback: (res) => {
                    if (res.code == 200){
                        that.setData({
                            userInfo: res.data
                        })
                        // userInfo.nickName = e.detail.value
                        // wx.setStorageSync('userinfo', userInfo)
                    }
                }
            }
        ajax.request(requestConfig)
    },
    // 点击编辑图标
    handleEditDisable(){
        this.setData({
            canUseEdit: !this.data.canUseEdit
        })
    },
    // 保存编辑昵称
    editNickname(e){
        let that = this,
            userInfo = that.data.userInfo,
            requestConfig = {
                method: 'PUT',
                url: '/constumer/updatenickname',
                publicUrlType: 2,
                data: {
                    nickName: e.detail.value
                },
                successCallback: (res) => {
                    if (res.code == 200){
                        userInfo.nickName = e.detail.value
                        wx.setStorageSync('userinfo', userInfo)
                    }
                }
            }
        ajax.request(requestConfig)
    },
    // 打开客服弹窗
    showDialModal(){
        let that = this
        that.setData({
            showMadal: !that.data.showMadal
        })
    },
    // 拨打电话
    callPhone: () => {
        wx.makePhoneCall({
            phoneNumber: '021-12345678'
        })
    }
})