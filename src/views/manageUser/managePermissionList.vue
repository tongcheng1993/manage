<template>
    <div class="view_div">
        <div>
            <el-row>
                <el-col>
                    <el-button-group>
                        <el-button>查询</el-button>
                        <el-button>清空</el-button>
                    </el-button-group>
                </el-col>
            </el-row>
        </div>
        <div>
            <el-row>
                <el-col>
                    <el-button-group>
                        <el-button @click="openAddDataDetail()">新增</el-button>
                        <el-button>批量删除</el-button>
                    </el-button-group>
                </el-col>
            </el-row>
        </div>
        <div>
            <el-table :data="page.records">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="codeSys" label="系统编码"></el-table-column>
                <el-table-column prop="codeModule" label="模块编码"></el-table-column>
                <el-table-column prop="codeMethod" label="方法编码"></el-table-column>
                <el-table-column prop="description" label="描述"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="detailRole(scope)">详情</el-button>
                        <el-dropdown>
                            <el-button type="primary">
                                更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="openEditDataDetail(scope)">编辑</el-dropdown-item>
                                <el-dropdown-item @click.native="">删除</el-dropdown-item>
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
        <div>
            <el-dialog :visible.sync="dataDetailFlag">
                <el-form label-width="100px">
                    <el-form-item label="名称">
                        <el-input v-model="dataDetail.name"></el-input>
                    </el-form-item>
                    <el-form-item label="系统编码">
                        <el-input v-model="dataDetail.codeSys"></el-input>
                    </el-form-item>
                    <el-form-item label="模块编码">
                        <el-input v-model="dataDetail.codeModule"></el-input>
                    </el-form-item>
                    <el-form-item label="权限编码">
                        <el-input v-model="dataDetail.code"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input v-model="dataDetail.description"></el-input>
                    </el-form-item>
                    <el-form-item label="操作">
                        <el-button-group>
                            <el-button @click="addManagePermission()">
                                新增
                            </el-button>
                            <el-button>
                                修改
                            </el-button>
                            <el-button>
                                返回
                            </el-button>
                        </el-button-group>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { queryPageManagePermission, addManagePermission } from '../../api/manageUserApi'

export default {
    name: "managePermissionList",
    // 引用组件
    components: {},
    // 上级组件向本页面传递的参数
    props: {},
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
            dataQo: {
                current: 0,
                size: 10,
                orders: [],
            },

            dataDetailFlag: false,
            dataDetailTitle: "",
            dataDetailFormTop: "right",
            dataDetail: {
                name: "",
                codeSys: "",
                codeModule: "",
                code: "",
                description: "",
            },
        };
    },
    // 本页面计算属性
    computed: {},
    // 本页面监听属性
    watch: {
        page: {
            handler(newValue, oldValue) {
                console.log('new', newValue)
                console.log('old', oldValue)
            },
            deep: true,
        },
    },

    methods: {
        handleSizeChange(val) {
            console.log("每页  " + val + "条");
            this.dataQo.size = val;
            this.queryPageData()
        },
        handleCurrentChange(val) {
            console.log(`当前页: ` + val);
            this.dataQo.current = val;
            this.queryPageData()
        },
        // 跳转页面
        async toNextPage(to) {
            let parameter = {
                path: to,
                params: {},
            }
            await this.$router.push(parameter);
        },
        // 初始化数据
        init() {
            let param = {}
            queryPageManagePermission(param).then((res) => {
                this.page = res
            }).catch((err) => {
                console.log(err)
            })
        },
        // 查询数据
        queryPageData() {
            let parameter = this.dataQo;
            queryPageManagePermission(parameter).then((res) => {
                this.page = res
            }).catch((err) => {
                console.log(err)
            })
        },
        addManagePermission() {
            let parameter = this.dataDetail;
            addManagePermission(parameter).then((res) => {
                if (res && res > 0) {
                    this.dataDetail = {}
                    this.queryPageData()
                    this.dataDetailFlag = false
                }
            }).catch((err) => {

            })
        },
        openAddDataDetail() {
            this.dataDetail = {}
            this.dataDetailFlag = true
        },
        openEditDataDetail(scope) {
            this.dataDetailFlag = true
            this.dataDetail = {}
        }

    },
    mounted() {
        this.init();
    },
    beforeDestroy() {
    },
};

</script>

<style scoped></style>
