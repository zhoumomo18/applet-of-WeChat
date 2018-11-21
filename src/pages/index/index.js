//index.js
const app = getApp()
let {indexMethod} = require('../../service/index/indexService.js')

Page({
  data: {
    imagePrefix: app.globalData.imgUrlPath,
    imgUrls:'/assets/images/banner.png',
    moduleList: [],
    adList: '',
    hotsList:[]
  },
  onLoad(){
    wx.showLoading()
    this.getAdList()
    this.getModuleList()
    this.getHotScenicSpots()
  },
  onShow(){
    this.getAdList()
    this.getModuleList()
  },

  /***********************************调用接口************************************************************/
  // 获取广告图
  getAdList(){
    let that = this
      indexMethod.getAdList((res) => {
        if (res && res.code==200){
          that.setData({
            adList: res.data
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
  // 获取模块列表
  getModuleList(){
    let that = this
    indexMethod.getModuleList((res) => {
      if (res && res.code==200){
        that.setData({
          moduleList: res.data
        })
      } else {
        wx.showToast({
          title: '请求失败',
          icon: 'loading'
        })
      }
    })
  },
  // 获取热门景点
  getHotScenicSpots(){
    let that = this
    indexMethod.getHotScenicSpot((res) => {
      if (res && res.code==200){
        that.setData({
          hotsList: res.data
        })
      } else {
        wx.showToast({
            title: '请求失败',
            icon: 'loading'
        })
      }
    })
  },

})
