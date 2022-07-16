<template>
    <div>

        <el-row>
            <el-col :span="12">
                <div></div>
                <div class="tree_left">
                    <el-tree :data="areaTree" :props="defaultProps" @node-click="handleNodeClick ">

                    </el-tree>
                </div>
            </el-col>
            <el-col :span="12">
                <div>
                    <el-button @click="openAddAreaDialog()">新增</el-button>
                    <el-button>编辑</el-button>
                    <el-button>增加下级</el-button>
                </div>
                <div>
                    <el-form v-model="areaDetail">
                        <el-row>
                            <el-col :span="6">
                                <el-form-item label="区域类型">
                                    <el-select v-model="areaDetail.type" placeholder="请选择" clearable filterable>
                                        <el-option
                                                v-for="item in areaType"
                                                :key="item.code"
                                                :label="item.value"
                                                :value="item.code"
                                                :disabled="item.disabled">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="名称">
                                    <el-input v-model="areaDetail.name"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="全称">
                                    <el-input v-model="areaDetail.realName"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="编码">
                                    <el-input v-model="areaDetail.code"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </el-col>
        </el-row>

    </div>

</template>

<script>
    import {saveArea, queryPageArea, queryListArea} from '../../api/areaApi'
    import {createTree} from "../../util/treeUtil";

    export default {
        name: "areeTree",
        // 引用组件
        components: {},
        // 上级组件向本页面传递的参数
        props: {},
        // 本页面计算属性
        computed: {
            areaType() {
                return this.$store.state.dicStore.dic["area_type"]
            }
        },
        // 本页面监听属性
        watch: {},
        data() {
            return {
                name: "areaList",
                defaultProps: {
                    children: "children",
                    label: "name",
                },
                areaQo: {},
                areaTree: [],
                areaDetail: {
                    name: "",
                    realName: "",
                    code: "",
                },


            };
        },
        methods: {
            handleNodeClick(data) {
                console.log(data);
                this.areaDetail = data
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
                this.$store.dispatch("dicStore/setDicItemList", {code: "area_type"})
                this.queryTreeArea()

            },
            queryTreeArea() {
                let parameter = this.areaQo
                queryListArea(parameter).then((res) => {
                    let parent = {
                        id: '0',
                        path: '/',
                        name: '世界',
                        component: '/layout/container',
                        children: []
                    }
                    this.areaTree = createTree(res, parent).children
                })
            },

        },
        created() {

        },
        mounted() {
            this.init();
        },

        beforeDestroy() {
        },
    };
</script>

<style scoped>
    .tree_left {
        width: 50%;
        height: 500px;
    }
</style>