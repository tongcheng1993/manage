<template>
    <div>
        <el-dropdown>
            <el-badge is-dot class="item" :type="this.wsFlag">
                <el-button type="primary" icon="el-icon-user" circle></el-button>
            </el-badge>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="toUserInfoView()">账户信息</el-dropdown-item>
                <el-dropdown-item @click.native="removeToken()">退出系统</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    import {createWs, stopWs} from '../../../util/websocketUtil'

    export default {
        name: "zfjUserIcon",
        components: {},
        props: {},
        methods: {
            async toNextPage(to, query) {
                await this.$router.push({
                    path: to,
                    query: query,
                });
            },
            init() {
                let _that = this
                if (!!window.WebSocket && window.WebSocket.prototype.send) {
                    console.log("您的浏览器支持Websocket通信协议")
                } else {
                    alert("您的浏览器不支持Websocket通信协议，请使用Chrome或者Firefox浏览器！"
                    )
                }
                if (_that.token) {
                    let url = "/api/websocket/ws?token=" + _that.token;
                    _that.sockJs = new SockJS(url);
                    _that.stompClient = Stomp.over(_that.sockJs)
                    _that.stompClient.connect({}, function () {
                        _that.$store.state.wsFlag = "success"
                        // 所有人都有的 接收系统对个人的消息
                        _that.stompClient.subscribe('/topic/public', function responseCallback(res) {
                            console.log("/topic/public" + res.body)
                        }, function responseCallbackErr(err) {
                            console.log("/topic/public" + err)
                        })

                        // 所有人都有的 接收个人对个人的消息 + "/message"
                        _that.stompClient.subscribe("/webUser/topic/chat", function responseCallback(res) {
                            console.log("/topic/chat/" + res.body)
                        }, function responseCallbackErr(err) {
                            console.log("/topic/chat" + err)
                        })
                    }, function () {
                        _that.$store.state.wsFlag = "warning"
                    })
                }
            },

            destroy() {

            },
            toUserInfoView() {
                this.toNextPage("/manageUser/userAccount");
            },
            removeToken() {
                this.$store.commit("del_token");
                location.reload();
            },
        },
        computed: {
            token() {
                return this.$store.state.token;
            },
            wsFlag() {
                return this.$store.state.wsFlag;
            },

        },
        watch: {
            token: {
                handler(newValue, oldValue) {
                    console.log("new:  token  " + newValue);
                    console.log("old:  token  " + oldValue);
                },
                deep: true,
                immediate: true,
            },
            wsFlag: {
                handler(newValue, oldValue) {
                    console.log("new:  wsFlag  " + newValue);
                    console.log("old:   wsFlag " + oldValue);
                },
                deep: true,
                immediate: true,
            },

        },
        data() {
            return {
                sockJs: null,
                stompClient: null
            };
        },
        mounted() {
            this.init();
        },
        beforeDestroy() {
            this.destroy()
        },
    };
</script>

<style scoped>


</style>
