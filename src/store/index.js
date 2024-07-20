// import Vue from 'vue'
// import Vuex from 'vuex'
import dic from './dic'
import area from './area'
import ws from './ws'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: "",
        userInfo: {},
        menu: [],
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
        set_user_info(state, userInfo) {
            state.userInfo = userInfo;
        },

        set_menu(state, menu) {
            state.menu = menu;
        },

    },
    actions: {},
    modules: {
        wsStore:{
            namespaced: true,
            state: ws.state,
            mutations: ws.mutations,
            actions: ws.actions,
            getters: ws.getters
        },
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
