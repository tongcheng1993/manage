<template>
    <div class="view_div">
        {{name}}
        <div>
            <el-calendar v-model="value">
                <template
                        slot="dateCell"
                        slot-scope="{date, data}">
                    <p :class="data.isSelected ? 'is-selected' : ''">
                        {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
                    </p>
                </template>
            </el-calendar>
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
                value: new Date(),
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