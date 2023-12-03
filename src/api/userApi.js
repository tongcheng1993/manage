import {get, postJson} from '../axios'

export const saveRoleAndMenu = (params) => {
    let parameter = params;
    let url = "/api/sys/webUser/manage/saveRoleAndMenu";
    return postJson(url, parameter);
}


export const queryPageUser = (params) => {
    let parameter = params;
    let url = "/api/sys/webUser/manage/queryPageUser";
    return postJson(url, parameter);
}

export const saveRole = (params) => {
    let parameter = params;
    let url = "/api/sys/webUser/manage/saveRole";
    return postJson(url, parameter);
}
export const getRoleInfoById = (params) => {
    let parameter = params;
    let url = "/api/sys/webUser/manage/getRoleInfoById";
    return get(url, parameter);
}

export const queryPageRole = (params) => {
    let parameter = params;
    let url = "/api/sys/webUser/manage/queryPageRole";
    return postJson(url, parameter);
}
export const saveMenu = (params) => {
    let parameter = params;
    let url = "/api/sys/webUser/manage/saveMenu";
    return postJson(url, parameter);
}

export const delMenu = (params) => {
    let parameter = params;
    let url = "/api/sys/webUser/manage/delMenu";
    return get(url, parameter);
}
export const updateMenu = (params) => {
    let parameter = params;
    let url = "/api/sys/webUser/manage/updateMenu";
    return postJson(url, parameter);
}


export const getMenuInfoById = (params) => {
    let parameter = params;
    let url = "/api/sys/webUser/manage/getMenuInfoById";
    return get(url, parameter);
}


export const queryListMenu = (params) => {
    let parameter = params;
    let url = "/api/sys/webUser/manage/queryListMenu";
    return postJson(url, parameter);
};
export const savePermission = (params) => {
    let parameter = params;
    let url = "/api/sys/webUser/manage/savePermission";
    return postJson(url, parameter);
};




