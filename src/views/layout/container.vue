<template>
    <div class="view_div">
        <el-container class="a_container">
            <el-header class="h_container">
                <zfj-header></zfj-header>
            </el-header>
            <el-container class="m_container">
                <el-aside>
                    <zfj-aside-menu></zfj-aside-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
            <el-footer class="f_container">
                <zfj-footer></zfj-footer>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    import zfjHeader from './components/zfjHeader'
    import zfjAsideMenu from './components/zfjAsideMenu'
    import zfjFooter from './components/zfjFooter'

    export default {
        name: "container",
        components: {
            zfjHeader,
            zfjAsideMenu,
            zfjFooter
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
                name: 'container',
                page: {
                    total: 0,
                    current: 0,
                    size: 10,
                    orders: []
                },
                mes: "vue"
            }
        },
        mounted() {
            this.init()
        },
        beforeDestroy() {
        }
    }
</script>

<style scoped>
    .a_container {
        overflow: auto;
        height: 100%;
    }

    .h_container {
        background-color: #42b983;
        height: 10%;
    }

    .m_container {
        background-color: rosybrown;
        height: 80%;
    }

    .f_container {
        background-color: beige;
        height: 10%;
    }
</style>