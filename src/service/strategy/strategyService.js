let {ajax} = require('../../utils/ajax.js')

let strategyMethod = {
    // 获取栏目列表
    getColumnList: (callBack) => {
        let requestConfig = {
            method: 'GET',
            url: '/column/getall',
            successCallback: action,
            errorCallback: action
        }
        function action(response) {
            callBack && callBack(response)
        }
        ajax.request(requestConfig)
    },
    // 获取攻略列表
    getStrategyList: (params, callBack) => {
        let requestConfig = {
            method: 'GET',
            url: '/strategy/getall',
            data: params,
            successCallback: action,
            errorCallback: action
        }
        function action(response) {
            callBack && callBack(response)
        }
        ajax.request(requestConfig)
    },
    // 通过id获取攻略详情
    getStrategyById: (params, callBack) => {
        let requestConfig = {
            method: 'GET',
            url: '/strategy/getbyid/'+params,
            successCallback: action,
            errorCallback: action
        }
        function action(response) {
            callBack && callBack(response)
        }
        ajax.request(requestConfig)
    },
    // 点击收藏商品
    addToFavorite: (params, callBack) => {
        let requestConfig = {
            method: 'POST',
            url: '/strategy/saveconsumerstrategycollection?strategyId='+params,
            successCallback: action,
            errorCallback: action
        }
        function action(response) {
            callBack && callBack(response)
        }
        ajax.request(requestConfig)
    },
    // 点赞
    handlePraise: (params, callBack) => {
        let requestConfig = {
                method: 'PUT',
                url: '/strategy/savetconsumerstrategypraise?strategyId='+params,
                successCallback: action,
                errorCallback: action
            }
        function action(response) {
            callBack && callBack(response)
        }
        ajax.request(requestConfig)
    }
}

export {
    strategyMethod
}