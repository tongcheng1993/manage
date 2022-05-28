<template>
  <div>
    <el-dropdown>
      <el-badge is-dot class="item" :type="wsFlag">
        <el-button type="primary" icon="el-icon-user" circle> </el-button>
      </el-badge>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="toUserInfoView"
          >账户信息</el-dropdown-item
        >
        <el-dropdown-item @click.native="removeToken"
          >退出系统</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
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
      if (typeof WebSocket === "undefined") {
      } else {
        let url = window.location.href;
        let host = window.location.host;
        let start = url.indexOf("http://") > -1 ? "ws://" : "wss://";
        if (this.token) {
          this.socket = new WebSocket(
            start + host + "/api/websocket/ws?token=" + this.token
          );
          this.socket.onopen = this.open;
          this.socket.onclose = this.close;
          this.socket.onerror = this.error;
          this.socket.onmessage = this.getMessage;
        }
      }
    },
    open() {
      this.wsFlag = "success";
      this.start();
    },
    // 重置心跳
    reset() {
      clearTimeout(this.heartbeatTime);
      clearTimeout(this.serverTimeOut);
      this.start();
    },
    // 开始心跳
    start() {
      this.heartbeatTime && clearTimeout(this.heartbeatTime);
      this.serverTimeOut && clearTimeout(this.serverTimeOut);
      this.heartbeatTime = setTimeout(() => {
        if (this.socket && this.socket.readyState == 1) {
          // 如果连接正常
          this.sendHeartbeat();
        } else {
          // 否则重连
          this.reConnect();
        }
        this.serverTimeOut = setTimeout(() => {
          //超时关闭
          this.socket.close();
          this.socket = null;
          this.reConnect();
        }, this.timeOut);
      }, this.timeOut);
    },
    getMessage(msg) {
      let obj = JSON.parse(msg.data);

      switch (obj.businessType) {
        case "heartbeat":
          //收到服务器信息，心跳重置
          this.reset();
          break;
        case "sendMessage":
          console.log(obj);
          
          break;
        default:
          console.log(obj);
      }
    },
    error(e) {
      console.log("连接错误");
      console.log(e);
      this.wsFlag = "";
    },

    sendMessage(data) {
      let params = {
        businessType: "sendMessage",
        obj: data,
      };
      this.send(params);
    },
    sendHeartbeat() {
      let params = {
        businessType: "heartbeat",
      };
      this.send(params);
    },
    send(params) {
      this.socket.send(JSON.stringify(params));
    },
    close(e) {
      console.log(e);

      this.wsFlag = "";
    },
    reConnect() {},
    toUserInfoView() {
      this.toNextPage("/manageUser/userAccount");
    },
    toLoginView() {
      this.toNextPage("/login");
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
        if (newValue) {
          this.sendMessage(newValue);
        }
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      name: "",
      wsFlag: "",
      // 页面websocket对象
      socket: null,
      // 时间间隔
      timeOut: 30 * 1000,
      // 控制客户端发送心跳的时间
      heartbeatTime: null,
      // 服务器响应时间
      serverTimeOut: null,
      // 重连倒计时
      timeOutNum: null,
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.socket.close();
  },
};
</script>

<style scoped>



</style>
