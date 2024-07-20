<template>
    <div class="view_div">
        <div>
            <el-row>
                <el-col :span="4">111</el-col>
                <el-col :span="12">111</el-col>
                <el-col :span="4">111</el-col>
                <el-col :span="4">
                    <div class="user">
                        <zfj-user-icon></zfj-user-icon>
                    </div>

                </el-col>
            </el-row>
        </div>

    </div>
</template>

<script>
import zfjUserIcon from "./zfjUserIcon";

export default {
    name: "zfjHeader",
    components: {
        zfjUserIcon,
    },
    props: {},
    methods: {
        init() {
        },
    },
    computed: {},
    watch: {},
    data() {
        return {
            name: "zfjHeader",
            page: {
                total: 0,
                current: 0,
                size: 10,
                orders: [],
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
.user {
    margin: 8px;
}
</style>