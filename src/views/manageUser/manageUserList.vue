<template>
    <div class="view_div">
        <div>
            <el-form v-model="page" label-width="100px">
                <el-form-item label="账号">
                    <el-input v-model="page.userName"></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="page.shortName"></el-input>
                </el-form-item>
                <el-form-item>
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
            <el-table :data="page.records" v-loading="tableLoading" @row-click="openDetail">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="userName" label="账号"></el-table-column>
                <el-table-column prop="shortName" label="昵称"></el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-dropdown>
                            <el-button type="primary">
                                更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="openUpdate(scope)">编辑</el-dropdown-item>
                                <el-dropdown-item @click.native="openUserRoleRelation(scope)">授予角色</el-dropdown-item>
                                <el-dropdown-item @click.native="openResetPassWord(scope)">重置密码</el-dropdown-item>
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
                    <el-form-item label="账号">
                        <el-input v-model="dataOne.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="dataOne.passWord"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称">
                        <el-input v-model="dataOne.shortName"></el-input>
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
                    <el-form-item label="账号">
                        <el-input v-model="dataOne.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="dataOne.passWord"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称">
                        <el-input v-model="dataOne.shortName"></el-input>
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
                    <el-form-item label="账号">
                        <el-input v-model="dataOne.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="dataOne.passWord"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称">
                        <el-input v-model="dataOne.shortName"></el-input>
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
        <div v-if="dialog_0">
            <el-dialog :visible.sync="dialog_0" :title="dataTitle">
                <el-form>
                    <el-form-item label="新密码">
                        <el-input v-model="dataOne.passWord"></el-input>
                    </el-form-item>
                    <el-form-item label="操作">
                        <el-button-group>
                            <el-button @click="resetPassWord()">
                                重置密码
                            </el-button>
                            <el-button @click="dialog_0 = false">
                                返回
                            </el-button>
                        </el-button-group>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
        <div v-if="dialog_1">
            <el-dialog :visible.sync="dialog_1" :title="dataTitle">
                <el-table ref="roleListTable" :data="roleList" @selection-change="selectChangeHandle">
                    <el-table-column type="selection" prop="id"></el-table-column>
                    <el-table-column prop="roleName" label="名称"></el-table-column>
                    <el-table-column prop="roleCode" label="编码"></el-table-column>
                    <el-table-column prop="roleDescription" label="描述"></el-table-column>
                </el-table>

                <el-button-group>
                    <el-button @click="saveUserRoleRelation">
                        保存
                    </el-button>
                    <el-button @click="dialog_1 = false">
                        返回
                    </el-button>
                </el-button-group>

            </el-dialog>
        </div>
    </div>
</template>

<script>
import {
    queryPageManageUser,
    getManageUserById,
    addManageUser,
    delManageUser,
    updateManageUser,
    resetPassWord,
    queryListManageRole,
    bindUserAndRoleDelBefore
} from '@/api/manageUserApi'

export default {
    // 页面
    name: "manageUserListView",

    // 引用组件
    components: {

    },
    // 上级传递数据
    props: {},
    // 其他数据改变影响目标数据
    computed: {},
    // 目标数据改变影响其他数据
    watch: {

    },
    // 页面数据
    data() {
        return {
            name: "manageUserList",
            tableLoading: false,
            page: {
                total: 0,
                current: 0,
                size: 10,
                orders: [],
                records: [],
                userName: "",
                shortName: "",
            },
            detailFlag: false,
            addFlag: false,
            delFlag: false,
            updateFlag: false,
            dataOne: {

            },
            dataTitle: "",



            roleList: [],
            scopeRoleList: [],
            dialog_0: false,
            dialog_1: false,









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
            queryPageManageUser(this.page).then((res) => {
                this.page.total = res.total
                this.page.size = res.size
                this.page.current = res.current
                this.page.records = res.records
                this.tableLoading = false
            }).catch((err) => {
                alert(err)
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
            getManageUserById(p).then((res) => {
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
            addManageUser(parameter).then((res) => {
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
            getManageUserById(p).then((res) => {
                this.dataOne = res
                this.updateFlag = true
            }).catch((err) => {
            
            });


        },
        // 保存编辑
        update() {
            let parameter = this.dataOne
            updateManageUser(parameter).then((res) => {
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
            delManageUser(p).then((res) => {
                if (res) {
                    this.delFlag = false
                }
            }).catch((err) => {

            })

        },
        // 初始化
        init() {
            this.queryPageData()
            this.queryListManageRole()
        },



        // 查询全部role
        queryListManageRole() {
            let parameter = {}
            queryListManageRole(parameter).then((res) => {
                this.roleList = res
            }).catch((err) => {
                alert(err)
            })
        },


        openUserRoleRelation(scope) {
            this.dataOne = {}
            this.dataTitle = "授予角色"
            this.dataOne.userId = scope.row.tableId
            if (this.$refs.roleListTable) {
                this.$refs.roleListTable.clearSelection()
            }
            let parameter = {
                userId: scope.row.tableId
            }
            queryListManageRole(parameter).then((res) => {
                this.scopeRoleList = res
                this.dialog_1 = true
                this.$nextTick(() => {
                    this.scopeRoleList.forEach((val) => {
                        this.roleList.forEach((item) => {
                            if (val.tableId === item.tableId) {
                                this.$refs.roleListTable.toggleRowSelection(item, true)
                            }
                        })
                    })

                })
            }).catch((error) => {

            })

        },
        selectChangeHandle(val) {
            this.scopeRoleList = val
        },
        saveUserRoleRelation() {
            this.dataOne.roleIdList = []
            if (this.scopeRoleList) {
                this.scopeRoleList.forEach((item) => {
                    this.dataOne.roleIdList.push(item.tableId)
                })
            }
            let parameter = this.dataOne
            bindUserAndRoleDelBefore(parameter).then((res) => {
                if (res) {
                    this.dialog_1 = false
                }
            }).catch((error) => {
                alert(error)
            })
        },

        openResetPassWord(scope) {
            this.dataOne = {}
            this.dataTitle = "重置密码"
            this.dataOne.tableId = scope.row.tableId
            this.dialog_0 = true
        },
        resetPassWord() {
            let parameter = this.dataOne
            resetPassWord(parameter).then((res) => {
                if (res) {
                    this.dialog_0 = false
                }
            }).catch((err) => {

            })
        },
    },
    // 页面渲染之前
    created() {

    },
    // 数据加载之前
    mounted() {
        this.init();
    },
    // 页面销毁之前
    beforeDestroy() {
    },
};
</script>

<style scoped>
.is-selected {
    color: #1989FA;
}
</style>