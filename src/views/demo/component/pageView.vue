<template>
    <div class="view_div">
        <div>
            <el-form>
                <el-form-item label=" 收件人：">
                    <el-input v-model="dataQo.addrTo"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="queryPageData()">查询</el-button>
                    <el-button>重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-table :data="page.records" border>
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="addrTo" label="收件人" width="180" align="center"></el-table-column>
            </el-table>
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
    </div>
</template>

<script>
    export default {
        name: "pageView",
        // 引用组件
        components: {},
        // 上级组件向本页面传递的参数
        props: {},
        data() {
            return {
                name: "pageView",
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
                    addrTo: "",
                },
            };
        },
        // 本页面计算属性
        computed: {},
        // 本页面监听属性
        watch: {},

        methods: {

            // 初始化数据
            init() {

            },

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