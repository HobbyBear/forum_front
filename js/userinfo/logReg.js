(function userInfo() {

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
            error: function (res) {
                alert("login fail")
            },
            success: function (result) {
                console.log(result)
                if (result.code === 200) {
                    alert("login success")
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
            error: function (res) {
                alert("reg fail")
            },
            success: function (result) {
                console.log(result)
                if (result.code === 200) {
                    alert("reg success")
                }
            }
        })
    })

}());