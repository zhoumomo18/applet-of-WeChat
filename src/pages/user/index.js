Page({
    data: {
        showMadal: false
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