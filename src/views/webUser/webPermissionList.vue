<template>
    <div class="view_div">
        <!--        搜索-->
        <div>

        </div>
        <!--        新增删除-->
        <div>
            <el-row>
                <el-col :span="6">
                    <el-button type="primary" @click="openSavePermissionForm()">新增</el-button>
                </el-col>
            </el-row>
        </div>
        <!--        列表内容-->
        <div>
            <el-table :data="page.records">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-dropdown>
                            <el-button type="primary">
                                更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="">编辑</el-dropdown-item>
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
        <!--        新增/修改/详情 -->
        <div>
            <el-dialog :visible.sync="permissionFormFlag" :title="formTitle">
                <el-form :model="permissionForm">
                    <el-form-item label="角色名称">
                        <el-input v-model="permissionForm.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="唯一编码">
                        <el-input v-model="permissionForm.codeSys" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="唯一编码">
                        <el-input v-model="permissionForm.codeModule" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="唯一编码">
                        <el-input v-model="permissionForm.code" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述">
                        <el-input
                                v-model="permissionForm.description"
                                autocomplete="off"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="formFlag = false">取 消</el-button>
                    <el-button type="primary" @click="savePermission()">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>

    import {
        savePermission
    } from "../../api/userApi";

    export default {
        name: "permissionList",
        // 引用组件
        components: {},
        // 上级组件向本页面传递的参数
        props: {},
        data() {
            return {
                name: "permissionList",
                page: {
                    total: 0,
                    current: 0,
                    size: 10,
                    orders: [],
                    records: [],
                },
                permissionFormFlag : false,
                permissionForm: {},

            };
        },
        // 本页面计算属性
        computed: {},
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
            openSavePermissionForm() {
                this.permissionFormFlag = true;
            },
            savePermission() {
                let parameter = this.permissionForm
                savePermission(parameter).then((res)=>{
                    this.permissionFormFlag = false
                }).catch()
            },
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