import {get, postJson} from '../axios'


export const queryPageManageUser = (parameter) => {
    let url = '/api/sys/manageUser/queryPageManageUser';
    return postJson(url, parameter);
}
export const addManageUser = (parameter) => {
    let url = '/api/sys/manageUser/addManageUser';
    return postJson(url, parameter);
}
export const resetPassWord = (parameter) => {
    let url = '/api/sys/manageUser/resetPassWord';
    return postJson(url, parameter);
}
export const queryPageManageRole = (parameter) => {
    let url = '/api/sys/manageUser/queryPageManageRole';
    return postJson(url, parameter);
}
export const queryListManageRole = (parameter) => {
    let url = '/api/sys/manageUser/queryListManageRole';
    return postJson(url, parameter);
}
export const saveMenu = (parameter) => {
    let url = '/api/sys/manageUser/saveMenu';
    return postJson(url, parameter);
}

export const queryListManageMenu = (parameter) => {
    let url = '/api/sys/manageUser/queryListManageMenu';
    return postJson(url, parameter);
}
export const queryPageManagePermission = (parameter) => {
    let url = '/api/sys/manageUser/queryPageManagePermission';
    return postJson(url, parameter);
}
export const queryListManagePermission = (parameter) => {
    let url = '/api/sys/manageUser/queryListManagePermission';
    return postJson(url, parameter);
}
export const addManagePermission = (parameter) => {
    let url = '/api/sys/manageUser/addManagePermission';
    return postJson(url, parameter);
}
export const resetManagePermission = (parameter) => {
    let url = '/api/sys/manageUser/resetManagePermission';
    return postJson(url, parameter);
}
export const removePermission = (parameter) => {
    let url = '/api/sys/manageUser/manage/removePermission';
    return postJson(url, parameter);
}
export const getPermission = (parameter) => {
    let url = '/api/sys/manageUser/manage/getPermission';
    return get(url, parameter);
}
export const saveUserRoleRelation = (parameter) => {
    let url = '/api/sys/manageUser/manage/saveUserRoleRelation';
    return postJson(url, parameter);
}
export const bindRoleAndPermissionDelBefore = (parameter) => {
    let url = '/api/sys/manageUser/bindRoleAndPermissionDelBefore';
    return postJson(url, parameter);
}
export const saveRoleMenuRelation = (parameter) => {
    let url = '/api/sys/manageUser/manage/saveRoleMenuRelation';
    return postJson(url, parameter);
}







