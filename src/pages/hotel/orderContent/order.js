// src/pages/hotel/orderContent/order.js
var { userMethod } = require('../../../service/userCenter/userService.js'); 
var { hotelMethods } = require('../../../service/hotel/hotelService.js');
var App = getApp();
Page({
  data: {
      userinfos:null,
      houseInfo:{
        detailConfigList:null,
        isUnsubscribe:null,
      },
  },

  onLoad:function () {
     var that= this
     var data = wx.getStorageSync('searchData');
     var token = wx.getStorageSync('userToken');
     that.setData({ data })
  },
  onShow: function () {
     var that = this
     that.userLiveInfo()
     that.houseInfo()
  },

  //用户住房信息
  userLiveInfo() {
    let that = this
    userMethod.getUserInfo((res) => {
      if (res && res.code == 200) {
 
        that.setData({
          userinfos: res.data
        })
      } else {
        wx.showToast({
          title: '请求失败',
          icon: 'loading'
        })
      }
    })
  },
  //房型信息
  houseInfo() {
    let that = this
    hotelMethods.getHouseDetailList((res) => {
      console.log('123') 
      if (res && res.code == 200) {

        that.setData({
          userinfos: res.data
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