import {get,postForm, postJson} from '../axios'



export const downloadFile = (params) => {
    let parameter = params;
    let url = "/api/sys/file/downloadFile";
    return postForm(url, parameter);
};

export const delFile = (params) => {
    let parameter = params;
    let url = "/api/sys/file/delFile";
    return get(url, parameter);
};

export const queryPageFile = (params) => {
    let parameter = params;
    let url = "/api/sys/file/queryPageFile";
    return postJson(url, parameter);
};


