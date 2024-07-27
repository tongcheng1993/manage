<template>
    <div class="view_div">
        <div>
            <el-form v-model="page" label-width="100px">
                <el-form-item label="名称">
                    <el-input v-model="page.roleName"></el-input>
                </el-form-item>
                <el-form-item label="编码">
                    <el-input v-model="page.roleCode"></el-input>
                </el-form-item>
                <el-form-item label="操作">
                    <el-button-group>
                        <el-button @click="queryPageData">查询</el-button>
                        <el-button @click="resetQuery">重置</el-button>
                    </el-button-group>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-button-group>
                <el-button @click="openAdd">新增</el-button>
                <el-button @click="">批量删除</el-button>
            </el-button-group>
        </div>
        <div>
            <el-table :data="page.records" v-loading="tableLoading" height="250" @row-click="openDetail">
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
                                <el-dropdown-item @click.native="openUpdate(scope)">编辑</el-dropdown-item>
                                <el-dropdown-item
                                    @click.native="openRolePermissionRelation(scope)">授予后台方法</el-dropdown-item>
                                <el-dropdown-item @click.native="openRoleMenuRelation(scope)">授予页面路由</el-dropdown-item>
                                <el-dropdown-item @click.native="openDel(scope)">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
            <!--        分页组件-->
            <el-pagination layout="total, sizes, prev, pager, next, jumper" :total="page.total" :page-size="page.size"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.current"
                :page-sizes="[10, 50, 100]">
            </el-pagination>
        </div>


        <div v-if="detailFlag">
            <el-dialog :visible.sync="detailFlag" :title="dataTitle">
                <el-form label-width="100px">
                    <el-form-item label="名称">
                        <el-input v-model="dataOne.roleName"></el-input>
                    </el-form-item>
                    <el-form-item label="编码">
                        <el-input v-model="dataOne.roleCode"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input v-model="dataOne.roleDescription"></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间">
                        <el-input v-model="dataOne.createTime"></el-input>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
        <div v-if="addFlag">
            <el-dialog :visible.sync="addFlag" :title="dataTitle">
                <el-form label-width="100px">
                    <el-form-item label="名称">
                        <el-input v-model="dataOne.roleName"></el-input>
                    </el-form-item>
                    <el-form-item label="编码">
                        <el-input v-model="dataOne.roleCode"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input v-model="dataOne.roleDescription"></el-input>
                    </el-form-item>
                    <el-form-item label="操作">
                        <el-button-group>
                            <el-button @click="add">保存</el-button>
                            <el-button @click="addFlag = false">取消</el-button>
                        </el-button-group>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
        <div v-if="updateFlag">
            <el-dialog :visible.sync="updateFlag" :title="dataTitle">
                <el-form label-width="100px">
                    <el-form-item label="名称">
                        <el-input v-model="dataOne.roleName"></el-input>
                    </el-form-item>
                    <el-form-item label="编码">
                        <el-input v-model="dataOne.roleCode"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input v-model="dataOne.roleDescription"></el-input>
                    </el-form-item>
                    <el-form-item label="操作">
                        <el-button-group>
                            <el-button @click="update">保存</el-button>
                            <el-button @click="updateFlag = false">取消</el-button>
                        </el-button-group>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
        <div v-if="delFlag">
            <el-dialog :visible.sync="delFlag" :title="dataTitle">
                <el-form label-width="100px">
                    <el-form-item label="提示">
                        确定删除？
                    </el-form-item>
                    <el-form-item label="操作">
                        <el-button-group>
                            <el-button @click="del">确定</el-button>
                            <el-button @click="delFlag = false">取消</el-button>
                        </el-button-group>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>









        <div v-if="permissionDrawerFlag">
            <el-dialog :visible.sync="permissionDrawerFlag" :title="drawerTitle">
                <el-table ref="permissionListTable" :data="permissionList" @selection-change="selectChangeHandle"
                    height="250">
                    <el-table-column type="selection">
                    </el-table-column>
                    <el-table-column prop="codeSys" label="系统编码">
                    </el-table-column>
                    <el-table-column prop="codeModule" label="模块编码">
                    </el-table-column>
                    <el-table-column prop="codeMethod" label="权限编码">
                    </el-table-column>
                </el-table>
                <el-button-group>
                    <el-button @click="saveRolePermissionRelation">
                        保存
                    </el-button>
                    <el-button @click="permissionDrawerFlag = false">
                        返回
                    </el-button>
                </el-button-group>
            </el-dialog>
        </div>
        <div v-if="menuDrawerFlag">
            <el-dialog :visible.sync="menuDrawerFlag" :title="drawerTitle">
                <el-tree :data="menuTree" show-checkbox node-key="tableId" ref="menuTree" default-expand-all
                    :props="defaultProps" :default-checked-keys="menuKeys" check-strictly="true"
                    @node-click="handleNodeClick">
                    <span slot-scope="{ node, data }">
                        <span>{{ node.label }}</span>
                        <span>{{ data.showFlag > 0 ? "" : "----隐藏" }}</span>
                    </span>
                </el-tree>
                <el-button-group>
                    <el-button @click="saveRoleMenuRelation">保存</el-button>
                    <el-button @click="menuDrawerFlag = false">
                        返回
                    </el-button>
                </el-button-group>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import {
    queryPageManageRole,
    queryListManageMenu,
    queryListManagePermission,
    bindRoleAndPermissionDelBefore,
    bindRoleAndMenuDelBefore,
    getManageRoleById,
    addManageRole,
    updateManageRole,
    delManageRole,
} from '@/api/manageUserApi'
import { createTree } from "../../util/treeUtil";

export default {
    // 上级传递数据
    props: {},
    // 其他数据改变影响目标数据
    computed: {},
    // 目标数据改变影响其他数据
    watch: {},
    // 页面数据
    data() {
        return {
            name: "manageRoleList",
            tableLoading: false,
            page: {
                total: 0,
                current: 0,
                size: 10,
                orders: [],
                records: [],
            },
            detailFlag: false,
            addFlag: false,
            delFlag: false,
            updateFlag: false,
            dataOne: {

            },
            dataTitle: "",






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

    methods: {
        // 跳转页面
        async toNextPage(to, query) {
            await this.$router.push({
                path: to,
                query: query,
            });
        },
        // 修改页容量
        handleSizeChange(val) {
            this.page.size = val
            this.queryPageData();
        },
        // 修改当前页
        handleCurrentChange(val) {
            this.page.current = val
            this.queryPageData();
        },
        // 分页查询
        queryPageData() {
            this.tableLoading = true
            queryPageManageRole(this.page).then((res) => {
                this.page.total = res.total
                this.page.records = res.records
                this.tableLoading = false
            }).catch((err) => {
                this.tableLoading = false
            })
        },
        // 重置查询条件
        resetQuery() {
            this.page = {
                total: 0,
                current: 0,
                size: 10,
                orders: [],
                records: [],
            }
            this.queryPageData()
        },
        // 查看详情
        openDetail(row, column, event) {
            this.dataOne = {}
            this.dataTitle = "详情"
            let p = {
                tableId: row.tableId
            }
            getManageRoleById(p).then((res) => {
                this.dataOne = res
                this.detailFlag = true
            }).catch((err) => {

            });
        },
        // 打开新增
        openAdd() {
            this.dataOne = {}
            this.dataTitle = "新增"
            this.addFlag = true
        },
        // 保存新增
        add() {
            let parameter = this.dataOne
            addManageRole(parameter).then((res) => {
                if (res) {
                    this.queryPageData();
                    this.addFlag = false
                }
            }).catch((err) => {

            })
        },
        // 打开编辑
        openUpdate(scope) {
            this.dataOne = {}
            this.dataTitle = "编辑"
            let p = {
                tableId: scope.row.tableId
            }
            getManageRoleById(p).then((res) => {
                this.dataOne = res
                this.updateFlag = true
            }).catch((err) => {

            });


        },
        // 保存编辑
        update() {
            let parameter = this.dataOne
            updateManageRole(parameter).then((res) => {
                if (res) {
                    this.queryPageData();
                    this.updateFlag = false
                }
            }).catch((err) => {

            })
        },
        // 打开删除
        openDel(scope) {
            this.dataOne = {}
            this.dataTitle = "删除"
            this.delFlag = true
            this.dataOne = scope.row
        },
        // 保存删除
        del() {
            let p = {
                tableId: this.dataOne.tableId
            }
            delManageRole(p).then((res) => {
                if (res) {
                    this.delFlag = false
                }
            }).catch((err) => {

            })

        },
        // 页面初始化
        init() {
            this.queryPageData();
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
        },
























        openRolePermissionRelation(scope) {
            this.permissionDrawerFlag = true
            if (this.$refs.permissionListTable) {
                this.$refs.permissionListTable.clearSelection();
            }
            this.bindRoleAndPermissionDelBeforeMo.roleId = scope.row.tableId
            let parameter = {
                roleId: scope.row.tableId
            }
            queryListManagePermission(parameter).then((res) => {
                this.permissionKeys = res
                this.permissionKeys.forEach((val) => {
                    this.permissionList.forEach((item) => {
                        if (val.tableId === item.tableId) {
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
        saveRolePermissionRelation() {
            this.bindRoleAndPermissionDelBeforeMo.permissionIdList = []
            if (this.permissionKeys) {
                this.permissionKeys.forEach((val) => {
                    this.bindRoleAndPermissionDelBeforeMo.permissionIdList.push(val.tableId)
                })
            }
            let parameter = this.bindRoleAndPermissionDelBeforeMo
            bindRoleAndPermissionDelBefore(parameter).then((res) => {
                if (res) {
                    this.permissionDrawerFlag = false
                }
            }).catch((error) => {

            })
        },
        openRoleMenuRelation(scope) {
            this.menuDrawerFlag = true
            if (this.menuKeys && this.menuKeys.length > 0) {
                this.menuKeys = []
            }
            if (this.$refs.menuTree) {
                this.$refs.menuTree.setCheckedKeys([])
            }
            this.roleId = scope.row.tableId
            let parameter = {
                roleId: scope.row.tableId
            }
            queryListManageMenu(parameter).then((res) => {
                this.menuKeys = [];
                for (let i = 0; i < res.length; i++) {
                    this.menuKeys.push(res[i].tableId.toString());
                }

            })
        },
        saveRoleMenuRelation() {
            let checkedKeys = this.$refs.menuTree.getCheckedKeys();
            let halfCheckedKeys = this.$refs.menuTree.getHalfCheckedKeys();
            for (let i in halfCheckedKeys) {
                checkedKeys.push(halfCheckedKeys[i]);
            }
            let parameter = {
                roleId: this.roleId,
                menuIdList: checkedKeys,
            };
            bindRoleAndMenuDelBefore(parameter).then((res) => {
                this.menuDrawerFlag = false
            }).catch((error) => {

            })
        },
        handleNodeClick(data) {
            console.log(data)
        },



    },
    created() {


    },
    mounted() {
        this.init();

    },

};
</script>

<style></style>
