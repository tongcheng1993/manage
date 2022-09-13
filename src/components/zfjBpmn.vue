<template>
    <div class="view_div">
        <div class="containers">
            <div class="canvas" ref="canvas" id="canvas"></div>
            <div id="js-properties-panel" class="panel"></div>
        </div>
    </div>
</template>

<script>

    import BpmnModeler from '../../node_modules/bpmn-js/lib/Modeler';

    import bpmnModdleDescriptor from 'bpmn-moddle/resources/bpmn/json/bpmn.json';

    export default {
        name: "zfjBpmn",
        // 引用组件
        components: {},
        // 上级组件向本页面传递的参数
        props: {},
        data() {
            return {
                name: "zfjBpmn",
                bpmnModeler: null,
            };
        },
        // 本页面计算属性
        computed: {},
        // 本页面监听属性
        watch: {},

        methods: {

            // 初始化数据
            async init() {
                // 创建BpmnModeler
                this.bpmnModeler = new BpmnModeler({
                    container: this.$refs.canvas,
                    // 加入工具栏支持
                    propertiesPanel: {
                        parent: '#js-properties-panel'
                    },
                    additionalModules: [],
                    moddleExtensions: {
                        bpmn: bpmnModdleDescriptor
                    }
                });
                let xmsStr = '<?xml version="1.0" encoding="UTF-8"?>\n' +
                    '<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" targetNamespace="demo">\n' +
                    '<bpmn2:process id="processId_1" name="processName_1" isExecutable="true">\n' +
                    '  <bpmn2:documentation>description_1</bpmn2:documentation>\n' +
                    '  <bpmn2:startEvent id="StartEvent_1"/>\n' +
                    '</bpmn2:process>\n' +
                    '<bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
                    '  <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">\n' +
                    '    <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">\n' +
                    '      <dc:Bounds height="36.0" width="36.0" x="160.0" y="160.0"/>\n' +
                    '    </bpmndi:BPMNShape>\n' +
                    '  </bpmndi:BPMNPlane>\n' +
                    '</bpmndi:BPMNDiagram>\n' +
                    '</bpmn2:definitions>'
                // 创建新流程
                await this.createNewDiagram(xmsStr);

            },

            async createNewDiagram(bpmn) {

                // 将字符串转换成图显示出来;
                this.bpmnModeler.importXML(bpmn, err => {
                    if (err) {
                        this.$message.error('打开模型出错,请确认该模型符合Bpmn2.0规范');
                    } else {
                        console.log("成功导入模型");
                    }
                });
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


    @import '~bpmn-js/dist/assets/diagram-js.css';
    @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
    @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
    @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';


    .containers {

        background-color: #ffffff;
        width: 100%;
        height: 100%;
        padding: 5px;
    }

    .canvas {
        width: 100%;
        height: 100%;
    }

</style>