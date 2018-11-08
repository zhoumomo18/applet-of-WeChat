Page({
    data: {

    },
    onLoad:function(){

    },
    getUserLocation: () => {
        // 查看是否授权
        wx.getSetting({
            success: (res) => {
            if (!res.authSetting['scope.userLocation']) {
                // 未授权，弹框授权
                wx.authorize({
                scope: 'scope.userLocation',
                success () {
                    // 用户已经同意小程序使用地理功能，后续调用 wx.getLocation  接口不会弹窗询问
                    wx.getLocation ()
                }
                })
            } else {
                // 已经授权，可以直接调用，不会弹框
                wx.getLocation ()
            }
            }
        })
    }
})