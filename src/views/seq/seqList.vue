<template>
    <div>
        <!--        条件查询-->
        <div>
            <el-row></el-row>
        </div>
        <!--        新增删除-->
        <div>

            <el-button @click=""> 新增</el-button>
            <el-button> 删除</el-button>

        </div>
        <!--        列表内容-->
        <div>
            <el-table :data="page.records">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-dropdown>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="openDicChildListDrawer(scope)">子字典列表</el-dropdown-item>
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
        <!--        单个详情-->
        <div>
            <el-dialog :visible.sync="dataDetailFlag">
                <el-form>
                    <el-row>
                        <el-col></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-button @click="">
                                取消
                            </el-button>
                            <el-button @click="">
                                确认
                            </el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {queryPageSeq} from '../../api/seqApi'

    export default {
        name: "demoList",
        // 引用组件
        components: {},
        // 上级组件向本页面传递的参数
        props: {},
        // 本页面计算属性
        computed: {},
        // 本页面监听属性
        watch: {},
        data() {
            return {
                name: "demoList",
                page: {
                    total: 0,
                    current: 0,
                    size: 10,
                    orders: [],
                    records: [],
                },
                dataQo: {},
                dataList: [],
                dataDetailFlag: false,
                dataDetail: {},
            };
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.page.size = val;
                this.queryPageData()

            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.page.current = val;
                this.queryPageData()
            },
            // 跳转页面
            async toNextPage(to) {
                await this.$router.push({
                    path: to,
                    params: {},
                });
            },
            // 页面初始化数据
            init() {
                this.queryPageData()
            },

            //查询列表方法
            queryPageData() {
                let parameter = this.dataQo
                parameter.page = this.page
                queryPageSeq(parameter).then((res) => {
                    this.page = res
                }).catch((error) => {

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