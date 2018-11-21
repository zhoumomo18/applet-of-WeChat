let app = getApp()
let {scenicMethod} = require('../../../service/scenicSpots/scenicService.js')

Page({
    data: {
        ticketId:'',
        quantity: 1,
        ticketInfo: '',
        form: {
            receiver: '',
            tel: '',
            idcard: ''
        }
    },
    onLoad(options){
        this.setData({
            ticketId: options.id
        })
        this.getTicketByid()
        this.initValidate()
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