<template>
    <div>
        <template v-for="menu in menuList">
            <div v-bind:key="menu" v-if="menu.showFlag && menu.showFlag > 0">
                <el-submenu
                        :index="menu.path"
                        v-if="menu.children.length > 0 && haveOneChildrenShow(menu.children)"
                >
                    <template slot="title">
                        <i :class="menu.iconFlag"></i>
                        <span slot="title">{{ menu.name }}</span>
                    </template>
                    <zfj-menu-template :menuList="menu.children"></zfj-menu-template>
                </el-submenu>
                <el-menu-item
                        :index="menu.path"
                        :key="menu.id"
                        v-if="!menu.children.length > 0"
                >
                    <i :class="menu.iconFlag"></i>
                    <span slot="title">{{ menu.name }}</span>
                </el-menu-item>
            </div>
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
                default: [
                    {
                        parentId: 0,
                        name: "首页",
                        path: "/dashboard",
                        component: "/dashboard/dashboard",
                        showFlag: "1",
                        iconFlag: "1",
                    },
                ],
            },
        },
        methods: {
            haveOneChildrenShow(children) {
                for (let i = 0; i < children.length; i++) {
                    if (children[i].children.length > 0) {
                        if (this.haveOneChildrenShow(children[i].children)) {
                            return true;
                        }
                    } else {
                        if (children[i].showFlag > 0) {
                            return true;
                        }
                    }
                }
                return false;
            },
        },
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

<style scoped>
</style>
