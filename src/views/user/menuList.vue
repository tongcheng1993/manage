<template>
    <div>
        <el-row>
            <el-col :span="12">
                <!--        搜索-->
                <div>
                    <el-row>
                        <el-col>
                            <el-input v-model="queryMenuMo.roleName"></el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-button @click="queryTreeMenu">查询</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div>
                    <el-tree :data="menuTree" :props="defaultProps" @node-click="handleNodeClick">
                        <span slot-scope="{ node, data }">
                            <span>{{ node.label }}</span>
                            <span>{{ data.showFlag > 0 ? "" : "----隐藏" }}</span>
                        </span>
                    </el-tree>
                </div>
            </el-col>
            <el-col :span="12">
                <el-row>
                    <el-col>
                        <el-button @click="addTopMenu()">新增顶级路由</el-button>
                        <el-button @click="addNextMenu()">新增下级路由</el-button>
                        <el-button @click="editMenu()">编辑当前路由</el-button>
                    </el-col>
                </el-row>
                <el-form :model="menuForm" label-width="100px">
                    <el-row>

                        <el-col :span="12">
                            <el-form-item label="上级路由编码">
                                <el-input v-model="menuForm.parentId" autocomplete="off"
                                          :disabled="dataDetailItemFlag"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="上级路由名称">
                                <el-input
                                        v-model="menuForm.parentName"
                                        autocomplete="off"
                                        :disabled="dataDetailItemFlag"
                                ></el-input>

                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="名称">
                                <el-input v-model="menuForm.name" autocomplete="off"
                                          :disabled="dataDetailItemFlag"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="路由类型">
                                <el-radio-group v-model="menuForm.showFlag">
                                    <el-radio :label="0">隐藏菜单</el-radio>
                                    <el-radio :label="1">路由菜单</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="url路径">
                                <el-input v-model="menuForm.path" autocomplete="off"
                                          :disabled="dataDetailItemFlag"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="组件地址">
                                <el-input
                                        v-model="menuForm.component"
                                        autocomplete="off"
                                        :disabled="dataDetailItemFlag"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="页面图标">
                                <el-input v-model="menuForm.iconFlag" autocomplete="off"
                                          :disabled="dataDetailItemFlag"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="页面排序">
                                <el-input v-model="menuForm.sortNum" autocomplete="off"
                                          :disabled="dataDetailItemFlag"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-button @click="saveMenu()">保存</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {
        saveMenu,
        delMenu,
        updateMenu,
        getMenuInfoById,
        queryListMenu,
    } from "../../api/userApi";
    import {createTree} from "../../util/treeUtil";

    export default {
        name: "menuList",
        components: {},
        props: {},
        methods: {
            handleNodeClick(data) {
                console.log(data);
                this.menuForm = data
            },
            async toNextPage(to) {
                await this.$router.push({
                    path: to,
                    params: {},
                });
            },
            init() {
                this.queryTreeMenu();
            },
            queryTreeMenu() {
                let parameter = this.queryMenuMo;
                queryListMenu(parameter)
                    .then((res) => {
                        let parent = {
                            id: '0',
                            path: '/',
                            name: 'container',
                            component: '/layout/container',
                            children: []
                        }
                        this.menuTree = createTree(res,parent).children;
                    })
                    .catch();
            },
            addTopMenu() {
                this.menuForm = {};
                this.formFlag = true;
                this.title = "新增顶级路由";
                this.menuForm.parentId = "0";
                this.menuForm.parentName = "框架页面";
                this.menuForm.component = "/layout/blank";
                this.dataDetailItemFlag = false
            },
            addNextMenu() {
                let temp = this.menuForm
                this.menuForm = {};
                this.formFlag = true;
                this.title = "增加下级路由";
                this.menuForm.parentName = temp.name;
                this.menuForm.parentId = temp.id;
                this.menuForm.component = "/layout/blank";
                this.dataDetailItemFlag = false
            },
            editMenu() {
                this.dataDetailItemFlag = false
            },
            detailMenu(scope) {
                this.menuForm = {};
                let parameter = {menuId: scope.row.id};
                getMenuInfoById(parameter)
                    .then((res) => {
                        this.menuForm = res;
                        this.formFlag = true;
                    })
                    .catch();
            },
            delMenu(scope) {
                let parameter = {menuId: scope.row.id};
                delMenu(parameter)
                    .then((res) => {
                        this.init();
                    })
                    .catch();
            },
            closeAddMenu() {
                this.formFlag = false;
                this.menuForm = {};
            },
            saveMenu() {
                let parameter = this.menuForm;
                saveMenu(parameter)
                    .then((res) => {
                        this.init();
                        this.formFlag = false;
                    })
                    .catch();
            },
            updateMenu() {
                let parameter = this.menuForm;
                updateMenu(parameter)
                    .then((res) => {
                        this.init();
                        this.formFlag = false;
                    })
                    .catch();
            },
        },
        computed: {},
        watch: {},
        data() {
            return {
                name: "menuList",
                page: {
                    total: 0,
                    current: 0,
                    size: 10,
                    orders: [],
                    records: [],
                },
                menuList: [],
                defaultProps: {
                    children: "children",
                    label: "name",
                },
                menuTree: [],
                queryMenuMo: {
                    roleName: [],
                },
                dataDetailItemFlag: true,
                title: "",
                menuForm: {
                    id: "",
                    parentId: "",
                    parentName: "",
                    path: "",
                    component: "",
                },
                formFlag: false,
            };
        },
        mounted() {
            this.init();
        },
        beforeDestroy() {
        },
    };
</script>

<style scoped>
</style>