//index.js
const app = getApp()
let {ajax} = require('../../utils/ajax.js')

Page({
  data: {
    baseUrl: app.globalData.imgUrlPath,
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
            that.setData({
              adList: res.data[0]
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
          if (res.code==200){
            that.setData({
              moduleList: res.data
            })
          }
        }
      }
    ajax.request(requestConfig)
  }

})
