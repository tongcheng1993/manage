<template>
    <div class="view_div">
        {{name}}
        <div>
            <pageView></pageView>
        </div>
    </div>
</template>

<script>
    import pageView from './component/pageView'
    export default {
        name: "demoView",
        // 引用组件
        components: {
            pageView
        },
        // 上级组件向本页面传递的参数
        props: {},
        data() {
            return {
                name: "demoView",
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