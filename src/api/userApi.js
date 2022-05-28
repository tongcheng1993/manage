import {get, postJson} from '../axios'

export const saveRoleAndMenu = (params) =>{
    let parameter = params;
    let url = "/api/sys/manageUser/user/saveRoleAndMenu";
    return postJson(url, parameter);
}


export const queryPageUser = (params) => {
    let parameter = params;
    let url = "/api/sys/manageUser/user/queryPageUser";
    return postJson(url, parameter);
}

export const saveRole = (params) =>{
    let parameter = params;
    let url = "/api/sys/manageUser/user/saveRole";
    return postJson(url, parameter);
}
export const getRoleInfoById = (params) =>{
    let parameter = params;
    let url = "/api/sys/user/getRoleInfoById";
    return get(url, parameter);
}

export const queryPageRole = (params) => {
    let parameter = params;
    let url = "/api/sys/manageUser/user/queryPageRole";
    return postJson(url, parameter);
}
export const saveMenu = (params) =>{
    let parameter = params;
    let url = "/api/sys/manageUser/user/saveMenu";
    return postJson(url, parameter);
}

export const delMenu = (params) =>{
    let parameter = params;
    let url = "/api/sys/user/delMenu";
    return get(url, parameter);
}
export const updateMenu = (params) =>{
    let parameter = params;
    let url = "/api/sys/user/updateMenu";
    return postJson(url, parameter);
}


export const getMenuInfoById = (params) =>{
    let parameter = params;
    let url = "/api/sys/user/getMenuInfoById";
    return get(url, parameter);
}


export const queryListMenu = (params) => {
    let parameter = params;
    let url = "/api/sys/manageUser/user/queryListMenu";
    return postJson(url, parameter);
};




