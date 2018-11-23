Component({
    properties: {
        leftValue: {
            type: String,
            value: 0,
        },
        rightValue: {
            type: String,
            value: 2000,
        },
    },
    data: {
        leftMax: 2000, //左边滑块最大值
        leftValue: 0, //左边滑块默认值
        rightValue: 2000, //右边滑块默认值
        windowWidth: null,
    },
    ready(){
        var that = this;
        that.getHeight();
    },
    methods: {
        //获取页面宽度
        getHeight: function () {
            var that = this
            wx.getSystemInfo({
                success: function (res) {
                    that.setData({ windowWidth: res.windowWidth })
                }
            })
        },
        // 左边滑块滑动的值
        touchmoveLeft: function (e) {
            var that = this;
            var leftValue = Number(that.data.leftValue);
            var rightValue = Number(that.data.rightValue);
            var windowWidth = that.data.windowWidth;
            var marginLeft = windowWidth * 0.05;
            var marginRight = windowWidth * 0.95;
            var contentWidth = Number(marginRight) - Number(marginLeft);
            var leftMax = that.data.leftMax;
            var pageX_end = e.touches[0].clientX;
            var x;
            if (pageX_end < marginLeft){
                pageX_end = 0;
                x = 0
            } else if (pageX_end > marginRight){
                pageX_end = marginRight;
                x = leftMax;
            } else {
                x = pageX_end / contentWidth;
                x = x * leftMax;
                if (x > leftMax){
                    x = leftMax;
                }
            };
            x = Number(x).toFixed(0);
            x = Number(x);
            if (x > rightValue) {
                return;
                // leftValue = rightValue;
                // debugger
                // rightValue = x;
            } else {
                leftValue = x;
            }
            if (leftValue == rightValue) return;
            that.setData({
                leftValue: leftValue,
                rightValue: rightValue,
            });
            var arr = [];
            arr.push(leftValue);
            arr.push(rightValue);
            that.triggerEvent('changeSlider', arr);
        },
        // 右边滑块滑动的值
        touchmoveRight: function (e) {
            var that = this;
            var leftValue = Number(that.data.leftValue);
            var rightValue = Number(that.data.rightValue);
            var windowWidth = that.data.windowWidth;
            var marginLeft = windowWidth * 0.05;
            var marginRight = windowWidth * 0.95;
            var contentWidth = Number(marginRight) - Number(marginLeft);
            var leftMax = that.data.leftMax;
            var pageX_end = e.touches[0].clientX;
            var x;
            if (pageX_end < marginLeft) {
                pageX_end = 0;
                x = 0
            } else if (pageX_end > marginRight) {
                pageX_end = marginRight;
                x = leftMax;
            } else {
                x = pageX_end / contentWidth;
                x = x * leftMax;
                if (x > leftMax) {
                    x = leftMax;
                }
            };
            x = Number(x).toFixed(0);
            x = Number(x);
            if (x < leftValue) {
                return;
                // rightValue = leftValue;
                // leftValue = x;
            } else {
                rightValue = x;
            }
            if (leftValue == rightValue) return;
            that.setData({
                leftValue: leftValue,
                rightValue: rightValue,
            });
            var arr =[];
            arr.push(leftValue);
            arr.push(rightValue);
            that.triggerEvent('changeSlider', arr);
        },
    }
})
