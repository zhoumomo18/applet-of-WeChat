//index.js
const app = getApp()
let {ajax} = require('../../utils/ajax.js')

Page({
  data: {
    imagePrefix: app.globalData.imgUrlPath,
    imgUrls:'/assets/images/banner.png',
    moduleList: [],
    adList: '',
    hotsList:[]
  },
  onLoad(){
    this.getAdList()
    this.getModuleList()
    this.getHotScenicSpots()
  },
  onShow(){
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
          if (res.code && res.code==200){
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
  },
  // 获取热门景点
  getHotScenicSpots(){
    let that = this,
      requestConfig = {
        method: 'GET',
        url: '/hotscenicspots/getall',
        successCallback: (res) => {
          if (res.code && res.code==200){
            that.setData({
              hotsList: res.data
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
