let app = getApp()
let {getNextDate} = require('../../../utils/common')
let {scenicMethod} = require('../../../service/scenicSpots/scenicService.js')

Page({
    data: {
        ticketId:'',
        quantity: 1,
        ticketInfo: '',
        selectedDate: '',
        dateList: [
            {label: '今天', date: '', hasDefaultDate: true}, 
            {label: '明天', date: '', hasDefaultDate: true}, 
            {label: '更多日期', date: '', hasDefaultDate: false}
        ],
        selectedIndex: 0,
        form: {
            receiver: '',
            tel: '',
            idcard: ''
        }
    },
    onLoad(options){
        let dateList =this.data.dateList
        // 获取今天/明天的日期
        for (let i=0; i<2; i++){
            dateList[i].date=getNextDate(i)
        }
        this.setData({
            ticketId: options.id,
            dateList: dateList
        })
        this.getTicketByid()
        this.initValidate()
    },
    onShow(){
        let dateList =this.data.dateList,
            selectedDate = wx.getStorageSync('selectedDate') // 在onLoad有时获取不到缓存值
            if (selectedDate && selectedDate!=''){
                dateList[2].label=dateList[2].date=selectedDate
                dateList[2].hasDefaultDate=true
            }
        this.setData({
            selectedDate: (selectedDate!='') ? selectedDate: getNextDate(0),
            selectedIndex: (selectedDate!='') ? 2: 0,
            dateList: dateList
        })
    },
    // 选择日期
    selectDate (e) {
        let that = this,
            index = e.currentTarget.dataset.index,
            curDate = that.data.dateList[index].date,
            expirydate = that.data.curTickt.expirydate
        if (index < 2){
            that.setData({
                selectedIndex: index,
                selectedDate: curDate
            })
        } else {
            wx.navigateTo({
                url: '../datePicker/datePicker?expirydate='+expirydate
            })
        }
        
        
    },
    // 数量减少
    handleMinus(){
        let quantity = this.data.quantity
        if (quantity>1) quantity--
        this.setData({
            quantity
        })
    },
    handlePlus(){
        let quantity = this.data.quantity
            quantity++
        this.setData({
            quantity
        })
    },
    submitForm(e){
        // 传入表单数据，调用验证方法
        let params = e.detail.value
        console.log(e)
        if (!this.WxValidate.checkForm(params)) {
            const error = this.WxValidate.errorList[0]
            wx.showToast({
                title: error.msg,
                icon: 'none'
            })
            return false
        }
    },
    initValidate(){
        // 验证字段的规则
        const rules = {
            receiver: {required: true, maxlength: 20},
            tel: {required: true, tel: true},
            idcard: {required: true,idcard: true}
        }

        // 验证字段的提示信息，若不传则调用默认的信息
        const messages = {
            receiver: {
                required: '请输入取票人',
                maxlength: '取票人不能超过20个字',
            },
            tel: {
                required: '请输入手机号',
                tel: '请输入正确的手机号',
            },
            idcard: {
                required: '请输入身份证号码',
                idcard: '请输入正确的身份证号码',
            },
        }
        // 创建实例对象
        this.WxValidate = app.WxValidate(rules,messages)
    },

    /***********************************调用接口************************************************************/
    // 获取当前票种详情
    getTicketByid(){
        let that = this
        scenicMethod.getTicketByid(that.data.ticketId, (res) => {
            if (res &&　res.code==200){
                that.setData({
                    curTickt: res.data
                })
            }
        })
    },
})