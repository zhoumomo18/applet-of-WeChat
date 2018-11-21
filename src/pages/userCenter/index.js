const app = getApp()
let {ajax} = require('../../utils/ajax.js')
let {commonMethod} = require('../../utils/page.js')
Page({
    data: {
        canUseEdit: true,
        showMadal: false,
        showEditBtn: true,
        userInfo: ''
    },
    onLoad: function(){
        this.getUserInfo()
    },
    // 获取用户信息详情
    getUserInfo(){
        let that = this,
            requestConfig = {
                callBack: (res) => {
                    if (res.code && res.code == 200){
                        that.setData({
                            userInfo: res.data
                        })
                    } else {
                        wx.showToast({
                            title: '请求失败'
                        })
                    }
                }
            }
        commonMethod.getUserInfo(requestConfig)
    },
    // 点击编辑图标
    handleEditDisable(){
        this.setData({
            canUseEdit: !this.data.canUseEdit,
            showEditBtn: !this.data.showEditBtn
        })
    },
    // 保存编辑昵称
    editNickname(e){
        let that = this,
            userInfo = that.data.userInfo,
            requestConfig = {
                method: 'POST',
                url: '/constumer/updatenickname',
                data: {
                    nickName: e.detail.value
                },
                successCallback: (res) => {
                    if (res.code && res.code == 200){
                        userInfo.nickName = e.detail.value
                        wx.setStorageSync('userinfo', userInfo)
                        that.setData({
                            canUseEdit: !that.data.canUseEdit,
                            showEditBtn: !that.data.showEditBtn
                        })
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