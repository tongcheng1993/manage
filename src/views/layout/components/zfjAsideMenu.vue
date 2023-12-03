<template>
    <div class="view_div">
        <el-menu
                router
                @open="handleOpen()"
                @close="handleClose()"
                @select="handleSelect()">
            <zfj-menu-temple :menuList="menu"></zfj-menu-temple>
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

            },
            handleOpen(key, keyPath) {
                console.log("handleOpen" + key)
                console.log("handleOpen" + keyPath)
            },
            handleClose(key, keyPath) {
                console.log("handleClose" + key)
                console.log("handleClose" + keyPath)
            },
            handleSelect(key, keyPath) {
                console.log("handleSelect" + key)
                console.log("handleSelect" + keyPath)
            },
        },
        computed: {
            menu() {
                return this.$store.state.menu;
            }
        },
        watch: {
            menu: {
                handler(newValue, oldValue) {
                    console.log('new', newValue)
                    console.log('old', oldValue)
                },
                deep: true,
            },
        },
        data() {
            return {
                name: 'asideMenu',
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