const app = getApp()
let {ajax} = require('../../../utils/ajax.js')
let {commonMethod} = require('../../../utils/page.js')
Page({
    data: {

    },
    onLoad(){
        this.initValidate()
        this.getUserInfo()
    },
    getUserInfo(){
        let that = this,
            requestConfig = {
                callBack: (res) => {
                    if (res.code && res.code == 200){
                        that.setData({
                            userInfo: res.data
                        })
                    } else {
                        wx.showToast({
                            title: '请求失败'
                        })
                    }
                }
            }
        commonMethod.getUserInfo(requestConfig)
    },
    saveUserInfo(e){
        let that = this,
            params = e.detail.value
        if (!that.WxValidate.checkForm(params)) {
            const error = that.WxValidate.errorList[0]
            wx.showToast({
                title: error.msg,
                icon: 'none'
            })
            return false
        } else {
            console.log('submit================')
            let requestConfig = {
                method: 'POST',
                url: '/constumer/update',
                data: {
                    realName: params.realName,
                    phone: params.phone,
                    idCard: params.idCard
                },
                successCallback: (res) => {
                    if (res.code && res.code==200){
                        wx.showToast({
                            title: '保存成功'
                        })
                    }
                },
                errorCallback: () => {
                    wx.showToast({
                        title: '请求失败',
                        icon: 'loading'
                    })
                }
            }
            ajax.request(requestConfig)
        }
    },
    initValidate(){
        // 验证字段的规则
        const rules = {
            realName: {required: true, maxlength: 20},
            phone: {required: true, tel: true},
            idCard: {required: true,idcard: true}
        }

        // 验证字段的提示信息，若不传则调用默认的信息
        const messages = {
            realName: {
                required: '请输入真实姓名',
                maxlength: '姓名不能超过20个字',
            },
            phone: {
                required: '请输入手机号',
                tel: '请输入正确的手机号',
            },
            idCard: {
                required: '请输入身份证号码',
                idcard: '请输入正确的身份证号码',
            },
        }
        // 创建实例对象
        this.WxValidate = app.WxValidate(rules,messages)
    }
})