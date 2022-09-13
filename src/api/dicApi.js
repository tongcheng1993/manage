import {postForm, postJson} from '../axios'


// 保存数据字典类别项
export const saveDic = (params) => {
    let parameter = params;
    let url = "/api/sys/dic/saveDic";
    return postJson(url, parameter);
};

export const delDic = (params) => {
    let parameter = params;
    let url = "/api/sys/dic/delDic";
    return postForm(url, parameter);
};


export const queryPageDic = (params) => {
    let parameter = params;
    let url = "/api/sys/dic/queryPageDic";
    return postJson(url, parameter);
};




// 保存数据子字典内容项
export const saveDicItem = (params) => {
    let parameter = params;
    let url = "/api/sys/dic/saveDicItem";
    return postJson(url, parameter);
};




export const queryPageDicItem = (params) => {
    let parameter = params;
    let url = "/api/sys/dic/queryPageDicItem";
    return postJson(url, parameter);
};

export const queryListDicItem = (params) => {
    let parameter = params;
    let url = "/api/sys/dic/queryListDicItem";
    return postJson(url, parameter);
};

export const initDic = (params) => {
    let parameter = params;
    let url = "/api/sys/dic/initDic";
    return postJson(url, parameter);
};