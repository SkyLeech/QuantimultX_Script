// ==UserScript==
// @Name              QX每日色图脚本v2
// @Author            SkyLeech
// @UpdateTime        20251022
// @WebURL            https://api.lolicon.app/setu/v2

let userR18 = 1 //18禁为1 非为0 2是混合
let userNum = 1 //一次返回的结果数量，范围为1到10，数字的数量亦为弹框的次数
var request = {
    url: encodeURI("https://api.lolicon.app/setu/v2?" + "r18=" + userR18 + "&num=" + userNum)
}
$task.fetch(request).then(response => {
    let obj = JSON.parse(response.body);
    let data = obj.data;
    console.log(response.body);
    for (let i = 0; i < data.length; i++) {
        let pictureURL = encodeURI(data[i].urls.original);
        $notify("每日瑟图", "", "", { "open-url": pictureURL, "media-url": pictureURL }); // Success
    }
    $done()
}, reason => {
    // reason.error
    $notify("Title", "Subtitle", reason.error); // Error!
    $done();
})

