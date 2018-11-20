const app = getApp()
let {ajax} = require('../../utils/ajax.js')
Page({
    data: {
        canUseEdit: true,
        showMadal: false,
        userInfo: ''
    },
    onLoad: function(){
        this.getUserInfo()
    },
    // 获取用户信息详情
    getUserInfo(){
        let that = this,
            userInfo = that.data.userInfo,
            requestConfig = {
                method: 'GET',
                url: '/constumer/getbyopenid',
                successCallback: (res) => {
                    if (res.code == 200){
                        that.setData({
                            userInfo: res.data
                        })
                    } else {
                        wx.showToast({
                            title: '请求超时'
                        })
                    }
                },
                errorCallback: (err) => {
                    wx.showToast({
                        title: '请求失败',
                        icon: 'loading'
                    })
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
        if (e.detail.value.length<2 || e.detail.value.length>24){
            wx.showToast({
                title: '昵称长度为2-24个字符',
                icon: 'none'
            })
        } else {
            ajax.request(requestConfig)
        }
        
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