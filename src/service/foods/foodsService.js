var {ajax} = require('../../utils/ajax.js');
var foodsMethods = {
    getAllGroupList: function (callBack) { //菜系列表查询
        var requestConfig = {
            method: 'GET',
            url: '/foodbusiness/getallgroup',
            successCallback: action,
            errorCallback: action
        };
        function action(response) {
            callBack && callBack(response);
        }
        ajax.request(requestConfig);
    },
    getFoodsList: function (params, callBack) { //商家信息列表查询
        var requestConfig = {
            method: 'GET',
            data: params,
            url: '/foodbusiness/getall',
            successCallback: action,
            errorCallback: action
        };
        function action(response) {
            callBack && callBack(response);
        }
        ajax.request(requestConfig);
    },
};
export {
    foodsMethods
}
