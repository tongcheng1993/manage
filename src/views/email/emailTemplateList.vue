<template>
    <div class="view_div">
        <div>
            <el-button @click="openDataDetailFlag()">增加邮件模板</el-button>
        </div>
        <div>
            <el-table :data="page.records" border>
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="name" label="模板名称"></el-table-column>
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
        <div>
            <el-dialog :visible.sync="dataDetailFlag">
                <el-form>
                    <el-form-item>
                        <el-input v-model="dataDetail.name">

                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="dataDetail.content" type="textarea">

                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="saveEmailTemplate">
                            保存
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {saveEmailTemplate, queryPageEmailTemplate} from '../../api/emailApi.js'

    export default {
        name: "emailTemplateList",
        // 引用组件
        components: {},
        // 上级组件向本页面传递的参数
        props: {},
        data() {
            return {
                name: "emailTemplateList",
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
                    content: ""
                },
            };
        },
        // 本页面计算属性
        computed: {},
        // 本页面监听属性
        watch: {},

        methods: {
            handleSizeChange(val) {
                this.dataQo.size = val;
                this.queryPageData()
            },
            handleCurrentChange(val) {
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
                queryPageEmailTemplate(parameter)
                    .then((res) => {
                        this.page = res
                    }).catch((error) => {

                })
            },

            openDataDetailFlag() {
                this.dataDetail = {}
                this.dataDetailFlag = true;
            },

            saveEmailTemplate() {
                let parameter = this.dataDetail;
                saveEmailTemplate(parameter)
                    .then((res) => {
                        if (res) {
                            this.dataDetailFlag = false;
                        }
                    }).catch()
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