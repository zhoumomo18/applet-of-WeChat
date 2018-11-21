const app = getApp()
let {userMethod} = require('../../../service/userCenter/userService.js')

Page({
    data: {

    },
    onLoad(){
        this.initValidate()
        this.getUserInfo()
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
    },

    /***********************************调用接口************************************************************/
    // 获取用户信息
    getUserInfo(){
        let that = this
        userMethod.getUserInfo((res) => {
            if (res && res.code == 200){
                that.setData({
                    userInfo: res.data
                })
            } else {
                wx.showToast({
                    title: '请求失败',
                    icon: 'loading'
                })
            }
        })
    },
    // 保存我的资料
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
            let requestParams = {
                realName: params.realName,
                phone: params.phone,
                idCard: params.idCard
            }
            userMethod.saveUserInfo(requestParams, (res) => {
                if (res && res.code==200){
                    wx.showToast({
                        title: '保存成功'
                    })
                    wx.navigateBack() // 返回上一页
                } else {
                    wx.showToast({
                        title: '请求失败',
                        icon: 'loading'
                    })
                }
            })
        }
    }
})