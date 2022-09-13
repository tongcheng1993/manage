import {initDic} from '../api/dicApi'

function isObjectEmpty(obj) {
    for (let key in obj) {
        return false
    }
    return true
}

export default {
    state: {
        dic: {},
    },
    mutations: {
        initDic(state, data) {
            state.dic = data
        },
    },
    actions: {
        initDic(context, data) {
            if (isObjectEmpty(context.state.dic)) {
                let parameter = {}
                initDic(parameter).then((res) => {
                    if (res) {
                        let tempDic = {}
                        for (let i = 0; i < res.length; i++) {
                            let tempOneDic = res[i]
                            tempDic[tempOneDic.code] = tempOneDic.dicItemVoList
                        }
                        context.commit('initDic', tempDic)
                    }
                })
            } else {

            }
        },
    },
    getters: {
        getDic(state) {
            return state.dic;
        }
    }
}