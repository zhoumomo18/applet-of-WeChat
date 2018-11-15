var App = getApp();
Component({
    properties: {
        itemObj: {
            type: Object,
            value: {}
        }
    },
    data: {
        imgUrlPath: App.globalData.imgUrlPath,
        isClick: false
    },
    methods: {
        gotoDetail:function(e){
            let that = this;
            let id= e.currentTarget.dataset.id;
            if (!id || that.data.isClick) return;
            that.setData({ isClick: false})
            wx.navigateTo({
                url: '/pages/foods/merchants/merchants?id=' + id,
            })
        }
    }
})
