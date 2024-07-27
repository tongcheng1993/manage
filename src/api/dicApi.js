import {postForm, postJson} from '../axios'


// 保存数据字典类别项
export const addDic = (params) => {
    let parameter = params;
    let url = "/api/sys/dic/addDic";
    return postJson(url, parameter);
};

export const delDic = (params) => {
    let parameter = params;
    let url = "/api/sys/dic/delDic";
    return postJson(url, parameter);
};

export const updateDic = (params) => {
    let parameter = params;
    let url = "/api/sys/dic/updateDic";
    return postJson(url, parameter);
};

export const queryListDic = (params) => {
    let parameter = params;
    let url = "/api/sys/dic/queryListDic";
    return postJson(url, parameter);
};

export const queryPageDic = (params) => {
    let parameter = params;
    let url = "/api/sys/dic/queryPageDic";
    return postJson(url, parameter);
};

export const getDicById = (params) => {
    let parameter = params;
    let url = "/api/sys/dic/getDicById";
    return postJson(url, parameter);
};



// 保存数据子字典内容项
export const addDicItem = (params) => {
    let parameter = params;
    let url = "/api/sys/dic/addDicItem";
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

export const getAllDicDetail = (params) => {
    let parameter = params;
    let url = "/api/sys/dic/getAllDicDetail";
    return postJson(url, parameter);
};

export const getDicByCode = (params) => {
    let parameter = params;
    let url = "/api/sys/dic/getDicByCode";
    return postForm(url, parameter);
};
