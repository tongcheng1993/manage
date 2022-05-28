import {get, postJson} from '../axios'



export const saveArea = (params) => {
    let parameter = params;
    let url = "/api/sys/area/saveArea";
    return postJson(url, parameter);
};





export const queryPageArea = (params) => {
    let parameter = params;
    let url = "/api/sys/area/queryPageArea";
    return postJson(url, parameter);
};

export const queryListArea = (params) => {
    let parameter = params;
    let url = "/api/sys/area/queryListArea";
    return postJson(url, parameter);
};