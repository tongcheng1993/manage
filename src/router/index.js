// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
import store from '../store/index.js'
import { getMenu } from '../api/loginApi'
import { createTree } from '../util/treeUtil'

// Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/login.vue'),
    },
    {
        path: '/lost404',
        name: 'lost404',
        component: () => import('@/views/lost404/lost404.vue'),
    },
]


// 页面刷新时，重新赋值token
if (sessionStorage.getItem('token')) {
    store.commit('set_token', sessionStorage.getItem('token'))
}


const router = new VueRouter({
    routes
})



function filterAsyncRouter(asyncRouterMap) {
    asyncRouterMap.filter(route => {
        if (route.children.length > 0) {
            if (route.component) {
                const str = route.component
                route.component = resolve => require(['@/views' + str + '.vue'], resolve)
            } else {
                route.component = resolve => require(['@/views' + '/layout/blank' + '.vue'], resolve)
            }
        } else {
            if (route.component) {
                const str = route.component
                route.component = resolve => require(['@/views' + str + '.vue'], resolve)
            } else {
                route.component = resolve => require(['@/views' + '/layout/blank' + '.vue'], resolve)
            }
        }
        if (route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children)
        }
        return true
    })
    return asyncRouterMap
}

//路由守卫白名单
const whiteList = ['/login', '/lost404'];
router.beforeEach((to, from, next) => {
    NProgress.start();
    if (store.state.token) {
        if (whiteList.indexOf(to.path) !== -1) {
            next({
                path: '/dashboard',
                params: {}
            });
        } else {
            //登陆后用户单独路由是否加载完成
            if (store.state.menu.length === 0) {
                getMenu({}).then((res) => {
                    let menu = createTree(res)
                    let aa = filterAsyncRouter(menu)
                    const routers = [
                        {
                            path: '/',
                            name: 'container',
                            component: () => import('@/views/layout/container.vue'),
                            children: []
                        },
                        {
                            path: '/*',
                            name: 'lost404',
                            component: () => import('@/views/lost404/lost404.vue')
                        }
                    ]
                    routers[0].children = aa
                    router.addRoutes(routers)
                    store.commit("set_menu", res)
                    next({ ...to, replace: true })
                })
            } else {
                next();
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next({
                path: '/login',
                params: {}
            });
        }
    }
});

router.afterEach(() => {
    NProgress.done();
});


export default router
