var { ajax } = require('../../utils/ajax.js');
var hotelMethods = {
    getScenicList: function (params, callBack) { //景区列表查询
        var requestConfig = {
            method: 'GET',
            data: params,
            url: '/ScenicSpotController/getall',
            successCallback: action,
            errorCallback: action
        };
        function action(response) {
            callBack && callBack(response);
        }
        ajax.request(requestConfig);
    },
    getHotelList: function (params, callBack) { //酒店预订列表查询
        var requestConfig = {
            method: 'GET',
            data: params,
            url: '/hotel/getAll',
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
    hotelMethods
}
