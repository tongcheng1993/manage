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
                    <transition name="el-fade-in-linear">
                        <router-view></router-view>
                    </transition>
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
.el-header {
    padding: 0;
}

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