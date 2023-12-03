// import Vue from 'vue'
// import Vuex from 'vuex'
import dic from './dic'
import area from './area'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: "",
        userInfo: {},
        menu: [],
        wsFlag: "warning",
        wsMessage: {},
        topicMessage: {},
    },
    mutations: {
        set_token(state, token) {
            state.menu = []
            state.token = token;
            sessionStorage.setItem("token", token)
        },
        del_token(state) {
            state.menu = []
            state.token = '';
            sessionStorage.removeItem('token')
        },
        set_userInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        del_userInfo(state) {
            state.userInfo = {}
        },
        set_menu(state, menu) {
            state.menu = menu;
        },
        del_menu(state) {
            state.menu = []
        },
    },
    actions: {},
    modules: {
        dicStore: {
            namespaced: true,
            state: dic.state,
            mutations: dic.mutations,
            actions: dic.actions,
            getters: dic.getters
        },
        areaStore: {
            namespaced: true,
            state: area.state,
            mutations: area.mutations,
            actions: area.actions,
            getters: area.getters
        },
    }
})
