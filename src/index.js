const {app,BrowserWindow,ipcMain} = require('electron');

// Electronの初期化が完了し、ブラウザーウィンドーを開く準備ができたら実行
app.on('ready', function() {
  // 新しいブラウザーウィンドーを生成
  mainWindow = new BrowserWindow({
    width: 1500, 
    height: 1000,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // 今のディレクトリーで「 index.html」をロード
  mainWindow.loadFile(`${__dirname}/sample.html`);
  mainWindow.webContents.openDevTools();
  // ウィンドーが閉じられたら呼び出される  (アプリケーション終了)
  mainWindow.on('closed', function() {
    // ウィンドーオブジェクトの参照を削除
    mainWindow = null;
  });
});

ipcMain.on('asynchronous-message', (event, arg) => {
  let win = new BrowserWindow({
    width : 1100,
    height : 900,
    x : 0,
    y : 0,
    webPreferences: {
      nodeIntegration: true,
      preload: `${__dirname}/videoController.js`
    }
  });
//loadが終わったタイミングでvideo_infoをargに入れる
  win.webContents.on('did-finish-load', function () {
    win.webContents.send('video_info', arg);
  });
//winの中身をからにする
  win.on('close', function () {
    win = null;
  });

  win.webContents.openDevTools();
　//arg.video_idを取得したURTLのファイルをロードする
  win.loadURL(`https://www.amazon.co.jp/gp/video/detail/${arg.video_id}/ref=atv_hm_hom_c_NOv6Xw_brws_9_1/gp/video/detail/${arg.video_id}/ref=atv_dp_atf_prime_sd_mv_resume_t1A3AAAAAA0wr0?autoplay=1&t=0`);

  let chil = new BrowserWindow({
    width : 340,
    height : 900,
    x : 1100,
    y : 1000,
    webPreferences: {
      nodeIntegration: true,
    }
  });
  chil.webContents.on('did-finish-load', function () {
    chil.webContents.send('video_info', arg);
  });
  chil.loadFile(`${__dirname}/chat.html`);
    chil.webContents.openDevTools();
});
    
//時間になったらルームを作成する
//クリックがあったらルームへ招待
  