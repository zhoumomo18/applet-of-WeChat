let {ajax} = require('../../utils/ajax.js')

let scenicMethod = {
    /*查询景点列表信息*/
   getScenicSpotList: (params, callBack) => {
        let requestConfig = {
            method: 'GET',
            url: '/ScenicSpotController/getall',
            data: params,
            successCallback: action,
            errorCallback: action
        }
        function action(response) {
            callBack && callBack(response)
        }
        ajax.request(requestConfig)
    },
    // 获取关键字列表
    getKeyNameList: (params, callBack) => {
        let requestConfig = {
            method: 'GET',
            url: '/ScenicSpotController/select',
            data: params,
            successCallback: action,
            errorCallback: action
        }
        function action(response) {
            callBack && callBack(response)
        }
        ajax.request(requestConfig)
    },
    // 通过id获取景点详情
    getDetailyById: (params, callBack) => {
        let requestConfig = {
            method: 'GET',
            url: '/ScenicSpotController/getbyid/'+params,
            successCallback: action,
            errorCallback: action
        }
        function action(response) {
            callBack && callBack(response)
        }
        ajax.request(requestConfig)
    },
    // 通过id获取票种详情
    getTicketByid: (params, callBack) => {
        let requestConfig = {
            method: 'GET',
            url: '/ticket/getbyid/'+params,
            successCallback: action,
            errorCallback: action
        }
        function action(response) {
            callBack && callBack(response)
        }
        ajax.request(requestConfig)
    },
    getisNullByUserId: (callBack) => {
        let requestConfig = {
            method: 'GET',
            url: '/constumer/getisnullbyuserid',
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
    scenicMethod
}