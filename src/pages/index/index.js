//index.js
const app = getApp()
let {ajax} = require('../../utils/ajax.js')

Page({
  data: {
    baseUrl: app.globalData.imgUrlPath,
    imgUrls:'/assets/images/banner.png',
    moduleList: []
  },
  onLoad(){
    this.getModuleList()
  },
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
