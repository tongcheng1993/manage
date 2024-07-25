<template>
    <div class="view_div">
        <el-menu router @open="handleOpen" @close="handleClose" @select="handleSelect" collapse="true">
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
          
        },
        handleClose(key, keyPath) {
           
        },
        handleSelect(key, keyPath) {
            
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

            },
            deep: true,
            immediate: true,
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
.el-menu {
    border: 0;
}

.el-menu--collapse {
    width: 100%;
}
</style>