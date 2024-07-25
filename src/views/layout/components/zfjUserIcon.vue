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
import { startWs, stopWs } from '@/ws/index.js'

export default {
    name: "zfjUserIcon",
    components: {},
    props: {},

    computed: {
        token() {
            return this.$store.state.token;
        },
        wsFlag() {
            return this.$store.state.wsStore.wsFlag;
        },
        wsMessage() {
            return this.$store.state.wsStore.wsMessage;
        },
    },
    watch: {

        wsFlag: {
            handler(newValue, oldValue) {

                if ("success" !== newValue) {
                    startWs();
                }
            },
            deep: true,
            immediate: true,
        },
        wsMessage: {
            handler(newValue, oldValue) {
                if (newValue && newValue.length > 0) {
                    let p = JSON.parse(newValue);
                    if (p.obj) {
                        alert(p.obj)
                    }
                }
            },
            deep: true,
            immediate: true,
        }
    },
    data() {
        return {
            wsCron: null,
        };
    },
    methods: {
        async toNextPage(to, query) {
            await this.$router.push({
                path: to,
                query: query,
            });
        },
        cronMethod(){
            console.log('one cron')
            startWs()
        },
        openCron(){
            console.log('open cron')
            this.wsCron = setInterval(this.cronMethod, 5000);
        },
        init() {
            setTimeout(this.openCron, 10000);
        },
        destroy() {
            stopWs();
            if (this.wsCron) {
                clearInterval(this.timerID);
            }
        },
        toUserInfoView() {
            this.toNextPage("/userAccount");
        },
        removeToken() {
            this.$store.commit("del_token");
            location.reload();
        },
    },
    mounted() {
        
        this.init();
    },
    beforeDestroy() {
        this.destroy()
    },
};
</script>

<style scoped></style>
