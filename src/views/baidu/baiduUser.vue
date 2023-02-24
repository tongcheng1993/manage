<template>
    <div class="view_div">
        <div>
            <el-form :model="baiduUser" ref="baiduUser" label-width="300px">
                <el-form-item label="用户名：">
                    <el-input
                            prefix-icon="el-icon-user"
                            v-model="baiduUser.baiduUserUserName"
                            clearable
                            placeholder="请输入用户名"
                    ></el-input>
                </el-form-item>
                <el-form-item label="密码：">
                    <el-input
                            prefix-icon="el-icon-lock"
                            type="password"
                            v-model="baiduUser.baiduUserPassWord"
                            clearable
                            placeholder="请输入密码"
                            show-password
                    ></el-input>
                </el-form-item>
                <el-form-item label="昵称：">
                    <el-input
                            prefix-icon="el-icon-user"
                            v-model="baiduUser.baiduUserName"
                            clearable
                            placeholder="请输入昵称"
                    ></el-input>
                </el-form-item>
                <el-form-item label="百度网盘appId：">
                    <el-input
                            prefix-icon="el-icon-user"
                            v-model="baiduUser.appId"
                            clearable
                            placeholder="请输入昵称"
                    ></el-input>
                </el-form-item>
                <el-form-item label="百度网盘appKey：">
                    <el-input
                            prefix-icon="el-icon-user"
                            v-model="baiduUser.appKey"
                            clearable
                            placeholder="请输入昵称"
                    ></el-input>
                </el-form-item>
                <el-form-item label="百度网盘secretKey：">
                    <el-input
                            prefix-icon="el-icon-user"
                            v-model="baiduUser.secretKey"
                            clearable
                            placeholder="请输入昵称"
                    ></el-input>
                </el-form-item>
                <el-form-item label="百度网盘signKey：">
                    <el-input
                            prefix-icon="el-icon-user"
                            v-model="baiduUser.signKey"
                            clearable
                            placeholder="请输入昵称"
                    ></el-input>
                </el-form-item>
                <el-form-item label="百度网盘token：">
                    <el-input
                            prefix-icon="el-icon-user"
                            v-model="baiduUser.appToken"
                            clearable
                            placeholder="请输入昵称"
                    ></el-input>

                </el-form-item>

                <el-form-item label="百度网盘refreshToken：">
                    <el-input
                            prefix-icon="el-icon-user"
                            v-model="baiduUser.appRefreshToken"
                            clearable
                            placeholder="请输入昵称"
                    ></el-input>

                </el-form-item>
            </el-form>
            <el-button @click="openToken">生成token</el-button>
        </div>

        <div>
            <el-dialog :visible.sync="dataDetailFlag" :title="dataDetailTitle">
                <a target="_blank"
                   id="appCode" :href="baiduUser.appCodeUri">appCode</a>
                <el-input v-model="baiduUser.appCode">

                </el-input>
                <el-button @click="createBaiduTokenUri">
                    生成token
                </el-button>

                <a id="appToken" target="_blank" v-if="baiduUser.appTokenUriFlag"
                   :href="baiduUser.appTokenUri">{{baiduUser.appTokenUri}}11{{baiduUser.appCodeUri}}22{{baiduUser.appkey}}</a>
            </el-dialog>
        </div>


    </div>
</template>

<script>
    import {} from '../../api/baiduApi.js'

    export default {
        name: "baiduUser",
        // 引用组件
        components: {},
        // 上级组件向本页面传递的参数
        props: {},
        data() {
            return {
                name: "baiduUser",
                baiduUser: {
                    baiduUserUserName: "",
                    baiduUserPassWord: "",
                    baiduUserName: "",
                    appId: "28871740",
                    appKey: "UcxoVETyGH35lDq4NgkX1GlZtxQ2SpGZ",
                    secretKey: "g47dMEffcPeVK4QGL5Hgkdx2WBWAZMjd",
                    signKey: "fC^=OHvr5@GsIqZqereoS8euf4T4vZk~",
                    appCodeUri: "",
                    appCode: "",
                    appTokenUriFlag:false,
                    appTokenUri: "",
                    appToken: "",
                    appRefreshToken:"",


                },
                dataDetailFlag: false,
                dataDetailTitle: "",
                dataDetailFormTop: "right",
                dataDetail: {},

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
            openToken() {
                this.createBaiduCodeUri()
                this.dataDetailFlag=true
            },
            createBaiduCodeUri() {
                this.baiduUser.appCodeUri = "http://openapi.baidu.com/oauth/2.0/authorize"
                    + "?response_type=code"
                    + "&client_id=" + this.baiduUser.appKey
                    + "&redirect_uri=oob"
                    + "&scope=basic,netdisk"
                    + "&device_id=" + this.baiduUser.appId
            },
            createBaiduTokenUri() {
                this.baiduUser.appTokenUri = "https://openapi.baidu.com/oauth/2.0/token"
                    + "?grant_type=authorization_code&code=" + this.baiduUser.appCode
                    + "&client_id=" + this.baiduUser.appKey
                    + "&client_secret=" + this.baiduUser.secretKey
                    + "&redirect_uri=oob"
                console.log(this.baiduUser.appTokenUri)
                this.baiduUser.appTokenUriFlag=true

            }

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