<template>
    <div class="view_div">
        <div>
            <el-table :data="page.records">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="code" label="编码"></el-table-column>
                <el-table-column prop="description" label="描述"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="detailRole(scope)">详情</el-button>
                        <el-dropdown>
                            <el-button type="primary">
                                更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="editRole(scope)">编辑</el-dropdown-item>
                                <el-dropdown-item @click.native="openRolePermissionRelation(scope)">授予后台方法</el-dropdown-item>
                                <el-dropdown-item @click.native="openRoleMenuRelation(scope)">授予页面路由</el-dropdown-item>

                                <el-dropdown-item @click.native="">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
            <!--        分页组件-->
            <el-pagination
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page.total"
                    :page-size="page.size"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page.current"
                    :page-sizes="[10, 50, 100]"
            >
            </el-pagination>
        </div>
        <div>
            <el-drawer :visible.sync="permissionDrawerFlag" direction="rtl" :title="drawerTitle">
                <el-table :data="tableList" max-height="250">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            fixed
                            prop="codeSys"
                            label="系统编码"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            fixed
                            prop="codeModule"
                            label="模块编码"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            fixed
                            prop="code"
                            label="权限编码"
                            width="150">
                    </el-table-column>
                </el-table>
            </el-drawer>
        </div>
        <div>
            <el-drawer :visible.sync="menuDrawerFlag" direction="rtl" :title="drawerTitle">
                <el-tree
                        :data="treeList"
                        show-checkbox
                        node-key="id"
                        ref="tree"
                        default-expand-all
                        :props="defaultProps"
                        :default-checked-keys="menuKeys"
                        check-strictly="true"
                        @node-click="handleNodeClick"
                >
          <span slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>{{ data.showFlag > 0 ? "" : "----隐藏" }}</span>
          </span>
                </el-tree>
                <el-button @click="saveRoleMenuRelation()">保存</el-button>
            </el-drawer>
        </div>
    </div>
</template>

<script>
    import {
        queryPageRole,
        queryListPermission,
        saveRolePermissionRelation,
        queryListMenu,
        saveRoleMenuRelation
    } from '../../api/manageUserApi'
    import {createTree} from "../../util/treeUtil";

    export default {
        // 上级传递数据
        props: {},
        // 页面数据
        data() {
            return {
                name: "manageRoleList",
                page: {
                    total: 0,
                    current: 0,
                    size: 10,
                    orders: [],
                    records: [],
                },
                dataQo: {
                    current: 0,
                    size: 10,
                    orders: [],
                },

                dataDetailFlag: false,
                dataDetailTitle: "",
                dataDetailFormTop: "right",
                dataDetail: {},
                roleId: "",


                permissionDrawerFlag: false,
                tableList: [],
                permissionKeys: [],

                menuDrawerFlag: false,
                treeList: [],

                menuKeys: [],
                defaultProps: {
                    children: "children",
                    label: "name",
                },
            };
        },
        // 其他数据改变影响目标数据
        computed: {},
        // 目标数据改变影响其他数据
        watch: {
            page: {
                handler(newValue, oldValue) {
                    this.dataQo.current = newValue.current
                    this.dataQo.size = newValue.size
                    this.dataQo.orders = newValue.orders
                },
                deep: true
            }
        },
        methods: {
            // 跳转页面
            async toNextPage(to) {
                await this.$router.push({
                    path: to,
                    params: {},
                });
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.page.size = val;
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.page.current = val;
            },
            queryPageRole() {
                let parameter = this.dataQo
                queryPageRole(parameter).then((res) => {
                    this.page = res
                }).catch((err) => {

                })
            },
            openRolePermissionRelation(scope) {
                let parameter = {
                    roleCode: [scope.row.code]
                }
                queryListPermission(parameter).then((res) => {

                    this.permissionDrawerFlag = true

                })

            },
            saveRolePermissionRelation() {

            },
            openRoleMenuRelation(scope) {
                this.roleId = scope.row.id
                let parameter = {
                    roleCode: [scope.row.code]
                }
                queryListMenu(parameter).then((res) => {
                    this.menuDrawerFlag = true
                    for (let i = 0; i < res.length; i++) {
                        this.menuKeys.push(res[i].id.toString());
                    }
                })
            },
            saveRoleMenuRelation() {
                let checkedKeys = this.$refs.tree.getCheckedKeys();
                let halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys();
                for (let i in halfCheckedKeys) {
                    checkedKeys.push(halfCheckedKeys[i]);
                }
                let parameter = {
                    roleId: this.roleId,
                    menuIdList: checkedKeys,
                };
                saveRoleMenuRelation(parameter).then((res) => {
                    this.menuDrawerFlag = false
                }).catch((error) => {

                })
            },
            handleNodeClick(data) {
                console.log(data)
            },
            init() {
                this.queryPageRole();
                let parameter = {}
                queryListMenu(parameter).then((res) => {
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
                queryListPermission(parameter).then((res) => {
                    this.tableList = res
                })
            }

        },
        created() {

        },
        mounted() {
            this.init();

        },

    };
</script>

<style>
</style>