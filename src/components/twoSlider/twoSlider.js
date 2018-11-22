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
        leftMin: 0, //左边滑块最小值
        leftMax: 2000, //左边滑块最大值
        rightMin: 0, //右边滑块的最小值
        rightMax: 2000, //右边滑块最大值
        leftValue: 0, //左边滑块默认值
        rightValue: 2000, //右边滑块默认值
        leftWidth: '98', //左边滑块可滑动长度：百分比
        rightWidth: '96', //右边滑块可滑动长度：百分比
    },
    methods: {
        // 左边滑块滑动的值
        leftChange: function (e) {
            console.log('左边改变的值为：' + e.detail.value);
            var that = this;
            var leftValue = that.data.leftValue;
            var rightValue = that.data.rightValue;
            if (e.detail.value > rightValue) {
                leftValue = rightValue;
                rightValue = e.detail.value;
            } else {
                leftValue = e.detail.value;
            }
            that.setData({
                leftValue: leftValue,
                rightValue: rightValue,
            });
            let arr = [];
            arr.push(leftValue);
            arr.push(rightValue);
            that.triggerEvent('changeSlider', arr);
        },
        // 右边滑块滑动的值
        rightChange: function (e) {
            console.log('右边改变的值为：' + e.detail.value);
            var that = this;
            var leftValue = that.data.leftValue;
            var rightValue = that.data.rightValue;
            if (e.detail.value < leftValue) {
                rightValue = leftValue;
                leftValue = e.detail.value;
            } else {
                rightValue = e.detail.value;
            }
            that.setData({
                leftValue: leftValue,
                rightValue: rightValue,
            });
            let arr = [];
            arr.push(leftValue);
            arr.push(rightValue);
            that.triggerEvent('changeSlider', arr);
        },
    }
})
