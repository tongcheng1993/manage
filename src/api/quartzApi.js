import {get, postJson} from '../axios'


export const queryPageQuartzRecord = (params) => {
    let parameter = params;
    let url = "/api/sys/quartz/manage/queryPageQuartzRecord";
    return postJson(url, parameter);
};

export const saveQuartzRecord = (params) => {
    let parameter = params;
    let url = "/api/sys/quartz/manage/saveQuartzRecord";
    return postJson(url, parameter);
};

export const delQuartzRecord = (params) => {
    let parameter = params;
    let url = "/api/sys/quartz/manage/delQuartzRecord";
    return get(url, parameter);
};
export const syncQuartzList = (params) => {
    let parameter = params;
    let url = "/api/sys/quartz/manage/syncQuartzList";
    return postJson(url, parameter);
};