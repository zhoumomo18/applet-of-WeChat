let app = getApp()
Page({
    data: {
        userinfo: {}
    },
    onLoad: function () {
        
    },
    // 用户登录
    bindGetUserInfo: function (e) {
        if (e.detail.userInfo) {
            //用户按了允许授权按钮
            wx.login({
                success:(res) => {
                    if(res.code){
                        //插入登录的用户的相关信息到数据库
                        wx.request({
                            url: app.globalData.urlPath + '/weChatAuthorization/getuserinfo/anon',
                            data: {
                                code: res.code,
                                nickName: e.detail.userInfo.nickName,
                                avatarUrl: e.detail.userInfo.avatarUrl,
                                province:e.detail.userInfo.province,
                                city: e.detail.userInfo.city,
                                gender: e.detail.userInfo.gender
                            },
                            method : 'POST',
                            success: function (res) {
                                if (res.data.code == 200) {
                                    wx.setStorageSync('userToken', res.data.data.token)
                                    //授权成功后，跳转进入小程序首页
                                    wx.switchTab({
                                        url: '/pages/index/index'  
                                    })
                                } else {
                                    wx.showToast({
                                        title: '登录失败',
                                        icon: 'none'
                                    })
                                }
                            }
                        });
                    }
                }
            })
        } else {
            //用户按了拒绝按钮
            wx.showModal({
                title:'警告',
                content:'您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
                showCancel:false,
                confirmText:'返回授权',
                success:function(res){
                    if (res.confirm) {
                        console.log('用户点击了“返回授权”')
                    } 
                }
            })
        }
    }
})