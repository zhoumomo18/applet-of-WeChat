let {ajax} = require('./ajax.js')

let commonMethod = {
    /*查询景点列表信息
    * params obj object
    *{
    *  pageNo
    *  pageSize
    *  name // 景点名称
    *}
    * */
   getScenicSpotList: (obj) => {
        let params = {
            pageNo: obj.pageNo,
            pageSize: obj.pageSize,
            name: obj.name
        },
        requestConfig = {
            method: 'GET',
            url: '/ScenicSpotController/getall',
            data: params,
            successCallback: action,
            errorCallback: action
        }
        function action(response) {
            obj.callBack && obj.callBack(response)
        }
        ajax.request(requestConfig)
    },
    /*查询用户信息
    * params obj object
    *{
    *}
    * */
    getUserInfo: (obj) => {
        let requestConfig = {
            method: 'GET',
            url: '/constumer/getbyopenid',
            successCallback: action,
            errorCallback: action
        }
        function action(response) {
            obj.callBack && obj.callBack(response)
        }
        ajax.request(requestConfig)
    }
}

export {
    commonMethod
}