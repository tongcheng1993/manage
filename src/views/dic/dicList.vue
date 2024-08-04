<template>
    <div class="view_div">

        <div>
            <el-form v-model="page" label-width="100px">
                <el-form-item label="名称">
                    <el-input v-model="page.name"></el-input>
                </el-form-item>
                <el-form-item label="操作">
                    <el-button @click="queryPageData">查询</el-button>
                    <el-button @click="resetQuery">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--        新增删除-->
        <div>
            <el-row>
                <el-col>
                    <el-button @click="openAdd">新增</el-button>
                    <el-button @click="">批量删除</el-button>
                </el-col>
            </el-row>
        </div>
        <!--        列表内容-->
        <div>
            <el-table :data="page.records" v-loading="tableLoading" height="250" @row-click="openDetail">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="dicName" label="名称"></el-table-column>
                <el-table-column prop="dicCode" label="唯一编码"></el-table-column>
                <el-table-column prop="dicDescription" label="角色描述"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-dropdown>
                            <el-button type="primary">
                                更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="openUpdate(scope)">编辑</el-dropdown-item>
                                <el-dropdown-item @click.native="openDicItemList(scope)">子字典列表</el-dropdown-item>
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
        <div v-if="detailFlag">
            <el-dialog :visible.sync="detailFlag" :title="dataTitle">
                <el-form label-width="100px">
                    <el-form-item label="名称">
                        <el-input v-model="dataOne.dicName"></el-input>
                    </el-form-item>
                    <el-form-item label="唯一编码">
                        <el-input v-model="dataOne.dicCode"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述">
                        <el-input v-model="dataOne.dicDescription"></el-input>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
        <div v-if="addFlag">
            <el-dialog :visible.sync="addFlag" :title="dataTitle">
                <el-form label-width="100px">
                    <el-form-item label="名称">
                        <el-input v-model="dataOne.dicName"></el-input>
                    </el-form-item>
                    <el-form-item label="唯一编码">
                        <el-input v-model="dataOne.dicCode"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述">
                        <el-input v-model="dataOne.dicDescription"></el-input>
                    </el-form-item>
                    <el-form-item label="操作">
                        <el-button-group>
                            <el-button @click="add">保存</el-button>
                            <el-button @click="addFlag = false">取消</el-button>
                        </el-button-group>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>

        <div v-if="updateFlag">
            <el-dialog :visible.sync="updateFlag" :title="dataTitle">
                <el-form label-width="100px">
                    <el-form-item label="名称">
                        <el-input v-model="dataOne.dicName"></el-input>
                    </el-form-item>
                    <el-form-item label="唯一编码">
                        <el-input v-model="dataOne.dicCode"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述">
                        <el-input v-model="dataOne.dicDescription"></el-input>
                    </el-form-item>
                    <el-form-item label="操作">
                        <el-button-group>
                            <el-button @click="update">保存</el-button>
                            <el-button @click="updateFlag = false">取消</el-button>
                        </el-button-group>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
        <div v-if="delFlag">
            <el-dialog :visible.sync="delFlag" :title="dataTitle">
                <el-form label-width="100px">
                    <el-form-item label="提示">
                        确定删除？
                    </el-form-item>
                    <el-form-item label="操作">
                        <el-button-group>
                            <el-button @click="del">确定</el-button>
                            <el-button @click="delFlag = false">取消</el-button>
                        </el-button-group>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>

        <div v-if="dicItemListFlag">
            <el-dialog :visible.sync="dicItemListFlag" :title="dataTitle">
                <el-table :data="dicItemList" v-loading="dicItemListLoading" height="250">
                    <el-table-column prop="itemCode" label="编码">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.itemCode"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="itemValue" label="内容">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.itemValue"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="showFlag" label="是否展示">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.showFlag" active-color="#13ce66"
                                inactive-color="#ff4949"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="checkFlag" label="是否可以选择">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.checkFlag" active-color="#13ce66"
                                inactive-color="#ff4949"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column>
                        <template slot="header">
                            <el-button @click="addRow">+</el-button>
                        </template>
                        <template slot-scope="scope">
                            <el-button-group>
                                <el-button v-if="scope.row.tableId" @click="delDicItem(scope)">删除</el-button>
                                <el-button v-else @click="addDicItem(scope)">保存</el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
        </div>


    </div>
</template>

<script>
import { addDic, queryPageDic, getDicById, addDicItem, queryListDicItem } from "../../api/dicApi";

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
            tableLoading: false,
            detailFlag: false,
            addFlag: false,
            delFlag: false,
            updateFlag: false,
            dataOne: {},
            dataTitle: "",

            dicItemListFlag: false,
            dicItemListLoading: false,
            dicItemList: [],

        };
    },
    methods: {
        init() {
            this.queryPageData();
        },
        async toNextPage(to) {
            await this.$router.push({
                path: to,
                params: {},
            });
        },
        handleSizeChange(val) {
            this.page.size = val;
            this.queryPageData();
        },
        handleCurrentChange(val) {
            this.page.current = val;
            this.queryPageData();
        },
        queryPageData() {
            let parameter = this.page;
            queryPageDic(parameter).then((res) => {
                this.page.total = res.total
                this.page.records = res.records
                this.tableLoading = false
            }).catch((error) => {

            });
        },
        // 重置查询条件
        resetQuery() {
            this.page = {
                total: 0,
                current: 0,
                size: 10,
                orders: [],
                records: [],
            }
            this.queryPageData()
        },
        // 查看详情
        openDetail(row, column, event) {
            this.dataOne = {}
            this.dataTitle = "详情"
            let p = {
                tableId: row.tableId
            }
            getDicById(p).then((res) => {
                this.dataOne = res
                this.detailFlag = true
            }).catch((err) => {

            });
        },
        // 打开新增
        openAdd() {
            this.dataOne = {}
            this.dataTitle = "新增"
            this.addFlag = true
        },
        // 保存新增
        add() {
            let parameter = this.dataOne
            addDic(parameter).then((res) => {
                if (res) {
                    this.queryPageData();
                    this.addFlag = false
                }
            }).catch((err) => {

            })
        },
        // 打开编辑
        openUpdate(scope) {
            debugger
            this.dataOne = {}
            this.dataTitle = "编辑"
            let p = {
                tableId: scope.row.tableId
            }
            getDicById(p).then((res) => {
                this.dataOne = res
                this.updateFlag = true
            }).catch((err) => {

            });
        },
        refreshDicItemList() {
            this.dicItemListLoading = true
            let p = {
                dicId: this.dataOne.tableId
            }
            queryListDicItem(p).then((res) => {
                this.dicItemListLoading = false
                this.dicItemList = res

                this.dicItemListFlag = true
            }).catch((err) => {
                this.dicItemListLoading = false
            })
        },
        openDicItemList(scope) {
            this.dataOne = {}
            this.dataOne = scope.row
            this.refreshDicItemList()
        },

        addRow() {
            this.dicItemList.unshift({
                dicId: this.dataOne.tableId,
                showFlag: true,
                checkFlag: true,
            })
        },


        addDicItem(scope) {

            addDicItem(scope.row).then((res) => {
                this.refreshDicItemList()
            }).catch((err) => {

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

<style scoped></style>