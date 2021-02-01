(function userInfo($) {


    $("#loginBtn").click(function () {
        let user = {};
        user.username = $("#username").val()
        user.pwd = $("#password").val()

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8081/user/login',
            data: JSON.stringify(user),
            dataType: 'json',
            contentType: "application/json;charset=UTF-8",
            timeout: 1000,
            xhrFields: {
                withCredentials: true
            },
            success: function (result) {
                console.log(result)
                if (result.code === 200) {
                    // setTimeout(function (){
                    //     window.location.reload()
                    // },2000)
                    window.location.reload()
                }else {
                    alert(result.msg)
                }
            }
        })
    })

    $("#registerBtn").click(function () {
        let user = {};
        user.username = $("#username").val()
        user.pwd = $("#password").val()

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8081/user/regByPwd',
            data: JSON.stringify(user),
            dataType: 'json',
            contentType: "application/json;charset=UTF-8",
            timeout: 1000,
            xhrFields: {
                withCredentials: true
            },
            success: function (result) {
                console.log(result)
                if (result.code === 200) {
                    alert("reg success")
                }else {
                    alert(result.msg)
                }
            }
        })
    })


    // todo 退出



}(window.$));