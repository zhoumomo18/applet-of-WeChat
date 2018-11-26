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
            url: '/hotel/getall',
            successCallback: action,
            errorCallback: action
        };
        function action(response) {
            callBack && callBack(response);
        }
        ajax.request(requestConfig);
    },
    getHotelDetail: function (params, callBack) { //酒店详情查询
        var requestConfig = {
            method: 'GET',
            url: '/hotel/getbyid/' + params.id,
            successCallback: action,
            errorCallback: action
        };
        function action(response) {
            callBack && callBack(response);
        }
        ajax.request(requestConfig);
    },
    changeHotelCollect: function (params, callBack) { //酒店收藏收藏／取消收藏
        var requestConfig = {
            method: 'POST',
            data: {
                hotelId: params.hotelId
            },
            headerContentType:1,
            url: '/hotelcollection/saveconsumerHotelCollectioncollection',
            successCallback: action,
            errorCallback: action
        };
        function action(response) {
            callBack && callBack(response);
        }
        ajax.request(requestConfig);
    },
    getHouseType: function (params, callBack) { //房型查询
        var requestConfig = {
            method: 'GET',
            data: params,
            url: '/HouseTypeControlle/getall',
            successCallback: action,
            errorCallback: action
        };
        function action(response) {
            callBack && callBack(response);
        }
        ajax.request(requestConfig);
    },
    getHouseDetailList: function (params, callBack) { //房型配置信息列表查询
        var requestConfig = {
            method: 'GET',
            data: params,
            url: '/housingconfiguration/getbyhousetypeid',
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
