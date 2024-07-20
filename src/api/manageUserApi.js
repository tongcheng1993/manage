import { get, postJson } from '../axios'


export const queryPageManageUser = (parameter) => {
    let url = '/api/manage/manageUser/queryPageManageUser';
    return postJson(url, parameter);
}


export const getManageUserById = (parameter) => {
    let url = '/api/manage/manageUser/getManageUserById';
    return get(url, parameter);
}

export const addManageUser = (parameter) => {
    let url = '/api/manage/manageUser/addManageUser';
    return postJson(url, parameter);
}
export const resetPassWord = (parameter) => {
    let url = '/api/manage/manageUser/resetPassWord';
    return postJson(url, parameter);
}
export const queryPageManageRole = (parameter) => {
    let url = '/api/manage/manageUser/queryPageManageRole';
    return postJson(url, parameter);
}
export const queryListManageRole = (parameter) => {
    let url = '/api/manage/manageUser/queryListManageRole';
    return postJson(url, parameter);
}
export const saveMenu = (parameter) => {
    let url = '/api/manage/manageUser/saveMenu';
    return postJson(url, parameter);
}

export const queryListManageMenu = (parameter) => {
    let url = '/api/manage/manageUser/queryListManageMenu';
    return postJson(url, parameter);
}
export const queryPageManagePermission = (parameter) => {
    let url = '/api/manage/manageUser/queryPageManagePermission';
    return postJson(url, parameter);
}
export const queryListManagePermission = (parameter) => {
    let url = '/api/manage/manageUser/queryListManagePermission';
    return postJson(url, parameter);
}
export const addManagePermission = (parameter) => {
    let url = '/api/manage/manageUser/addManagePermission';
    return postJson(url, parameter);
}
export const resetManagePermission = (parameter) => {
    let url = '/api/manage/manageUser/resetManagePermission';
    return postJson(url, parameter);
}
export const removePermission = (parameter) => {
    let url = '/api/manage/manageUser/removePermission';
    return postJson(url, parameter);
}
export const getPermission = (parameter) => {
    let url = '/api/manage/manageUser/getPermission';
    return get(url, parameter);
}
export const bindUserAndRoleDelBefore = (parameter) => {
    let url = '/api/manage/manageUser/bindUserAndRoleDelBefore';
    return postJson(url, parameter);
}
export const bindRoleAndPermissionDelBefore = (parameter) => {
    let url = '/api/manage/manageUser/bindRoleAndPermissionDelBefore';
    return postJson(url, parameter);
}
export const saveRoleMenuRelation = (parameter) => {
    let url = '/api/manage/manageUser/saveRoleMenuRelation';
    return postJson(url, parameter);
}







