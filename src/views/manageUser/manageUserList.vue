<template>
    <div class="view_div">
        <div>
            <el-form v-model="dataQo">
                <el-form-item>
                    <el-input v-model="dataQo.userName"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="dataQo.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button-group>
                        <el-button @click="queryPageUser()">查询</el-button>
                        <el-button @click="">重置</el-button>
                    </el-button-group>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-button-group>
                <el-button @click="openAddUserDataDetail()">新增</el-button>
                <el-button>注销</el-button>
            </el-button-group>
        </div>
        <div>
            <el-table :data="page.records">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="userName" label="账号"></el-table-column>
                <el-table-column prop="name" label="昵称"></el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-dropdown>
                            <el-button type="primary">
                                更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="openUpdateUserDataDetail(scope)">编辑</el-dropdown-item>
                                <el-dropdown-item @click.native="openResetPassWordDataDetail(scope)">重置密码
                                </el-dropdown-item>
                                <el-dropdown-item @click.native="openRoleListTable(scope)">授予角色</el-dropdown-item>
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
            <el-dialog :visible.sync="dataDetailFlag">
                <el-form label-width="100px">
                    <el-form-item label="账号">
                        <el-input v-model="dataDetail.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="dataDetail.passWord"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称">
                        <el-input v-model="dataDetail.name"></el-input>
                    </el-form-item>
                    <el-form-item label="操作">
                        <el-button-group>
                            <el-button @click="saveUser()">
                                保存
                            </el-button>
                            <el-button>
                                返回
                            </el-button>
                        </el-button-group>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
        <div>
            <el-dialog :visible.sync="dialog_0">
                <el-form>
                    <el-form-item label="新密码">
                        <el-input v-model="resetPassWordMo.passWord"></el-input>
                    </el-form-item>
                    <el-form-item label="操作">
                        <el-button-group>
                            <el-button @click="resetPassWord()">
                                重置密码
                            </el-button>
                            <el-button>
                                返回
                            </el-button>
                        </el-button-group>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
        <div>
            <el-dialog :visible.sync="dialog_1">
                <el-table ref="roleListTable" :data="roleList" @selection-change="selectChangeHandle">
                    <el-table-column type="selection" prop="id"></el-table-column>
                    <el-table-column prop="name" label="名称"></el-table-column>
                </el-table>
                <el-button @click="saveUserRoleRelation">
                    保存
                </el-button>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {queryPageUser, saveUser, resetPassWord, queryListRole, saveUserRoleRelation} from '../../api/manageUserApi'

    export default {
        // 上级传递数据
        props: {},
        // 页面数据
        data() {
            return {
                name: "manageUserList",
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
                    userName: "",
                },

                dataDetailFlag: false,
                dataDetailTitle: "",
                dataDetailFormTop: "right",
                dataDetail: {
                    name: "",
                },
                dialog_0: false,
                resetPassWordMo: {
                    id: "",
                    passWord: ""
                },
                dialog_1: false,
                roleList: [],
                scopeRoleList: [],
                saveUserRoleRelationMo: {
                    userId: "",
                    roleIdList: []
                }
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
            async toNextPage(to) {
                await this.$router.push({
                    path: to,
                    params: {},
                });
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.dataQo.size = val;
                this.queryPageUser();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.dataQo.current = val;
                this.queryPageUser();
            },
            queryPageUser() {
                let parameter = this.dataQo
                queryPageUser(parameter).then((res) => {
                    this.page = res
                }).catch((err) => {

                })
            },
            queryListRole() {
                let parameter = {}
                queryListRole(parameter).then((res) => {
                    this.roleList = res


                }).catch()
            },
            openRoleListTable(scope) {
                this.dialog_1 = true
                if (this.$refs.roleListTable) {
                    this.$refs.roleListTable.clearSelection()
                }
                this.saveUserRoleRelationMo.userId = scope.row.id
                let parameter = {
                    userId: [scope.row.id]
                }
                queryListRole(parameter).then((res) => {
                    this.scopeRoleList = res
                    this.$nextTick(() => {
                        this.scopeRoleList.forEach((val) => {
                            this.roleList.forEach((item) => {
                                if (val.id === item.id) {
                                    this.$refs.roleListTable.toggleRowSelection(item, true)
                                }
                            })
                        })
                    })
                }).catch()

            },
            selectChangeHandle(val) {
                console.log(val)
                this.scopeRoleList = val
            },
            saveUserRoleRelation() {
                this.saveUserRoleRelationMo.roleIdList = []
                if (this.scopeRoleList) {
                    this.scopeRoleList.forEach((item) => {
                        this.saveUserRoleRelationMo.roleIdList.push(item.id)
                    })
                }
                let parameter = this.saveUserRoleRelationMo
                saveUserRoleRelation(parameter)
                    .then((res) => {
                        if (res) {
                            this.dialog_1 = false
                        }
                    })
                    .catch((error) => {

                    })
            },
            openAddUserDataDetail() {
                this.dataDetail = {}
                this.dataDetailFlag = true
            },
            openUpdateUserDataDetail(scope) {
                this.dataDetail = scope.row
                this.dataDetailFlag = true
            },
            openResetPassWordDataDetail(scope) {
                this.resetPassWordMo.id = scope.row.id
                this.dialog_0 = true
            },
            resetPassWord() {
                let parameter = this.resetPassWordMo
                resetPassWord(parameter).then((res) => {
                    if (res && res.id) {
                        this.dialog_0 = false
                    }
                }).catch()
            },
            saveUser() {
                let parameter = this.dataDetail

                saveUser(parameter).then((res) => {
                    if (res && res.id) {
                        this.queryPageUser();
                        this.dataDetailFlag = false
                    }
                }).catch()
            },
            init() {
                this.queryPageUser();
                this.queryListRole();
            },


        },
        created() {

        },
        mounted() {
            this.init();
        },
        beforeDestory() {

        }
    };
</script>

<style>
</style>