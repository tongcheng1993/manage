<template>
    <div class="view_div">
        <template v-for="menu in menuList">
            <template v-if="menu.showFlag">
                <el-submenu :index='menu.path' v-if="menu.children && menu.children.length > 0">
                    <template slot="title">
                        <i :class="menu.icon"></i>
                        {{ menu.label }}
                    </template>
                    <zfj-menu-template :menuList="menu.children"></zfj-menu-template>
                </el-submenu>
                <el-menu-item :index="menu.path" :key="menu.tableId" v-else>
                    <i :class="menu.icon"></i>
                    {{ menu.label }}
                       
                    
                </el-menu-item>
            </template>
        </template>
    </div>
</template>

<script>
export default {
    name: "zfjMenuTemplate",
    components: {},
    props: {
        menuList: {
            type: Array,
            required: true,
            default: [],
        },
    },
    methods: {},
    computed: {},
    watch: {},
    data() {
        return {
            name: "",
        };
    },
    mounted() {

    },
    beforeDestroy() {
    },
};
</script>

<style></style>
