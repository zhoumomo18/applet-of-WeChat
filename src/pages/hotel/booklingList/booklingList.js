// src/pages/hotel/booklingList/booklingList.js
Page({
    data: {
        showModal: false,
        searchData: {
            scenicSpot: null, //景点
            scenicSpotName: '凤凰', //景点名称
            startDate: null,
            endDate: null,
            hotelName: null,
            price: '',
            grade: null,  //0:不限 1:民宿/客栈，2：经济型，3：高档型，4：豪华型
        },
        priceSort: false, //价格排序
        levelList: [
            { value: 1, label: '不限' },
            { value: 2, label: '民宿/客栈' },
            { value: 3, label: '经济型' },
            { value: 4, label: '高档型' },
            { value: 5, label: '豪华型' },
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var searchData = wx.getStorageSync('searchData');
        if (!searchData) {
            return;
        }
        that.setData({ searchData: searchData })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    bindinput(e) {
        var that = this;
        var hotelName = e.detail.value;
        var searchData = that.data.searchData;
        searchData.hotelName = hotelName
        that.setData({ searchData: searchData })
    },
    changeSort(){
        var that = this;
        var priceSort = !that.data.priceSort;
        that.setData({ priceSort: priceSort})
    },
    switchModal(){
        var that = this;
        var showModal = !that.data.showModal;
        that.setData({ showModal: showModal })
    }
})