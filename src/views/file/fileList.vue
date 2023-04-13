<template>
    <div>
        <!--        搜索-->
        <div>
            <el-form>
                <el-row>
                    <el-col>
                        <el-form-item>
                            <el-input v-model="dataQo.fileName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-button type="primary" @click="">查询</el-button>
                        <el-button type="primary" @click="">重置</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!--        新增删除-->
        <div>
            <el-button type="primary" @click="">批量删除</el-button>
        </div>
        <!--        列表内容-->
        <div>
            <el-table :data="page.records">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="fileName" label="文件名称"></el-table-column>
                <el-table-column prop="fileByte" label="文件大小"></el-table-column>
                <el-table-column prop="fileUrl" label="文件地址"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-dropdown>
                            <el-button type="primary">
                                更多<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="downloadFileThis(scope)">下载</el-dropdown-item>
                                <el-dropdown-item @click.native="delFile(scope)">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
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
    import {downloadFileTrue, queryPageFile, delFile} from "../../api/fileApi";

    export default {
        name: "fileList",
        components: {},
        props: {},
        methods: {
            async toNextPage(to) {
                await this.$router.push({
                    path: to,
                    params: {},
                });
            },
            init() {
                this.queryPageFile();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(
                    `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
                    files.length + fileList.length
                        } 个文件`
                );
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.dataQo.size = val;
                this.queryPageFile();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.dataQo.current = val;
                this.queryPageFile();
            },
            queryPageFile() {
                let parameter = this.dataQo;
                queryPageFile(parameter)
                    .then((res) => {
                        this.page = res;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            downloadFileThis(scope) {
                downloadFileTrue(scope.row.id)
            },
            delFile(scope) {
                let parameter = {
                    id: scope.row.id,
                };
                delFile(parameter).then((res) => {
                    if (res) {
                        this.queryPageFile();
                    }
                }).catch((error) => {
                    console.log(error)
                })
            },
        },
        computed: {
            uploadHeader() {
                return {"Tc-Token": this.$store.state.token}
            }
        },
        watch: {
            page: {
                handler(newValue, oldValue) {
                    console.log(newValue);
                    console.log(oldValue);
                },
                deep: true,
            },
        },
        data() {
            return {
                name: "fileList",
                page: {
                    total: 0,
                    current: 0,
                    size: 10,
                    orders: [],
                },
                dataQo: {
                    current: 0,
                    size: 10,
                    orders: [],
                    fileName: "",
                },
                fileList: [],
                dialogFlag: false,
            };
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