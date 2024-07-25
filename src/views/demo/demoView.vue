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
                <el-button @click="openBatchDel">批量删除</el-button>
            </el-button-group>
        </div>
        <div>
            <el-table ref="dataTable" :data="page.records" v-loading="tableLoading" @row-click="openDetail"
                @selection-change="handleSelectionChange">
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
                                <el-dropdown-item @click.native="openRoleListTable(scope)">授予角色</el-dropdown-item>
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
        <div v-if="batchDelFlag">
            <el-dialog :visible.sync="batchDelFlag" :title="dataTitle">
                <el-form label-width="100px">
                    <el-form-item label="提示">
                        确定批量删除？
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

export default {
    name: "demoView",
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
            name: "demoView",
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
            tableSelection: [],
            detailFlag: false,
            addFlag: false,
            delFlag: false,
            updateFlag: false,
            batchDelFlag: false,
            dataOne: {},
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
        // 列表选择
        handleSelectionChange(val) {
            this.tableSelection = val;
        },
        // 查看详情
        openDetail(row, column, event) {
            this.dataOne = {}
            this.dataTitle = "详情"
            this.detailFlag = true
            let p = {
                id: row.tableId
            }
            getManageUserById(p).then((res) => {
                this.dataOne = res
            }).catch((err) => {
                this.detailFlag = false
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


            this.addFlag = false


        },
        // 打开编辑
        openUpdate(scope) {
            this.dataOne = {

            }
            this.dataTitle = "编辑"
            this.updateFlag = true
            let p = {
                id: scope.row.tableId
            }
            getManageUserById(p).then((res) => {
                this.dataOne = res

            }).catch((err) => {
                alert(err)
            });


        },
        // 保存编辑
        update() {


            this.updateFlag = false


        },
        // 打开删除
        openDel(scope) {
            this.dataOne = {

            }
            this.dataTitle = "删除"
            this.delFlag = true
            thid.dataOne = scope.row
        },

        // 保存删除
        del() {
            this.delFlag = false
        },
        // 初始化
        init() {

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