const myTime = Date.now() + ""
module.exports = {
    productionSourceMap: false,
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = '管理系统'
                args[0].date = myTime
                return args
            })
    },
    css: {
        extract: {
            filename: `css/[name].${myTime}.css`,
            chunkFilename: `css/[name].${myTime}.css`
        }
    },
    configureWebpack: {
        //打包文件重命名，增加时间戳
        output: {
            filename: `js/[name].${myTime}.js`,
            chunkFilename: `js/[name].${myTime}.js`
        },
        externals: {
            'vue': 'Vue',
            'vuex': 'Vuex',
            'vue-router': 'VueRouter',
            'axios': 'axios',
            'element-ui': 'ELEMENT',
            'nprogress': 'NProgress',
            'wangeditor': 'wangEditor',
            'vue-baidu-map': 'VueBaiduMap',
            "sockjs-client": "SockJS",
            "stompjs": "Stomp",
            "phaser": "Phaser",
            'echarts': 'echarts',
            'bpmn-js': 'BpmnJS',
        }
    },
    devServer: {
        // 设置主机地址
        host: 'localhost',
        // 设置默认端口
        port: 9991,
        // 设置代理
        proxy: {
            '/api': {
                // 目标 API 地址
                // 开发环境
                target: 'http://192.168.84.99:9091/',
                // 如果要代理 webSockets
                ws: true,
                // 设置跨域
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        },
        disableHostCheck: true
    },
}
