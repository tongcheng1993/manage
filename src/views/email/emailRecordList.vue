<template>
    <div class="view_div">
        <div>
            <el-form>
                <el-row>
                    <el-col>
                        收件人：
                        <el-input v-model="dataQo.addrTo"></el-input>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-button>查询</el-button>
                        <el-button @click="queryPageData()">重置</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div>
            <el-button @click="openDialog1()">发送邮件</el-button>
        </div>
        <div>
            <el-table :data="page.records">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="addrTo" label="收件人"></el-table-column>
                <el-table-column prop="subject" label="标题"></el-table-column>
                <el-table-column prop="content" label="邮件内容"></el-table-column>
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
            <el-dialog :visible.sync="dialog_1">
                <el-form>
                    <el-row>
                        <el-col>
                            收件人：
                            <el-input v-model="sendEmailForm.to"></el-input>
                        </el-col>
                        <el-col>
                            标题：
                            <el-input v-model="sendEmailForm.subject"></el-input>
                        </el-col>
                        <el-col>
                            内容：
                            <el-input v-model="sendEmailForm.content"></el-input>
                        </el-col>
                        <el-col>
                            附件：
                            <el-upload
                                    class="upload-demo"
                                    action="/api/sys/file/uploadFile"
                                    :headers="uploadHeader"
                                    :on-change="handleChange"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :on-success="handleSuccess"
                                    :before-remove="beforeRemove"
                                    multiple
                                    :limit="3"
                                    :on-exceed="handleExceed"
                                    :file-list="fileList"
                            >
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">

                                </div>
                            </el-upload>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-button @click="sendEmail()">发送</el-button>
                            <el-button @click="closeDialog_1()">关闭</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {sendEmail, queryPageEmailRecord} from '../../api/emailApi.js'

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
                    addrTo: "",
                },
                dialog_1: false,
                dataDetailFlag: false,
                dataDetailTitle: "",
                dataDetailFormTop: "right",
                dataDetail: {},
                fileList: [],
                sendEmailForm: {
                    to: "",
                    subject: "",
                    content: "",
                    fileIdList: [],
                },
            };
        },
        // 本页面计算属性
        computed: {
            uploadHeader() {
                return {"Tc-Token": this.$store.state.token}
            }
        },
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
            handleChange(file, fileList) {
                console.log(fileList)
                this.fileList = fileList.slice(-3);
            },
            handlePreview(file) {
                console.log(file);
                console.log('handlePreview');
            },
            handleSuccess(response, file, fileList) {
                console.log(response.result)
                file.id = response.result
                console.log(file)
                console.log(fileList)
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`);
            },
            handleExceed(files, fileList) {
                this.$message.warning(
                    `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
                    files.length + fileList.length
                        } 个文件`
                );
            },
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
                queryPageEmailRecord(parameter).then((res) => {
                    this.page = res

                }).catch()
            },
            openDialog1() {
                this.sendEmailForm={}
                this.dialog_1 = true;
            },
            sendEmail() {
                console.log(this.fileList)
                if (this.fileList) {
                    this.sendEmailForm.fileIdList = []
                    this.fileList.forEach((val) => {
                        this.sendEmailForm.fileIdList.push(val.id)
                    })
                }
                let parameter = this.sendEmailForm;
                sendEmail(parameter).then((res) => {
                    if (res) {
                        this.sendEmailForm = {};
                        this.dialog_1 = false;
                        this.queryPageData();
                    }
                }).catch()
            },
            closeDialog_1(){
                this.dialog_1 = false
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