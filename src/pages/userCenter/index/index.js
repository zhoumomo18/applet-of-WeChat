let {userMethod} = require('../../../service/userCenter/userService.js')

Page({
    data: {
        canUseEdit: true,
        showMadal: false,
        showEditBtn: true,
        userInfo: ''
    },
    onLoad: function(){
        wx.showLoading()
        this.getUserInfo()
    },
    
    // 点击编辑图标
    handleEditDisable(){
        this.setData({
            canUseEdit: !this.data.canUseEdit,
            showEditBtn: !this.data.showEditBtn
        })
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
    },

    /***********************************调用接口************************************************************/
    // 获取用户信息详情
    getUserInfo(){
        let that = this
        userMethod.getUserInfo((res) => {
            if (res && res.code == 200){
                that.setData({
                    userInfo: res.data
                })
                wx.hideLoading()
            } else {
                wx.showToast({
                    title: '请求失败',
                    icon: 'loading'
                })
            }
        })
    },
    // 保存编辑昵称
    saveNickname(e){
        let that = this,
            userInfo = that.data.userInfo,
            params = {
                nickName: e.detail.value
            }
        if (e.detail.value.length<2 || e.detail.value.length>24){
            wx.showToast({
                title: '昵称长度为2-24个字符',
                icon: 'none'
            })
        } else {
            userMethod.saveNickname(params, (res) => {
                if (res && res.code == 200){
                    userInfo.nickName = e.detail.value
                    that.setData({
                        canUseEdit: !that.data.canUseEdit,
                        showEditBtn: !that.data.showEditBtn
                    })
                } else {
                    wx.showToast({
                        title:'昵称修改失败',
                        icon: 'loading'
                    })
                }
            })
        }
    },
})