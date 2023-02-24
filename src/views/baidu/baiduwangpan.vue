<template>
    <div class="view_div">
        <a target="_blank"
           href="http://openapi.baidu.com/oauth/2.0/authorize?response_type=code&client_id=UcxoVETyGH35lDq4NgkX1GlZtxQ2SpGZ&redirect_uri=oob&scope=basic,netdisk&device_id=28871740">baidu</a>
        <el-form>
            <el-form-item>
                <el-input v-model="baiduform.appCode"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button-group>
                    <el-button>保存code</el-button>
                </el-button-group>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "baiduwangpan",
        // 引用组件
        components: {},
        // 上级组件向本页面传递的参数
        props: {},
        data() {
            return {
                name: "baiduwangpan",
                baiduform: {
                    appId: "",
                    appKey: "",
                    secretKey: "",
                    signKey: "",
                    appCode: "",

                }
            };
        },
        // 本页面计算属性
        computed: {},
        // 本页面监听属性
        watch: {},

        methods: {

            // 初始化数据
            init() {

            },

        },
        mounted() {
            this.init();
        },
        beforeDestroy() {
        },
    };

</script>

<style scoped>

</style>