(function ($) {

    window.$isLogin = false

    $.extend({

        getUserInfo: function (callBack) {
            $.ajax({
                type: 'GET',
                url: 'http://139.198.186.81:8081/user',
                dataType: 'json',
                contentType: "application/json;charset=UTF-8",
                timeout: 1000,
                xhrFields: {
                    withCredentials: true
                },
                success: function (result) {
                    if (result.code === 200) {
                        window.$isLogin = true
                        callBack(result.data)
                    } else {
                        console.log(result)
                    }
                },
                error: function () {
                    callBack()
                }
            })
        },

        getQueryString: function (name) {
            let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            let r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return decodeURIComponent(r[2]);
            }
            return null;
        },

        timestampToTime: function timestampToTime(timestamp) {
            let date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            let D = date.getDate() + ' ';
            let h = date.getHours() + ':';
            let m = date.getMinutes() + ':';
            let s = date.getSeconds();
            return Y + M + D + h + m + s;
        }

    })


}(window.$))