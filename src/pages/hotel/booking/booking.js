var App = getApp();
Page({
    data: {
        imgUrlPath: App.globalData.imgUrlPath,
        showModal: false,
        levelList: [
            { value: 0, label: '不限' },
            { value: 1, label: '民宿/客栈' },
            { value: 2, label: '经济型' },
            { value: 3, label: '高档型' },
            { value: 4, label: '豪华型'},
        ],
        searchData: {
            scenicSpot: null, //景点
            scenicSpotName: '凤凰', //景点名称
            startDate: null,
            endDate: null,
            hotelName: null,
            price: '', 
            grade: null,  //0:不限 1:民宿/客栈，2：经济型，3：高档型，4：豪华型
        },
        modalData: {
            price: 0.00,
            grade: 0,  //0:不限 1:民宿/客栈，2：经济型，3：高档型，4：豪华型
        }
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var that = this;
        var searchData = wx.getStorageSync('searchData');
        if (!searchData) {
            return;
        }
        that.setData({ searchData: searchData})
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
    //价格等级弹框开关
    switchModal(){
        var that = this;
        var showModal = that.data.showModal;
        showModal = !showModal;
        that.setData({ showModal: showModal})
    },
    //去选景点
    gotoSelectPoint(e){
        var that = this;
        var id = e.currentTaget.dataset.id;
        if(!id) return;
        wx.navigateTo({url: '/pages/hotel/attractionsList/attractionsList?id='+id,})
    },
    bindinput(e){
        var that = this;
        var hotelName = e.detail.value;
        var searchData = that.data.searchData;
        searchData.hotelName = hotelName
        that.setData({ searchData: searchData })
    },
    selectGrade(e) {
        var that = this;
        var grade = e.currentTarget.dataset.key;
        var modalData = that.data.modalData;
        modalData.grade = grade
        that.setData({ modalData: modalData})
    },
    changeSlider(e){
        var that = this;
        var price = e.detail.value;
        var modalData = that.data.modalData;
        modalData.price = price
        that.setData({ modalData: modalData })
    },
    updataSearch(){
        var that = this;
        var searchData = that.data.searchData;
        var modalData = that.data.modalData;
        searchData.grade = modalData.grade;
        searchData.price = modalData.price;
        that.setData({ searchData: searchData })
        that.switchModal();
    },
    searchHotel(){
        var that = this;
        var searchData = that.data.searchData;
        wx.setStorageSync('searchData', searchData)
        wx.navigateTo({
            url: '/pages/hotel/booklingList/booklingList',
        })
    }
})