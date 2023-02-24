import {get, postJson} from '../axios'


export const queryPageUser = (parameter) => {
    let url = '/api/sys/manageUser/manage/queryPageUser';
    return postJson(url, parameter);
}
export const saveUser = (parameter) => {
    let url = '/api/sys/manageUser/manage/saveUser';
    return postJson(url, parameter);
}
export const resetPassWord = (parameter) => {
    let url = '/api/sys/manageUser/manage/resetPassWord';
    return postJson(url, parameter);
}
export const queryPageRole = (parameter) => {
    let url = '/api/sys/manageUser/manage/queryPageRole';
    return postJson(url, parameter);
}
export const queryListRole = (parameter) => {
    let url = '/api/sys/manageUser/manage/queryListRole';
    return postJson(url, parameter);
}
export const saveMenu = (parameter) => {
    let url = '/api/sys/manageUser/manage/saveMenu';
    return postJson(url, parameter);
}
export const queryPagePermission = (parameter) => {
    let url = '/api/sys/manageUser/manage/queryPagePermission';
    return postJson(url, parameter);
}
export const queryListPermission = (parameter) => {
    let url = '/api/sys/manageUser/manage/queryListPermission';
    return postJson(url, parameter);
}
export const savePermission = (parameter) => {
    let url = '/api/sys/manageUser/manage/savePermission';
    return postJson(url, parameter);
}
export const editPermission = (parameter) => {
    let url = '/api/sys/manageUser/manage/editPermission';
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
export const queryListMenu = (parameter) => {
    let url = '/api/sys/manageUser/manage/queryListMenu';
    return postJson(url, parameter);
}
export const saveUserRoleRelation = (parameter) => {
    let url = '/api/sys/manageUser/manage/saveUserRoleRelation';
    return postJson(url, parameter);
}
export const saveRolePermissionRelation = (parameter) => {
    let url = '/api/sys/manageUser/manage/saveRolePermissionRelation';
    return postJson(url, parameter);
}
export const saveRoleMenuRelation = (parameter) => {
    let url = '/api/sys/manageUser/manage/saveRoleMenuRelation';
    return postJson(url, parameter);
}







