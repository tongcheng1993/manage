<template>
    <div class="view_div">
        <div>
            <el-button>发送邮件</el-button>
        </div>
        <div>
            <el-dialog :visible.sync="dialog_1">
                <el-form>
                    <el-row>
                        <el-col>
                            收件人：
                        </el-col>
                        <el-col>
                            标题：
                        </el-col>
                        <el-col>
                            收件人：
                        </el-col>
                        <el-col>
                            收件人：
                        </el-col>
                    </el-row>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "emailRecordList",
        // 引用组件
        components: {},
        // 上级组件向本页面传递的参数
        props: {},
        data() {
            return {
                name: "emailRecordList",
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
                dialog_1: false,
                dataDetailFlag: false,
                dataDetailTitle: "",
                dataDetailFormTop: "right",
                dataDetail: {},
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
                console.log(`每页  条`);
                this.dataQo.size = val;
                this.queryPageData()
            },
            handleCurrentChange(val) {
                console.log(`当前页: `);
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
                this.queryPageData()
            },
            // 查询数据
            queryPageData() {
                let parameter = this.dataQo;
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