<template>
    <div>
        <!--        条件查询-->
        <div>
            <el-form v-model="dicQo" :label-position="searchFormTop">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="名称">
                            <el-input v-model="dicQo.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-button @click="">
                            查询
                        </el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!--        新增删除-->
        <div>
            <el-row>
                <el-col>
                    <el-button @click="openDicDetailDialog()"> 新增</el-button>
                    <el-button> 删除</el-button>
                </el-col>
            </el-row>
        </div>
        <!--        列表内容-->
        <div>
            <el-table :data="page.records">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="code" label="唯一编码"></el-table-column>
                <el-table-column prop="description" label="角色描述"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="editDicDetailDialog(scope)"
                        >编辑
                        </el-button
                        >
                        <el-dropdown>
                            <el-button type="primary">
                                更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="openDicChildListDrawer(scope)"
                                >子字典列表
                                </el-dropdown-item
                                >
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
        <div>
            <el-dialog :visible.sync="dicDetailDialogFlag">
                <el-form :model="dicDetail">
                    <el-row>
                        <el-col span="6">
                            <el-form-item>
                                <el-input v-model="dicDetail.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col span="6">
                            <el-form-item>
                                <el-input v-model="dicDetail.code"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col span="6">
                            <el-form-item>
                                <el-input v-model="dicDetail.description"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-button @click="closeDicDetailDialog()"> 取消</el-button>
                            <el-button @click="saveDic()"> 保存</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </el-dialog>
        </div>
        <div>
            <el-drawer :visible.sync="dicChildListFlag">
                <div>
                    <el-row>
                        <el-col></el-col>
                        <el-col>
                            <el-button @click="openDicItemDetailDialog()">新增</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div>
                    <el-table :data="dicItemList">
                        <el-table-column type="selection"></el-table-column>
                        <el-table-column prop="code" label="编码"></el-table-column>
                        <el-table-column prop="value" label="名称"></el-table-column>
                    </el-table>
                </div>
            </el-drawer>
        </div>
        <div>
            <el-dialog :visible.sync="dicItemDetailDialogFlag">
                <el-form v-model="dicItemDetail">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="名称">
                                <el-input v-model="dicItemDetail.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="值">
                                <el-input v-model="dicItemDetail.value"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="是否展示">
                                <el-switch
                                        v-model="dicItemDetail.showFlag"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949">
                                </el-switch>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="是否不可选择">
                                <el-switch
                                        v-model="dicItemDetail.disabled"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949">
                                </el-switch>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6"></el-col>
                        <el-col :span="6"></el-col>
                        <el-col :span="6"></el-col>
                        <el-col :span="6">
                            <el-button @click="saveDicItem()">保存</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {saveDic, queryPageDic, saveDicItem, queryListDicItem} from "../../api/dicApi";

    export default {
        name: "dicList",
        components: {},
        props: {},
        computed: {},
        watch: {},
        data() {
            return {
                name: "dicList",
                page: {
                    total: 0,
                    current: 0,
                    size: 10,
                    orders: [],
                    records: [],
                },
                dicList: [],
                searchFormTop: "right",
                dicQo: {
                    current: 0,
                    size: 10,
                    orders: [],
                    name: "",
                    code: "",
                },
                dicDetailDialogFlag: false,
                dicDetail: {
                    id: "",
                    name: "",
                    code: "",
                    description: "",
                },
                dicChildListFlag: false,
                dicItemQo: {
                    id: "",
                    dicId: "",
                },
                dicItemList: [],
                dicItemDetailDialogFlag: false,
                dicItemDetail: {
                    id: "",
                    dicId: "",
                    name: "",
                    code: "",
                    value: "",
                    showFlag: true,
                    disabled: false,
                },
            };
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.dicQo.size = val;
                this.queryPageDic();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.dicQo.current = val;
                this.queryPageDic();
            },
            async toNextPage(to) {
                await this.$router.push({
                    path: to,
                    params: {},
                });
            },
            init() {
                this.queryPageDic();
            },
            queryPageDic() {
                let parameter = this.dicQo;
                queryPageDic(parameter)
                    .then((res) => {
                        this.page = res;
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            },
            // 打开字典类型详情
            openDicDetailDialog() {
                this.dicDetailDialogFlag = true;
            },
            editDicDetailDialog(scope) {
                this.dicDetailDialogFlag = true;
            },
            closeDicDetailDialog() {
                this.dicDetailDialogFlag = false;
            },
            saveDic() {
                let parameter = this.dicDetail;
                saveDic(parameter).then((res) => {
                    this.queryPageDic();
                    this.closeDicDetailDialog();
                });
            },
            openDicChildListDrawer(scope) {
                this.dicDetail.id = scope.row.id;
                this.dicItemQo.dicId = scope.row.id;
                this.queryListDicItem()
                this.dicChildListFlag = true;


            },
            queryListDicItem() {
                let parameter = this.dicItemQo
                console.log(parameter)
                queryListDicItem(parameter).then((res) => {
                    this.dicItemList = res
                });
            },
            openDicItemDetailDialog() {
                this.dicItemDetail.dicId = this.dicDetail.id
                this.dicItemDetailDialogFlag = true
            },
            saveDicItem() {
                let parameter = this.dicItemDetail
                saveDicItem(parameter).then((res) => {
                    let parameter = this.dicItemQo
                    console.log(parameter)
                    queryListDicItem(parameter).then((res) => {
                        this.dicItemList = res
                        this.dicItemDetailDialogFlag = false
                    });

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