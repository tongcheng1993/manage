<template>
    <div class="view_div">
        <div>
            <el-form v-model="dataQo">
                <el-row>
                    <el-col :span="6">
                        <el-input v-model="dataQo.name"></el-input>
                    </el-col>
                    <el-col :span="6">

                    </el-col>
                    <el-col :span="6">

                    </el-col>
                    <el-col :span="6">

                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-button>查询</el-button>
                    </el-col>
                </el-row>
            </el-form>
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
                                <el-dropdown-item @click.native="">授予角色</el-dropdown-item>
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
            <el-dialog :visible.sync="dialog_1">

            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {queryPageUser} from '../../api/manageUserApi'

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
                },

                dataDetailFlag: false,
                dataDetailTitle: "",
                dataDetailFormTop: "right",
                dataDetail: {},
                dialog_1:false,
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
            queryPageUser() {
                let parameter = this.dataQo
                queryPageUser(parameter).then((res) => {
                    this.page = res
                }).catch((err) => {

                })
            },


        },
        created() {

        },
        mounted() {
            this.queryPageUser();
        },
        beforeDestory() {

        }
    };
</script>

<style>
</style>