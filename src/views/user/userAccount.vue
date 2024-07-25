<template>
    <div class="view_div">
        {{ name }}
        <button @click="send">send</button>
    </div>
</template>

<script>
import { sendWs } from '@/ws/index.js'

export default {
    name: "userAccount",
    // 引用组件
    components: {},
    // 上级组件向本页面传递的参数
    props: {},
    data() {
        return {
            name: "userAccount",

        };
    },
    // 本页面计算属性
    computed: {},
    // 本页面监听属性
    watch: {},

    methods: {
        // 初始化数据
        init() {
            console.log("init")
        },

        send() {
            let p = {
                businessType:"people",
                typePath:"/topic/chat",
                toUserId:"1816338370297610242",
                obj:"123"
                
            }

            sendWs(p)
        }
    },
    mounted() {
        this.init()
    },
    beforeDestroy() {
    },
};

</script>

<style scoped></style>