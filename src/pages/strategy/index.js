Page({
    data: {
        list:[
            { "id": 0,"sliderOffset": 0,"title": "全部", "state":""},
            { "id": 1,"sliderOffset": 66,"title": "景点", "state":"INIT_STATE"},
            { "id": 2,"sliderOffset": 147, "title": "美食", "state":"WAIT_BUYER_PAY"},
            { "id": 3,"sliderOffset": 228, "title": "民宿", "state":"WAIT_REVICE"},
            { "id": 4,"sliderOffset": 309, "title": "店家", "state":"TRADE_FINISHED"}
        ],
        activeIndex: 0,//当前选中索引值
        products:[
            {
                name: '大脸猫爱吃鱼大脸猫爱吃鱼大脸猫爱吃鱼大脸猫爱吃鱼大脸猫爱吃鱼',
                heart_num: '1',
                title: '你所不知道的红酒知识',
                url: 'http://f10.baidu.com/it/u=121654667,1482133440&fm=72',
                avatar: 'http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=26&gp=0.jpg'
            },
            {
                name: '大脸猫爱吃鱼',
                heart_num: '2',
                title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
                url: 'http://img3.imgtn.bdimg.com/it/u=1417732605,3777474040&fm=26&gp=0.jpg',
                avatar: 'http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=26&gp=0.jpg'
            },
            {
                name: '大脸猫爱吃鱼',
                heart_num: '3',
                title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
                url: 'http://img3.imgtn.bdimg.com/it/u=1417732605,3777474040&fm=26&gp=0.jpg',
                avatar: 'http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=26&gp=0.jpg'
            }, 
            {
                name: '大脸猫爱吃鱼',
                heart_num: '4',
                title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
                url: 'http://f10.baidu.com/it/u=121654667,1482133440&fm=72',
                avatar: 'http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=26&gp=0.jpg'
            },
            {
                name: '大脸猫爱吃鱼',
                heart_num: '5',
                title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
                url: 'http://f10.baidu.com/it/u=121654667,1482133440&fm=72',
                avatar: 'http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=26&gp=0.jpg'
            },
            {
                name: '大脸猫爱吃鱼',
                heart_num: '6',
                title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
                url: 'http://img3.imgtn.bdimg.com/it/u=1417732605,3777474040&fm=26&gp=0.jpg',
                avatar: 'http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=26&gp=0.jpg'
            }
        ]
    },

    onLoad: function(){
        
    },

    //点击不同tab
    tabClick: function (e) {
        var that = this,
            id = e.currentTarget.id
        
        that.setData({
            activeIndex: id
        });
        //console.log(this.data.orderState);
    },
})