// components/foods/listItem/listItem.js
Component({
    properties: {
        itemObj: {
            type: Object,
            value: {}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        isClick: false
    },

    /**
     * 组件的方法列表
     */
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
