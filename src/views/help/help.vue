<template>
    <div class="view_div">
        <div>
            <div ref="wEditor">
            </div>
        </div>
        <div v-html="html">

        </div>
        <div>
            <el-button @click="save">
                保存
            </el-button>
        </div>
    </div>
</template>

<script>


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
            },
            setContent(newHtml){
                this.html = newHtml
            },
            save() {

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
                toolbarConfig: {
                    // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
                    // excludeKeys: [ /* 隐藏哪些菜单 */ ],
                },
                editorConfig: {
                    placeholder: "请输入内容...",
                    // autoFocus: false,

                    // 所有的菜单配置，都要在 MENU_CONF 属性下
                    MENU_CONF: {},
                },
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
    .view_edit {
        height: 400px;
    }

    #editor—wrapper {
        border: 1px solid #ccc;
        z-index: 100; /* 按需定义 */
    }

    #toolbar-container {
        border-bottom: 1px solid #ccc;
    }

    #editor-container {
        height: 500px;
    }
</style>