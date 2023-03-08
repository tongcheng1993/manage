<template>
    <div class="view_div">
        {{name}}

    </div>
</template>

<script>
    import zfjCalendar from '../../components/zfjCalendar'
    import zfjBaseTable from '../../components/zfjBaseTable'
    export default {
        name: "demoView",
        // 引用组件
        components: {

        },
        // 上级组件向本页面传递的参数
        props: {},
        data() {
            return {
                name:"demoView"
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
    .is-selected {
        color: #1989FA;
    }
</style>