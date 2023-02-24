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
    import {sendWsMessage} from '../../../api/wsApi'
    export default {
        name: "zfjUserIcon",
        components: {},
        props: {},
        methods: {
            async toNextPage(to) {
                await this.$router.push({
                    path: to,
                    params: {},
                });
            },
            init() {
                this.createWs();
            },
            createWs() {
                let _that = this
                if (_that.token) {
                    _that.sockjs = new SockJS("/api/websocket/ws?token=" + _that.token);
                    _that.stompClient = Stomp.over(_that.sockjs)
                    _that.stompClient.connect({}, function connectCallback() {
                        _that.wsFlag = "success"
                        _that.stompClient.subscribe('/topic/public', function responseCallback(res) {
                            console.log("res" + res.body)
                        }, function responseErrCallback(err) {
                            console.log("err" + err)
                        })

                        _that.sendWsMessage()
                    }, function connectErrCallback() {

                    })

                }


            },
            sendWsMessage(){
                let parameter = {
                    "businessType":"1",
                    "userId":111,
                    "obj":"1212"
                }
                sendWsMessage(parameter).then().catch()
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
            wsMessage() {
                return this.$store.state.wsMessage;
            },
        },
        watch: {
            token: {
                handler(newValue, oldValue) {
                    console.log(newValue);
                    console.log(oldValue);
                },
                deep: true,
                immediate: true,
            },
            wsMessage: {
                handler(newValue, oldValue) {
                    console.log(newValue);
                    console.log(oldValue);
                },
                deep: true,
                immediate: true,
            },
        },
        data() {
            return {
                name: "",
                stompClient: null,
                sockjs: null,
                wsFlag: "warning",
            };
        },
        mounted() {
            this.init();
        },
        beforeDestroy() {
            this.stompClient.disconnect();
        },
    };
</script>

<style scoped>


</style>
