$(function () {


    function topicList() {



    }


    function createTopic() {

        let topic = {}

        topic.title = $("#topicInput").val()
        topic.categoryId = $("#topicFrom input[name='inlineRadioOptions']:checked").val()

        console.log("获取到的topic为:", topic)

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8081/topic',
            dataType: 'json',
            data: JSON.stringify(topic),
            contentType: "application/json;charset=UTF-8",
            timeout: 1000,
            xhrFields: {
                withCredentials: true
            },
            success: function (result) {
                console.log(result)
                if (result.code === 200) {
                    topicList()
                } else {
                    alert(result.msg)
                }
            }
        })
    }


    function categoryList() {

        $.ajax({
            type: 'GET',
            url: 'http://localhost:8081/category/category_list',
            contentType: "application/json;charset=UTF-8",
            timeout: 1000,
            xhrFields: {
                withCredentials: true
            },
            success: function (result) {
                console.log(result)
                if (result.code === 200) {

                    let htmlText = ""
                    for (let i = 0; i < result.data.length; i++) {
                        htmlText += `
                              <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions"
                                   value="` + result.data[i].id + `">
                            <label class="form-check-label">` + result.data[i].name + `</label>
                        </div>
                        `
                    }
                    htmlText += `<div class="btn btn-primary " id="createBtn">create</div>`
                    $("#category_list").html(htmlText)

                    $("#createBtn").click(function () {
                        createTopic()
                    })


                } else {
                    alert(result.msg)
                }
            }
        })


    }

    categoryList()


})