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
            <el-table :data="page.records" v-loading="tableLoading" height="250" @row-click="openDetail">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="perName" label="名称"></el-table-column>
                <el-table-column prop="codeSys" label="系统编码"></el-table-column>
                <el-table-column prop="codeModule" label="模块编码"></el-table-column>
                <el-table-column prop="codeMethod" label="方法编码"></el-table-column>
                <el-table-column prop="perDescription" label="描述"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-dropdown>
                            <el-button type="primary">
                                更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="openUpdate(scope)">编辑</el-dropdown-item>
                                <el-dropdown-item @click.native="openDel(scope)">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination layout="total, sizes, prev, pager, next, jumper" :total="page.total" :page-size="page.size"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.current"
                :page-sizes="[10, 50, 100]">
            </el-pagination>
        </div>
        <div v-if="detailFlag">
            <el-dialog :visible.sync="detailFlag" :title="dataTitle">
                <el-form label-width="100px">
                    <el-form-item label="名称">
                        <el-input v-model="dataOne.perName"></el-input>
                    </el-form-item>
                    <el-form-item label="系统">
                        <el-input v-model="dataOne.codeSys"></el-input>
                    </el-form-item>
                    <el-form-item label="模块">
                        <el-input v-model="dataOne.codeModule"></el-input>
                    </el-form-item>
                    <el-form-item label="方法">
                        <el-input v-model="dataOne.codeMethod"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input v-model="dataOne.perDescription"></el-input>
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
                        <el-input v-model="dataOne.perName"></el-input>
                    </el-form-item>
                    <el-form-item label="系统">
                        <el-input v-model="dataOne.codeSys"></el-input>
                    </el-form-item>
                    <el-form-item label="模块">
                        <el-input v-model="dataOne.codeModule"></el-input>
                    </el-form-item>
                    <el-form-item label="方法">
                        <el-input v-model="dataOne.codeMethod"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input v-model="dataOne.perDescription"></el-input>
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
                        <el-input v-model="dataOne.perName"></el-input>
                    </el-form-item>
                    <el-form-item label="系统">
                        <el-input v-model="dataOne.codeSys"></el-input>
                    </el-form-item>
                    <el-form-item label="模块">
                        <el-input v-model="dataOne.codeModule"></el-input>
                    </el-form-item>
                    <el-form-item label="方法">
                        <el-input v-model="dataOne.codeMethod"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input v-model="dataOne.perDescription"></el-input>
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

    </div>
</template>

<script>
import {
    queryPageManagePermission, addManagePermission, delManagePermission, updateManagePermission, getManagePermissionById,
} from '@/api/manageUserApi'

export default {
    name: "managePermissionList",
    // 引用组件
    components: {},
    // 上级组件向本页面传递的参数
    props: {},
    // 本页面监听属性
    watch: {},
    // 本页面计算属性
    computed: {},
    // 数据
    data() {
        return {
            name: "managePermissionList",
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
                perName: "",
                codeSys: "",
                codeModule: "",
                code: "",
                perDescription: "",
            },
            dataTitle: "",



        };
    },
    // 方法
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
            queryPageManagePermission(this.page).then((res) => {
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
            getManagePermissionById(p).then((res) => {
                if (res) {
                    this.dataOne = res
                    this.detailFlag = true
                }

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
            addManagePermission(parameter).then((res) => {
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
            getManagePermissionById(p).then((res) => {
                if (res) {
                    this.dataOne = res
                    this.updateFlag = true
                }

            }).catch((err) => {

            });


        },
        // 保存编辑
        update() {
            let parameter = this.dataOne
            updateManagePermission(parameter).then((res) => {
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
            delManagePermission(p).then((res) => {
                if (res) {
                    this.delFlag = false
                }
            }).catch((err) => {

            })

        },
        // 初始化数据
        init() {
            this.queryPageData()
        },



    },
    mounted() {
        this.init();
    },
    beforeDestroy() {
    },
};

</script>

<style scoped></style>
