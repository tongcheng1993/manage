<template>
    <div class="view_div">
        <div>
            <el-table :data="page.records">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="roleName" label="名称"></el-table-column>
                <el-table-column prop="roleCode" label="编码"></el-table-column>
                <el-table-column prop="roleDescription" label="描述"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-dropdown>
                            <el-button type="primary">
                                更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="editRole(scope)">编辑</el-dropdown-item>
                                <el-dropdown-item @click.native="openRoleMenuRelation(scope)">授予页面路由</el-dropdown-item>
                                <el-dropdown-item @click.native="openRolePermissionRelation(scope)">授予后台方法</el-dropdown-item>
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
            <el-drawer :visible.sync="addDrawerFlag" :title="addTitle">
                <el-form >

                </el-form>
            </el-drawer>
            <el-drawer :visible.sync="resetDrawerFlag" :title="resetTitle">
                <el-form >

                </el-form>
            </el-drawer>
        </div>
        <div>
            <el-drawer :visible.sync="permissionDrawerFlag" direction="rtl" :title="drawerTitle">
                <el-table ref="permissionListTable" :data="permissionList" @selection-change="selectChangeHandle"
                          max-height="250">
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
                            prop="codeMethod"
                            label="权限编码"
                            width="150">
                    </el-table-column>
                </el-table>
                <el-button @click="bindRoleAndPermissionDelBefore()">保存</el-button>
            </el-drawer>
        </div>
        <div>
            <el-drawer :visible.sync="menuDrawerFlag" direction="rtl" :title="drawerTitle">
                <el-tree
                        :data="menuTree"
                        show-checkbox
                        node-key="id"
                        ref="menuTree"
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
        queryPageManageRole,
        queryListManageMenu,
        queryListManagePermission,
        bindRoleAndPermissionDelBefore,
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

                dataDetailFlag: false,
                dataDetailTitle: "",
                dataDetailFormTop: "right",
                dataDetail: {},

                roleId: "",

                permissionDrawerFlag: false,
                permissionList: [],
                permissionKeys: [],
                bindRoleAndPermissionDelBeforeMo: {
                    roleId: "",
                    permissionIdList: []
                },


                menuDrawerFlag: false,
                menuTree: [],
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

                },
                deep: true
            }
        },
        methods: {
            // 跳转页面
            async toNextPage(to, query) {
                await this.$router.push({
                    path: to,
                    query: query,
                });
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.page.size = val;
                this.queryPageManageRole()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.page.current = val;
                this.queryPageManageRole()
            },
            queryPageManageRole() {
                let parameter = this.page
                queryPageManageRole(parameter).then((res) => {
                    this.page = res
                }).catch((err) => {
                    console.log(err)
                })
            },
            openRolePermissionRelation(scope) {
                this.permissionDrawerFlag = true
                if (this.$refs.permissionListTable) {
                    this.$refs.permissionListTable.clearSelection();
                }
                this.bindRoleAndPermissionDelBeforeMo.roleId = scope.row.id
                let parameter = {
                    roleId: scope.row.id
                }
                queryListManagePermission(parameter).then((res) => {
                    this.permissionKeys = res
                    this.permissionKeys.forEach((val) => {
                        this.permissionList.forEach((item) => {
                            if (val.id === item.id) {
                                this.$refs.permissionListTable.toggleRowSelection(item, true)
                            }
                        })
                    })

                })
            },
            selectChangeHandle(val) {
                console.log(val)
                this.permissionKeys = val
            },
            bindRoleAndPermissionDelBefore() {
                this.bindRoleAndPermissionDelBeforeMo.permissionIdList = []
                if (this.permissionKeys) {
                    this.permissionKeys.forEach((val) => {
                        this.bindRoleAndPermissionDelBeforeMo.permissionIdList.push(val.id)
                    })
                }
                let parameter = this.bindRoleAndPermissionDelBeforeMo
                bindRoleAndPermissionDelBefore(parameter).then((res) => {
                    if (res) {
                        this.permissionDrawerFlag = false
                    }
                }).catch((error) => {
                    console.log(error)
                })
            },
            openRoleMenuRelation(scope) {
                this.menuDrawerFlag = true
                if (this.menuKeys && this.menuKeys.length > 0) {
                    this.menuKeys = []
                }
                // if (this.$refs.tree) {
                //     this.$refs.tree.setCheckedKeys([])
                // }
                this.roleId = scope.row.id
                let parameter = {
                    roleId: scope.row.id
                }
                queryListManageMenu(parameter).then((res) => {
                    this.menuKeys = [];
                    for (let i = 0; i < res.length; i++) {
                        this.menuKeys.push(res[i].tableId.toString());
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
                this.queryPageManageRole();
                let parameter = {}
                queryListManageMenu(parameter).then((res) => {
                    this.menuTree = createTree(res).children
                }).catch((err) => {
                    console.log(err)
                })
                queryListManagePermission(parameter).then((res) => {
                    this.permissionList = res
                }).catch((err) => {
                    console.log(err)
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
