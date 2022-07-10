<template>
    <div class="view_div">
        <div>
            <el-row>
                <el-col :span="12">
                    <el-tree
                            :data="treeList"
                            :props="defaultProps"
                            @node-click="handleNodeClick"
                    >
                        <span slot-scope="{ node, data }">
                            <span>{{ node.label }}</span>
                            <span>{{ data.showFlag > 0 ? "" : "----隐藏" }}</span>
                        </span>
                    </el-tree>
                </el-col>
                <el-col :span="12">
                    <el-row>
                        <el-col>
                            <el-button @click="openTopMenu()">增加顶级路由</el-button>
                            <el-button @click="openNextMenu()">增加下级路由</el-button>
                            <el-button @click="openEditMenu()">编辑当前路由</el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form :model="dataDetail" ref="dataDetailForm">
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="上级id">
                                            <el-input v-model="dataDetail.parentId"
                                                      :disabled="dataDetailItemFlag"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="自身id">
                                            <el-input v-model="dataDetail.id" :disabled="dataDetailItemFlag"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="排序">
                                            <el-input v-model="dataDetail.sortNum"
                                                      :disabled="dataDetailItemFlag"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="名字">
                                            <el-input v-model="dataDetail.name"
                                                      :disabled="dataDetailItemFlag"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="路径">
                                            <el-input v-model="dataDetail.path"
                                                      :disabled="dataDetailItemFlag"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="组件地址">
                                            <el-input v-model="dataDetail.component"
                                                      :disabled="dataDetailItemFlag"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="是否展示">
                                            <el-input v-model="dataDetail.showFlag"
                                                      :disabled="dataDetailItemFlag"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="图标">
                                            <el-input v-model="dataDetail.iconFlag"
                                                      :disabled="dataDetailItemFlag"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col>
                                        <el-button @click="saveMenu()">保存</el-button>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {saveMenu, queryListMenu} from "../../api/manageUserApi";
    import {createTree} from "../../util/treeUtil";

    export default {
        // 引用组件
        components: {},
        // 上级组件向本页面传递的参数
        props: {},
        data() {
            return {
                dataQo: {},
                dataList: [],
                treeList: [],
                dataDetailFlag: false,
                dataDetailTitle: "",
                dataDetailFormTop: "right",
                dataDetail: {
                    parentId: "",
                    sortNum: "",
                    id: "",
                    name: "",
                    path: "",
                    component: "",
                    showFlag: "",
                    iconFlag: "",
                },
                dataDetailItemFlag: true,
                defaultProps: {
                    children: "children",
                    label: "name",
                },
            };
        },
        // 本页面计算属性
        computed: {},
        // 本页面监听属性
        watch: {
            dataList: {
                handler(newValue, oldValue) {
                    console.log("new", newValue);
                    console.log("old", oldValue);
                },
                deep: true,
            },
        },

        methods: {
            // 跳转页面
            async toNextPage(to) {
                await this.$router.push({
                    path: to,
                    params: {},
                });
            },
            // 选择路由
            handleNodeClick(data) {
                this.dataDetail = data;
            },
            // 查询所有路由
            queryListMenu() {
                let parameter = this.dataQo;
                queryListMenu(parameter)
                    .then((res) => {
                        this.dataList = res;
                        let parent = {
                            id: '0',
                            path: '/',
                            name: 'container',
                            component: '/layout/container',
                            children: []
                        }
                        parent = createTree(res, parent);

                        this.treeList = parent.children
                    })
                    .catch((err) => {
                    });
            },
            // 保存路由
            saveMenu() {
                let parameter = this.dataDetail
                saveMenu(parameter).then((res) => {
                    if (res) {
                        this.queryListMenu();
                        this.dataDetailItemFlag = true;
                    }
                }).catch((err) => {

                })
            },
            openTopMenu() {
                this.dataDetail = {
                    parentId: 0
                }
                this.dataDetailItemFlag = false;
            },
            // 打开下级路由
            openNextMenu() {
                let temp = this.dataDetail
                this.dataDetail = {
                    parentId: temp.id
                }
                this.dataDetailItemFlag = false;
            },
            // 打开编辑路由
            openEditMenu() {
                this.dataDetailItemFlag = false;
            },
        },
        mounted() {
            this.queryListMenu();
        },
        beforeDestroy() {
        },
    };
</script>

<style>
</style>