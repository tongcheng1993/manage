<template>
    <div class="view_div">
        <div>
            <el-form>

                <el-form-item>
                    <el-button @click="queryPageData()">查询</el-button>
                    <el-button>重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-table :data="page.records" >
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="addrTo" label="收件人" ></el-table-column>
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
        name: "zfjBaseTable",
        data() {
            return {
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
            }
        }
    }
</script>

<style scoped>

</style>