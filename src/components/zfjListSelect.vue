<template>
    <div>
        <el-select v-model="defaultSelectListIn" filterable  multiple placeholder="请选择" value="defaultSelectListIn">
            <el-option v-for="item in selectListIn"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">a

            </el-option>
        </el-select>
    </div>
</template>

<script>
    export default {
        name: "zfjSelectList",
        // 引用组件
        components: {},
        // 上级组件向本页面传递的参数
        props: {
            selectList: {
                type: Array,
                required: true,
                default: []
            },
            defaultSelectList: {
                type: Array,
                required: true,
                default: []
            }
        },
        data() {
            return {
                name: "zfjSelectList",
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
                selectListIn: [],
                defaultSelectListIn: [],
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
                    this.selectListIn = newValue
                },
                deep: true,
            },
            defaultSelectList: {
                handler(newValue, oldValue) {
                    console.log('new', newValue)
                    console.log('old', oldValue)
                    this.defaultSelectListIn = newValue
                },
                deep: true,
            },
        },

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
            },

        },
        mounted() {

        },
        beforeDestroy() {
        },
    };

</script>

<style scoped>

</style>