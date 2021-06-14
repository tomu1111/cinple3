        const { ipcRenderer } = require('electron');
        var socket = io("http://18.183.121.130:3000/"); // C02. ソケットへの接続
        var isEnter = false;
        var name = '';
        ipcRenderer.on('video_info', async (event, arg) => {
        var chatroom = arg.video_id ;
        //})
        // C04. server_to_clientイベント・データを受信する
        socket.on("server_to_client", function(data){appendMsg(data.value)});
        function appendMsg(text) {
            $("#chatLogs").append("<div>" + text + "</div>");
        }　　　　　
                $("#msgForm").val('');
                name = "トム";
                var entryMessage = name + "さんが入室しました。";
                socket.emit("client_to_server_join", {value : chatroom});
                // C05. client_to_server_broadcastイベント・データを送信する
                socket.emit("client_to_server_broadcast", {value : entryMessage});
                // C06. client_to_server_personalイベント・データを送信する
                socket.emit("client_to_server_personal", {value : name});
                changeLabel();
        $("form").submit(function(e) {
            　　　var message = $("#msgForm").val();
                 $("#msgForm").val(" ");
            　　　console.log(message);
              　 message = "[" + name + "]: " + message;
                // C03. client_to_serverイベント・データを送信する
                socket.emit("client_to_server", {value : message});
            e.preventDefault();
        });
 
        function changeLabel() {
            isEnter = true;
        }
    })
