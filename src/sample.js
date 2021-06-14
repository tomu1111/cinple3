const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', async () => {

    //動画情報の取得とDOMの作成
    const response = await fetch(
        "https://561pfqgqp1.execute-api.ap-northeast-1.amazonaws.com/dev",
        {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
        });
　//responseをJSON形式でresJSONに保存する   
    const resJson = await response.json();
    //resjsonのbodyタグのアイテムを数のぶん回してcreatevideocardelmentとして入れる
    resJson.body.Items.forEach(x => {
        document.querySelector("#video_list_container").appendChild(createVideoCardElement(x));
    });
});

//video一覧を作成する
const createVideoCardElement = function(v) {
    const strCard = `
    <div class="card">
        <div class="card_main">
            <div class="thumnail">
                <img src="${v.img}">
            </div>
        </div>
        <div class="card_footer">
            <div class="title">
                <p>${v.title}</p>
            </div>
        </div>
    </div>
    `;
//strcardをDOM分析してtext/htmlの形にする
    const c = new DOMParser().parseFromString(strCard, "text/html");
    //videoカードの中のカードクラスをクリックしたときにasynchronous-messageを送る
    const card = c.querySelector(".card");
    card.addEventListener("click", (e) => {
        ipcRenderer.send('asynchronous-message', v);
    });

    return card;
};