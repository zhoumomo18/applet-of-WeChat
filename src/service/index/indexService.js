let {ajax} = require('../../utils/ajax.js')

let indexMethod = {
    // 获取广告图
  getAdList: (callBack) => {
    let requestConfig = {
            method: 'GET',
            url: '/adviertisement/getall?type=1',
            successCallback: action,
            errorCallback: action
        }
        function action(response) {
            callBack && callBack(response)
        }
        ajax.request(requestConfig)
    },
    // 获取模块列表
    getModuleList: (callBack) => {
        let requestConfig = {
            method: 'GET',
            url: '/module/getallroleauthority',
            successCallback: action,
            errorCallback: action
        }
        function action(response) {
            callBack && callBack(response)
        }
        ajax.request(requestConfig)
    },
    // 获取热门景点
    getHotScenicSpot: (callBack) => {
        let requestConfig = {
            method: 'GET',
            url: '/hotscenicspots/getall',
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
    indexMethod
}