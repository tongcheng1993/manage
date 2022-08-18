<template>
    <div class="view_div">
        <div>
            <div ref="wEditor">
            </div>
        </div>
        <div v-html="html">

        </div>
        <div>
            <el-button @click="saveHelpContent">
                保存
            </el-button>
        </div>
    </div>
</template>

<script>
    import {getHelpContent,saveHelpContent} from '../../api/helpApi'
    export default {
        name: "help",
        components: {},
        props: {},
        methods: {
            init() {

                let editor = new wangEditor(this.$refs.wEditor);
                // 图片使用base64
                editor.config.uploadImgShowBase64 = true
                // 默认情况下，显示所有菜单
                editor.config.menus = [
                    'head',
                    'bold',
                    'fontSize',
                    'fontName',
                    'italic',
                    'underline',
                    'strikeThrough',
                    'indent',
                    'lineHeight',
                    'foreColor',
                    'backColor',
                    'link',
                    'list',
                    'todo',
                    'justify',
                    'quote',
                    'emoticon',
                    'image',
                    'video',
                    'table',
                    'code',
                    'splitLine',
                    'undo',
                    'redo',
                ]
                editor.config.onchange= (newHtml) => {
                    this.setContent(newHtml);
                };
                editor.create();
                let parameter = {}
                getHelpContent(parameter)
                    .then((res)=>{
                        if(res){
                            this.html=res
                            editor.txt.html(this.html)
                        }
                    })

            },
            setContent(newHtml){
                this.html = newHtml
            },
            saveHelpContent() {
                let parameter = {
                    content : this.html
                }
                saveHelpContent(parameter)
                    .then((res)=>{
                        if(res){

                        }
                    })
            },
        },
        computed: {},
        watch: {},
        data() {
            return {
                name: "help",
                page: {
                    total: 0,
                    current: 0,
                    size: 10,
                    orders: [],
                },
                editor: null,
                html: "",
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