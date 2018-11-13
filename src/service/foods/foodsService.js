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
    }
};
export {
    foodsMethods
}
