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
        currentTag:"/dashboard",
        tagList:[{
            label : "首页",
            path:"/dashboard",
        }]
    },
    mutations: {
        set_to_tag(state, one){
            if(one){
                if(state.currentTag != one){
                    state.currentTag = one
                }
            }
           
        },
        set_tag_list(state, list){
            if(list){
                state.tagList=list
            }
        },
        add_one_tag(state, one){
            if(one){
                if(state.tagList){
                    let flag = true
                    for(let i = 0 ; i< state.tagList.length;i++){
                        let item = state.tagList[i]
                        if(item.path === one.path){
                            flag = false
                        }
                    }
                    if(flag){
                        state.tagList.push(one)
                    }
                }
            }
            
        },
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
    actions: {

    },
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
