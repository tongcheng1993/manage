<template>
    <div class="view_div">
        <div class="login_div">
            <el-form :model="loginForm" ref="form" label-width="120px">
                <el-form-item label="用户名：">
                    <el-input
                            prefix-icon="el-icon-user"
                            v-model="loginForm.userName"
                            clearable
                            placeholder="请输入用户名"
                    ></el-input>
                </el-form-item>
                <el-form-item label="密码：">
                    <el-input
                            prefix-icon="el-icon-lock"
                            type="password"
                            v-model="loginForm.passWord"
                            clearable
                            placeholder="请输入密码"
                            show-password
                    ></el-input>
                </el-form-item>
                <el-form-item label="验证码：">
                    <el-input prefix-icon="el-icon-picture" v-model="loginForm.value" placeholder="请输入验证码"></el-input>
                </el-form-item>
                <el-form-item label="验证码：">
                    <img
                            width="280px"
                            :onload="captchaImgLoad"
                            :src="captchaImg"
                            @click="getCaptchaImg"
                            alt="加载验证码失败"
                    />
                </el-form-item>
                <el-form-item>

                    <el-button
                            :loading="loginSubmitLoad"
                            type="primary"
                            @click="loginSubmit"
                    >登录
                    </el-button
                    >
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {drawCaptcha, login} from "../../api/loginApi";
    import {uuid} from "../../util/strUtil";

    export default {
        name: "login",
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
                this.getCaptchaImg();
            },
            getCaptchaImg() {
                this.captchaImgLoad = true;
                let parameter = {}
                drawCaptcha(parameter).then((res) => {
                    this.loginForm.code = res.captchaId;
                    let url = "data:image/png;base64,";
                    this.captchaImg = url + res.imgBytes
                    this.captchaImgLoad = false;
                })

            },
            loginSubmit() {
                this.loginSubmitLoad = true;
                login(this.loginForm)
                    .then((res) => {
                        this.loginSubmitLoad = false;
                        this.$store.commit("set_token", res);
                        this.toNextPage("/");
                    })
                    .catch((error) => {
                        console.log(error);
                        this.loginSubmitLoad = false;
                        this.getCaptchaImg();
                    });
            },
            toRegisterView() {
                this.toNextPage("/register");
            },
        },
        computed: {},
        watch: {},
        data() {
            return {
                name: "login",
                page: {
                    total: 0,
                    current: 0,
                    size: 10,
                    orders: [],
                },
                captchaImgLoad: false,
                captchaImg: "",
                loginSubmitLoad: false,
                loginForm: {
                    userName: "",
                    passWord: "",
                    code: "",
                    value: "",
                },
            };
        },
        mounted() {
            this.init();
        },
        beforeDestroy() {
        },
    };
</script>

<style scoped>
    .login_div {
        margin: 0 auto;
        width: 400px;
    }
</style>