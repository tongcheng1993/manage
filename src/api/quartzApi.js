import {get, postJson} from '../axios'


export const queryPageQuartzRecord = (params) => {
    let parameter = params;
    let url = "/api/sys/quartz/queryPageQuartzRecord";
    return postJson(url, parameter);
};

export const saveQuartzRecord = (params) => {
    let parameter = params;
    let url = "/api/sys/quartz/saveQuartzRecord";
    return postJson(url, parameter);
};

export const delQuartzRecord = (params) => {
    let parameter = params;
    let url = "/api/sys/quartz/delQuartzRecord";
    return get(url, parameter);
};
