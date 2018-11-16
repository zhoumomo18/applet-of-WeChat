// let baseURL = "https://admintour.cworld-china.com/tourWeb/v1.0"

/**
 *  请求类
 */
let ajax = {
    /**
     *通用的wx.request异常回调处理
     *@response wx.request异常返回的数据
     *@errorCallback 错误回调函数
     *@isNotErrorPropmt 是否需要错误提示
     */
    error_resp: function (response, errorCallback) {
        if (!response) {
            wx.showToast({
                title: '系统错误，请联系管理员',
                icon: 'none'
            });
            if (errorCallback instanceof Function) {
                errorCallback && errorCallback(response);
            }
        } else {
            // 登录超时
            if (response.code === 400 || response.code === 401) {
                wx.showToast({
                    title: '登录超时，请重新登录',
                    icon: 'none'
                })
                // wx.clearStorageSync()
                wx.redirectTo({
                    url: '/pages/login/index'
                })
            } else if (response.code === 406){
                wx.showToast({
                    title: '登录超时，请重新登录',
                    icon: 'none'
                })
                // wx.clearStorageSync()
                wx.redirectTo({
                    url: '/pages/login/index'
                })
            }
            if (errorCallback instanceof Function) {
                errorCallback && errorCallback(response);
            }
        }
    },
    /**
     *通用的wx.request成功回调处理
     *@response request成功返回的数据
     *@successCallback 成功回调函数
     *@errorCallback 错误的回调函数
     *@getDataType 获取回调数据{"list": 数据都在page里, "single": 数据都在formBean里}
     *@isNotErrorPropmt 是否不显示错误信息true:不显示
     */
    success_resp: function (response, successCallback, errorCallback, isNotErrorPropmt) {
        if (!response) {
            wx.showLoading({
                title: '加载失败',
            })
        } else if (response.code == "200" || response.status == "ok") { // response.status 智能接口状态
            let data;
            if (response.data) {
                data = response.data;
            }
            if (successCallback instanceof Function) {
                successCallback && successCallback(response, response.data);
            }
        } else {
            // 调用错误的通用回调
            ajax.error_resp(response, errorCallback, isNotErrorPropmt);
        }
    },
    /**
     * 发送请求方法
     * @requestConfig 设置请求对象
     *   @method 访问类型
     *   @url api地址
     *   @params 请求连接中的请求参数,url参数
     *   @data 请求提需要设置的数据
     *   @getDataType 获取回调数据{"list": 数据都在page里, "single": 数据都在formBean里}
     *   @successCallback 成功的回调函数
     *   @errorCallback 错误的回调函数
     *   @isNotErrorPropmt 是否不显示错误信息true:不显示
     *   @publicUrlType   必传  请求目录类型  1.webManager 2.matterManager 3. 服务运行 4. 电子监察
     */
    request: function (requestConfig, baseURL) {
        wx.request({
            url: (baseURL ? baseURL : this.publicDirectory(requestConfig.publicUrlType)) + requestConfig.url,
            data: requestConfig.data || {},
            method: requestConfig.method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: requestConfig.method == 'get' ? {
                'X-Requested-With': 'XMLHttpRequest',
                "Accept": "application/json",
                "Content-Type": "application/json; charset=UTF-8",
                "token": localStorage.get("userToken"),
            } : {
                'X-Requested-With': 'XMLHttpRequest',
                "token": wx.getStorageSync("userToken"),
                'Content-Type': requestConfig.headerContentType ? 'application/x-www-form-urlencoded; charset=UTF-8' : 'application/json; charset=UTF-8'
            }, // 设置请求的 header
            success: function(response){
                // success
                ajax.success_resp(response.data, requestConfig.successCallback, requestConfig.errorCallback, requestConfig.getDataType, requestConfig.isNotErrorPropmt);
            },
            fail: function(error) {
                // fail
                if (error.response) {
                    //存在请求，但是服务器的返回一个状态码
                    // console.log(error.response.data);
                    ajax.error_resp(error.response.data, requestConfig.errorCallback, requestConfig.isNotErrorPropmt);
                } else {
                    //一些错误是在设置请求时触发的
                    console.log('Error', error.message);
                }
                wx.showToast({
                    title: '请求超时',
                    icon: 'loading'
                })
                console.log(error.config);
            },
            complete: function() {
                // complete
            }
        });
    },
    //公共接口请求目录
    publicDirectory: function (val) {
        let publicUrl = '';
        switch (val) {
            case 1:
                publicUrl = 'https://admintour.cworld-china.com/tourWeb/v1.0';
                break;
            case 2:
                publicUrl = 'https://admintour.cworld-china.com/tourWeb/V1.0';
                break;
            default:
                publicUrl = 'https://admintour.cworld-china.com/tourWeb/v1.0';
                break;
        }
        return publicUrl;
    }
    
};
export {
    ajax
};
