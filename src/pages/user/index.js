Page({
    data: {
        canUseEdit: true,
        showMadal: false,
        userInfo: wx.getStorageSync('userinfo')
    },
    onLoad: function(){
        
    },
    handleEditDisable: function(){
        this.setData({
            canUseEdit: !this.data.canUseEdit
        })
    },
    editNickname:function(e){
        console.log(e.detail.value)
    },
    showDialModal: function(){
        let that = this
        that.setData({
            showMadal: !that.data.showMadal
        })
    },
    callPhone: () => {
        wx.makePhoneCall({
            phoneNumber: '021-343345564',
            success: function(res) {
                // success
            }
        })
    }
})