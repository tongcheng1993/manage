<template>
    <div>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "blank",
        // 引用组件
        components: {},
        // 上级组件向本页面传递的参数
        props: {},
        // 本页面计算属性
        computed: {},
        // 本页面监听属性
        watch: {},
        data() {
            return {
                name: "blank",
                page: {
                    total: 0,
                    current: 0,
                    size: 10,
                    orders: [],
                    records: [],
                },
            };
        },
        methods: {
            // 跳转页面
            async toNextPage(to) {
                await this.$router.push({
                    path: to,
                    params: {},
                });
            },
            // 页面初始化数据
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