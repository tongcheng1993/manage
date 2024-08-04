import { getAllDicDetail, getDicByCode } from '../api/dicApi'
export default {
    state: {
        dic: {
            area_type: [],

        },
    },
    mutations: {
        setDicItemList(state, data) {
            state.dic[data.code] = data.list
        }
    },
    actions: {
        actionsInitDic(context, data) {
            if (data) {
                let parameter = {
                    dicCode: data
                }
                getDicByCode(parameter).then((res) => {
                    if (res) {
                        let vo = {
                            code: res.dicCode,
                            list: res.dicItemVoList
                        }
                        context.commit('setDicItemList', vo)
                    }
                }).catch((err) => {

                })

            } else {
                let parameter = {}
                getAllDicDetail(parameter).then((res) => {
                    if (res) {
                        for (let i = 0; i < res.length; i++) {
                            let item = res[i]
                            let vo = {
                                code: item.dicCode,
                                list: item.dicItemVoList
                            }
                            context.commit('setDicItemList', vo)
                        }
                    }
                }).catch((err) => {

                })
            }
        }
    },
    getters: {}
}