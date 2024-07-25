<template>
    <div class="view_div">
        <div>
            <el-row>
                <el-col :span="12">
                    <el-tree :data="treeList" :props="defaultProps" @node-click="handleNodeClick">
                        <span slot-scope="{ node, data }">
                            <span>{{ node.label }}</span>
                            <span>{{ data.showFlag ? "" : "----隐藏" }}</span>
                        </span>
                    </el-tree>
                </el-col>
                <el-col :span="12">
                    <el-row>
                        <el-col>
                            <el-button @click="openAddTopMenu()">增加顶级路由</el-button>
                            <el-button @click="openNextMenu()">增加下级路由</el-button>
                            <el-button @click="openEditMenu()">编辑当前路由</el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form :model="dataOne">
                                <el-form-item label="上级id">
                                    <el-input v-model="dataOne.parentId"></el-input>
                                </el-form-item>
                                <el-form-item label="自身id">
                                    <el-input v-model="dataOne.tableId"></el-input>
                                </el-form-item>
                                <el-form-item label="名字">
                                    <el-input v-model="dataOne.name"></el-input>
                                </el-form-item>
                                <el-form-item label="路径">
                                    <el-input v-model="dataOne.path"></el-input>
                                </el-form-item>
                                <el-form-item label="组件地址">
                                    <el-input v-model="dataOne.component"></el-input>
                                </el-form-item>
                                <el-form-item label="是否展示">
                                    <el-input v-model="dataOne.showFlag"></el-input>
                                </el-form-item>
                                <el-form-item label="图标">
                                    <el-input v-model="dataOne.icon"></el-input>
                                </el-form-item>
                                <el-form-item label="排序">
                                    <el-input v-model="dataOne.sortNum"></el-input>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
        <div v-if="addFlag">
            <el-dialog :visible.sync="addFlag" :title="dataTitle">
                <el-form>
                    <el-form-item label="上级id">
                        <el-input v-model="dataOne.parentId"></el-input>
                    </el-form-item>
                    <el-form-item label="操作">
                        <el-button-group>
                            <el-button @click="saveMenu()">保存</el-button>
                            <el-button @click="addFlag = false">取消</el-button>
                        </el-button-group>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { addManageMenu, queryListManageMenu } from "../../api/manageUserApi";
import { createTree } from "../../util/treeUtil";

export default {
    // 引用组件
    components: {},
    // 上级组件向本页面传递的参数
    props: {},
    // 本页面计算属性
    computed: {},
    // 本页面监听属性
    watch: {},
    // 数据开始绑定
    mounted() {

        this.init();
    },
    beforeDestroy() {

    },
    data() {
        return {
            dataList: [],
            treeList: [],
            dataOne: {},
            dataTitle: "",
            detailFlag: false,




            defaultProps: {
                children: "children",
                label: "name",
            },
        };
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
            this.dataOne = data;
        },
        // 查询所有路由
        queryAllManageMenu() {
            queryListManageMenu({}).then((res) => {
                let parent = {
                    tableId: "0",
                    path: '/',
                    name: 'container',
                    component: '/layout/container',
                    children: []
                }
                this.dataList = res
                parent = createTree(res, parent);
                this.dataList.push(parent);
                this.treeList = parent.children

            }).catch((err) => {

            });
        },
        init() {
            this.queryAllManageMenu();
        },
        // 保存路由
        saveMenu() {
            let parameter = this.dataDetail
            addManageMenu(parameter).then((res) => {
                if (res) {
                    this.queryListMenu();
                    this.dataDetailItemFlag = true;
                }
            }).catch((err) => {

            })
        },
        // 打开增加顶级路由
        openAddTopMenu() {
            this.dataOne = {
                parentId: 0
            }
            this.addFlag = true;
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

};
</script>

<style></style>