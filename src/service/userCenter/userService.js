let {ajax} = require('../../utils/ajax.js')

let userMethod = {
    /*查询用户信息*/
    getUserInfo: (callBack) => {
        let requestConfig = {
            method: 'GET',
            url: '/constumer/getbyopenid',
            successCallback: action,
            errorCallback: action
        }
        function action(response) {
            callBack && callBack(response)
        }
        ajax.request(requestConfig)
    },
    /*保存编辑昵称*/
    saveNickname: (params, callBack) => {
        let requestConfig = {
            method: 'POST',
            url: '/constumer/updatenickname',
            data: params,
            successCallback: action,
            errorCallback: action
        }
        function action(response) {
            callBack && callBack(response)
        }
        ajax.request(requestConfig)
    },
    /*保存我的资料*/
    saveUserInfo: (params, callBack) => {
        let requestConfig = {
            method: 'POST',
            url: '/constumer/update',
            data: params,
            successCallback: action,
            errorCallback: action
        }
        function action(response) {
            callBack && callBack(response)
        }
        ajax.request(requestConfig)
    },
    // 获取攻略收藏列表
    getStrategyList: (params, callBack) => {
        let requestConfig = {
            method: 'GET',
            url: '/strategy/getallbyuser',
            data:params,
            successCallback: action,
            errorCallback: action
        }
        function action(response) {
            callBack && callBack(response)
        }
        ajax.request(requestConfig)
    },
}

export {
    userMethod
}