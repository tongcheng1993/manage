import store from '../store/index.js'

export function send() {
    if (store.state.sockjs) {
        if (store.state.stompClient) {
            let parameter = {
                "userId": "1482200643420143617",
                "obj": "123123123123123",
                "businessType": "123"
            }
            store.state.stompClient.send("/app/sendWsMessage", [], JSON.stringify(parameter))


        }
    }
}

export function createWs() {
    if (!!window.WebSocket && window.WebSocket.prototype.send) {
        console.log("您的浏览器支持Websocket通信协议")
    } else {
        alert("您的浏览器不支持Websocket通信协议，请使用Chrome或者Firefox浏览器！"
        )
    }
    if (store.state.token) {

        let url = "/api/websocket/ws?token=" + store.state.token;
        store.state.sockjs = new SockJS(url);
        store.state.stompClient = Stomp.over(store.state.sockjs)
        store.state.stompClient.connect({}, function () {
            store.state.wsFlag = "success"
            // 所有人都有的 接收系统对个人的消息
            let a = store.state.stompClient.subscribe('/topic/public', function responseCallback(res) {
                console.log("/topic/public" + res.body)
            }, null)

            // 所有人都有的 接收个人对个人的消息 + "/message"
            let b = store.state.stompClient.subscribe("/webUser/topic/chat", function responseCallback(res) {
                console.log("/topic/chat/" + res.body)
            }, null)
        }, function () {
            store.state.wsFlag = "warning"
        })
        return store.state.stompClient;
    }
};

export function stopWs() {
    if (store.state.sockjs) {
        if (store.state.stompClient) {
            store.state.stompClient.disconnect()
        } else {
            store.state.sockjs.close()
        }
    }
}




