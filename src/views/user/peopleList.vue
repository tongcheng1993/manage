<template>
    <div class="view_div">
        {{name}}
        <div
                id="myChart"
                ref="myChart"
                :style="{ width: '300px', height: '300px' }"
        ></div>
    </div>
</template>

<script>
    import "../../../node_modules/echarts/map/js/china";
    export default {
        name: "peopleList",
        // 引用组件
        components: {},
        // 上级组件向本页面传递的参数
        props: {},
        data() {
            return {
                name: "peopleList",
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
                this.initEcharts();
                this.queryPageData()
            },
            // 查询数据
            queryPageData() {
                let parameter = this.dataQo;
            },
            initEcharts() {
                let myChart = echarts.init(this.$refs.myChart);

                // 绘制图表
                myChart.setOption({
                    // 进行相关配置
                    backgroundColor: "#02AFDB",
                    tooltip: {}, // 鼠标移到图里面的浮动提示框
                    dataRange: {
                        show: false,
                        min: 0,
                        max: 1000,
                        text: ["High", "Low"],
                        realtime: true,
                        calculable: true,
                        color: ["orangered", "yellow", "lightskyblue"],
                    },
                    geo: {
                        // 这个是重点配置区
                        map: "china", // 表示中国地图
                        roam: true,
                        label: {
                            normal: {
                                show: true, // 是否显示对应地名
                                textStyle: {
                                    color: "rgba(0,0,0,0.4)",
                                },
                            },
                        },
                        itemStyle: {
                            normal: {
                                borderColor: "rgba(0, 0, 0, 0.2)",
                            },
                            emphasis: {
                                areaColor: null,
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                shadowBlur: 20,
                                borderWidth: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)",
                            },
                        },
                    },
                    series: [
                        {
                            type: "scatter",
                            coordinateSystem: "geo", // 对应上方配置
                        },
                        {
                            name: "启动次数", // 浮动框的标题
                            type: "map",
                            geoIndex: 0,
                            data: [
                                {
                                    name: "北京",
                                    value: 599,
                                },
                                {
                                    name: "上海",
                                    value: 142,
                                },
                                {
                                    name: "黑龙江",
                                    value: 44,
                                },
                                {
                                    name: "深圳",
                                    value: 92,
                                },
                                {
                                    name: "湖北",
                                    value: 810,
                                },
                                {
                                    name: "四川",
                                    value: 453,
                                },
                            ],
                        },
                    ],
                });
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