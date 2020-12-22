(function ($){

    window.$isLogin = false

    $.extend({

        getUserInfo : function (callBack){
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8081/user',
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
                        return result.data
                    }else {
                        console.log(result)
                    }
                },
                error: function (){
                    callBack()
                }
            })
        }


    })


}(window.$))