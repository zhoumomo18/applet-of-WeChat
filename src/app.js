//app.js
import WxValidate from './utils/WxValidate'
App({
  WxValidate: (rules,messages) => new WxValidate(rules,messages),
  globalData: {
    urlPath: 'https://admintour.cworld-china.com/tourWeb/v1.0',
    imgUrlPath: 'http://admintour.cworld-china.com:9999/image',
    userInfo: {},
    loading:{
      loadingHidden: false,  // loading
      content:'加载中...'
    }
  },
  onLaunch: function () {
    this.getUserInfo()
  },
  onLoad: function(){
    
  },
  //获取用户信息接口
  getUserInfo: function(){
    wx.checkSession({
      success: () => {
        console.log('have user session')
        wx.reLaunch({
          url: '/pages/index/index'
        })
      },
      fail: function(){
        console.log('no user session ,wait login !!!!')
      },
    })
  },
  // loding提示
  showToast: function(that,content,time){
    var _time = time || 2000
    that.setData({
        loading:{
            loadingHidden : false,
            content : content
        }
    });
    setTimeout(() =>{
        that.setData({
            loading:{
                loadingHidden: true,
                content: ""
            }
        })
    },_time);
  },

  //复制文本到剪切板
  setClipboard: function(self,text){
      var that = this;
      wx.setClipboardData({
          data: text,
          success: function(){
              wx.getClipboardData({
                  success: function(res) {
                      that.showMsg(self,"文本已复制",1200);
                  }
              })
          }
      })

  },
  //防止多次点击
  buttonClicked: function(that){
    that.setData({
        buttonClicked: true 
    })
    setTimeout(() =>{
        that.setData({
            buttonClicked: false
        })
    },1000)
  },
  
})
