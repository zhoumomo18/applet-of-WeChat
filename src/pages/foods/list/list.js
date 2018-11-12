Page({
    data: {
        isShowSelect: null,
        aiList: [ //距离优先，推荐优先，价格优先；默认全部
            { value: 1, label: '距离优先' },
            { value: 2, label: '推荐优先' },
            { value: 3, label: '价格优先' },
            { value: 4, label: '全部'}
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
    },
    //获取页面高度
    getHeight:function(){
            var that = this
            // 获取系统信息
            wx.getSystemInfo({
                success: function (res) {
                    console.log(res);
                    // 可使用窗口宽度、高度
                    console.log('height=' + res.windowHeight);
                    console.log('width=' + res.windowWidth);
                    // 计算主体部分高度,单位为px
                }
            })
    },
    //点击筛选条件
    switchModal(e){
        let that = this;
        let key = e.currentTarget.dataset.key;
        let isShowSelect = that.data.isShowSelect;
        isShowSelect = isShowSelect == key ? null:key;
        that.setData({ isShowSelect: isShowSelect});
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

    }
})