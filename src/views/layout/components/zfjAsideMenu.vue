<template>
    <div class="view_div">
        <el-menu
                router
                @open="handleOpen"
                @close="handleClose"
                @select="handleSelect">
            <zfj-menu-temple :menuList="menuList"></zfj-menu-temple>
        </el-menu>
    </div>
</template>

<script>

    import zfjMenuTemple from './zfjMenuTemple'

    export default {
        name: "zfjAsideMenu",
        components: {
            zfjMenuTemple
        },
        props: {},
        methods: {
            init() {
                let tempMenu = this.$store.state.menu;
                console.log(tempMenu)
                this.menuList = tempMenu
            },
            handleOpen(key, keyPath) {
                console.log(key)
                console.log(keyPath)
            },
            handleClose(key, keyPath) {
                console.log(key)
                console.log(keyPath)
            },
            handleSelect(key, keyPath) {
                console.log(key)
                console.log(keyPath)
            },
        },
        computed: {},
        watch: {},
        data() {
            return {
                name: 'asideMenu',
                page: {
                    total: 0,
                    current: 0,
                    size: 10,
                    orders: []
                },
                menuList: [],
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

</style>