//index.js
const app = getApp()
let {ajax} = require('../../utils/ajax.js')

Page({
  data: {
    imagePrefix: app.globalData.imgUrlPath,
    imgUrls:'/assets/images/banner.png',
    moduleList: [],
    adList: ''
  },
  onLoad(){
    this.getAdList()
    this.getModuleList()
  },
  // 获取广告图
  getAdList(){
    let that = this,
      requestConfig = {
        method: 'GET',
        url: '/adviertisement/getall?type=1',
        successCallback: (res) => {
          if (res.code==200){
            console.log(res.data)
            that.setData({
              adList: res.data
            })
          }
        }
      }
    ajax.request(requestConfig)
  },
  // 获取模块列表
  getModuleList(){
    let that = this,
      requestConfig = {
        method: 'GET',
        url: '/module/getallroleauthority',
        successCallback: (res) => {
          if (res.code && res.code==200){
            that.setData({
              moduleList: res.data
            })
          } else {
            wx.showToast({
                title: '请求失败',
                icon: 'loading'
            })
          }
        },
        errorCallback: () => {
          wx.showLoading({
            title: '请求失败'
          })
        }
      }
    ajax.request(requestConfig)
  }

})
