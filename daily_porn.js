// ==UserScript==
// @Name              QX每日色图脚本v2
// @Author            SkyLeech
// @UpdateTime        20251022
// @WebURL            https://api.lolicon.app/setu/v2

const url = "https://api.lolicon.app/setu/v2?"

const req = {
    "r18": 1, //18禁为1 非为0 2是混合
    "num": 1, //一次返回的结果数量，范围为1到10，数字的数量亦为弹框的次数
    "size": ["original", "thumb"], //返回指定图片规格的地址
    "excludeAI": false //排除 AI 作品
}

const request = {
    url,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req)
}
$task.fetch(request).then(response => {
    let obj = JSON.parse(response.body);
    let data = obj.data;
    console.log(response.body);
    for (let i = 0; i < data.length; i++) {
        let pictureURL = encodeURI(data[i].urls.original);
        let thumbURL = encodeURI(data[i].urls.thumb);
        $notify("每日瑟图", "", "", { "open-url": pictureURL, "media-url": thumbURL }); // Success
    }
    $done()
}, reason => {
    // reason.error
    $notify("Title", "Subtitle", reason.error); // Error!
    $done();
})
