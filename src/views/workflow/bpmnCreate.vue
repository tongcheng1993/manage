<template>
    <div class="view_div">

    </div>
</template>

<script>
    export default {
        name: "bpmnCreate",
        // 引用组件
        components: {},
        // 上级组件向本页面传递的参数
        props: {},
        data() {
            return {
                name: "bpmnCreate",

            };
        },
        // 本页面计算属性
        computed: {},
        // 本页面监听属性
        watch: {

        },

        methods: {
            // 跳转页面
            async toNextPage(to) {
                let parameter = {
                    path: to,
                    params: {},
                }
                await this.$router.push(parameter);
            },
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