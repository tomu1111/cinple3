//videoの情報が送られてきたタイミングで発火
//videoと紐づいているコメントを取得
//CSSでコメント追加
//コメント登録機能追加
//コメントを送信するとvideoと時間とコメントが送られる


const { ipcRenderer } = require('electron');
//stateオブジェクトはこのvideoController.jsの内部であればどこからでもアクセスできるオブジェクト
const state = {};
//videoinfoが送られてきたタイミングで
ipcRenderer.on('video_info', async (event, arg) => {
    
    state.videoInfo = arg;

    //この映画のコメントを取得
    const response = await fetch(
        "https://u1him9447i.execute-api.ap-northeast-1.amazonaws.com/dev?video_id=" + state.videoInfo.video_id,
        {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
        });
　　//json形式でresJson形式で保存
    const resJson = await response.json();
    console.log(resJson);
    //state.commentにコメント一覧を保存
    state.comments = resJson.body.Items;
});

//DOMコンテンツがローディングされたタイミングでCSS追加
document.addEventListener('DOMContentLoaded', async function () {
    //CSS追加
    var s = document.createElement("style");
    //electron_commentというCSSでコメントを流す
    s.innerHTML = `
    .electron_comment {
        position: absolute;
        width: 100%;
        top: 0;
        right: 0;
        z-index: 10000;
        color: white;
        font-size:2em;         /*文字サイズ*/
        animation: flowing 5s linear;    /*アニメーション*/
        transform:translateX(100%);                /*最初の位置*/
    }
    .electron_comment1 {
        position: absolute;
        width: 100%;
        top: 100px;
        right: 0;
        z-index: 10000;
        color: white;
        font-size:2em;         /*文字サイズ*/
        animation: flowing 5s linear;    /*アニメーション*/
        transform:translateX(100%);                /*最初の位置*/
    }
    .electron_comment2 {
        position: absolute;
        width: 100%;
        top: 200px;
        right: 0;
        z-index: 10000;
        color: white;
        font-size:2em;         /*文字サイズ*/
        animation: flowing 5s linear;    /*アニメーション*/
        transform:translateX(100%);                /*最初の位置*/
    }
    .electron_comment3 {
        position: absolute;
        width: 100%;
        top: 300px;
        right: 0;
        z-index: 10000;
        color: white;
        font-size:2em;         /*文字サイズ*/
        animation: flowing 5s linear;    /*アニメーション*/
        transform:translateX(100%);                /*最初の位置*/
    }
    .electron_comment4 {
        position: absolute;
        width: 100%;
        top: 400px;
        right: 0;
        z-index: 10000;
        color: white;
        font-size:2em;         /*文字サイズ*/
        animation: flowing 5s linear;    /*アニメーション*/
        transform:translateX(100%);                /*最初の位置*/
    }
    .electron_comment5 {
        position: absolute;
        width: 100%;
        top: 500px;
        right: 0;
        z-index: 10000;
        color: white;
        font-size:2em;         /*文字サイズ*/
        animation: flowing 5s linear;    /*アニメーション*/
        transform:translateX(100%);                /*最初の位置*/
    }
    .electron_comment6 {
        position: absolute;
        width: 100%;
        top: 600px;
        right: 0;
        z-index: 10000;
        color: white;
        font-size:2em;         /*文字サイズ*/
        animation: flowing 5s linear;    /*アニメーション*/
        transform:translateX(100%);                /*最初の位置*/
    }
    .electron_comment7 {
        position: absolute;
        width: 100%;
        top: 700px;
        right: 0;
        z-index: 10000;
        color: white;
        font-size:2em;         /*文字サイズ*/
        animation: flowing 5s linear;    /*アニメーション*/
        transform:translateX(100%);                /*最初の位置*/
    }
    .electron_comment8 {
        position: absolute;
        width: 100%;
        top: 800px;
        right: 0;
        z-index: 10000;
        color: white;
        font-size:2em;         /*文字サイズ*/
        animation: flowing 5s linear;    /*アニメーション*/
        transform:translateX(100%);                /*最初の位置*/
    }
    .electron_comment9 {
        position: absolute;
        width: 100%;
        top: 900px;
        right: 0;
        z-index: 10000;
        color: white;
        font-size:2em;         /*文字サイズ*/
        animation: flowing 5s linear;    /*アニメーション*/
        transform:translateX(100%);                /*最初の位置*/
    }
    @keyframes flowing {
      100% {
        transform:translateX(-100%);    /*終了の位置*/
      }
    }

    #electron_input_comment_container {
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: 10000;
    }

    #electron_send_comment {
        background-color: white;
    }

    `;
    //head部分にCSS追加
    document.getElementsByTagName("head")[0].appendChild(s);
    //コメント登録ビューを追加
    const strCommentView = `
    <div id="electron_input_comment_container">
        <input type="text" id="electron_comment">
        <button id="electron_send_comment">送信</button>
    </div>
    `;

    //strCommentViewをDOM分析してtext/htmlの形にしてcomentviewに格納
    commentView = new DOMParser().parseFromString(strCommentView, "text/html");
    //bodyの中にコメントを各場所を追加する
    document.querySelector("body").appendChild(commentView.querySelector("#electron_input_comment_container"));
    //送信をクリックした時コメントの中に＃electroncomentを入れる
    document.querySelector("#electron_send_comment").addEventListener("click", async (e) => {
        const comment = document.querySelector("#electron_comment");
        //コメントがからの場合は送らない
        if(comment.value == "") {
            return;
        }
　　　　　//dataの中にvideoのデータと時間とコメントを入れる
        const data = {
            "video_id" : state.videoInfo.video_id,
            "time" : state.currentTime,
            "comment" : comment.value
        };
　　　　　//awsに送る
        await fetch(
            "https://u1him9447i.execute-api.ap-northeast-1.amazonaws.com/dev",
            {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(data)
            });
        //コメントを空にする
        comment.value = "";
    });


    

    

    // 対象とするノードを取得
    const target = document.querySelector('#dv-web-player');

    // オブザーバインスタンスを作成(状態が変化した時の操作)
    //毎秒コメントを取ってくる
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            // DOM変更時に何かしたいこと
            //nodeにmutation.addedNodesを追加している限り繰り返す
            //addNOdesは新たに追加されたDOM要素
            for (const node of mutation.addedNodes) {
                if (node.tagName === "VIDEO") {
                    let prevTime = 0;
                    //nodeにタイムアップデートが起こる時にイベント発火
                    node.addEventListener("timeupdate", (e) => {
                        //nodeの現在時刻を整数でcurrenttimeに入れる
                        const currTime = Math.floor(node.currentTime);
                        //もし現在時刻がprevTimeと違うのなら現状の時刻にvieooの時間を代入？？
                        if (currTime != prevTime) {
                            //ユーザーが入力したコメントの時間をとる時に使用state属性でどこでも利用可能
                            state.currentTime = currTime;
　　　　　　　　　　　　　　　　　//state.commentsのなかで現在の時間と一致するコメント取得
                            state.comments.filter(x => x.time == currTime)
                                .forEach(x => {
                                    //amazon primeのタグに直接挿入
                                    const c = document.createElement("p");
                                    //cにelectron_commentクラスを追加
                                    let num = Math.floor(Math.random() * 10) + 1;
                                    console.log(num);
                                    if(num==1){ c.classList.add("electron_comment");}
                                    else if(num==2){c.classList.add("electron_comment1");}
                                    else if(num==3){c.classList.add("electron_comment2");}
                                    else if(num==4){c.classList.add("electron_comment3");}
                                    else if(num==5){c.classList.add("electron_comment4");}
                                    else if(num==6){c.classList.add("electron_comment5");}
                                    else if(num==7){c.classList.add("electron_comment6");}
                                    else if(num==8){c.classList.add("electron_comment7");}
                                    else if(num==9){c.classList.add("electron_comment8");}
                                    else if(num==10){c.classList.add("electron_comment9");}
                                    //cのpタグの中に時間に合うコメントを入れる
                                    c.innerHTML = x.comment;
                                    //bodyの中にcを入れる
                                    document.querySelector("body").appendChild(c);
                                    console.log("added");
                                });
　　　　　　　　　　　　　　　　　//現在時刻をprevに代入する
                            prevTime = currTime;
                        }
                    });
                    observer.disconnect();
                    break;
                }
            }
        });
    });

    // オブザーバの設定
    const config = {
        childList: true,
        characterData: true,
        subtree: true
    };

    // 対象ノードとオブザーバの設定を渡す
    observer.observe(target, config);
});