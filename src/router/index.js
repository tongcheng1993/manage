// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
import store from '../store/index.js'
import { getMenu } from '../api/loginApi'
import { createRouterTree } from '../util/treeUtil'

Vue.use(VueRouter)

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

function loadPageByRoutes(str) {
    return function (resolve) {
        require([`@/views${str}.vue`], resolve)
    }
}

function filterAsyncRouter(asyncRouterMap) {
    asyncRouterMap.filter(route => {
        if (route.component) {
            route.component = loadPageByRoutes(route.component)
        } else {
            let str = "/layout/blank";
            route.component = loadPageByRoutes(str)
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
                    if (res && res.length > 0) {
                        let parent = {
                            tableId: "0",
                            path: '/',
                            name: 'container',
                            component: '/layout/container',
                            redirect: '/dashboard',
                            children: []
                        }
                        parent = createRouterTree(res, parent)
                        let menu = []
                        menu.push(parent)
                        let aa = filterAsyncRouter(menu)
                        aa.push({
                            path: '/*',
                            name: 'lostError',
                            component: () => import('@/views/lost404/lost404.vue')
                        })
                        router.addRoutes(aa)
                        store.commit("set_menu", parent.children)
                    }
                    next({ ...to, replace: true })
                }).catch((err) => {

                })
            } else {
                store.commit("add_one_tag", {
                    label: to.name,
                    path: to.path,
                })
                store.commit("set_to_tag", to.path)
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
