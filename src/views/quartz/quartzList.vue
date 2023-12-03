<template>
    <div class="view_div">
        <!--        新增删除-->
        <div>
            <el-button @click="openAddDialog()"> 新增</el-button>
            <el-button @click="syncQuartzList()"> 同步quartz列表</el-button>
        </div>
        <!--        列表内容-->
        <div>
            <el-table :data="page.records">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="description" label="描述"></el-table-column>
                <el-table-column prop="cronExpression" label="cron表达式"></el-table-column>
                <el-table-column prop="status" label="状态" :formatter="changeStatus"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-dropdown>
                            <el-button type="primary">
                                更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="openEditDialog(scope)">编辑</el-dropdown-item>
                                <el-dropdown-item @click.native="">启动</el-dropdown-item>
                                <el-dropdown-item @click.native="">停止</el-dropdown-item>
                                <el-dropdown-item @click.native="">运行历史</el-dropdown-item>
                                <el-dropdown-item @click.native="delQuartzRecord(scope)">删除</el-dropdown-item>
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
        <!--        详情-->
        <div>
            <el-dialog :visible.sync="dataDetailFlag">
                <el-form :model="dataDetail" label-width="100px">
                    <el-form-item label="名称">
                        <el-input v-model="dataDetail.name"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input v-model="dataDetail.description"></el-input>
                    </el-form-item>
                    <el-form-item label="类名">
                        <el-input v-model="dataDetail.jobClassName"></el-input>
                    </el-form-item>
                    <el-form-item label="类团组">
                        <el-input v-model="dataDetail.jobGroupName"></el-input>
                    </el-form-item>
                    <el-form-item label="cron表达式">
                        <el-input v-model="dataDetail.cronExpression"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-input v-model="dataDetail.status"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button-group>
                            <el-button @click="saveQuartzRecord()"> 保存</el-button>
                            <el-button @click=""> 取消</el-button>
                        </el-button-group>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>

    </div>
</template>

<script>
    import {queryPageQuartzRecord, saveQuartzRecord, delQuartzRecord, syncQuartzList} from '../../api/quartzApi'

    export default {
        name: "quartzList",
        // 引用组件
        components: {},
        // 上级组件向本页面传递的参数
        props: {},
        data() {
            return {
                name: "quartzList",
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
                    id: "",
                    name: "",
                    description: "",
                    jobClassName: "",
                    jobGroupName: "",
                    cronExpression: "",
                    status: "",

                },
            };
        },
        // 本页面计算属性
        computed: {
            startStopType() {
                // return this.$store.getters['dicStore/getDic']['start_stop_type']
                return [
                    {
                        code:'start_stop_type_0',
                        value:"未知"
                     },
                    {
                        code:'start_stop_type_1',
                        value:"开启"
                    },
                    {
                        code:'start_stop_type_2',
                        value:"停止"
                    },
                ]
            }
        },
        // 本页面监听属性
        watch: {},

        methods: {
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
                this.queryPageData()
            },
            changeStatus(row) {
                for (let i = 0; i < this.startStopType.length; i++) {
                    if (row.status === this.startStopType[i].code) {
                        return this.startStopType[i].value
                    }
                }
                return this.startStopType[0].value;
            },
            // 查询数据
            queryPageData() {
                let parameter = this.dataQo;
                queryPageQuartzRecord(parameter)
                    .then((res) => {
                        this.page = res
                    }).catch((error) => {
                    console.log(error)
                })
            },
            handleSizeChange(val) {
                this.dataQo.size = val;
                this.queryPageData()
            },
            handleCurrentChange(val) {
                this.dataQo.current = val;
                this.queryPageData()
            },
            openAddDialog() {
                this.dataDetail = {}
                this.dataDetailFlag = true;
            },
            openEditDialog(scope) {
                this.dataDetailFlag = true;
                console.log(scope.row)
                this.dataDetail = scope.row

            },
            saveQuartzRecord() {
                let parameter = this.dataDetail
                saveQuartzRecord(parameter).then((res) => {
                    if (res) {
                        this.queryPageData()
                        this.dataDetail = {}
                        this.dataDetailFlag = false;
                    }
                })
            },
            delQuartzRecord(scope) {
                let parameter = {
                    id: scope.row.id
                }
                delQuartzRecord(parameter).then((res) => {
                    if (res) {
                        this.queryPageData()
                    }
                })
            },
            syncQuartzList() {
                let parameter = {}
                syncQuartzList(parameter).then((res) => {
                    if (res) {
                        this.queryPageData()
                    }
                })
            }
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