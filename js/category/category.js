$(function () {


    function topicList(categoryId, topicName) {

        let topicReq = {}
        topicReq.categoryId = categoryId
        topicReq.topicName = topicName

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8081/topic/list',
            dataType: 'json',
            data: JSON.stringify(topicReq),
            contentType: "application/json;charset=UTF-8",
            timeout: 1000,
            xhrFields: {
                withCredentials: true
            },
            success: function (result) {
                console.log(result)
                if (result.code === 200) {
                    let htmlText = ""
                    for (let i = 0; i < result.data.topicListElemList.length; i++) {
                        htmlText += `
                            <div name="topicElem" style="margin-top: 50px; border-bottom: 2px solid lightgray"
                     class="d-flex flex-column justify-content-start" data-topicid=` + result.data.topicListElemList[i].topicId + `>
                    <div class="d-flex flex-row">
                        <div class="align-self-start">
                            <img src="` + result.data.topicListElemList[i].avatar + `" height="100px" width="100px">
                        </div>
                        <div>
                        <div>`+result.data.topicListElemList[i].username +`</div>
                        <div>` + $.timestampToTime(result.data.topicListElemList[i].createTime) + `</div>
                        </div>
                    </div>
                   
                    <div style="font-family: 'Courier New',monospace;font-size: medium;font-weight: bolder">
                        ` + result.data.topicListElemList[i].topicName + `
                    </div>
                    <div>answer num ` + result.data.topicListElemList[i].answerNum + `</div>    
                </div>
                        `
                    }
                    $("#topicListDiv").html(htmlText)

                    $(`[name="topicElem"]`).click(function () {
                        console.log("点击到的topic_id"+$(this).data("topicid"))
                        let topicId = $(this).data("topicid")
                         window.location.href = "./topic_detail.html?topic_id=" + topicId
                    })

                } else {
                    alert(result.msg)
                }
            }
        })

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
                    topicList(0, "")
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

    topicList(0, "")

    $("#searchTopic").click(function (){
       topicList(0, $("#SearchVal").val())
    })

})