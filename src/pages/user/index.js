const app = getApp()
let {ajax} = require('../../utils/ajax.js')
Page({
    data: {
        canUseEdit: true,
        showMadal: false,
        userInfo: wx.getStorageSync('userinfo')
    },
    onLoad: function(){
        
    },
    onShow: function(){
        // 在data里直接读取，有时候取不到值
        this.setData({
            userInfo: wx.getStorageSync('userinfo')
        })
    },
    handleEditDisable: function(){
        this.setData({
            canUseEdit: !this.data.canUseEdit
        })
    },
    editNickname:function(e){
        let that = this,
            userInfo = that.data.userInfo,
            requestConfig = {
                method: 'PUT',
                url: '',
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
    showDialModal: function(){
        let that = this
        that.setData({
            showMadal: !that.data.showMadal
        })
    },
    callPhone: () => {
        wx.makePhoneCall({
            phoneNumber: '021-12345678',
            success: function(res) {
                // success
            }
        })
    }
})