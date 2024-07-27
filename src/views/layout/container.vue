<template>
    <div class="view_div">
        <el-container class="a_container">
            <el-header class="h_container">
                <zfj-header></zfj-header>
            </el-header>
            <el-container class="m_container">
                <el-aside width="200px">
                    <zfj-aside-menu></zfj-aside-menu>
                </el-aside>
                <el-main>
                    <transition name="el-fade-in-linear">
                        <router-view></router-view>
                    </transition>
                    <!-- <el-tabs type="border-card" v-model="currentTab" closable @tab-click="clickTab" @tab-remove="removeTab">
                        <el-tab-pane v-for="item in tagList" :label="item.label" :name="item.path"> -->

                    <!-- </el-tab-pane>
                    </el-tabs> -->
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

    computed: {
        tagList() {
            return this.$store.state.tagList;
        },
        currentTab() {
            return this.$store.state.currentTag;
        },
    },
    watch: {
    },
    mounted() {
        this.init()
    },
    beforeDestroy() {
    },
    data() {
        return {
            name: 'container',

        }
    },
    methods: {
        init() {

        },
        // 跳转页面
        async toNextPage(to, query) {
            await this.$router.push({
                path: to,
                query: query,
            });
        },
        clickTab(tab, event) {
            this.toNextPage(tab.name, {})
        },
        removeTab(targetName) {
            let tabs = this.tagList;
            if (tabs.length > 1) {
                let activeName = this.currentTab;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.path === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.path;
                            }
                        }
                    });
                }
                let list = tabs.filter(tab => tab.path !== targetName);
                this.$store.commit("set_to_tag", activeName);
                this.$store.commit("set_tag_list", list);
            } else {
                // 页面有提醒
                ELEMENT.Message({
                    showClose: true,
                    message: "至少保留一个tab页",
                    type: "warning"
                })
            }

        }
    },

}
</script>

<style scoped>
.el-header {
    padding: 0;
}

.el-main {
    padding: 0;
}
.el-footer{
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